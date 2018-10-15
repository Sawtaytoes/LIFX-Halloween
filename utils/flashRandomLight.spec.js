require('../directory')

const { of } = require('rxjs')

const flashRandomLight = require('./flashRandomLight')

const integrationTests = [
	testComplete => {
		console
		.info("Executing 'is not Halloween' test.")

		const subscriber = (
			of(false)
			.pipe(
				flashRandomLight(),
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

	testComplete => {
		console
		.info("Executing 'is Halloween' test.")

		const subscriber = (
			of(true)
			.pipe(
				flashRandomLight(),
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
