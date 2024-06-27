module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['./setup-tests.ts'],
  moduleNameMapper: {
    '@type/(.*)': '<rootDir>/src/types/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
    '@middlewares/(.*)': '<rootDir>/src/middlewares/$1',
    '@/(.*)': '<rootDir>/src/$1',
  },
}
