const fetch = require('node-fetch')

const config = require('$config')
const lifxApi = require('./lifxApi')

const lifxEndpoint = (
	lifxApi
	.concat('/v1')
	.concat('/lights')
	.concat(`/${config.getLifxSelector()}`)
	.concat(':random/effects/breathe')
)

const headers = {
	Authorization: `Bearer ${config.getApiToken()}`,
	'Content-Type': 'application/json',
}

const getCycles = () => (
	Math
	.ceil(
		Math
		.random() * 3
	)
)

const getPeriod = () => 1

const doScaryLightFlash = (
	colorSet,
) => (
	fetch(
		lifxEndpoint,
		{
			body: (
				JSON.stringify({
					...colorSet,
					cycles: getCycles(),
					period: getPeriod(),
				})
			),
			headers,
			method: 'POST',
		}
	)
)

module.exports = doScaryLightFlash
