const { map, switchMap } = require('rxjs/operators')
const { pipe } = require('rxjs')

const config = require('$config')
const doScaryLightFlash = require('./doScaryLightFlash')
const getColorSetAtIndex = require('./getColorSetAtIndex')
const getDataFromPromise = require('./getDataFromPromise')
const getRandomColorSetIndex = require('./getRandomColorSetIndex')

const flashRandomLight = () => (
	pipe(
		map(getRandomColorSetIndex),
		map(getColorSetAtIndex),
		switchMap(
			doScaryLightFlash(
				config.getLifxSelector()
			)
		),
		map(getDataFromPromise),
	)
)

module.exports = flashRandomLight
