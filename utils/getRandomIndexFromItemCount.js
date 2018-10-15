const errorWrapper = require('./errorWrapper')

const getRandomIndexFromItemCount = (
	numberOfItems,
	dependencies = {
		randomizer: Math.random,
	},
) => (
	errorWrapper(
		(
			!numberOfItems
			|| numberOfItems === 0
		),
		"Need to pass a number of items to `getRandomIndexFromItemCount`.",
	)(
		Math
		.floor(
			dependencies
			.randomizer() * numberOfItems
		)
	)
)

module.exports = getRandomIndexFromItemCount
