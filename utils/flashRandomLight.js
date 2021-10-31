const { catchError, map, switchMap, tap } = require('rxjs/operators')
const { combineLatest, of, pipe } = require('rxjs')

const getLightsInSelection = require('./getLightsInSelection')
const doScaryLightFlash = require('./doScaryLightFlash')
const getColorSetAtIndex = require('./getColorSetAtIndex')
const getJsonFromPromise = require('./getJsonFromPromise')
const getRandomColorSetIndex = require('./getRandomColorSetIndex')

const flashRandomLight = (
	lifxSelector,
) => (
	switchMap(() => (
		combineLatest(
			(
				of(null)
				.pipe(
					getLightsInSelection(
						lifxSelector,
					),
				)
			),
			(
				of(
					lifxSelector
				)
				.pipe(
					map(getRandomColorSetIndex),
					map(getColorSetAtIndex),
				)
			),
		)
		.pipe(
			tap(console.log),
			switchMap(
				doScaryLightFlash(
					lifxSelector,
				)
			),
			switchMap(getJsonFromPromise),
			catchError(error => {
				console
				.error(
					error
					.stack
				)

				return of(null)
			})
		)
	))
)

module.exports = flashRandomLight
