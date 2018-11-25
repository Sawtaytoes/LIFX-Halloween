# LIFX Halloween
Flash a random light in a Group of LIFX bulbs during Halloween.

```shell
yarn start
```

# API

## Functions

### `flashRandomLight`
Flashes a random light in the provided LIFX selector.

### `getTimeUntilHalloweenEnds`
Get the time remaining in milliseconds until Halloweens ends from the optionally given date.

### `getTimeUntilHalloweenStarts`
Get the time remaining in milliseconds until Halloweens starts from the optionally given date.

### `isDuringHalloweenNight`
Returns a boolean if it's Halloween night.

## Example
See [app.js](./app.js) for the latest working example.

### Simpler Version

```js
const { interval } = require('rxjs')
const { filter, map, tap } = require('rxjs/operators')

const config = require('$config')

const {
	flashRandomLight,
	isDuringHalloweenNight,
} = require('./')

interval(10000)
.pipe(
	map(isDuringHalloweenNight),
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
