/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ATM Primary Colors using CSS Custom Properties
        'atm-primary': 'var(--color-atm-primary)',
        'atm-screen-bg': 'var(--color-atm-screen-bg)',
        'surface': 'var(--color-surface)',
        'button': 'var(--color-button)',
        
        // Semantic colors
        'success': 'var(--color-success)',
        'error': 'var(--color-error)',
        'warning': 'var(--color-warning)',
        'info': 'var(--color-info)',
        
        // Text colors
        'text': {
          'primary': 'var(--color-text-primary)',
          'secondary': 'var(--color-text-secondary)',
          'white': 'var(--color-text-white)',
          'muted': 'var(--color-text-muted)',
        },
      },
      borderColor: {
        'text-white': 'var(--color-text-white)',
      },
      spacing: {
        // ATM Machine dimensions from tokens
        'atm-machine': 'var(--size-atm-machine)',
        'atm-brand': 'var(--size-atm-brand)',
        'atm-brand-height': 'var(--size-atm-brand-height)',
        
        // ATM Layout spacing
        'atm-top-space': 'var(--height-viewport-top-space)',
        'atm-bottom-space': 'var(--height-viewport-bottom-space)',
        'atm-horizontal': 'var(--spacing-horizontal)',
        
        // ATM Button dimensions
        'button-w': 'var(--button-width)',
        'button-h': 'var(--button-height)',
        'button-p': 'var(--button-padding)',
        
        // Design system spacing
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
      },
      fontFamily: {
        'primary': 'var(--font-primary)',
        'mono': 'var(--font-mono)',
        'serif': 'var(--font-serif)',
      },
      fontSize: {
        'xs': 'var(--font-size-xs)',
        'sm': 'var(--font-size-sm)',
        'base': 'var(--font-size-base)',
        'lg': 'var(--font-size-lg)',
        'xl': 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
        '5xl': 'var(--font-size-5xl)',
        '6xl': 'var(--font-size-6xl)',
        '7xl': 'var(--font-size-7xl)',
        '8xl': 'var(--font-size-8xl)',
        
        // ATM Button font size
        'button': 'var(--button-font-size)',
      },
      borderRadius: {
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        '2xl': 'var(--radius-2xl)',
      },
      boxShadow: {
        'lg': 'var(--shadow-lg)',
        '2xl': 'var(--shadow-2xl)',
        'inner': 'var(--shadow-inner)',
      },
      textShadow: {
        'sm': 'var(--text-shadow-sm)',
      },
    },
  },
  plugins: [],
}