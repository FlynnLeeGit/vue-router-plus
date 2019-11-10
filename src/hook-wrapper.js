import store from './store'

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
