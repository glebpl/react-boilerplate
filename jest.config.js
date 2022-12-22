// const { config: jestImageTransformerConfig } = require('@almworks/jest-image-transformer');

const imageTransformConfig = {
  '^.+\\.(svg|png|jpeg|jpg|gif)$': '<rootDir>/scripts/jest-image-transformer.js'
};

module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  clearMocks: true,
  testMatch: ['**/*.test.(ts|tsx)'],
  moduleNameMapper: {
    ...imageTransformConfig
  },
  transform: {
    ...imageTransformConfig
  },
  globals: {
    'ts-jest': {
      tsconfig: {
        esModuleInterop: true,
        target: 'es6'
      }
    }
  }
};
