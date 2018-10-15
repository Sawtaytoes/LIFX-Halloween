require('@ghadyani-framework/setup-module-aliases')(__dirname)

const Rx = require('rxjs/Rx')

const flashRandomLight = require('$utils/flashRandomLight')
const isHalloween = require('$utils/isHalloween')
const logger = require('$utils/logger')

flashRandomLight(
	Rx
	.Observable
	.interval(10000)
	.map(isHalloween)
)
.subscribe(
	logger.log,
	logger.logError,
)
