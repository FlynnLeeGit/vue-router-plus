<template>
  <div>Page A $searchQuery {{ $searchQuery }}</div>
</template>

<script>
import { hookWrapper } from "../../src/vue-router-plus";
export default {
  data() {
    return {
      a: 1
    };
  },
  beforeRouteEnter: [
    hookWrapper(() => {
      console.log(1);
    })
  ]
};
</script>