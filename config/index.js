const fs = require('fs')

let configCustom = {}

try {
	const rootPath = (
		fs
		.realpathSync(
			process.cwd()
		)
	)

	configCustom = require(`${rootPath}/localConfig`)
}
catch (exception) {
	// Do Nothing
}

const configDefaults = {
	apiToken: '',
	lifxSelector: '',
	nodeEnv: 'development',
}

const configEnv = {
	apiToken: process.env.API_TOKEN,
	lifxSelector: process.env.LIFX_SELECTOR,
	nodeEnv: process.env.NODE_ENV,
}

Object
.keys(configEnv)
.forEach(key => (
	typeof configEnv[key] === 'undefined'
	&& delete configEnv[key]
))

const combinedConfig = (
	Object
	.assign(
		{},
		configDefaults,
		configEnv,
		configCustom,
	)
)

const config = {
	isDev: () => combinedConfig.nodeEnv === 'development',
	isProd: () => combinedConfig.nodeEnv === 'production',

	getApiToken: () => combinedConfig.apiToken,
	getEnv: () => combinedConfig.nodeEnv,
	getLifxSelector: () => combinedConfig.lifxSelector,
}

module.exports = config
