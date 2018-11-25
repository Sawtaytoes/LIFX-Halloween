require('../directory')

const config = require('$config')
const { of } = require('rxjs')

const flashRandomLight = require('./flashRandomLight')

const reproducibleManualTests = [
	testComplete => {
		console
		.info("Executing 'is not Halloween' test.")

		const subscriber = (
			of(false)
			.pipe(
				flashRandomLight(
					config
					.getLifxSelector()
				),
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
				flashRandomLight(
					config
					.getLifxSelector()
				),
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

reproducibleManualTests
.reduce(
	(
		promise,
		reproducibleManualTest,
	) => (
		promise
		.then(() => (
			new Promise(
				reproducibleManualTest
			)
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
