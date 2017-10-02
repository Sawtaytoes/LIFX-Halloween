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

const getLights = selector => (
	// Promise.resolve({ json: () => Promise.resolve([{
	// 	id: 'd073d52390ab',
	// }, {
	// 	id: 'd073d52346e8',
	// }, {
	// 	id: 'd073d522ef06',
	// }]) })
	fetch(
		`${lifxApi}v1/lights/${selector}`,
		{
			headers,
			method: 'GET',
		}
	)
)

const getRandomLightIndex = lights => Math.floor(Math.random() * lights.length)

const getLightId = lights => index => lights[index].id

const doScaryLightFlash = lightId => (
	// Promise.resolve({ json: () => Promise.resolve(lightId) })
	fetch(
		`${lifxApi}v1/lights/id:${lightId}/effects/breathe`,
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

const startSpookyLights = lights => (
	Rx.Observable
	.interval(spookyLightInterval)
	.switchMapTo(
		Rx.Observable
		.of(lights)
		.map(getRandomLightIndex)
		.map(getLightId(lights))
	)
	.map(doScaryLightFlash)
	.switchMap(getDataFromPromise)
	.subscribe(logger.log, logger.logError)
)

Rx.Observable
.of(config.getLifxSelector())
.map(getLights)
.switchMap(getDataFromPromise)
.subscribe(startSpookyLights)
