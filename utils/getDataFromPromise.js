const { from } = require('rxjs')

const getDataFromPromise = (
	promise,
) => (
	from(
		promise
		.then(response => (
			response
			.json()
		))
	)
)

module.exports = getDataFromPromise
