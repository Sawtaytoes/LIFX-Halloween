# LIFX Halloween
Flash a random light in a Group of LIFX bulbs during Halloween.

## Configuration
There are two options for configuration your project to work with `lifx-halloween`. The first option is a local config file, the other is environment variables.

### Passing Config Vars

#### Local Config File
Create a `localConfig.js` file in your project's root directory with these contents:
```js
module.exports = {
	apiToken: 'c180e4553d9b3d61a0536055555a7d96dba3cea4154b171b5522b915a572b86f',
	lifxSelector: 'group:Front Porch',

	// Optional
	halloweenStartTime: '10-31 16:00',
	halloweenEndTime: '10-31 22:30',
}
```

#### Required
- `apiToken`
- `lifxSelector`

#### Optional
- `halloweenStartTime`
- `halloweenEndTime`

#### Environment Variables
Instead of creating a local config file, you might be hosting this project online. If you do that, you'll want to use environment variables instead.

#### Required
- `API_TOKEN`
- `LIFX_SELECTOR`

#### Optional
- `HALLOWEEN_START_TIME`
- `HALLOWEEN_END_TIME`

### Config Vars

#### API Token
- **Local Config File:** `apiToken`
- **Environment Variable:** `API_TOKEN`

Your LIFX API token from https://cloud.lifx.com/settings. It should look something like this:
```
c180e4553d9b3d61a0536055555a7d96dba3cea4154b171b5522b915a572b86f
```

#### LIFX Selector
- **Local Config File:** `lifxSelector`
- **Environment Variable:** `LIFX_SELECTOR`

Whatever you change this to will be the light or group of lights to randomly flash.

The value is a [LIFX HTTP API selector](https://api.developer.lifx.com/v1/docs/selectors).

For simplicity, you can simply follow these guidelines:

- For group, use `group:Group Name`.
- For light, use `label:Light Name`.
- For all lights, use `all`.

#### Start and End Times
- **Local Config File:** `halloweenStartTime`
- **Local Config File:** `halloweenEndTime`
- **Environment Variable:** `HALLOWEEN_START_TIME`
- **Environment Variable:** `HALLOWEEN_END_TIME`

The format is `MM-DD hh:mm` such as `10-31 16:00`. The month, date, then the time in 24h military format.

These values include the start and end times for when random light flickering occurs. Currently, this package does not support executing daily during a set time period. You can always create a PR or write your own code to handle this use case in your own project.

## Example Usage
### Simple Version
This example checks every 10 seconds to see if it's currently Halloween night between 4:00p and 10:30p on October 31st. If it is, it randomly flashes a light in those 10 second intervals.

```js
const { filter, map, startWith } = require('rxjs/operators')
const { interval } = require('rxjs')

const { config, flashRandomLight, isDuringHalloweenNight } = require('./')

interval(10000)
.pipe(
	startWith(0),
	map(isDuringHalloweenNight),
	filter(Boolean),
	flashRandomLight(
		config
		.getLifxSelector()
	),
)
.subscribe(
	console.log,
	console.error,
)
```

### Advanced Version
See [app.js](https://github.com/Sawtaytoes/LIFX-Halloween/blob/master/app.js) for what I'm using on my home.

This version is set to run indefinitely. It will set a timeout from now until Halloween at 4:00p, then it will run, flashing a random light at a random time interval until 10:30p. Afterward, it sets a new timer to wait until next Halloween.

## API

### Functions

#### `flashRandomLight`
Flashes a random light in the provided LIFX selector.

#### `getTimeUntilHalloweenEnds`
Get the time remaining in milliseconds until Halloweens ends from the optionally given date.

#### `getTimeUntilHalloweenStarts`
Get the time remaining in milliseconds until Halloweens starts from the optionally given date.

#### `isDuringHalloweenNight`
Returns a boolean if it's Halloween night.

## This Project

When developing this package locally, use:
```shell
yarn start
```

For testing, use:
```shell
yarn test:watch
```
