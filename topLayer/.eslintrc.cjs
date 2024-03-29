const path = require('node:path');
const project = path.resolve(process.cwd(), 'tsconfig.json');

module.exports = {
	root: true,
	env: {
		browser: true,
		es2024: true,
		'react-native/react-native': true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:import/typescript',
		'plugin:import/recommended',
		'plugin:@typescript-eslint/recommended',
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
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: [
		'react',
		'react-native',
		'@typescript-eslint',
		'prettier',
		'import',
	],
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
				project: project,
			},
		},
		react: {
			version: 'detect',
		},
	},
	rules: {
		'import/no-unresolved': 'error',
		'import/extensions': 'off',
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
	},
};
