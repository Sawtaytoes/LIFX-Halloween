const test = require('ava')

const createRangePicker = require('./createRangePicker')

test('No Upper Bound', t => {
	t.throws(
		createRangePicker(),
		Error,
		"With no upper bound, throws an error."
	)
})

test('Upper Bound of 0', t => {
	const zeroUpperBound = (
		() => (
			createRangePicker()(0)
		)
	)

	t.throws(
		zeroUpperBound,
		Error,
		"With an upper bound of zeros, throws an error."
	)
})

test('Mulitiplier is Optional', t => {
	const value = (
		createRangePicker()(
			2,
		)
	)

	t.is(
		value,
		2,
		"With no multiplier, value is itself."
	)
})

test('Upper Bound of 1', t => {
	const value = (
		createRangePicker(
			() => 1,
		)(
			1,
		)
	)

	t.is(
		value,
		1,
		"With an upper bound of 1 and a multiplier of 1, the value is 1."
	)
})

test('Upper Bound of 1 and Float Multiplier', t => {
	const value = (
		createRangePicker(
			() => 1.0,
		)(
			1,
		)
	)

	t.is(
		value,
		1,
		"With an upper bound of one and a floating multiplier of 1.0, the value is 1."
	)
})

test('Upper Bound of 10 and a Float Multiplier', t => {
	const value = (
		createRangePicker(
			() => 0.2,
		)(
			10,
		)
	)

	t.is(
		value,
		2,
		"With an upper bound of 10 and a multiplier of 2, the value is 2."
	)
})

test('Upper Bound of 10 with Incorrect Multiplier', t => {
	const value = (
		createRangePicker(
			() => 2,
		)(
			10,
		)
	)

	t.is(
		value,
		20,
		"With an upper bound of 10 and a multiplier of 2, the value is 20."
	)
})

test('Multiplier is able to be random', t => {
	const value = (
		createRangePicker(
			Math.random,
		)(
			2,
		)
	)

	t.true(
		typeof value === 'number',
		"With a random multiplier, we get a random number."
	)
})
