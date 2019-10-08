import { cloneDeep } from '../utils'
export default (to, from, next) => {
  if ('_f' in to.query) {
    delete to.query['_f']
  }
  const queryOptions = to.meta.queryOptions
  const formatedQuery = cloneDeep(to.query)
  if (queryOptions) {
    for (let queryName in queryOptions) {
      const query = queryOptions[queryName]
      const queryType = query.type
      const queryDefaultValue = query.default
      if (queryName in to.query && to.query[queryName] !== undefined) {
        formatedQuery[queryName] = queryType(to.query[queryName])
      } else {
        formatedQuery[queryName] = queryDefaultValue
      }
    }
  }
  to.meta.query = formatedQuery
  next()
}
