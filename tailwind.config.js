/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src", "./src/**/*.{js,jsx,ts,tsx}"],

	theme: {
		extend: {
			colors: {
				brand: "#202B3B",
				fade: "#9399a2ff",
			},
		},
	},
	plugins: [],
};
