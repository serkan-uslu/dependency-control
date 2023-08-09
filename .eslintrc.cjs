module.exports = {
    root: true,
    extends: ['eslint:recommended', 'prettier'],
    rules: {
        'no-console': 'off',
    },
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
}
