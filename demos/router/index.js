import Vue from 'vue'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import VueRouterPlus from '../..'

import PageA from '../pages/a.vue'
import PageB from '../pages/b.vue'
import PageC from '../pages/c.vue'
import PageD from '../pages/d.vue'

Vue.use(VueRouterPlus)

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
      component: PageB,
      meta: {
        queryOptions: {
          extra: {
            type: String,
            default: 'haha'
          }
        }
      }
    },
    {
      path: '/c',
      component: PageC,
      meta: {
        queryOptions: {
          extra: {
            type: String,
            default: 'this_is_c'
          }
        }
      }
    },
    {
      path: '/d',
      component: PageD
    },
    {
      path: '*',
      component: {
        render: h => h('div', '404 page')
      }
    }
  ]
})

router.beforeEach(() => {
  nProgress.start()
})

router.beforeEach(to => {
  if (to.path === '/b') {
    router.redirect('/c')
  }
  if (to.path === '/c') {
    router.redirect('/d')
  }
})

router.afterEach(() => {
  nProgress.done()
})

router.onError(err => {
  nProgress.done()
  throw err
})

export default router
