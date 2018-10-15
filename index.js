require('@ghadyani-framework/setup-module-aliases')(__dirname)

const { interval } = require('rxjs')
const { map, tap } = require('rxjs/operators')

const flashRandomLight = require('$utils/flashRandomLight')
const isDuringHalloweenNight = require('$utils/isDuringHalloweenNight')

flashRandomLight(
	interval(10000)
	.pipe(
		map(isDuringHalloweenNight),
		tap(isDuringHalloweenNight => (
			console
			.info(
				'isDuringHalloweenNight:',
				isDuringHalloweenNight,
			)
		)),
	)
)
.subscribe(
	console.log,
	console.error,
)
