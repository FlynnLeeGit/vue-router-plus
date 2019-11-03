export const cloneDeep = s => JSON.parse(JSON.stringify(s))

export const hookWrapper = fn =>
  function(to, from, next) {
    // use orginal context
    const ret = fn.call(this, to, from, next)
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
        next()
        return
      }
      // process promise
      if (ret.then) {
        ret
          .then(() => {
            next()
          })
          .catch(e => {
            next(new Error(e))
          })
      }
      // process subscribe
      if (ret.subscribe) {
        ret.subscribe(
          () => {
            next()
          },
          e => {
            next(new Error(e))
          }
        )
      }
    }
    return ret
  }
