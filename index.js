require('@ghadyani-framework/setup-module-aliases')(__dirname)

const Rx = require('rxjs/Rx')

const flashRandomLight = require('$utils/flashRandomLight')
const isDuringHalloweenNight = require('$utils/isDuringHalloweenNight')
const logger = require('$utils/logger')

flashRandomLight(
	Rx
	.Observable
	.interval(10000)
	.map(isDuringHalloweenNight)
)
.subscribe(
	logger.log,
	logger.logError,
)
