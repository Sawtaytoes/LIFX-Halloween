require('app-module-path').addPath(__dirname)

const moment = require('moment')

const currentYear = moment().format('YYYY')

const isHalloween = () => (
	moment()
	.isBetween(
		`${currentYear}-10-31 16:00`,
		`${currentYear}-10-31 23:30`
	)
)

module.exports = isHalloween
