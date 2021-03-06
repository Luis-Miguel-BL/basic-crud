import { pathsToModuleNameMapper } from 'ts-jest/utils';

import { compilerOptions } from './tsconfig.json';

export default {
  bail: true,
  clearMocks: true,
  coverageProvider: 'v8',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src',
  }),
  preset: 'ts-jest',
  testMatch: ['**/*.spec.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/services/*.ts',
    '!<rootDir>/src/modules/**/services/index.ts',
    '!<rootDir>/src/modules/webhook/services/*.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'lcov'],
};
