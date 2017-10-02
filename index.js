const fetch = require('node-fetch')
const Rx = require('rxjs/Rx')

// Global Dir Hack
global.baseDir = `${__dirname}/`

const dir = require(`${global.baseDir}global-dirs`)
const config = require(`${dir.configs}config-settings`)
const logger = require(`${dir.utils}logger`)

const lifxApi = 'https://api.lifx.com/'
const headers = {
	Authorization: `Bearer ${config.getApiToken()}`,
	'Content-Type': 'application/json',
}

const getCycles = () => Math.ceil(Math.random() * 3)
const getPeriod = () => 1

const doScaryLightFlash = colorSet => (
	fetch(
		`${lifxApi}v1/lights/${config.getLifxSelector()}:random/effects/breathe`,
		{
			body: (
				JSON.stringify({
					...colorSet,
					cycles: getCycles(),
					period: getPeriod(),
					// peak: 0,
					// power_on: false,
				})
			),
			headers,
			method: 'POST',
		}
	)
)

const getDataFromPromise = promise => (
	Rx.Observable
	.fromPromise(
		promise
		.then(response => response.json())
	)
)

const colors = {
	orange: 'hue:38 saturation:1.0 brightness:1.0',
	orangeDark: 'hue:38 saturation:1.0 brightness:0.3',
	purple: 'hue:278 saturation:1.0 brightness:1.0',
	purpleDark: 'hue:278 saturation:1.0 brightness:0.3',
}

const colorSets = [{
	color: colors.orangeDark,
	from_color: colors.orange,
}, {
	color: colors.purpleDark,
	from_color: colors.purple,
}]

const getRandomColorSet = () => colorSets[Math.floor(Math.random() * 2)]

Rx.Observable
.interval(10000)
.map(getRandomColorSet)
.map(doScaryLightFlash)
.switchMap(getDataFromPromise)
.subscribe(logger.log, logger.logError)
