<template>
  <div>
    e
    {{ $searchQuery }}
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
    console.log('1111')
    next({
      path: '/e?a=2'
    })
  })
}
</script>