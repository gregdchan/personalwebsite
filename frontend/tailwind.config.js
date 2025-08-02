// tailwind.config.js
const plugin = require('tailwindcss/plugin');

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: 'var(--color-primary)',
				secondary: 'var(--color-secondary)',
				background: 'var(--color-bg)',
				foreground: 'var(--color-fg)',
				headerBackground: 'var(--color-headerBackground)',
				headerText: 'var(--color-headerText)',
				accent: 'var(--color-accent)',
				muted: 'var(--color-muted)'
			},
			fontFamily: {
				custom: 'var(--font-family)'
			},
			fontSize: {
				base: 'var(--font-size-base)',
				h1: 'var(--font-size-h1)',
				h2: 'var(--font-size-h2)',
				h3: 'var(--font-size-h3)'
			},
			fontWeight: {
				base: 'var(--font-weight)',
				h1: 'var(--font-weight-h1)',
				h2: 'var(--font-weight-h2)',
				h3: 'var(--font-weight-h3)'
			},
			borderRadius: {
				custom: 'var(--radius)'
			},
			boxShadow: {
				custom: 'var(--box-shadow)'
			}
		}
	},
	plugins: [
		plugin(function ({ addBase }) {
			addBase({
				':root': {
					'--color-primary': '#1D4ED8',
					'--color-secondary': '#9333EA',
					'--color-bg': '#ffffff',
					'--color-fg': '#000000',
					'--color-headerBackground': '#ffffff',
					'--color-headerText': '#000000',
					'--color-accent': '#F59E0B',
					'--color-muted': '#9CA3AF',
					'--font-family': 'system-ui',
					'--font-size-base': '16px',
					'--font-size-h1': '40px',
					'--font-size-h2': '32px',
					'--font-size-h3': '28px',
					'--font-weight': '400',
					'--font-weight-h1': '800',
					'--font-weight-h2': '700',
					'--font-weight-h3': '600',
					'--radius': '8px',
					'--box-shadow': '0 4px 6px rgba(0,0,0,0.1)'
				}
			});
		})
	]
};
