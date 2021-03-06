import Vue from 'vue'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import VueRouterPlus from '../..'
import { fakeReq } from '../req'

import PageA from '../pages/a.vue'
import PageB from '../pages/b.vue'
import PageC from '../pages/c.vue'
import PageD from '../pages/d.vue'
import PageE from '../pages/e.vue'
import PageA1 from '../pages/a-1.vue'
import PageA2 from '../pages/a-2.vue'
import PageTab from '../pages/tab.vue'

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
      },
      children: [
        {
          path: 'a1',
          component: PageA1
        },
        {
          path: 'a2',
          component: PageA2,
          meta: {
            queryOptions: {
              a1: {
                type: Number,
                default: 1
              }
            }
          }
        }
      ]
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
      component: PageD,
      meta: {
        queryOptions: {
          d: {
            type: Number,
            default: 1
          }
        }
      }
    },
    {
      path: '/e',
      component: PageE,
      meta: {
        queryOptions: {
          e: {
            type: Number,
            default: 1
          }
        }
      }
    },
    {
      path: '/tabs',
      component: PageTab,
      meta: {
        queryOptions: {
          a: {
            type: Number,
            default: 1
          }
        }
      }
    },
    {
      path: '*',
      component: {
        render: h => h('div', '404 page')
      }
    }
  ]
}, {
  maxRedirect: {
    count: 20,
    duration: 3000
  }
})

router.beforeEach(to => {
  nProgress.start()
})

router.beforeEach((to, from, next) => {
  if (to.path === '/b') {
    fakeReq('b').then(() => {
      next('/c')
    })
    return
  }
  if (to.path === '/c') {
    fakeReq('c').then(() => {
      next('/d')
    })
    return
  }
  if (to.path === '/d') {
    fakeReq('d').then(() => {
      next()
    })
    return
  }
  next()
})

router.afterEach(() => {
  nProgress.done()
})

router.onError(err => {
  nProgress.done()
  throw err
})

export default router
