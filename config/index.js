const fs = require('fs')

let customConfig = {}

try {
	const rootPath = (
		fs
		.realpathSync(
			process.cwd()
		)
	)

	customConfig = require(`${rootPath}/localConfig`)
}
catch (exception) {
	// Do Nothing
}

const defaultConfig = {
	apiToken: '',
	halloweenEndTime: '10-31 22:30',
	halloweenStartTime: '10-31 16:00',
	lifxSelector: '',
	nodeEnv: 'development',
}

const envConfig = {
	apiToken: process.env.API_TOKEN,
	halloweenEndTime: process.env.HALLOWEEN_END_TIME,
	halloweenStartTime: process.env.HALLOWEEN_START_TIME,
	lifxSelector: process.env.LIFX_SELECTOR,
	nodeEnv: process.env.NODE_ENV,
}

Object
.keys(envConfig)
.forEach(key => (
	typeof envConfig[key] === 'undefined'
	&& delete envConfig[key]
))

const combinedConfig = (
	Object
	.assign(
		{},
		defaultConfig,
		envConfig,
		customConfig,
	)
)

const config = {
	isDev: () => combinedConfig.nodeEnv === 'development',
	isProd: () => combinedConfig.nodeEnv === 'production',

	getApiToken: () => combinedConfig.apiToken,
	getEnv: () => combinedConfig.nodeEnv,
	getLifxSelector: () => combinedConfig.lifxSelector,
	getHalloweenEndTime: () => combinedConfig.halloweenEndTime,
	getHalloweenStartTime: () => combinedConfig.halloweenStartTime,
}

module.exports = config
