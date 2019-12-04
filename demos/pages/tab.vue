<template>
  <div class="">
    <router-link to='./tabs?a=1'>a1</router-link>
    <router-link to='./tabs?a=2'>a2</router-link>
    <router-link to='./tabs?a=3'>a3</router-link>
  </div>
</template>

<script>
import { fakeReq } from '../req'

export default {
  name: '',

  components: {},

  props: {},

  data() {
    return {}
  },

  computed: {},

  async: {},

  mounted() {},

  methods: {},

  beforeEach(to, from) {
    return fakeReq('tab-update')
  }
}
</script>

<style lang="less" scoped></style>
