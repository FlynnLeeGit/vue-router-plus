<template>
  <div>
    Page A $searchQuery {{ $searchQuery }}
    {{a}}
    <router-link to='./a1'>a1</router-link>
    <router-link to='./a2'>a2</router-link>
    <router-view />
  </div>
</template>

<script>
import { plusHook } from '../..'
import { fakeReq } from '../req'

export default {
  data() {
    return {
      a: 1
    }
  },
  beforeRouteEnter: plusHook((to, from, next) => {
    fakeReq('enter-a').then(() => {
      if (to.path === '/a') {
        next('/a/a1')
      } else {
        next()
      }
    })
  }),
  beforeRouteUpdate: plusHook((to, from, next) => {
    if (to.path === '/a') {
      next('/a/a1')
      return
    }
    return next()
  })
}
</script>