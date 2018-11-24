const { interval } = require('rxjs')
const { filter, map, tap } = require('rxjs/operators')

const config = require('$config')

const {
	flashRandomLight,
	isDuringHalloweenNight,
} = require('./')

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
	flashRandomLight(
		config.getLifxSelector()
	),
)
.subscribe(
	console.log,
	console.error,
)
