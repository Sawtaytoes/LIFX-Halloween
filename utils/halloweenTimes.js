const { differenceInMilliseconds, getYear } = require('date-fns/fp')

const config = require('$config')

const getHalloweenEndTime = (
	date = new Date(),
) => (
	new Date(
		`${getYear(date)}-${config.getHalloweenEndTime()}`
	)
)

const getHalloweenStartTime = (
	date = new Date(),
) => (
	new Date(
		`${getYear(date)}-${config.getHalloweenStartTime()}`
	)
)

const getTimeUntilHalloweenEnds = (
	date = new Date(),
) => (
	differenceInMilliseconds(
		date,
	)(
		getHalloweenEndTime(
			date,
		)
	)
)

const getTimeUntilHalloweenStarts = (
	date = new Date(),
) => (
	differenceInMilliseconds(
		date,
	)(
		getHalloweenStartTime(
			date,
		)
	)
)

module.exports = {
	getHalloweenEndTime,
	getHalloweenStartTime,
	getTimeUntilHalloweenEnds,
	getTimeUntilHalloweenStarts,
}
