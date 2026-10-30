module.exports = {
  displayName: 'changelog-validator',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js'],
  collectCoverage: true,
  collectCoverageFrom: [
    'scripts/**/*.cjs',
    '!scripts/**/*.cjs.bak',
    '!**/node_modules/**',
    '!**/.git/**'
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  coverageReporters: ['text', 'text-summary', 'json', 'html'],
  verbose: true,
  testTimeout: 10000
};
