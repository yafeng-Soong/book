import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/Login.vue'
import ModifyInfo from "../views/person/ModifyInfo";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect:'/welcome',
      children: [
        {
          path: '/welcome',
          name: 'Welcome',
          component: resolve=> require(['@/views/Welcome'],resolve),
          meta:{title:'欢迎'}
        },
        {
          path: '/searchBooks',
          name: 'SearchBooks',
          component: resolve => require(['@/views/books/SearchBooks'],resolve),
          meta:{title:'图书市场'}
        },
        {
          path:'/myBooks',
          name: 'MyBooks',
          component: resolve => require(['@/views/books/MyBooks'],resolve),
          meta:{title:'我的书架'}
        },
        {
          path: '/modifyInfo',
          name: 'ModifyInfo',
          component: resolve => require(['@/views/person/ModifyInfo'],resolve),
          meta:{title:'个人信息'}
        },
        {
          path: '/bookInfo',
          name: 'BookInfo',
          component: resolve => require(['@/views/books/BookInfo'],resolve),
          meta:{title:'图书详情'}
        }
      ]
    }
  ]
})
