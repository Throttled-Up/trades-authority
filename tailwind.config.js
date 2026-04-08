/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:        'var(--color-primary)',
        'primary-dark': 'var(--color-primary-dark)',
        'hero-bg':      'var(--color-hero-bg)',
        surface:        'var(--color-surface)',
        'heading':      'var(--color-text-heading)',
        'body':         'var(--color-text-body)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body:    ['var(--font-body)',    'sans-serif'],
      },
      borderRadius: {
        card: 'var(--radius-card)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
      },
      maxWidth: {
        content: 'var(--max-width-content)',
      },
    },
  },
  plugins: [],
};
