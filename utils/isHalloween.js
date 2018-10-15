const isDuringHalloweenNight = require('./isDuringHalloweenNight')

const isHalloween = () => (
	isDuringHalloweenNight(
		new Date()
	)
)

module.exports = isHalloween
