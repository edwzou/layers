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
	],
	overrides: [
		{
			files: ['*.ts', '*.tsx', '*.cjs', '*.js'],
			rules: {
				'@typescript-eslint/comma-dangle': 'off',
				'comma-dangle': 'off',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ['react', 'react-native', '@typescript-eslint', 'prettier'],
	rules: {
		'object-shorthand': 'off',
		'no-tabs': ['error', { allowIndentationTabs: true }],
		semi: [2, 'always'],
		indent: 'off',
		'multiline-ternary': 'off',
		'@typescript-eslint/space-before-function-paren': 'off',
		'@typescript-eslint/indent': 'off',
		'@typescript-eslint/semi': [2, 'always'],
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/naming-convention': [
			'error',
			{
				selector: 'variableLike',
				format: ['snake_case', 'camelCase', 'UPPER_CASE', 'PascalCase'],
				leadingUnderscore: 'allow',
			},
		],
		'@typescript-eslint/member-delimiter-style': [
			'error',
			{
				multiline: {
					delimiter: 'semi',
					requireLast: true,
				},
				singleline: {
					delimiter: 'semi',
					requireLast: false,
				},
			},
		],

		'react/react-in-jsx-scope': ['off'],
		'react/jsx-uses-react': ['off'],
		'react/jsx-props-no-spreading': ['warn'],
		'react/no-unescaped-entities': ['off'],
	},
};
