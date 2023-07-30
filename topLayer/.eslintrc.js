module.exports = {
	env: {
		browser: true,
		es2021: true,
		'react-native/react-native': true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:import/typescript',
		'plugin:prettier/recommended',
		'standard-with-typescript',
		'prettier',
	],
	overrides: [
		{
			files: '/topLayer',
			rules: {
				indent: 'off',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
	},
	plugins: ['react', 'react-native', '@typescript-eslint', 'prettier'],
	rules: {
		'react/react-in-jsx-scope': ['off'],
		'react/jsx-uses-react': ['off'],
		'react/jsx-props-no-spreading': ['warn'],
		'react/no-unescaped-entities': ['off'],
	},
};
