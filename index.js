require('app-module-path').addPath(__dirname)

const fetch = require('node-fetch')
const moment = require('moment')
const Rx = require('rxjs/Rx')

const config = require('configs')
const logger = require('utils/logger')

const lifxApi = 'https://api.lifx.com/'
const headers = {
	Authorization: `Bearer ${config.getApiToken()}`,
	'Content-Type': 'application/json',
}

const getCycles = () => Math.ceil(Math.random() * 3)
const getPeriod = () => 1

const lifxEndpoint = `${lifxApi}v1/lights/${config.getLifxSelector()}:random/effects/breathe`

const doScaryLightFlash = colorSet => (
	fetch(
		lifxEndpoint,
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

const getColorSetAtIndex = index => colorSets[index]

const getRandomColorSetIndex = () => (
	Math.floor(
		Math.random() * colorSets.length
	)
)

const currentYear = moment().format('YYYY')

const isHalloween = () => (
	moment()
	.isBetween(
		`${currentYear}-10-31 16:00`,
		`${currentYear}-10-31 23:30`
	)
)

Rx.Observable
.interval(10000)
.map(isHalloween)
.do(console.log.bind(console, 'isHalloween:'))
.filter(Boolean)
.map(getRandomColorSetIndex)
.map(getColorSetAtIndex)
.map(doScaryLightFlash)
.switchMap(getDataFromPromise)
.subscribe(logger.log, logger.logError)
