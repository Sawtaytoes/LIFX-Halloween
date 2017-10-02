const dir = require(`${global.baseDir}global-dirs`)
let configCustom = {}
try {
	configCustom = require(`${dir.configs}config`)
} catch (e) {
	// Do Nothing
}

const configDefaults = {
	apiToken: '',
	env: 'production',
	lifxSelector: ''
}

const configEnv = {
	apiToken: process.env.API_TOKEN,
	env: process.env.NODE_ENV,
	lifxSelector: process.env.LIFX_SELECTOR,
}

Object.keys(configEnv)
.forEach(key => typeof configEnv[key] === 'undefined' && delete configEnv[key])

const config = Object.assign({}, configDefaults, configEnv, configCustom)
config.port = Number(config.port)

module.exports = {
	isDev: () => config.env === 'development',
	isProd: () => config.env === 'production',

	getApiToken: () => config.apiToken,
	getEnv: () => config.env,
	getLifxSelector: () => config.lifxSelector,
}
