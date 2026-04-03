module.exports = {
	extends: ['plugin:jsx-a11y/recommended'],
	rules: {
		'jsx-a11y/anchor-is-valid': 0,
		'no-debugger': 'error',
		'no-console': 'error',
		'no-magic-numbers': 'off',
	},
	plugins: ['jsx-a11y'],
	parser: '@babel/eslint-parser',
	parserOptions: {
		ecmaFeatures: {
			legacyDecorators: true,
		},
	},
};