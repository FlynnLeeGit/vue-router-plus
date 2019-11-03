// 1. 确保在声明补充的类型之前导入 'vue'
import VueRouter, { Location } from 'vue-router'

export class VueRouterPlus extends VueRouter {
  redirect(location: Location): void
}

export default VueRouterPlus
