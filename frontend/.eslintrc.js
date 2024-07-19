module.exports = {
    extends: [
        "airbnb",
        "airbnb/hooks",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:prettier/recommended",
    ],
    plugins: ["@typescript-eslint", "react", "prettier"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "rules": {
        "react/react-in-jsx-scope": 0,
        "import/no-unresolved": 0,
        "react/jsx-filename-extension": [1, {
            "extensions": [
                ".ts",
                ".tsx"
            ]
        }],
        "prettier/prettier": [
            "error",
            {
                "singleQuote": true,
                "trailingComma": "all",
                "arrowParens": "avoid",
                "endOfLine": "auto",
                "tabWidth": 4,
            }
        ],
        "@typescript-eslint/no-use-before-define": ["error"],
        "import/extensions": ["error", "never"],
        "react/prop-types": 0,
        "no-shadow": 0,
        "@typescript-eslint/no-shadow": ["error"],
    },
    "settings": {
        "import/resolver": {
            "alias": {
                "map": [
                    ["@", "./src"]
                ],
                "extensions": [".ts", ".tsx"]
            }
        }
    },
};
