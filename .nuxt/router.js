import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7caa2b22 = () => interopDefault(import('..\\pages\\animation.vue' /* webpackChunkName: "pages/animation" */))
const _6bda4f57 = () => interopDefault(import('..\\pages\\game.vue' /* webpackChunkName: "pages/game" */))
const _b63bd4ce = () => interopDefault(import('..\\pages\\protected.vue' /* webpackChunkName: "pages/protected" */))
const _de1a1012 = () => interopDefault(import('..\\pages\\test.vue' /* webpackChunkName: "pages/test" */))
const _b37c7b86 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/animation",
    component: _7caa2b22,
    name: "animation"
  }, {
    path: "/game",
    component: _6bda4f57,
    name: "game"
  }, {
    path: "/protected",
    component: _b63bd4ce,
    name: "protected"
  }, {
    path: "/test",
    component: _de1a1012,
    name: "test"
  }, {
    path: "/",
    component: _b37c7b86,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
