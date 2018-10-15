require('@ghadyani-framework/setup-module-aliases')(__dirname)

const Rx = require('rxjs/Rx')

const flashRandomLight = require('$utils/flashRandomLight')
const isDuringHalloweenNight = require('$utils/isDuringHalloweenNight')

flashRandomLight(
	Rx
	.Observable
	.interval(10000)
	.map(isDuringHalloweenNight)
)
.subscribe(
	console.log,
	console.error,
)
