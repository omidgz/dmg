module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: [
    '**/*.spec.[jt]s?(x)',
    '**/tests/**/*.spec.[jt]s?(x)',
    '**/__tests__/*.[jt]s?(x)',
  ],
    transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    '^.+\\.js$': 'babel-jest'
  }
};
