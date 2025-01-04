/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure all your React components are included
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#e1f5f9", // Light teal for a fresh, clean look
          DEFAULT: "#00b4d8", // Main teal color representing professionalism and trust
          dark: "#0077a0", // Darker teal for contrast and depth
        },
        secondary: {
          light: "#fdf5d3", // Soft yellow for warmth and friendliness
          DEFAULT: "#f9c74f", // Main yellow for highlights and attention
          dark: "#c79427", // Deeper yellow for emphasis
        },
        neutral: {
          light: "#f9fafb", // Light gray for backgrounds
          DEFAULT: "#e5e7eb", // Standard gray for borders and dividers
          dark: "#6b7280", // Dark gray for text and subtle elements
        },
        success: {
          light: "#d1fadf", // Light green for positive feedback
          DEFAULT: "#43aa8b", // Main green for success indicators
          dark: "#267055", // Darker green for emphasis
        },
        danger: {
          light: "#fde2e2", // Light red for warnings
          DEFAULT: "#d90429", // Main red for error or alerts
          dark: "#940017", // Darker red for critical warnings
        },
        info: {
          light: "#d0f4ff", // Light blue for informational highlights
          DEFAULT: "#3a86ff", // Main blue for notifications and icons
          dark: "#0056a8", // Dark blue for active states
        },
        background: {
          light: "#ffffff", // Pure white for main background
          DEFAULT: "#f8f9fa", // Off-white for subtle contrast
          dark: "#edf2f7", // Slightly darker background alternative
        },
      },
    },
  },
  plugins: [],
};
