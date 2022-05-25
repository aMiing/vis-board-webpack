module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
  },
  parser: "vue-eslint-parser",
  rules: {
    "no-console": "off",
    "no-unused-vars": 0,
    "no-debugger": 0,
    "no-prototype-builtins": 0,
    "no-case-declarations": 0,
    "vue/valid-v-model": 0,
  },
};
