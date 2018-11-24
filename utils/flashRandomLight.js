const { map, switchMap } = require('rxjs/operators')
const { pipe } = require('rxjs')

const doScaryLightFlash = require('./doScaryLightFlash')
const getColorSetAtIndex = require('./getColorSetAtIndex')
const getDataFromPromise = require('./getDataFromPromise')
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
		map(getDataFromPromise),
	)
)

module.exports = flashRandomLight
