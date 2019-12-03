// 1. 确保在声明补充的类型之前导入 'vue'
import VueRouter, {
  Location,
  Route,
  RawLocation,
  RouteConfig as VueRouteConfig
} from 'vue-router'

export class VueRouterPlus extends VueRouter {
  to: Route
  from: Route
  next: (to?: RawLocation | false | ((vm: any) => any) | void) => void
  isHistoryBF: Boolean
}

interface QueryOption {
  default?: number | string
  type: NumberConstructor | StringConstructor
}

export interface QueryOptions {
  [queryName: string]: QueryOption
}

export interface RouteConfigMeta {
  [key: string]: any
  queryOptions?: QueryOptions
}

export interface RouteConfig extends VueRouteConfig {
  children?: RouteConfig[]
  meta?: RouteConfigMeta
}

export { Location, Route, RawLocation }

export default VueRouterPlus
