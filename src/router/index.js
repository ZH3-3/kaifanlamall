import Vue from 'vue'
import VueRouter from 'vue-router'


import Index from '../views/Index.vue'
import Home from '../views/Home/Home.vue'
import Detailss from '../views/Home/Datail/Detailss.vue'
import Userlogin from '../views/Userlogin.vue'
import Myforms from '../views/Myforms.vue'
import Newforms from '../views/Home/Datail/Newforms.vue'
import Endlist from '../views/Home/Datail/Endlist.vue'
import ShoppingCart from '../views/ShoppingCart.vue'
import Login from '../views/Login.vue'

// 解决重复点击导航路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path:'/home',
    name:'Home',
    component:Home
  },
  {
    path:'/detailss',
    name:'Detailss',
    component:Detailss
  },
  {
    path:'/userlogin',
    name:'Userlogin',
    component:Userlogin
  },
  {
    path:'/myforms',
    name:'Myforms',
    component:Myforms
  },
  {
    path:'/newforms',
    name:'Newforms',
    component:Newforms
  },
  {
    path:'/endlist',
    name:'Endlist',
    component:Endlist
  },
  {
    path:'/shoppingCart',
    name:ShoppingCart,
    component:ShoppingCart
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  },
 
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
