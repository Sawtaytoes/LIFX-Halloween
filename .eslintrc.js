const { resolve } = require('path')

module.exports = {
	extends: [
		'@ghadyani-framework/node',
	],
	settings: {
		'import/resolver': {
			alias: [
				['$config', resolve(__dirname, 'config')],
				['$utils', resolve(__dirname, 'utils')],
			],
		}
	},
}
