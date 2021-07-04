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
    'plugin:react/recommended'
  ],
  parser: "babel-eslint",
  rules: {
    "no-prototype-builtins": "off",
    "operator-assignment": "off",
    "guard-for-in": "off",
    "react/jsx-filename-extension": "off"
  }
};
