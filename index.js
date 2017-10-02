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

const spookyLightInterval = 10000

const getCycles = () => Math.ceil(Math.random() * 3)
const getPeriod = () => Math.random()

const doScaryLightFlash = () => (
	fetch(
		`${lifxApi}v1/lights/${config.getLifxSelector()}:random/effects/breathe`,
		{
			body: (
				JSON.stringify({
					// hue:120 saturation:1.0 brightness:0.5
					color: 'purple',
					cycles: getCycles(),
					from_color: 'orange',
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

Rx.Observable
.interval(spookyLightInterval)
.map(doScaryLightFlash)
.switchMap(getDataFromPromise)
.subscribe(logger.log, logger.logError)
