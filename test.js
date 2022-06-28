const bookingData = () => {
	if (window.location.href.indexOf('https://be.synxis.com/') === -1)
		throw Error('Please double check the URL')

	const url = window.location.search
	const params = new URLSearchParams(url)

	const dataToFindInUrl = [
		'arrive',
		'depart',
		'currency',
		'rooms',
		'locale',
		'adult',
		'child',
	]
	const [
		checkInDate,
		checkOutDate,
		currency,
		roomsQuantity,
		locale,
		adults,
		child,
	] = dataToFindInUrl.map((param) => params.get(param))

	const parsedLocale = locale.slice(0, 2)
	const totalGuests = Number(adults) + Number(child)

	const minPricesExtraData = []
	const allPrices = []

	const allCardsContainer = document.querySelectorAll('.thumb-cards_rate')

	allCardsContainer.forEach((card) =>
		allPrices.push(card.querySelector('.thumb-cards_price').lastChild.innerText)
	)

	const allNumbersPrices = allPrices.map(
		(price) => +price.replace(',', '').slice(1)
	)

	const minPrice = '€' + Math.min(...allNumbersPrices)

	allCardsContainer.forEach((card) => {
		const elementPrice =
			card.querySelector('.thumb-cards_price').lastChild.innerText
		if (elementPrice === minPrice) {
			minPricesExtraData.push(
				card.querySelector('.product-icons_iconList').firstChild.innerText
			)
		}
	})

	return {
		checkInDate,
		checkOutDate,
		currency,
		roomsQuantity,
		language: parsedLocale,
		guests: {
			adults,
			child,
		},
		totalGuests,
		minPrice,
		minPricesExtraData: minPricesExtraData[0],
	}
}
bookingData()
