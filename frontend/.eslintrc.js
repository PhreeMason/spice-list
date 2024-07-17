/* eslint-disable prettier/prettier */
module.exports = {
    extends: ["expo", "prettier"],
    plugins: ["prettier"],
    rules: {
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
    },
    "settings": {
        "import/resolver": {
            "alias": {
                "map": [
                    ["@", "./"]
                ],
                "extensions": [".ts", ".tsx"]
            }
        }
    }
};
