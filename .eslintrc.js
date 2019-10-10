const { resolve } = require('path')

module.exports = {
	extends: [
		'@ghadyani-eslint/node',
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
