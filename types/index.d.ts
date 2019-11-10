// 1. 确保在声明补充的类型之前导入 'vue'
import VueRouter, { Location, Route, NavigationGuard } from 'vue-router'

export class VueRouterPlus extends VueRouter {
  to: Route
  from: Route
  next: NavigationGuard
}

export default VueRouterPlus
