const { isWithinInterval } = require('date-fns/fp')

const {
	getHalloweenEndTime,
	getHalloweenStartTime,
} = require('./halloweenTimes')

const isDuringHalloweenNight = (
	date = new Date(),
) => (
	isWithinInterval({
		end: (
			getHalloweenEndTime(
				date
			)
		),
		start: (
			getHalloweenStartTime(
				date
			)
		),
	})(
		date,
	)
)

module.exports = isDuringHalloweenNight
