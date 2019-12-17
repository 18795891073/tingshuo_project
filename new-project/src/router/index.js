import Vue from 'vue'
import Router from 'vue-router'
import Check from '../views/teacherLogin/checkStudent.vue'
import Login from '../views/teacherLogin/login.vue'
import Index from '../views/teacherLogin/index.vue'
import User from '../views/teacherLogin/user.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'user',
      component: User
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
    {
      path:'/index',
      name:'index',
      component:Index
    },
    // 练习页面
    {
      path:'/user',
      name:'user',
      component:User
    }
  ]
})
