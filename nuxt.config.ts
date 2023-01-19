import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  target: 'server',
  ssr: true,
  // typescript: {shim: false},
  modules: [
    'nuxt-lodash'
  ],
  meta: {
      script: [
        { type:"text/javascript", src:"//dapi.kakao.com/v2/maps/sdk.js?appkey=6e261624a26b168596582ee7d6fd35e4"},
        // {type:"text/javascript", src:'/node_modules/jquery/dist/jquery.min.js'},
        // {type:"text/javascript", src:'/node_modules/jquery/dist/jquery.min.js'}
      ],
      meta: [
          {name:"viewport", content:"width=device-width,initial-scale=1"}
      ]
  },
  css: [
    // "~/assets/scss/bootstrap/custom.scss",
    // "~/assets/css/common.css",
    //'vuetify/lib/styles/main.sass'
    //"~/assets/css/style.css",
    // "~/node_modules/bootstrap/dis/css/bootstrap.min.css"
    "bootstrap/dist/css/bootstrap.min.css"
  ],
  // pageTransition: {'page-fade': true }
  // ,
  publicRuntimeConfig: {
    BASE_URL: process.env.baseURL,
    HOST_URL: process.env.hostURL
      // "app": {
      //     "baseURL": "/",
      //     "buildAssetsDir": "/_nuxt/",
      //     "assetsPath": {},
      //     "cdnURL": null
      // }
  },

  privateRuntimeConfig: {
    
  },
  vite: {
  //   server: {
  //     proxy: {
  //       "/api": {
  //         target: process.env.baseUrl,
  //         changeOrigin: true,
  //         // rewrite: (path) => path.replace(/^\/api/, ""),
  //       },
  //     },
  //   },
    // define: {
    //     'process.env.DEBUG': 'false',
    // }
    css: {
      preprocessorOptions: {
        scss: {
          //additionalData: `@import '~/assets/scss/bootstrap/custom.scss';`
          //additionalData:`$blue: red;`
        }
      }
    }
  },
  // webpack:{
  //   plugins: [
  //     new webpack.DefinePlugin({
  //        $: 'jquery',
  //         jquery: 'jquery',
  //         'window.jQuery': 'jquery',
  //         jQuery: 'jquery'
  //     })
  //   ],
  // },
  build: {
    //transpile: [({ isLegacy }) => isLegacy &&'jquery'],
    //transpile: ['vuetify']
  },
  // typescript: {
  //   typeCheck: true
  // },
})
