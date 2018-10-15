const { getYear, isWithinInterval } = require('date-fns/fp')

const isDuringHalloweenNight = (
	date,
) => (
	isWithinInterval({
		end: (
			new Date(
				`${getYear(date)}-10-31 23:30`
			)
		),
		start: (
			new Date(
				`${getYear(date)}-10-31 16:00`
			)
		),
	})(
		date,
	)
)

module.exports = isDuringHalloweenNight
