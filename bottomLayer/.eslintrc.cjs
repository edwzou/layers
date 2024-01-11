module.exports = {
	env: {
		es2024: true,
	},
	extends: 'standard-with-typescript',
	overrides: [
		{
			files: ['*.ts', '*.tsx', '*.cjs'],
			rules: {
				'@typescript-eslint/comma-dangle': 'off',
				'comma-dangle': 'off',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		project: ['./tsconfig.json'],
		tsconfigRootDir: __dirname,
	},
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
	},
};
