import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		runes: ({ filename }) =>
			filename.split(/[/\\]/).includes('node_modules') ? undefined : true
	},

	kit: {
		adapter: adapter({
			split: true
		})
	},

	// ⬇️ PINDAH KE SINI (di luar kit)
	vite: {
		ssr: {
			external: ['bootstrap', '@sveltestrap/sveltestrap']
		}
	}
};

export default config;