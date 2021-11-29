import Vue from 'vue'
import Router from 'vue-router'
import Msite from '@/Pages/Msite.vue'
import Home from '@/Pages/Home.vue'
import City from '@/Pages/City.vue'
import Food from '@/Pages/Food.vue'
Vue.use(Router)

const router=new Router({
  routes :[
    {path:'/',redirect:'/msite',component:Msite},
    {path:'/msite/',component:Msite},
    {path:'/home',component:Home},
    {path:'/city/:id',component:City,props:true},
    {path:'/food',component:Food},
  ]
})
router.beforeEach((to,from,next)=>{
  next()
})

export default router
