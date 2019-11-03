import VueRouter from 'vue-router'
import queryOptions from './before/query-options'
import * as utils from './utils'
let isHistoryBF = false

class VueRouterPlus extends VueRouter {
  static install(Vue) {
    Vue.use(VueRouter)
    window.addEventListener('popstate', () => {
      isHistoryBF = true
    })
    Vue.mixin({
      beforeCreate() {
        if (this.$route) {
          Vue.util.defineReactive(this, '$searchQuery', this.$route.meta.query)
        }
      },
      beforeRouteUpdate(to, from, next) {
        if (this.$route) {
          this.$searchQuery = this.$route.meta.query
        }
        next()
      }
    })
  }
  constructor(routeOptions) {
    super(routeOptions)

    this._forceCount = 1
    this.from = {}
    this.to = {}

    this.beforeEach(queryOptions)
  }
  get isHistoryBF() {
    return isHistoryBF
  }
  beforeEach(fn) {
    return super.beforeEach((to, from, next) => {
      this.from = from
      this.to = to
      return hookWrapper(fn)(to, from, next)
    })
  }
  beforeResolve(fn) {
    return super.beforeResolve(utils.hookWrapper(fn))
  }
  redirect(redirectLocation, onComplete, onError) {
    // shoud call this with return this.router.redirect({...})
    return Promise.resolve().then(() => {
      this.replace(redirectLocation, onComplete, onError)
    })
  }
  /**
   * @param {string} mode replace|push
   * @param {string|object} location
   * @param {Function} onComplete
   * @param {Function} onError
   */
  _goto(mode, location, onComplete, onError) {
    isHistoryBF = false
    // if this is router-link href,just use it,can prevent same url redirect
    // if (location && location._normalized) {
    //   return super[mode](location, onComplete, onError)
    // }

    const { route } = this.resolve(location)
    const newLocation = {
      path: route.path,
      query: Object.assign(route.query, {
        _f: this._forceCount++
      }),
      params: route.params,
      hash: route.hash
    }
    return super[mode](newLocation, onComplete, onError)
  }
  push(location, onComplete, onError) {
    return this._goto('push', location, onComplete, onError)
  }
  replace(location, onComplete, onError) {
    return this._goto('replace', location, onComplete, onError)
  }
  // spa reload current Route and force get Data again
  reload(onComplete, onError) {
    const current = this.currentRoute
    this.replace(current.fullPath, onComplete, onError)
  }
}

export const hookWrapper = utils.hookWrapper
export default VueRouterPlus
