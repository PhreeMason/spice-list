module.exports = {
    extends: ['expo', 'prettier'],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                trailingComma: 'all',
                arrowParens: 'avoid',
                endOfLine: 'auto',
                tabWidth: 4,
            },
        ],
        'import/no-unresolved': 'off',
        'import/namespace': 'off',
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [['@', './src']],
                extensions: ['.ts', '.tsx'],
            },
        },
    },
};
