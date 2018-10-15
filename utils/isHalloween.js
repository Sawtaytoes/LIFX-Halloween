const isDuringHalloweenNight = require('./isDuringHalloweenNight')

const isHalloween = (
	date,
) => (
	date instanceof Date
	? isDuringHalloweenNight(date)
	: isDuringHalloweenNight(new Date())
)

module.exports = isHalloween
