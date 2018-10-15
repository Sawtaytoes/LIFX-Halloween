require('../directory')

const assert = require('assert')
const evilDns = require('evil-dns')
const http = require('http')
const https = require('https')
const Rx = require('rxjs/Rx')

const config = require('configs')
const flashRandomLight = require('./flashRandomLight')
const lifxApi = require('./lifxApi')

const portNumber = 443

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
		evilDns
		.add(
			'api.lifx.com',
			'127.0.0.1',
		)

		const httpServer = (
			https
			.createServer((
				req,
				res,
			) => {
				console.log('hi')
				// console.log(req)

				// req
				// .on('data', function (data) {
				// 	body += data;
				// 	console.log("Partial body: " + body);
				// })
				// req
				// .on('end', function () {
				// 	console.log("Body: " + body);
				// })

				res
				.writeHead(
					200,
					{ 'Content-Type': 'application/json' }
				)

				res
				.end('{}')

				new Promise(
					httpServer
					.close
					.bind(httpServer)
				)
				.then(() => {
					evilDns
					.clear()
				})
				.then(testComplete)
			})
		)

		httpServer
		.addListener('connect', function (req, socket, bodyhead) {
			console.log('herekljerj')
		})
		.addListener('socket', function (req, socket, bodyhead) {
			console.log('herekljerj')
		})
		httpServer
		.listen(
			portNumber,
			error => {
				error
				&& testFailed(error)

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

				// require('node-fetch')('http://api.lifx.com:443')
				require('node-fetch')('https://api.lifx.com')
			}
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
