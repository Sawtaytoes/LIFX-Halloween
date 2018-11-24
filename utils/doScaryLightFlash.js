const fetch = require('node-fetch')

const createScaryLightFlasher = require('./createScaryLightFlasher')

const doScaryLightFlash = (
	createScaryLightFlasher(
		fetch
	)
)

module.exports = doScaryLightFlash
