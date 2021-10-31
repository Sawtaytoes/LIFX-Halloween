const fetch = require('node-fetch')

const createGetLightsInSelection = require('./createGetLightsInSelection')

const getLightsInSelection = (
	createGetLightsInSelection(
		fetch
	)
)

module.exports = getLightsInSelection
