export default {
  printWidth: 80,
  singleQuote: true,
  tabWidth: 2,
  semi: true,
  bracketSpacing: true,
  arrowParens: "always",
  trailingComma: "none",
  overrides: [
    {
      files: "*.html",
      options: {
        parser: "angular",
      },
    },
  ],
};
