/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  semi: true,
  arrowParens: 'always',
  trailingComma: 'all',
  bracketSameLine: true,
  printWidth: 80,
  bracketSpacing: false,
  proseWrap: 'always',

  // @trivago/prettier-plugin-sort-imports
  importOrder: [
    '^react(/(.*))?$',
    '^next/(.*)$',
    '^next-auth(/(.*))?$',
    '^@/server/(.*)$',
    '^@/components/(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,

  plugins: [
    'prettier-plugin-tailwindcss',
    '@trivago/prettier-plugin-sort-imports',
  ],
  overrides: [
    {
      files: ['*.tsx', '*.ts'],
      options: {
        parser: 'babel-ts',
      },
    },
  ],
};

export default config;
