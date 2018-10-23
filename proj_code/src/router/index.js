import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import LoginReg from '@/components/LoginReg'
import About from '@/components/About'
import GetBackPswd from '@/components/GetBackPswd'
import TermsOfUse from '@/components/TermsOfUse'
import Intro from '@/components/Intro'
import MainHome from '@/components/MainHome'
import Home from '@/components/Home'
import Invest from '@/components/Invest'
import Wallet from '@/components/Wallet'
import Share from '@/components/Share'
import Help from '@/components/Help'
import MyProfile from '@/components/MyProfile'
import BindMobile from '@/components/BindMobile'
import BankCard from '@/components/BankCard'
import Indexes from '@/components/Indexes'
import Hall from '@/components/Hall'
import Payment from '@/components/Payment'
import Bills from '@/components/Bills'
import Trades from '@/components/Trades'
import Withdraw from '@/components/Withdraw'
import Coupons from '@/components/Coupons'

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
      path: '/Intro',
      name: 'Intro',
      component: Intro
    },
    {
      path: '/About',
      name: 'About',
      component: About
    },
    {
      path: '/GetBackPswd',
      name: 'GetBackPswd',
      component: GetBackPswd
    },
    {
      path: '/TermsOfUse',
      name: 'TermsOfUse',
      component: TermsOfUse
    },
    {
      path: '/MainHome',
      name: 'MainHome',
      component: MainHome,
      children:[
        {
          path: 'Home',
          name: 'Home',
          component: Home
        },
        {
          path: 'Invest',
          name: 'Invest',
          component: Invest
        },
        {
          path: 'Wallet',
          name: 'Wallet',
          component: Wallet
        },
        {
          path: 'Share',
          name: 'Share',
          component: Share
        },
        {
          path: 'Help',
          name: 'Help',
          component: Help
        },
      ]
    },
    {
      path: '/MyProfile',
      name: 'MyProfile',
      component: MyProfile
    },
    {
      path: '/BindMobile',
      name: 'BindMobile',
      component: BindMobile
    },
    {
      path: '/BankCard',
      name: 'BankCard',
      component: BankCard
    },
    {
      path: '/Indexes',
      name: 'Indexes',
      component: Indexes
    },
    {
      path: '/Hall',
      name: 'Hall',
      component: Hall
    },
    {
      path: '/Payment',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/Bills',
      name: 'Bills',
      component: Bills
    },
    {
      path: '/Trades',
      name: 'Trades',
      component: Trades
    },
    {
      path: '/Withdraw',
      name: 'Withdraw',
      component: Withdraw
    },
    {
      path: '/Coupons',
      name: 'Coupons',
      component: Coupons
    },
  ]
})
