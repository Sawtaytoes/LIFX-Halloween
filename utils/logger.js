const config = require('$config')

const noop = () => {}

const log = config.isDev() ? console.log : noop
const logError = config.isDev() ? err => console.error(err) : noop

module.exports = {
	log,
	logError,
}
