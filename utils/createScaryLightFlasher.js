const config = require('$config')
const errorWrapper = require('./errorWrapper')
const lifxApi = require('./lifxApi')

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

const createScaryLightFlasher = (
	ajaxFetcher,
) => (
	lifxSelector,
) => (
	colorSet = {},
) => (
	errorWrapper(
		(
			!lifxSelector
			|| typeof lifxSelector !== 'string'
		),
		"`lifxSelector` needs to be a valid LIFX selector string in `createScaryLightFlasher`."
	)(
		ajaxFetcher(
			(
				lifxApi
				.concat('/v1')
				.concat('/lights')
				.concat(`/${lifxSelector}`)
				.concat(':random/effects/breathe')
			),
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
)

module.exports = createScaryLightFlasher
