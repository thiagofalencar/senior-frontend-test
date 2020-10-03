
export default {
	mode: 'universal',

	/*
	 * Headers of the page
	 */
	head: {
		title: process.env.npm_package_name || '',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@tailwindcss/ui@latest/dist/tailwind-ui.min.css' }
		]
	},
	rewriteRedirects: true,
	/*
	* Route settings
	*/
	router: {
		home: '/offices',
	},

	/*
	 * Plugins to load before mounting the App
	 */
	plugins: [],

	/*
	 * Nuxt.js dev-modules
	 */
	buildModules: [
		// Doc: https://github.com/nuxt-community/nuxt-tailwindcss
		'@nuxtjs/tailwindcss',
		"@nuxtjs/svg"
	],

	tailwindcss: {
		cssPath: '~/assets/css/tailwind.css',
		configPath: 'tailwind.config.js',
		exposeConfig: false,
		config: {}
	},

	/*
	 * Nuxt.js modules
	 */
	modules: [],

	/*
	 * Build configuration
	 */
	build: {
		/*
		 * You can extend webpack config here
		 */
		extend (config, ctx) {
		}
	}
}
