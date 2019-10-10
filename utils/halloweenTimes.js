const { differenceInMilliseconds, getYear } = require('date-fns/fp')

const getHalloweenEndTime = (
	date = new Date(),
) => (
	new Date(
		`${getYear(date)}-10-31 22:30`
	)
)

const getHalloweenStartTime = (
	date = new Date(),
) => (
	new Date(
		`${getYear(date)}-10-31 16:00`
	)
)

const getTimeUntilHalloweenEnds = (
	date = new Date(),
) => (
	differenceInMilliseconds(
		getHalloweenEndTime(
			date,
		)
	)(
		date,
	)
)

const getTimeUntilHalloweenStarts = (
	date = new Date(),
) => (
	differenceInMilliseconds(
		getHalloweenStartTime(
			date,
		)
	)(
		date,
	)
)

module.exports = {
	getHalloweenEndTime,
	getHalloweenStartTime,
	getTimeUntilHalloweenEnds,
	getTimeUntilHalloweenStarts,
}
