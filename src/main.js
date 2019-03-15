// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";
// import '@/assets/styles/index.scss'
import '@/router/index.js'

import 'muse-ui/lib/styles/base.less';
import { Icon} from 'muse-ui';
import 'muse-ui/lib/styles/theme.less';

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Icon)

router.beforeEach((to, from, next) => {
  if (to.path === '/login')
    next()
  else {
    if (!(sessionStorage.getItem("currentUser")))
      next('/login')//没有登录直接转到登录界面
    else
      next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
