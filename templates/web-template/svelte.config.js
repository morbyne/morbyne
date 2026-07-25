import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter()
	},
	vitePlugin: {
		// force runes for our own files, leave any node_modules .svelte on their own mode
		dynamicCompileOptions({ filename }) {
			return filename.split(/[/\\]/).includes('node_modules') ? {} : { runes: true };
		}
	}
};

export default config;
