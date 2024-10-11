export default {
  server: {
    port: 3000, // Change this to the desired port
    host: '0.0.0.0' // Optional: Set the host to allow external connections
  },
  // Global page headers
  head: {
    target: 'static',
    title: "♣︎ Chkobaa ♣︎",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS
  css: ["element-ui/lib/theme-chalk/index.css"],

  // Plugins to run before rendering page
  plugins: ["@/plugins/element-ui"],

  // Auto import components
  components: true,

  // Modules for dev and build (recommended)
  buildModules: [],

  // Axios module configuration localhost:8080 chkobaa3.onrender.com
  axios: {
    baseURL: `${process.env.NUXT_API_FURL}`,
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NUXT_API_URL  // Default value if not set
  },

  // Auth module configuration
  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',   // Where to find the token in the login response
          global: true,        // Whether to set the token globally (in headers)
          required: true,      // Token is required for authenticated requests
          type: 'Bearer',      // Token type for Authorization header
        },
        user: {
          property: false,     // If your API returns the full user object directly, set to false
          autoFetch: true,     // Automatically fetch the user after login
        },
        redirect: {
          login: '/',       // Redirect to login page
        
        },
        endpoints: {
          login: { url: `/login`, method: 'post', propertyName: 'token' },
          logout: false,       // You can keep it false or remove it if not needed
          user: { url: '/protected', method: 'get', propertyName: false }, // Adjust to your API
        },
      },
    },
  },
  
  router: {
    middleware: ['auth']
  },
  // Modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],

  // Build Configuration
  build: {
    transpile: [/^element-ui/],
  },
};
