const { addYears } = require('date-fns/fp')
const { finalize, switchMap, takeUntil, tap } = require('rxjs/operators')
const { interval, timer } = require('rxjs')

require('./directory')

const config = require('$config')

const {
	flashRandomLight,
	getTimeUntilHalloweenEnds,
	getTimeUntilHalloweenStarts,
} = require('./')

const addOneYear = (
	addYears(
		1,
	)
)

const getHalloweenFlasherObservable = (
	date = new Date(),
) => (
	timer(
		getTimeUntilHalloweenStarts(
			date,
		)
	)
	.pipe(
		tap(() => (
			console
			.info('LIFX Halloween Activated')
		)),
		switchMap(() => (
			interval(10000)
			.pipe(
				takeUntil(
					timer(
						getTimeUntilHalloweenEnds()
					)
				),
				finalize(() => (
					console
					.info('LIFX Halloween Deactivated')
				)),
				flashRandomLight(
					config
					.getLifxSelector()
				),
				tap(console.info),
			)
		)),
	)
	.subscribe(
		console.log,
		console.error,
		() => {
			getHalloweenFlasherObservable(
				addOneYear(
					date,
				)
			)
		}
	)
)

getHalloweenFlasherObservable()