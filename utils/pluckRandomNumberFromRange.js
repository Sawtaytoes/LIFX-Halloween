const createRangePicker = require('./createRangePicker')

const pluckRandomNumberFromRange = (
	createRangePicker(
		Math.random
	)
)

module.exports = pluckRandomNumberFromRange
