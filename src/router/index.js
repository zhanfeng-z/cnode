import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Message from '@/pages/Message'
import Detail from '@/pages/Detail'
import User from '@/pages/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/message',
      name: 'message',
      component: Message
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/user',
      name: 'user',
      component: User
    }
  ]
})
