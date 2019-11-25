import VueRouter from 'vue-router'
import queryOptions from './before/query-options'
import innerPlusHook from './hook-wrapper'
import store from './store'
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
      // 修复有其他钩子影响query时需要同步变更
      watch: {
        $route(newRoute) {
          if (newRoute.meta.query) {
            this.$searchQuery = newRoute.meta.query
          }
        }
      }
    })
  }
  constructor(routeOptions, routeExtraOptions = {
    maxRedirect: {
      count: 20,
      duration: 3000
    }
  }) {
    super(routeOptions)
    store.maxRedirect = routeExtraOptions.maxRedirect
    this.beforeEach(queryOptions)
  }
  get isHistoryBF() {
    return isHistoryBF
  }
  get to() {
    return store.to
  }
  get from() {
    return store.from
  }
  get next() {
    return store.next
  }
  get maxRedirect() {
    return this.maxRedirect
  }
  beforeEach(fn) {
    return super.beforeEach(plusHook(fn))
  }
  beforeResolve(fn) {
    return super.beforeResolve(plusHook(fn))
  }
  _calcNewLocation(location) {
    const { route } = this.resolve(location)
    const newLocation = {
      path: route.path,
      query: Object.assign(route.query, {
        _f: store._f++
      }),
      params: route.params,
      hash: route.hash
    }
    return newLocation
  }

  /**
   * @param {string} mode replace|push
   * @param {string|object} location
   * @param {Function} onComplete
   * @param {Function} onError
   */
  _goto(mode, location, onComplete, onError) {
    isHistoryBF = false
    const newLocation = this._calcNewLocation(location)
    return super[mode](newLocation, onComplete, onError)
  }
  push(location, onComplete, onError) {
    return this._goto('push', location, onComplete, onError)
  }
  replace(location, onComplete, onError) {
    return this._goto('replace', location, onComplete, onError)
  }
  // // spa reload current Route and force get Data again
  reload(onComplete, onError) {
    const current = this.currentRoute
    this.replace(current.fullPath, onComplete, onError)
  }
}

export const plusHook = innerPlusHook
export default VueRouterPlus
