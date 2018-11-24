const { getYear } = require('date-fns/fp')

const getHalloweenEndTime = (
	date = new Date(),
) => (
	new Date(
		`${getYear(date)}-10-31 16:00`
	)
)

const getHalloweenStartTime = (
	date = new Date(),
) => (
	new Date(
		`${getYear(date)}-10-31 16:00`
	)
)

module.exports = {
	getHalloweenEndTime,
	getHalloweenStartTime,
}
