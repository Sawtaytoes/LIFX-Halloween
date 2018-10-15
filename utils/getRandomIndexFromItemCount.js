const getRandomIndexFromItemCount = ({
	numberOfItems = 0,
	randomizer = Math.random,
}) => (
	Math
	.floor(
		randomizer() * numberOfItems
	)
)

module.exports = getRandomIndexFromItemCount
