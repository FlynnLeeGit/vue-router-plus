<template>
  <div>
    a-1
    <button @click="refresh">refresh</button>
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
    console.log('enter-a1')
    next()
  }),
  beforeRouteUpdate: plusHook(() => {
    return fakeReq('a1-update')
  }),
  methods: {
    refresh() {
      this.$router.push({
        query: {
          c: Math.random()
            .toString(16)
            .slice(2)
        }
      })
    }
  }
}
</script>