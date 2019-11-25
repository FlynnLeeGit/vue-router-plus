/**
 * vue-router-plus v0.2.4 
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("vue-router")):"function"==typeof define&&define.amd?define(["exports","vue-router"],t):t((e=e||self).VueRouterPlus={},e.VueRouter)}(this,(function(e,t){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function o(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function i(e,t){return(i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function a(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function c(e,t,r){return(c="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,r){var n=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=u(e)););return e}(e,t);if(n){var o=Object.getOwnPropertyDescriptor(n,t);return o.get?o.get.call(r):o.value}})(e,t,r||e)}t=t&&t.hasOwnProperty("default")?t.default:t;var f=function(e){"_f"in e.query&&delete e.query._f;var t,r=e.meta.queryOptions,n=(t=e.query,JSON.parse(JSON.stringify(t)));if(r)for(var o in r){var u=r[o],i=u.type,a=u.default;o in e.query&&void 0!==e.query[o]?n[o]=i(e.query[o]):n[o]=a}e.meta.query=n},s={_f:1,to:{},from:{},next:null,_pageStage:{num:1,start_timestamp:0,path:""},maxRedirect:{times:20,duration:3e3}},l=function(e){return"string"==typeof e?(e.includes("?")?e+="&_f=".concat(s._f++):e+="?_f=".concat(s._f++),e):"object"===r(e)?(e.query=e.query||{},e.query._f=s._f++,e):e},p=!1,y=
/* */
function(e){function r(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{maxRedirect:{times:20,duration:3e3}};return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,r),t=a(this,u(r).call(this,e)),s.maxRedirect=n.maxRedirect,t.beforeEach(f),t}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&i(e,t)}(r,e),o(r,null,[{key:"install",value:function(e){e.use(t),window.addEventListener("popstate",(function(){p=!0})),e.mixin({beforeCreate:function(){this.$route&&e.util.defineReactive(this,"$searchQuery",this.$route.meta.query)},watch:{$route:function(e){e.meta.query&&(this.$searchQuery=e.meta.query)}}})}}]),o(r,[{key:"beforeEach",value:function(e){return c(u(r.prototype),"beforeEach",this).call(this,h(e))}},{key:"beforeResolve",value:function(e){return c(u(r.prototype),"beforeResolve",this).call(this,h(e))}},{key:"_calcNewLocation",value:function(e){var t=this.resolve(e).route;return{path:t.path,query:Object.assign(t.query,{_f:s._f++}),params:t.params,hash:t.hash}}
/**
       * @param {string} mode replace|push
       * @param {string|object} location
       * @param {Function} onComplete
       * @param {Function} onError
       */},{key:"_goto",value:function(e,t,n,o){p=!1;var i=this._calcNewLocation(t);return c(u(r.prototype),e,this).call(this,i,n,o)}},{key:"push",value:function(e,t,r){return this._goto("push",e,t,r)}},{key:"replace",value:function(e,t,r){return this._goto("replace",e,t,r)}},{key:"reload",value:function(e,t){var r=this.currentRoute;this.replace(r.fullPath,e,t)}},{key:"isHistoryBF",get:function(){return p}},{key:"to",get:function(){return s.to}},{key:"from",get:function(){return s.from}},{key:"next",get:function(){return s.next}},{key:"maxRedirect",get:function(){return this.maxRedirect}}]),r}(t),h=function(e){return function(t,r,n){function o(e){if(o._isUsed)throw new Error('[vue-router-plus] next callback is called more than twice,"'.concat(r.fullPath,'" -> "').concat(t.fullPath,'"'));var u=l(e);o._isUsed=!0,n(u)}var u=t,i=r;if(s.to=u,s.from=r,s.next=o,s._pageStage.path===u.path){if(s._pageStage.num++,(new Date).getTime()-s._pageStage.start_timestamp<s.maxRedirect.duration&&s._pageStage.num>s.maxRedirect.times)throw s._pageStage.path="",s._pageStage.num=1,s._pageStage.start_timestamp=0,new Error("[vue-router-plus] current Page is reload to many times\n      }")}else s._pageStage.path=u.path,s._pageStage.num=1,s._pageStage.start_timestamp=(new Date).getTime();var a=e.call(this,u,i,o);if(e.length>2)a&&(a.then||a.subscribe)&&n(new Error("[vue-router-plus] can not use next() and (Promise or Observable) together".concat(e.name?" -> "+e.name:"")));else{if(void 0===a)return void o();if(!1===a)return;if(a.then)return void a.then((function(){o()})).catch((function(e){o(new Error(e))}));if(a.subscribe)return void a.subscribe((function(){o()}),(function(e){o(new Error(e))}))}return a}};e.default=y,e.plusHook=h,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=vue-router-plus.js.map
