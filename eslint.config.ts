import js from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config([
  globalIgnores(['dist/**', 'node_modules/**', '**/*.d.ts']),
  {
    files: ['**/*.ts'],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: { ...globals.browser },
    },
  },
  tseslint.configs.recommended,
  prettierPlugin,
  {
    files: ['**/*.ts'],
    rules: {
      curly: ['error', 'all'],
    },
  },
]);
