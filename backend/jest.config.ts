import type { Config } from 'jest';

const config: Config = {
  displayName: 'unit',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: { '^.+\\.(t|j)s$': 'ts-jest' },
  collectCoverageFrom: [
    'modules/**/*.ts',
    'common/**/*.ts',
    'config/**/*.ts',
    'platform/**/*.ts',
    'database/**/*.ts',
    'openapi/**/*.ts',
    '!**/*.spec.ts',
    // Feature module files are DI wiring; database/drizzle.module.ts holds pool logic and counts.
    '!modules/**/*.module.ts',
    '!**/index.ts',
    '!**/interfaces/**',
    '!**/entities/**',
    '!database/migrations/**',
    // CLI entry points that connect or write files on import; exercised by integration/CI steps.
    '!database/data-source.ts',
    '!database/migrate.ts',
    '!database/run-migrations.ts',
    '!openapi/generate-openapi.ts',
  ],
  coverageDirectory: '../coverage',
  coverageReporters: ['text', 'text-summary', 'json-summary', 'lcov'],
  // A ratchet, not a target: set about two points under the measured coverage. Raise it when
  // coverage rises; never lower it to make a change pass.
  coverageThreshold: {
    global: {
      statements: 74,
      branches: 78,
      functions: 60,
      lines: 74,
    },
  },
  testEnvironment: 'node',
  clearMocks: true,
  restoreMocks: true,
  maxWorkers: '50%',
};

export default config;
