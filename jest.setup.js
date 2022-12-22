const i18next = require('i18next');
const { initReactI18next } = require('react-i18next');
// const {diClear} = require('cloud/container');
const failOnConsole = require('jest-fail-on-console');

require('@testing-library/jest-dom');

// https://github.com/i18next/i18next/issues/1351
// these libraries uses incorrect exports for cjs format. It will be worked only with esModuleInterop.
// Fix missing default export.
i18next.default = i18next;

// JSDOM errors (usually inside callbacks) are logged using VirtualConsole to another console instance and don't pass to failOnConsole overrides.
// We cannot override VirtualConsole, because they differs for each jest instance (parallel run). https://github.com/facebook/jest/issues/8393
// We should try to find way to group these errors under top logger
// failOnConsole({
//   shouldFailOnError: true,
//   shouldFailOnWarn: true,
//   shouldFailOnLog: true
// });

// mock addon-actions to allow usage of these methods inside service mocks
jest.mock('@storybook/addon-actions', () => {
  const action = () => jest.fn();
  const actions = (...args) => {
    const actionsObject = {};

    Object.keys(args).forEach(name => {
      actionsObject[name] = action(args[name]);
    });

    return actionsObject;
  };

  return { action, actions };
});

beforeAll(() => {
  i18next.use(initReactI18next).init({
    fallbackLng: 'en',
    load: 'languageOnly',
    keySeparator: false,
    interpolation: {
      prefix: '{',
      suffix: '}'
    },
    supportedLngs: ['en'],
    resources: { en: { translationsNS: {} } }
  });
});

// beforeEach(() => {
//   diClear();
// });
