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


const doScaryLightFlash = () => (
	// Promise.resolve({ json: () => Promise.resolve(lightId) })
	fetch(
		`${lifxApi}v1/lights/${config.getLifxSelector()}:random/effects/breathe`,
		{
			body: (
				JSON.stringify({
					color: 'purple',
					cycles: 2,
					from_color: 'orange',
					period: 0.5,
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
