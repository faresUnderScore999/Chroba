import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _29a5b048 = () => interopDefault(import('..\\pages\\animation.vue' /* webpackChunkName: "pages/animation" */))
const _0eb8a1ca = () => interopDefault(import('..\\pages\\game.vue' /* webpackChunkName: "pages/game" */))
const _633759f4 = () => interopDefault(import('..\\pages\\protected.vue' /* webpackChunkName: "pages/protected" */))
const _33d14a6a = () => interopDefault(import('..\\pages\\test.vue' /* webpackChunkName: "pages/test" */))
const _5f2dbe2a = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _29a5b048,
    name: "animation"
  }, {
    path: "/game",
    component: _0eb8a1ca,
    name: "game"
  }, {
    path: "/protected",
    component: _633759f4,
    name: "protected"
  }, {
    path: "/test",
    component: _33d14a6a,
    name: "test"
  }, {
    path: "/",
    component: _5f2dbe2a,
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
