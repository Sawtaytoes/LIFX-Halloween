const colors = {
	orange: 'hue:43 saturation:1.0 brightness:1.0',
	orangeDark: 'hue:43 saturation:1.0 brightness:0.3',
	purple: 'hue:278 saturation:1.0 brightness:1.0',
	purpleDark: 'hue:278 saturation:1.0 brightness:0.3',
}

const colorSets = [{
	color: colors.orangeDark,
	from_color: colors.orange,
}, {
	color: colors.purpleDark,
	from_color: colors.purple,
}]

module.exports = colorSets
