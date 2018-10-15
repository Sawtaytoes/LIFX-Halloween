const test = require('ava')

const getRandomIndexFromItemCount = require('./getRandomIndexFromItemCount')

test('Zero Items', t => {
	const value = (
		getRandomIndexFromItemCount({
			numberOfItems: 0,
			randomizer: () => 1,
		})
	)

	t.is(
		value,
		0,
		"With no items, the value is 0."
	)
})

test('One Item', t => {
	const value = (
		getRandomIndexFromItemCount({
			numberOfItems: 1,
			randomizer: () => 1,
		})
	)

	t.is(
		value,
		1,
		"With one item and a randomizer of 1, the value is 1."
	)
})

test('One Item and Float Randomizer', t => {
	const value = (
		getRandomIndexFromItemCount({
			numberOfItems: 1,
			randomizer: () => 1.0,
		})
	)

	t.is(
		value,
		1,
		"With one item and a floating randomzier of 1.0, the value is 1."
	)
})

test('Ten Items and a Float Randomizer', t => {
	const value = (
		getRandomIndexFromItemCount({
			numberOfItems: 10,
			randomizer: () => 0.2,
		})
	)

	t.is(
		value,
		2,
		"With ten items and a randomizer at 2, the value is 2."
	)
})

test('Ten Items with Incorrect Randomizer', t => {
	const value = (
		getRandomIndexFromItemCount({
			numberOfItems: 10,
			randomizer: () => 2,
		})
	)

	t.is(
		value,
		20,
		"With ten items and a randomizer at 2, the value is 20."
	)
})

test('Randomizer is Optional', t => {
	const value = (
		getRandomIndexFromItemCount({
			numberOfItems: 2,
		})
	)

	t.true(
		typeof value === 'number',
		"With no randomizer, we get a random number."
	)
})
