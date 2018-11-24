const fetch = require('node-fetch')
const { from, pipe } = require('rxjs')
const { map, switchMap } = require('rxjs/operators')

const config = require('$config')
const getRandomIndexFromItemCount = require('./getRandomIndexFromItemCount')
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

const lifxEndpoint = `${lifxApi}v1/lights/${config.getLifxSelector()}:random/effects/breathe`

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

const getDataFromPromise = (
	promise,
) => (
	from(
		promise
		.then(response => (
			response
			.json()
		))
	)
)

const colors = {
	orange: 'hue:43 saturation:1.0 brightness:1.0',
	orangeDark: 'hue:43 saturation:1.0 brightness:0.3',
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

const getColorSetAtIndex = (
	index,
) => (
	colorSets[index]
)

const getRandomColorSetIndex = () => (
	getRandomIndexFromItemCount(
		colorSets.length,
	)
)

const flashRandomLight = () => (
	pipe(
		map(getRandomColorSetIndex),
		map(getColorSetAtIndex),
		map(doScaryLightFlash),
		switchMap(getDataFromPromise),
	)
)

module.exports = flashRandomLight
