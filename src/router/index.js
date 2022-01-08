import Vue from 'vue'
import Router from 'vue-router'
import Msite from '@/Pages/Msite.vue'
import Home from '@/Pages/Home.vue'
import City from '@/Pages/City.vue'
import Food from '@/Pages/Food.vue'
import Search from '@/Pages/Search.vue'
import Shop from '@/components/RestaurantInfo.vue'
import User from '@/Pages/User.vue'
import Order from '@/Pages/Order.vue'
import VipCard from '@/Pages/VipCard.vue'
import Service from '@/Pages/Service.vue'
import Login from '@/Pages/Login.vue'
import UserInfo from '@/Pages/UserInfo.vue'
import Forget from '@/Pages/Forget.vue'
import SetUserName from '@/Pages/SetUserName.vue'
import Address from '@/Pages/Address.vue'
import AddressAdd from '@/Pages/AddressAdd.vue'
import Null from '@/Pages/Null.vue'

import { getStore } from '@/utils/utils.js'
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/msite', component: Msite },
    {
      path: '/msite/',
      component: Msite,
      meta: {
        keepAlive: true,
      },
    },
    { path: '/home', component: Home },
    { path: '/city/:id', component: City, props: true },
    { path: '/food', component: Food },
    { path: '/search', component: Search },
    {
      path: '/shop',
      component: Shop,
      meta: {
        keepAlive: true,
      },
    },
    { path: '/user', component: User },
    { path: '/order', component: Order },
    { path: '/vipCard', component: VipCard },
    { path: '/service', component: Service },
    { path: '/login', component: Login },
    {
      path: '/userinfo',
      component: UserInfo,
      meta: {
        keepAlive: true,
        login_require: true,
      },
      children: [
        { path: 'setusername', component: SetUserName },
        { path: 'addressedit',component:Null,
        children:[
          {path:'address',component:Address},
          {path:'addressadd',component:AddressAdd},
        ]},
      ],
    },
    { path: '/forget', component: Forget },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') next()
  const session = getStore('user_id')
  //访问的是包含用户信息的页面且session没有用户信息，就跳到登录页面
  if (to.matched.some(function (config) {
      return config.meta.login_require
    }) && !session) {
    next('/login')
  } else next()
})

export default router
