require('@ghadyani-framework/setup-module-aliases')(__dirname)

const { interval } = require('rxjs')
const { filter, map, tap } = require('rxjs/operators')

const flashRandomLight = require('$utils/flashRandomLight')
const isDuringHalloweenNight = require('$utils/isDuringHalloweenNight')

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
	filter(Boolean),
	flashRandomLight(),
)
.subscribe(
	console.log,
	console.error,
)
