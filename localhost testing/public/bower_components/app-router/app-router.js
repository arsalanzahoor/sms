// @license Copyright (C) 2014 Erik Ringsmuth - MIT license
!function(t,e){function a(t,a,r){var i=e.createEvent("CustomEvent");return i.initCustomEvent(t,!1,!0,a),r.dispatchEvent(i)}function r(e){var r=g.parseUrl(t.location.href,e.getAttribute("mode"));if(r.path===m.path&&r.search===m.search&&r.isHashPath===m.isHashPath)return d(r.hash),void 0;m=r;var n={path:r.path};if(a("state-change",n,e)){for(var s=e.firstElementChild;s;){if("APP-ROUTE"===s.tagName&&g.testRoute(s.getAttribute("path"),r.path,e.getAttribute("trailingSlash"),s.hasAttribute("regex")))return i(e,s,r),void 0;s=s.nextSibling}a("not-found",n,e)}}function i(t,e,r){if(e.hasAttribute("redirect"))return t.go(e.getAttribute("redirect"),{replace:!0}),void 0;var i={path:r.path,route:e,oldRoute:t.activeRoute};a("activate-route-start",i,t)&&a("activate-route-start",i,e)&&(t.previousRoute&&t.previousRoute.transitionAnimationInProgress&&l(t.previousRoute),t.activeRoute&&t.activeRoute.removeAttribute("active"),t.previousRoute=t.activeRoute,t.activeRoute=e,t.activeRoute.setAttribute("active","active"),e.hasAttribute("import")?n(t,e.getAttribute("import"),e,r,i):e.hasAttribute("element")?o(t,e.getAttribute("element"),e,r,i):e.firstElementChild&&"TEMPLATE"===e.firstElementChild.tagName&&h(t,e.firstElementChild,e,r,i))}function n(t,a,r,i,n){function o(){s(t,h,a,r,i,n)}var h;v.hasOwnProperty(a)?(h=e.querySelector('link[href="'+a+'"]'),h.import?o():h.addEventListener("load",o)):(v[a]=!0,h=e.createElement("link"),h.setAttribute("rel","import"),h.setAttribute("href",a),h.addEventListener("load",o),e.head.appendChild(h))}function s(t,e,a,r,i,n){r.hasAttribute("active")&&(r.hasAttribute("template")?h(t,e.import.querySelector("template"),r,i,n):o(t,r.getAttribute("element")||a.split("/").slice(-1)[0].replace(".html",""),r,i,n))}function o(t,a,r,i,n){var s=e.createElement(a),o=u(t,r,i,n);for(var h in o)o.hasOwnProperty(h)&&(s[h]=o[h]);c(t,s,i,n)}function h(t,a,r,i,n){var s;if("createInstance"in a){var o=u(t,r,i,n);s=a.createInstance(o)}else s=e.importNode(a.content,!0);c(t,s,i,n)}function u(t,e,r,i){var n=g.routeArguments(e.getAttribute("path"),r.path,r.search,e.hasAttribute("regex"),"auto"===t.getAttribute("typecast"));return(e.hasAttribute("bindRouter")||t.hasAttribute("bindRouter"))&&(n.router=t),i.model=n,a("before-data-binding",i,t),a("before-data-binding",i,i.route),i.model}function c(t,e,r,i){t.hasAttribute("core-animated-pages")&&i.route!==i.oldRoute||p(t.previousRoute),t.activeRoute.appendChild(e),t.hasAttribute("core-animated-pages")&&(t.coreAnimatedPages.selected=t.activeRoute.getAttribute("path"),t.previousRoute&&(t.previousRoute.transitionAnimationInProgress=!0)),r.hash&&!t.hasAttribute("core-animated-pages")&&d(r.hash),a("activate-route-end",i,t),a("activate-route-end",i,i.route)}function l(t){t&&(t.transitionAnimationInProgress=!1,p(t))}function p(t){if(t)for(var e=t.firstChild;e;){var a=e;e=e.nextSibling,"TEMPLATE"!==a.tagName&&t.removeChild(a)}}function d(t){t&&setTimeout(function(){var a=e.querySelector("html /deep/ "+t)||e.querySelector('html /deep/ [name="'+t.substring(1)+'"]');a&&a.scrollIntoView&&a.scrollIntoView(!0)},0)}var g={},v={},f="ActiveXObject"in t,m={},b=Object.create(HTMLElement.prototype);b.util=g,e.registerElement("app-route",{prototype:Object.create(HTMLElement.prototype)}),b.attachedCallback=function(){"manual"!==this.getAttribute("init")&&this.init()},b.init=function(){var a=this;a.isInitialized||(a.isInitialized=!0,a.hasAttribute("trailingSlash")||a.setAttribute("trailingSlash","strict"),a.hasAttribute("mode")||a.setAttribute("mode","auto"),a.hasAttribute("typecast")||a.setAttribute("typecast","auto"),a.hasAttribute("core-animated-pages")&&(a.createShadowRoot(),a.coreAnimatedPages=e.createElement("core-animated-pages"),a.coreAnimatedPages.appendChild(e.createElement("content")),a.coreAnimatedPages.style.position="static",a.coreAnimatedPages.setAttribute("valueattr","path"),a.coreAnimatedPages.setAttribute("transitions",a.getAttribute("transitions")),a.shadowRoot.appendChild(a.coreAnimatedPages),a.coreAnimatedPages.addEventListener("core-animated-pages-transition-end",function(){l(a.previousRoute)})),a.stateChangeHandler=r.bind(null,a),t.addEventListener("popstate",a.stateChangeHandler,!1),f&&t.addEventListener("hashchange",a.stateChangeHandler,!1),r(a))},b.detachedCallback=function(){t.removeEventListener("popstate",this.stateChangeHandler,!1),f&&t.removeEventListener("hashchange",this.stateChangeHandler,!1)},b.go=function(e,a){"pushstate"!==this.getAttribute("mode")&&(e="#"+e),a&&a.replace!==!0?t.history.pushState(null,null,e):t.history.replaceState(null,null,e),r(this)},g.parseUrl=function(t,a){var r={isHashPath:"hash"===a};if("function"==typeof URL){var i=new URL(t);r.path=i.pathname,r.hash=i.hash,r.search=i.search}else{var n=e.createElement("a");n.href=t,r.path=n.pathname,"/"!==r.path.charAt(0)&&(r.path="/"+r.path),r.hash=n.hash,r.search=n.search}if("pushstate"!==a&&("#/"===r.hash.substring(0,2)?(r.isHashPath=!0,r.path=r.hash.substring(1)):"#!/"===r.hash.substring(0,3)?(r.isHashPath=!0,r.path=r.hash.substring(2)):r.isHashPath&&(r.path=0===r.hash.length?"/":r.hash.substring(1)),r.isHashPath)){r.hash="";var s=r.path.indexOf("#");-1!==s&&(r.hash=r.path.substring(s),r.path=r.path.substring(0,s));var o=r.path.indexOf("?");-1!==o&&(r.search=r.path.substring(o),r.path=r.path.substring(0,o))}return r},g.testRoute=function(t,e,a,r){if("ignore"===a&&("/"===e.slice(-1)&&(e=e.slice(0,-1)),"/"!==t.slice(-1)||r||(t=t.slice(0,-1))),r)return g.testRegExString(t,e);if(t===e||"*"===t)return!0;if(-1===t.indexOf("*")&&-1===t.indexOf(":"))return!1;var i=e.split("/"),n=t.split("/");if(i.length!==n.length)return!1;for(var s=0;s<n.length;s++){var o=n[s];if(o!==i[s]&&"*"!==o&&":"!==o.charAt(0))return!1}return!0},g.routeArguments=function(t,e,a,r,i){var n={};if(!r)for(var s=e.split("/"),o=t.split("/"),h=0;h<o.length;h++){var u=o[h];":"===u.charAt(0)&&(n[u.substring(1)]=s[h])}var c=a.substring(1).split("&");1===c.length&&""===c[0]&&(c=[]);for(var l=0;l<c.length;l++){var p=c[l],d=p.split("=");n[d[0]]=d.splice(1,d.length-1).join("=")}if(i)for(var v in n)n[v]=g.typecast(n[v]);return n},g.typecast=function(t){return"true"===t?!0:"false"===t?!1:isNaN(t)||""===t||"0"===t.charAt(0)?decodeURIComponent(t):+t},g.testRegExString=function(t,e){if("/"!==t.charAt(0))return!1;t=t.slice(1);var a="";if("/"===t.slice(-1))t=t.slice(0,-1);else{if("/i"!==t.slice(-2))return!1;t=t.slice(0,-2),a="i"}return new RegExp(t,a).test(e)},e.registerElement("app-router",{prototype:b})}(window,document);