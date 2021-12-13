import Vue from 'vue'
import Router from 'vue-router'
import Msite from '@/Pages/Msite.vue'
import Home from '@/Pages/Home.vue'
import City from '@/Pages/City.vue'
import Food from '@/Pages/Food.vue'
import Search from '@/Pages/Search.vue'
import Shop from '@/components/RestaurantInfo.vue'
Vue.use(Router)

const router=new Router({
  routes :[
    {path:'/',redirect:'/msite',component:Msite},
    {path:'/msite/',component:Msite,meta:{
      keepAlive:true
    }},
    {path:'/home',component:Home},
    {path:'/city/:id',component:City,props:true},
    {path:'/food',component:Food},
    {path:'/search',component:Search},
    {path:'/shop',component:Shop},
  ]
})
router.beforeEach((to,from,next)=>{
  next()
})

export default router
