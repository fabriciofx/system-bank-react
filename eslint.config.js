import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default defineConfig([
  {
    files: ['**/*.js', '**/*.jsx'],
    plugins: { js, react, 'react-hooks': reactHooks },
    extends: ['js/recommended'],
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off'
    },
    settings: {
      react: { version: 'detect' }
    }
  },
  {
    files: ['**/*.ts'],
    plugins: { '@typescript-eslint': ts, react, 'react-hooks': reactHooks },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' }
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      semi: ['error', 'always'],
      'max-len': [
        'error',
        {
          code: 80,
          ignoreUrls: false,
          ignoreComments: false,
          ignoreStrings: false,
          ignoreTemplateLiterals: false
        }
      ],
      curly: ['error', 'all'],
      quotes: ['error', 'single', { avoidEscape: true }]
    }
  }
]);
