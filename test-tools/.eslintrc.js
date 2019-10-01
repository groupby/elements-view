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
        "../scripts/config/.eslintrc.js"
    ],
    rules: {
      "@typescript-eslint/camelcase": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "camelcase": "off",
      "max-len": "off",
      "no-multi-assign": "off",
      "no-undef": "off",
      "no-unused-expressions": "off",
      "no-useless-constructor": "off",
      "space-before-function-paren": "off",
    }
}
