const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('../tsconfig');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  modulePaths: ['../'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.e2e.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
