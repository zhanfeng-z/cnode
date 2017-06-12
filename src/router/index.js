import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Message from '@/pages/Message'

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
    }
  ]
})
