require('better-module-alias')(__dirname)

const config = require('$config')
const flashRandomLight = require('$utils/flashRandomLight')
const isDuringHalloweenNight = require('$utils/isDuringHalloweenNight')

const {
	getTimeUntilHalloweenEnds,
	getTimeUntilHalloweenStarts,
} = require('$utils/halloweenTimes')

module.exports = {
	config,
	flashRandomLight,
	getTimeUntilHalloweenEnds,
	getTimeUntilHalloweenStarts,
	isDuringHalloweenNight,
}
