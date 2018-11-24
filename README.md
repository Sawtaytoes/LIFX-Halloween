# LIFX Halloween
Flash a random light in a Group of LIFX bulbs during Halloween.

```shell
yarn start
```

# API

## Functions

### `flashRandomLight`
Flashes a random light in the provided LIFX selector.

### `isDuringHalloweenNight`
Returns a boolean if it's Halloween night.

## Example

```js
const { interval } = require('rxjs')
const { filter, map, tap } = require('rxjs/operators')

const {
	flashRandomLight,
	isDuringHalloweenNight,
} = require('lifx-halloween')

interval(10000)
.pipe(
	map(isDuringHalloweenNight),
	tap(isDuringHalloweenNight => (
		console
		.info(
			'isDuringHalloweenNight:',
			isDuringHalloweenNight,
		)
	)),
	filter(Boolean),
	flashRandomLight(
		config.getLifxSelector()
	),
)
.subscribe(
	console.log,
	console.error,
)
```
