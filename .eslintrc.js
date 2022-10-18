module.exports = {
  env: {
    browser: true
  },
  overrides: [{
    files: [
      "src/**/*.ts",
      "src/**/*.tsx",
      ".storybook/**/*.ts",
      ".storybook/**/*.tsx",
    ]
  }],
  // eslint recommended rules are error by default
  // @typescript-eslint recommended rules are warn by default
  // react recommended rules are error by default
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "jest",
    "testing-library"
  ],
  rules: {
    quotes: ["error", "single"]
  }
};
