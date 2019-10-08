import Vue from 'vue'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import VueRouterPlus from '../..'

import PageA from '../pages/a.vue'
import PageB from '../pages/b.vue'

Vue.use(VueRouterPlus)

console.log(VueRouterPlus)
const router = new VueRouterPlus({
  mode: 'history',
  routes: [
    {
      path: '/a',
      component: PageA,
      meta: {
        queryOptions: {
          age: {
            type: Number,
            default: 1
          },
          extra: {
            type: String,
            default: 'other'
          }
        }
      }
    },
    {
      path: '/b',
      component: PageB
    }
  ]
})

router.beforeEach((to, from, next) => {
  nProgress.start()
  next()
})

router.afterEach(() => {
  nProgress.done()
})

router.afterEach(() => {
  console.log(router)
})

export default router
