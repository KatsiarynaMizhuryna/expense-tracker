import globals from 'globals';
import tseslint from 'typescript-eslint';
import { parser } from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default {
  files: ['**/*.{js,mjs,cjs,ts}'],
  languageOptions: {
    globals: globals.browser,
    parser: parser
  },
  plugins: {
    prettier: prettier,
    '@typescript-eslint': tseslint
  },
  rules: {
    ...tseslint.configs.recommended.rules,
    '@/no-unused-vars': 'error'
  }
};
