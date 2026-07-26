/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-html/vue',
    'stylelint-config-recess-order',
  ],
  ignoreFiles: [
    '**/.nuxt/**',
    '**/.output/**',
    '**/dist/**',
    '**/node_modules/**',
    '**/public/**',
    '**/*.min.css',
  ],
  rules: {
    // Allow BEM-style selectors used in the design system
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$',
      {
        message: 'Expected class selector to be kebab-case or BEM',
      },
    ],
    // Design tokens use multi-word custom properties
    'custom-property-pattern': null,
    // Google Fonts and layered imports
    'import-notation': null,
    'media-feature-range-notation': null,
    'value-keyword-case': [
      'lower',
      {
        camelCaseSvgKeywords: true,
      },
    ],
    'color-function-alias-notation': null,
    'color-function-notation': null,
    'alpha-value-notation': null,
    'hue-degree-notation': null,
    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
  },
}
