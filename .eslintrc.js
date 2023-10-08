/**
 * Linting configuration for the GraphQL React Prototype.
 * @author Andrew Jarombek
 * @since 4/7/2020
 */

module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'prettier'
  ],
  plugins: [
    "react-hooks",
    "prettier"
  ],
  parser: "babel-eslint",
  rules: {
    "max-len": ["error", { "code": 120 }],
    "no-prototype-builtins": "off",
    "operator-assignment": "off",
    "guard-for-in": "off",
    "react/jsx-filename-extension": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "prettier/prettier": ["error", {
      "singleQuote": true,
      "printWidth": 120,
      "semi": true,
    }]
  }
};
