import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['app/**/*.{js,mjs,cjs,ts}'],
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
      "semi": "error",
        "quotes": [
            "error",
            "single"
        ],
        "no-trailing-spaces": "error",
        "no-var": "error",
        "newline-per-chained-call": "error",
        "newline-after-var": [
            "error",
            "always"
        ],
        "object-curly-spacing": [
            "error",
            "always"
        ],
        "padded-blocks": [
            "error",
            "always"
        ],
        "indent": [
            "error",
            2,
            {
                "ImportDeclaration": "first"
            }
        ],
        "no-multiple-empty-lines": [
            "error",
            {
                "max": 1
            }
        ]
    },
  },
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
