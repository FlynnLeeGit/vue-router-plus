/**
 * vue-router-plus v0.0.2 
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("vue-router")):"function"==typeof define&&define.amd?define(["vue-router"],t):(e=e||self).VueRouterPlus=t(e.VueRouter)}(this,function(e){"use strict";function t(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function r(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}function n(e){return(n=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function o(e,t){return(o=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function u(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function i(e,t,r){return(i="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,r){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=n(e)););return e}(e,t);if(o){var u=Object.getOwnPropertyDescriptor(o,t);return u.get?u.get.call(r):u.value}})(e,t,r||e)}e=e&&e.hasOwnProperty("default")?e.default:e;var f=function(e){return JSON.parse(JSON.stringify(e))},c=function(e,t,r){"_f"in e.query&&delete e.query._f;var n=e.meta.queryOptions,o=f(e.query);if(n)for(var u in n){var i=n[u],c=i.type,a=i.default;u in e.query&&void 0!==e.query[u]?o[u]=c(e.query[u]):o[u]=a}e.meta.query=o,r()},a=!1;
/* */
return function(t){function l(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),(t=u(this,n(l).call(this,e))).beforeEach(c),t._forceCount=1,t}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&o(e,t)}(l,e),r(l,null,[{key:"install",value:function(t){t.use(e),window.addEventListener("popstate",function(){a=!0})}}]),r(l,[{key:"_goto",value:function(e,t,r,o){if(a=!1,"string"!=typeof t)if(t.force){t.query=t.query||{};var u=f(t);if(u.query._f=this._forceCount++,"push"===e&&i(n(l.prototype),e,this).call(this,u,r,o),"replace"===e){var c=f(t);c.query._f=void 0;var s=this.resolve(c).href;i(n(l.prototype),e,this).call(this,u,function(){setTimeout(function(){window.history.replaceState(null,null,s),r&&r()})},o)}}else i(n(l.prototype),e,this).call(this,t,r,o);else i(n(l.prototype),e,this).call(this,t,r,o)}},{key:"push",value:function(e,t,r){this._goto("push",e,t,r)}},{key:"replace",value:function(e,t,r){this._goto("replace",e,t,r)}},{key:"reload",value:function(e,t){var r=this.currentRoute;this.replace({path:r.path,query:r.query,params:r.params,hash:r.hash,force:!0},e,t)}},{key:"isHistoryBF",get:function(){return a}}]),l}()});
//# sourceMappingURL=vue-router-plus.js.map
