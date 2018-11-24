const { map, switchMap } = require('rxjs/operators')
const { pipe } = require('rxjs')

const doScaryLightFlash = require('./doScaryLightFlash')
const getColorSetAtIndex = require('./getColorSetAtIndex')
const getDataFromPromise = require('./getDataFromPromise')
const getRandomColorSetIndex = require('./getRandomColorSetIndex')

const flashRandomLight = () => (
	pipe(
		map(getRandomColorSetIndex),
		map(getColorSetAtIndex),
		map(doScaryLightFlash),
		switchMap(getDataFromPromise),
	)
)

module.exports = flashRandomLight
