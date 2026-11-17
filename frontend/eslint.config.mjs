import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

// Flat-config replacement for the legacy `.eslintrc.json`. ESLint 10 no longer reads
// eslintrc files, and `next lint` (Next 15) still passes removed legacy options to it,
// so linting runs through the ESLint CLI (`pnpm lint` -> `eslint .`).
// All rules from the previous config are preserved.
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'coverage/**',
    'playwright-report/**',
    'test-results/**',
    'next-env.d.ts',
  ]),
  {
    // eslint-plugin-react@7.37 auto-detects the React version through `context.getFilename()`,
    // which ESLint 10 removed. Pinning the version avoids that code path. Remove the pin once
    // eslint-config-next ships a plugin release that supports ESLint 10 natively.
    settings: { react: { version: '19.2' } },
    rules: {
      // typescript-eslint's version understands type-only imports; the base rule does not.
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'max-lines': ['error', { max: 1000, skipBlankLines: true, skipComments: true }],
      '@next/next/no-img-element': 'error',
    },
  },
]);
