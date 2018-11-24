const colorSets = require('./colorSets')
const pluckRandomNumberFromRange = require('./pluckRandomNumberFromRange')

const getRandomColorSetIndex = () => (
	pluckRandomNumberFromRange(
		colorSets.length,
	)
)

module.exports = getRandomColorSetIndex
