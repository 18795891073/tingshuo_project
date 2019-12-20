import Vue from 'vue'
import Router from 'vue-router'
import Check from '../views/teacherLogin/checkStudent.vue'
import Login from '../views/teacherLogin/login.vue'
import Index from '../views/teacherLogin/index.vue'
import User from '../views/teacherLogin/user.vue'
import Reward from '../views/teacherLogin/myReward.vue'
import ShoppingCar from '../views/teacherLogin/myShoppingCar.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    // 作文筛选页面
    {
      path:'/check',
      name:'check',
      component:Check
    },
    // 登录页面
    {
      path:'/login',
      name:'login',
      component:Login
    },
    // 主页
    {
      path:'/index',
      name:'index',
      component:Index
    },
    // 用户页面
    {
      path:'/user',
      name:'user',
      component:User
    },
    // 报酬页面
    {
      path:'/reward',
      name:'reward',
      component:Reward
    },
    // 购物车页面
    {
      path:'/shoppingCar',
      name:'shoppingCar',
      component:ShoppingCar
    }
  ]
})
