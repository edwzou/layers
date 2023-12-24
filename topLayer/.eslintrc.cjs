module.exports = {
	env: {
		browser: true,
		es2024: true,
		'react-native/react-native': true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:import/typescript',
		'standard-with-typescript',
		'plugin:prettier/recommended',
	],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
		// For react-native plugin
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ['react', 'react-native', '@typescript-eslint'],
	rules: {
		'react/react-in-jsx-scope': ['off'],
		'react/jsx-uses-react': ['off'],
		'react/jsx-props-no-spreading': ['warn'],
		'react/no-unescaped-entities': ['off'],
	},
};
