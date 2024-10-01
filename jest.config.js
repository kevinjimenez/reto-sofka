module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
};

// module.exports = {
//   preset: 'jest-preset-angular',
//   testEnvironment: 'jsdom',
//   testMatch: ['**/+(*.)+(spec).+(ts)'],
//   setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
//   transform: {
//     '^.+\\.(ts|js|html)$': 'jest-preset-angular',
//   },
//   moduleNameMapper: {
//     '^@app/(.*)$': '<rootDir>/src/app/$1',
//     '^@env/(.*)$': '<rootDir>/src/environments/$1',
//   },
//   transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
//   collectCoverage: true,
//   coverageReporters: ['html'],
//   coverageDirectory: 'coverage/jest',
//   moduleFileExtensions: ['ts', 'html', 'js', 'json'],
//   globals: {
//     'ts-jest': {
//       tsconfig: '<rootDir>/tsconfig.spec.json',
//       stringifyContentPathRegex: '\\.html$',
//     },
//   },
// };
