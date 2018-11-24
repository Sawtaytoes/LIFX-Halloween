require('@ghadyani-framework/setup-module-aliases')(__dirname)

const flashRandomLight = require('$utils/flashRandomLight')
const isDuringHalloweenNight = require('$utils/isDuringHalloweenNight')

module.exports = {
	isDuringHalloweenNight,
	flashRandomLight,
}
