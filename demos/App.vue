<template>
  <div>
    <ul>
      <li>
        <router-link to="/a">A</router-link>
      </li>
      <li>
        <router-link to="/a?age=6">A /a?age=6</router-link>
      </li>
      <li>
        <router-link to="/b">B</router-link>
      </li>
      <li>
        <router-link to="/c">C</router-link>
      </li>
      <li>
        <router-link to="/d">D</router-link>
      </li>
      <li>
        <router-link to="/e">E</router-link>
      </li>
      <li>
        <router-link to="/tabs?_f=1">tabs</router-link>
      </li>
    </ul>
    <p>
      <button @click="pushA">push A</button>
    </p>
    <p>
      <button @click="replaceA">replace A</button>
    </p>
    <p>
      <button @click="onReload">router.reload()</button>
    </p>
    <p>meta.query {{ $route.meta.query }} | query {{ $route.query }}</p>

    <!-- <button @click="onRedirect">redirect</button> -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  methods: {
    pushA() {
      this.$router.push({
        path: '/a',
        query: {
          age: (Math.random() * 20).toFixed(0),
          arr: [1, 23],
          name: ''
        }
      })
    },
    replaceA() {
      this.$router.replace({
        path: '/a',
        query: {
          a: 1
        }
      })
    },
    onReload() {
      this.$router.reload()
    }
  }
}
</script>