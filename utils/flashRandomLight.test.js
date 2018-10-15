require('../directory')

const assert = require('assert')
const Rx = require('rxjs/Rx')

const config = require('configs')
const flashRandomLight = require('./flashRandomLight')
const lifxApi = require('./lifxApi')

const integrationTests = [
	testComplete => {
		const subscriber = (
			flashRandomLight(
				Rx
				.Observable
				.of(false)
			)
			.subscribe(console.log)
		)

		subscriber
		.unsubscribe()

		setTimeout(
			testComplete,
			2000,
		)
	},

	(
		testComplete,
		testFailed,
	) => {
		const subscriber = (
			flashRandomLight(
				Rx
				.Observable
				.of(true)
			)
			.subscribe(console.log)
		)

		subscriber
		.unsubscribe()

		setTimeout(
			testComplete,
			2000,
		)
	},
]

integrationTests
.reduce(
	(
		promise,
		integrationTest,
	) => (
		promise
		.then(() => (
			new Promise(integrationTest)
		))
	),
	(
		Promise
		.resolve()
	),
)
.then(() => {
	console
	.log('All tests completed successfully!')
})
.catch(error => {
	console
	.error(error)
})
