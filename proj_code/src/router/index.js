import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import LoginReg from '@/components/LoginReg'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/LoginReg',
      name: 'LoginReg',
      component: LoginReg
    },
    {
      path: '/About',
      name: 'About',
      component: About
    }
  ]
})
