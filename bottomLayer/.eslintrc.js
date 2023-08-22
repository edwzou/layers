module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": "standard-with-typescript",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "project": ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
    },
    "rules": {
        "semi": [2, "always"],
        "@typescript-eslint/semi": [2, "always"],
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/naming-convention": [
            "error",
            {
                "selector": "variableLike", "format": ["snake_case", "camelCase", "UPPER_CASE", "PascalCase"]
            }
        ]
    }
}
