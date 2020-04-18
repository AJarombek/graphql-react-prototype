/**
 * Setup Jest for GraphQL/React Prototype unit tests.
 * @author Andrew Jarombek
 * @since 4/18/2020
 */

module.exports = {
  displayName: 'react',
  testEnvironment: 'jsdom',
  testMatch: ['**/test/**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
  maxConcurrency: 5,
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: ['src/index.js'],
  coverageThreshold: {
    'global': {
      'branches': 100,
      'functions': 100,
      'lines': 100,
      'statements': 100
    }
  },
};
