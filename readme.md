# vue-router-plus

this vue-router-plus is extends from vue-router but add some base functions

### force push && replace

```js
// force push some path,even the final path is same, it will append _f query
this.$router.push({
  path: '/a',
  query: {
    age: 1
  },
  force: true  // /a?age=1&_f=1 
})
```


```js
this.$router.replace({
  path: '/a',
  query: {
    age: 1
  },
  replace: true  
})

```


### router.reload()
reload spa will force router reload,rerun the router hooks


### router.isHistoryBF {boolean}
a tag show whether the user press the browser `forward` or `backward` button 

* only effect in `history` mode


### router.beforeEach add queryOptions
typed query options in router meta

routes.js
```js
[
  {
    path:'/a',
    meta:{
      queryOptions:{
        age: { type:Number, default:20 },
        name: {type: String,default: 'lee'}
      }
    }
  }
]


```
route.meta.query will be
* /a -> {age: 20, name: 'lee' }
* /a?age=33 -> {age: 33,name:'lee' }
* /a?age=22&name=cc -> {age:22,name:'cc'}
