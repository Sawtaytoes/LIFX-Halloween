const config = require('$config')
const errorWrapper = require('./errorWrapper')
const lifxApi = require('./lifxApi')

const headers = {
	Authorization: `Bearer ${config.getApiToken()}`,
	'Content-Type': 'application/json',
}

const createGetLightsInSelection = (
	ajaxFetcher,
) => (
	lifxSelector,
) => () => (
	errorWrapper(
		(
			!lifxSelector
			|| typeof lifxSelector !== 'string'
		),
		"`lifxSelector` needs to be a valid LIFX selector string in `createGetLightsInSelection`."
	)(
		ajaxFetcher(
			(
				lifxApi
				.concat('/v1')
				.concat('/lights')
				.concat(`/${lifxSelector}`)
			),
			{
				headers,
				method: 'GET',
			}
		)
		.then((
			response,
		) => (
			response
			.json()
		))
	)
)

module.exports = createGetLightsInSelection
