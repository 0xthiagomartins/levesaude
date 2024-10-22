module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier', // Make sure this is always the last configuration in the extends array.
    ],
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        // Your custom rules...
    },
};
