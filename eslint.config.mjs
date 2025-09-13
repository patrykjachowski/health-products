// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  {rules: {
    '@stylistic/semi': ['error', 'never'],
    '@stylistic/quotes': ['error', 'single'],
    '@typescript-eslint/semi': ['error', 'always'],
  },
}
)
