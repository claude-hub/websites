/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'game-primary': '#6d28d9', // 紫色作为主色调
        'game-secondary': '#4c1d95', // 深紫色
        'game-accent': '#10b981', // 绿色作为强调色
        'game-dark': '#0f172a', // 深蓝黑色背景
        'game-light': '#f8fafc', // 浅色文字
        'game-card': '#1e293b', // 卡片背景色
      },
      backgroundImage: {
        'hero-pattern': "url('/images/hero-bg.jpg')",
        'gradient-game': 'linear-gradient(to right, #6d28d9, #4c1d95)',
      },
      boxShadow: {
        'game': '0 0 15px rgba(109, 40, 217, 0.5)',
        'game-hover': '0 0 25px rgba(109, 40, 217, 0.8)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [],
}