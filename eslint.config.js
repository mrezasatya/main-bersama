import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist', 'dev-dist', 'node_modules', 'test-results', 'playwright-report'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettier],
    files: ['**/*.{ts,tsx,js,mjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // Semua ucapan wajib lewat core/audio.
      'no-restricted-globals': [
        'error',
        { name: 'speechSynthesis', message: 'Gunakan core/audio.' },
      ],
      'no-restricted-properties': [
        'error',
        { object: 'window', property: 'speechSynthesis', message: 'Gunakan core/audio.' },
      ],
    },
  },
  {
    // Berkas gambar SVG berisi banyak komponen kecil; fast refresh tidak penting di sini.
    files: ['src/core/art/**'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
  {
    files: ['src/core/audio/**'],
    rules: { 'no-restricted-globals': 'off', 'no-restricted-properties': 'off' },
  },
);
