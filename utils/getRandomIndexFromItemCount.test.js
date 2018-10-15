const test = require('ava')

const getRandomIndexFromItemCount = require('./getRandomIndexFromItemCount')

test('No Item Count', t => {
	t.throws(
		getRandomIndexFromItemCount,
		Error,
		"With no item count, throws an error."
	)
})

test('Zero Items', t => {
	t.throws(
		getRandomIndexFromItemCount,
		Error,
		"With zero items, throws an error."
	)
})

test('One Item', t => {
	const value = (
		getRandomIndexFromItemCount(
			1,
			{ randomizer: () => 1 }
		)
	)

	t.is(
		value,
		1,
		"With one item and a randomizer of 1, the value is 1."
	)
})

test('One Item and Float Randomizer', t => {
	const value = (
		getRandomIndexFromItemCount(
			1,
			{ randomizer: () => 1.0 }
		)
	)

	t.is(
		value,
		1,
		"With one item and a floating randomzier of 1.0, the value is 1."
	)
})

test('Ten Items and a Float Randomizer', t => {
	const value = (
		getRandomIndexFromItemCount(
			10,
			{ randomizer: () => 0.2 }
		)
	)

	t.is(
		value,
		2,
		"With ten items and a randomizer at 2, the value is 2."
	)
})

test('Ten Items with Incorrect Randomizer', t => {
	const value = (
		getRandomIndexFromItemCount(
			10,
			{ randomizer: () => 2 }
		)
	)

	t.is(
		value,
		20,
		"With ten items and a randomizer at 2, the value is 20."
	)
})

test('Randomizer is Optional', t => {
	const value = (
		getRandomIndexFromItemCount(
			2,
		)
	)

	t.true(
		typeof value === 'number',
		"With no randomizer, we get a random number."
	)
})
