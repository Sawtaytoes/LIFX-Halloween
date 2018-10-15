require('../directory')

const assert = require('assert')
const http = require('http')
const httpProxy = require('http-proxy')
const Rx = require('rxjs/Rx')

const config = require('configs')
const flashRandomLight = require('./flashRandomLight')
const lifxApi = require('./lifxApi')

const portNumber = 3000

const createHttpProxyServer = () => (
	new httpProxy
	.createProxyServer({
		host: 'localhost',
		port: portNumber,
		target: `${lifxApi}v1/lights/${config.getLifxSelector()}:random/effects/breathe`
	})
)

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

		testComplete()
	},

	(
		testComplete,
		testFailed,
	) => {
		const httpProxyServer = (
			createHttpProxyServer()
			.on(
				'error',
				testFailed,
			)
		)

		const httpServer = (
			http
			.createServer((
				req,
				res,
			) => {
				console.log(req)

				res
				.end()

				new Promise(
					httpProxyServer
					.close
					.bind(httpProxyServer)
				)
				.then(() => (
					new Promise(
						httpServer
						.close
						.bind(httpServer)
					)
				))
				.then(testComplete)
			})
		)

		httpServer
		.listen(portNumber)

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
