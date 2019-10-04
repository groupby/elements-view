const path = require('path');

module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "airbnb-base",
        "../scripts/config/eslint/.eslintrc.js",
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        tsconfigRootDir: __dirname,
        project: [
            path.resolve(__dirname, "../tsconfig.json"),
          ]
        },
    rules: {
      "import/no-extraneous-dependencies": "off",
    }
}
