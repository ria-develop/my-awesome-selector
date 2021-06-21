// jest.config.js
// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  bail: false,
  collectCoverage: true,
  displayName: 'row-aggregator',
  globals: {
    __DEV__: true,
  },
};
module.exports = config;
