const test = require('ava')

const isDuringHalloweenNight = require('./isDuringHalloweenNight')

test('Incorrect Date', t => {
	const value = (
		isDuringHalloweenNight(
			new Date('2018-10-01')
		)
	)

	t.false(
		value,
		"Date isn't during Halloween."
	)
})

test('Correct Date Without Time', t => {
	const value = (
		isDuringHalloweenNight(
			new Date('2018-10-31')
		)
	)

	t.false(
		value,
		"Date isn't during Halloween night."
	)
})

test('Correct Date With Incorrect Time', t => {
	const value = (
		isDuringHalloweenNight(
			new Date('2018-10-31 10:00')
		)
	)

	t.false(
		value,
		"Date is during Halloween, but too early."
	)
})

test('Correct Date With Correct Time', t => {
	const value = (
		isDuringHalloweenNight(
			new Date('2018-10-31 22:00')
		)
	)

	t.true(
		value,
		"Date is during Halloween."
	)
})

test('Optionally Takes a Date', t => {
	t.notThrows(
		() => isDuringHalloweenNight(),
		"Doesn't throw an error when no date is passed."
	)
})
