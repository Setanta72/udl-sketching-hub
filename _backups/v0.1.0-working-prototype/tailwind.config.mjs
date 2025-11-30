/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Custom color palette - can be easily modified
        'primary': '#2C3E50',      // Dark blue-gray
        'secondary': '#E74C3C',    // Accent red
        'background': '#FFFFFF',   // White
        'surface': '#F8F9FA',      // Light gray
        'text-primary': '#2C3E50', // Dark text
        'text-secondary': '#7F8C8D', // Gray text
      },
      fontFamily: {
        // Professional, clean fonts
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      spacing: {
        // Custom spacing scale
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      }
    },
  },
  plugins: [],
}
