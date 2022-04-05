module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts", ".jsx", ".tsx"],
      },
    },
    "import/extensions": [".js", ".ts", ".jsx", ".tsx"],
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },

  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'no-use-before-define': 'off',
    "indent": ["error", 2],
    '@typescript-eslint/no-unused-vars': "warn",
    'no-shadow': "off",
    '@typescript-eslint/no-use-before-define': ["warn"],
    '@typescript-eslint/no-shadow': ["error"],
    "import/extensions": [
      "error",
      "always",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
  },
};