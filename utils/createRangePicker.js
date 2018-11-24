const errorWrapper = require('./errorWrapper')

const createRangePicker = (
	getMultiplier = () => 1,
) => (
	upperBound,
) => (
	errorWrapper(
		(
			!upperBound
			|| upperBound === 0
		),
		"Need to pass a number greater than `0` for `upperBound` in `createRangePicker`.",
	)(
		Math
		.floor(
			upperBound * getMultiplier()
		)
	)
)

module.exports = createRangePicker
