<template>
  <div>a-1</div>
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
    console.log('enter-a1')
    next()
  }),
  beforeRouteUpdate: plusHook(() => {
    return fakeReq('a1-update')
  })
}
</script>