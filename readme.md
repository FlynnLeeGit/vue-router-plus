# vue-router-plus

this vue-router-plus is extends from vue-router but add some base functions

### force push && replace

all route-link .push .replace will be force mode
this resolve the self loop problem

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

### router.redirect(location)

now you can just type

```js
router.beforeEach(to => {
  if (to.name === 'a') {
    // notice here you should return,actually it's a promise
    return router.redirect('/b')
  }
})
```

to redirect any target location, in any hook,don't need to judge where the route from

### router.isHistoryBF {boolean}

a tag show whether the user press the browser `forward` or `backward` button

- only effect in `history` mode

### router.beforeEach add queryOptions

typed query options in router meta

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

route.meta.query will be

- /a -> {age: 20, name: 'lee' }
- /a?age=33 -> {age: 33,name:'lee' }
- /a?age=22&name=cc -> {age:22,name:'cc'}

### router.beforeEach,router.beforeResolve

these two api now support promise or subscribe mode,no need to use `next` function
now it only support `router.beforeEach` && `router.beforeResolve` hook

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

### use promisable hook in mixin or .vue

hookWrapper function can turn a `next` callback style hook to promisable or observable hook,just wrapper the original `next` style hook

a.vue

```html
<script>
  import { hookWrapper } from 'vue-router-plus'

  export default {
    beforeRouteEnter: hookWrapper(function(to) {
      console.log(to)
    }),
    beforeRouteUpdate: hookWrapper(function(to) {
      console.log(this)
      console.log(to)
    })
  }
</script>
```

### router.to,router.from

router.to is equal to every hook s to router.from is equal to every hook s from

```js
console.log(this.$router.to)
```

### alias

now vue instance provide a prop name \$searchQuery is equal to to.meta.query

- $searchQuery === $route.meta.query
