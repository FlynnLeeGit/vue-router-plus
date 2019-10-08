<template>
  <div>
    <ul>
      <li>
        <router-link to="/a">A</router-link>
      </li>
      <li>
        <router-link to="/b">B</router-link>
      </li>
    </ul>
    <p>
      <button @click="pushA">push A</button>
    </p>
    <p>
      <button @click="replaceA">replace A {a:1}</button>
    </p>
    <p>
      <button @click="onReload">onReload</button>
    </p>
    <p>meta.query {{ $route.meta.query }} | query {{ $route.query }}</p>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  methods: {
    pushA() {
      this.$router.push({
        path: "/a",
        query: {
          age: (Math.random() * 20).toFixed(0),
          arr: [1, 23],
          name: ''
        },
        force: true
      });
    },
    replaceA() {
      this.$router.replace({
        path: "/a",
        query: {
          a: 1
        },
        force: true
      });
    },
    onReload() {
      this.$router.reload();
    }
  }
};
</script>