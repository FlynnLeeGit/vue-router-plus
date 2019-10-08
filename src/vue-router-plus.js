import VueRouter from 'vue-router'
import queryOptions from './before/query-options'
import { isString, cloneDeep } from './utils'

let isHistoryBF = false

class VueRouterPlus extends VueRouter {
  static install(Vue) {
    Vue.use(VueRouter)
    window.addEventListener('popstate', () => {
      isHistoryBF = true
    })
  }
  constructor(routeOptions) {
    super(routeOptions)
    this.beforeEach(queryOptions)
    this._forceCount = 1
  }
  get isHistoryBF() {
    return isHistoryBF
  }
  _goto(mode, location, onComplete, onError) {
    isHistoryBF = false
    if (isString(location)) {
      super[mode](location, onComplete, onError)
      return
    }
    if (!location.force) {
      super[mode](location, onComplete, onError)
      return
    }

    location.query = location.query || {}

    const toLocation = cloneDeep(location)
    toLocation.query._f = this._forceCount++

    if (mode === 'push') {
      // keep _f query
      super[mode](toLocation, onComplete, onError)
    }
    if (mode === 'replace') {
      const oriLocation = cloneDeep(location)
      oriLocation.query._f = undefined
      const oriHref = this.resolve(oriLocation).href
      super[mode](
        toLocation,
        () => {
          setTimeout(() => {
            window.history.replaceState(null, null, oriHref)
            onComplete && onComplete()
          })
        },
        onError
      )
    }
  }
  push(location, onComplete, onError) {
    this._goto('push', location, onComplete, onError)
  }
  replace(location, onComplete, onError) {
    this._goto('replace', location, onComplete, onError)
  }
  // spa reload current Route and force get Data again
  reload(onComplete, onError) {
    const current = this.currentRoute
    this.replace(
      {
        path: current.path,
        query: current.query,
        params: current.params,
        hash: current.hash,
        force: true
      },
      onComplete,
      onError
    )
  }
}

export default VueRouterPlus
