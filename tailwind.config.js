module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        clash: ['Clash Grotesk', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        sans: ['Clash Grotesk', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontWeight: {
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      colors: {
        primary: 'var(--color-primary, #141414)',
        secondary: 'var(--color-secondary, #383838)',
        accent: 'var(--color-accent, #FFA439)',
        background: 'var(--color-background, #FFFFFF)',
        surface: 'var(--color-surface, #F2F2F2)',
        border: 'var(--color-border, #A3A3A3)',
        text: {
          primary: 'var(--color-text-primary, #0B0F0E)',
          secondary: 'var(--color-text-secondary, #666666)',
          disabled: 'var(--color-text-disabled, #8F8F8F)',
        },
        error: 'var(--color-error, #EF4444)',
        success: 'var(--color-success, #10B981)',
        warning: 'var(--color-warning, #FFA439)',
        info: 'var(--color-info, #172554)',
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.25rem',
      },
    },
  },
  plugins: [],
}