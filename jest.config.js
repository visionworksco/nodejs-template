module.exports = {
  roots: ['<rootDir>/src'],
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  testRegex: '(/__test__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  verbose: true,
  errorOnDeprecated: true,
  collectCoverageFrom: ['<rootDir>/src/app/**/*.{js,ts}'],
  setupFiles: ['<rootDir>/src/test/jest.setup.js'],
  setupFilesAfterEnv: ['jest-extended/all'], // jest-extended
  runner: 'groups', // jest-runner-groups,
  globals: {
    DEBUG: 'true',
    MOCK_DATA: 'true',
  },
};
