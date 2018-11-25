const { catchError, map, switchMap } = require('rxjs/operators')
const { of, pipe } = require('rxjs')

const doScaryLightFlash = require('./doScaryLightFlash')
const getColorSetAtIndex = require('./getColorSetAtIndex')
const getJsonFromPromise = require('./getJsonFromPromise')
const getRandomColorSetIndex = require('./getRandomColorSetIndex')

const flashRandomLight = (
	lifxSelector,
) => (
	pipe(
		map(getRandomColorSetIndex),
		map(getColorSetAtIndex),
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
)

module.exports = flashRandomLight
