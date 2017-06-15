import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Message from '@/pages/Message'
import Detail from '@/pages/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      mate: { keepAlive: true }
    },
    {
      path: '/message',
      name: 'message',
      component: Message,
      mate: { keepAlive: false }
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
      mate: { keepAlive: true }
    }
  ]
})
