# LIFX Halloween
Flash a random light in a Group of LIFX bulbs during Halloween.

# Configuration

## Local Config File

Create a `localConfig.js` file in your project's root directory with these contents:
```js
module.exports = {
	apiToken: 'c180e4553d9b3d61a0536055555a7d96dba3cea4154b171b5522b915a572b86f',
	lifxSelector: 'group:Front Porch',
}
```

### `apiToken`
You'll want to change this to one for your account at https://cloud.lifx.com/settings.

### `lifxSelector`
This should match the group name of the lights you want to randomly flash. If you want to flash a single like, use `label:Front Door` or similar for your light name.

## Environment Variables

### `API_TOKEN`
Your LIFX API token from https://cloud.lifx.com/settings. It should look something like this:
```
c180e4553d9b3d61a0536055555a7d96dba3cea4154b171b5522b915a572b86f
```

### `LIFX_SELECTOR`
Your LIFX group or light.

# Example Usage
See [app.js](https://github.com/Sawtaytoes/LIFX-Halloween/blob/master/app.js) for the latest working example.

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

# Run this Project Itself

If developing this package locally, use:
```shell
yarn start
```
