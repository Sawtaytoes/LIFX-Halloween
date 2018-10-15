const throwError = require('./throwError')

const errorWrapper = (
	hasError,
	errorMessage,
) => (
	value,
) => (
	hasError
	? throwError(errorMessage)
	: value
)

module.exports = errorWrapper
