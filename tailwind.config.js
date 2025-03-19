// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Palette principale - Orange signature
        primary: {
          DEFAULT: '#fd9d3e', // Orange signature
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#fd9d3e', // Couleur principale
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        // Palette secondaire - Bleu professionnel
        secondary: {
          DEFAULT: '#2C3E50', // Bleu foncé
          50: '#E9ECF0',
          100: '#C5CFDA',
          200: '#9EAFC3',
          300: '#778FAD',
          400: '#516F96',
          500: '#2C3E50',
          600: '#253443',
          700: '#1E2A36',
          800: '#17202A',
          900: '#10161D',
        },
        // Couleur d'accent pour badges IA
        accent: {
          DEFAULT: '#3182CE', // Bleu électrique
          50: '#EBF8FF',
          100: '#BEE3F8',
          200: '#90CDF4',
          300: '#63B3ED',
          400: '#4299E1',
          500: '#3182CE',
          600: '#2B6CB0',
          700: '#2C5282',
          800: '#2A4365',
          900: '#1A365D',
        },
        // Palette de gris pour les tons neutres
        neutral: {
          DEFAULT: '#4A5568',
          50: '#F7FAFC',
          100: '#EDF2F7',
          200: '#E2E8F0',
          300: '#CBD5E0',
          400: '#A0AEC0',
          500: '#718096',
          600: '#4A5568',
          700: '#2D3748',
          800: '#1A202C',
          900: '#171923',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 10px 15px rgba(0, 0, 0, 0.07), 0 4px 6px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'pulse-accent': 'pulse-accent 2s infinite',
      },
      keyframes: {
        'pulse-accent': {
          '0%': { boxShadow: '0 0 0 0 rgba(49, 130, 206, 0.4)' },
          '70%': { boxShadow: '0 0 0 6px rgba(49, 130, 206, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(49, 130, 206, 0)' },
        }
      }
    },
  },
  plugins: [],
}