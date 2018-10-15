const errorWrapper = require('./errorWrapper')

const getRandomIndexFromItemCount = (
	numberOfItems,
	dependencies = {},
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
			(dependencies.randomizer || Math.random)() * numberOfItems
		)
	)
)

module.exports = getRandomIndexFromItemCount
