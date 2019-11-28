# vue-router-plus

this vue-router-plus is extends from vue-router but plus some features

## notice

vue-router-plus now intergrate `vue-router@3.0.7` because the vue-router 3.1.\* upper use the promise style that will product uncaught promise error,[see this](https://github.com/vuejs/vue-router/issues/2881#issuecomment-520554378)

- all navigation behavior will be **force** style
- routes config support `queryOptions`,and add `$route.meta.query`
- `vm.$searchQuery`
- wrapper function `plusHook`, just wrap the original route hook
- router.isHistoryBF,whether the router is in popstate progressing
- infinite redirect loop will throw Error

### use

```js
import Vue from 'vue'
import VueRouterPlus from 'vue-router-plus'


Vue.use(VueRouterPlus,{
  // same as vue-router options,
  // maxRedirect:{  infinite redirect loop upper limit
  //    count: 20,
  //   duration: 3000
  // }
})


```

### force push && replace

all `route-link` `.push` `.replace` will be force mode,to resolve same route redirect loop problem

```js
// force push some path,even the final path is same, it will append _f query
//  /a?age=1&_f=1
this.$router.push({
  path: '/a',
  query: {
    age: 1
  }
})
```

```js
this.$router.replace({
  path: '/a',
  query: {
    age: 1
  }
})
```

### router.reload()

reload spa will reload with the currentRoute

```js
this.$router.reload()
```

### router.isHistoryBF {boolean}

a tag show whether the user press the browser `forward` or `backward` button

- only effect in `history` mode

### queryOptions

typed query options in routes config meta

routes.js

```js
;[
  {
    path: '/a',
    meta: {
      queryOptions: {
        age: { type: Number, default: 20 },
        name: { type: String, default: 'lee' }
      }
    }
  }
]
```

then route.meta.query will be

- /a -> {age: 20, name: 'lee' }
- /a?age=33 -> {age: 33,name:'lee' }
- /a?age=22&name=cc -> {age:22,name:'cc'}

### plusHook Support

the **plusHook** function can do a lot things that reduce the time on debug vue-router

- resolve the same route loop problem,by always append `_f` query on `next` function
- support `promisable` or `subscribe` style route hook
- auto enabled in global hook like `router.beforeEach` and `router.beforeResolve`

```js
router.beforeEach(to => {
  console.log(to) // sync hook
})
router.beforeEach(to => {
  return Promise.resolve({ // hook will resolved when promise is resolved
    a: 1
  })
})

import {of} from 'rxjs;
router.beforeEach(to=>{
  return of(3) // hook will auto subscribe the stream
})
```

redirect sense

```js
router.beforeEach((to, from, next) => {
  if (to.path === '/parent') {
    next('/parent/child') // -> /prent/child?_f=3
    return // this return prevent the below `next` function excute
  }
  next()
})
```

#### use plusHook in mixin or .vue

a.vue

```html
<script>
  import { plusHook } from 'vue-router-plus'

  export default {
    beforeRouteEnter: plusHook(function(to) {
      console.log(to)
    }),
    beforeRouteUpdate: plusHook(function(to) {
      console.log(this)
      console.log(to)
    })
  }
</script>
```

### \$searchQuery

now vue instance provide a prop name \$searchQuery is equal to to.meta.query

- $searchQuery === $route.meta.query

### extra router prop

same to beforeEach to,from,next

- router.to
- router.from
- router.next
