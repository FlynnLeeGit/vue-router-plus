import store from './store'
const maxJumpTimes = 30
const maxDuration = 3000
const createHref = location => {
  if (typeof location === 'string') {
    if (location.includes('?')) {
      location += `&_f=${store._f++}`
    } else {
      location += `?_f=${store._f++}`
    }
    return location
  }
  if (typeof location === 'object') {
    location.query = location.query || {}
    location.query._f = store._f++
    return location
  }
  return location
}

const hookWrapper = fn =>
  function(to, from, next) {
    function _next(arg) {
      if (_next._isUsed) {
        throw new Error(
          `[vue-router-plus] next callback is called more than twice,"${from.fullPath}" -> "${to.fullPath}"`
        )
      }

      // tag the next function is used status

      const newLocation = createHref(arg)
      _next._isUsed = true
      next(newLocation)
    }
    const _to = to
    const _from = from

    store.to = _to
    store.from = from
    store.next = _next
    if (store._pageStage.path === _to.path) {
      store._pageStage.num++
      let currentTimeStamp = new Date().getTime()
      // 在当前路径下已持续跳转xx秒,跳转次数超过xx次
      let currentDuration = currentTimeStamp - store._pageStage.start_timestamp
      if (
        currentDuration < maxDuration &&
        store._pageStage.num > maxJumpTimes
      ) {
        // 清空记录栈信息
        store._pageStage.path = ''
        store._pageStage.num = 1
        store._pageStage.start_timestamp = 0
        throw new Error(`[vue-router-plus] current Page is reload to many times
      }`)
      }
    } else {
      // 路径变化,清空记录栈信息
      store._pageStage.path = _to.path
      store._pageStage.num = 1
      store._pageStage.start_timestamp = new Date().getTime()
    }
    // use orginal context
    const ret = fn.call(this, _to, _from, _next)
    // 形参大于2个
    if (fn.length > 2) {
      if (ret && (ret.then || ret.subscribe)) {
        next(
          new Error(
            `[vue-router-plus] can not use next() and (Promise or Observable) together${
              fn.name ? ' -> ' + fn.name : ''
            }`
          )
        )
      }
    } else {
      if (ret === undefined) {
        _next()
        return
      }
      if (ret === false) {
        return
      }
      // process promise
      if (ret.then) {
        ret
          .then(() => {
            _next()
          })
          .catch(e => {
            _next(new Error(e))
          })
        return
      }
      // process subscribe
      if (ret.subscribe) {
        ret.subscribe(
          () => {
            _next()
          },
          e => {
            _next(new Error(e))
          }
        )
        return
      }
    }
    return ret
  }
export default hookWrapper
