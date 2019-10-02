module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', '@vue/airbnb', 'plugin:prettier/recommended'],
    rules: {
        'prettier/prettier': 'error',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        indent: ['error', 4]
    },
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2018
    }
};
