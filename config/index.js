let configCustom = {}

try {
	configCustom = require('$root/localConfig')
}
catch (e) {
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

const config = (
	Object
	.assign(
		{},
		configDefaults,
		configEnv,
		configCustom,
	)
)

config
.port = Number(config.port)

module.exports = {
	isDev: () => config.nodeEnv === 'development',
	isProd: () => config.nodeEnv === 'production',

	getApiToken: () => config.apiToken,
	getEnv: () => config.nodeEnv,
	getLifxSelector: () => config.lifxSelector,
}
