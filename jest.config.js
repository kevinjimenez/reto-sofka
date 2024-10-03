module.exports = {
  cache: false,
  maxWorkers: 2,
  clearMocks: true,
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
  collectCoverage: true, // Habilita la recopilación de cobertura
  collectCoverageFrom: [ // Especifica qué archivos incluir en la cobertura
    'src/**/*.ts', // Incluye todos los archivos TypeScript en la carpeta src
    '!src/**/*.spec.ts', // Excluye archivos de pruebas
    '!src/main.ts', // Excluye el archivo de entrada principal
    '!src/polyfills.ts', // Excluye el archivo de polyfills
    '!src/environments/**', // Excluye archivos de configuración del entorno
  ],
  coveragePathIgnorePatterns: [
    '.config.ts',
    '.routes.ts',
    '.interface.ts',
    'index.ts',
    'utils',
    'common'
  ],
  coverageDirectory: '<rootDir>/coverage', // Especifica el directorio donde se guardarán los reportes de cobertura
  coverageThreshold: {
    global: {
      lines: 90,
      statements: 90,
      branches: 90,
      functions: 90,
    },
  },
};
