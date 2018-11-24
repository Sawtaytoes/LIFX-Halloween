const fetchMock = require('fetch-mock')
const test = require('ava')

require('../directory')

const createScaryLightFlasher = require('./createScaryLightFlasher')

const { Response } = fetchMock.config

test('Successful HTTP Response', t => {
	const expectedResponse = (
		new Response(
			JSON.stringify({}),
			{ status: 202 },
		)
	)

	const mockFetchPromise = (
		createScaryLightFlasher(
			fetchMock
			.sandbox()
			.mock(
				'*',
				expectedResponse,
			)
		)(
			'all',
		)()
	)

	return (
		mockFetchPromise
		.then(response => {
			t.is(
				response.status,
				202,
				"Response status is 202."
			)

			t.is(
				response,
				expectedResponse,
				"Response value matches expected."
			)

			return response
		})
		.then(response => (
			response
			.json()
		))
	)
})

test('Failing HTTP Response', t => {
	const expectedResponse = (
		new Response(
			'',
			{ status: 400 },
		)
	)

	const mockFetchPromise = (
		createScaryLightFlasher(
			fetchMock
			.sandbox()
			.mock(
				'*',
				expectedResponse,
			)
		)(
			'all',
		)()
	)

	return (
		mockFetchPromise
		.then(response => {
			t.is(
				response.status,
				400,
				"Response status is 400."
			)

			t.is(
				response,
				expectedResponse,
				"Response value matches expected."
			)

			return response
		})
	)
})
