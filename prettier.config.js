export default {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  tabWidth: 2,
  importOrder: [
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    ' ',
    '^[.]',
    '^[..]',
  ],
  importOrderParserPlugins: ['typescript'],
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
};
