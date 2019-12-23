import Vue from 'vue'
// import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import moment from 'moment'
import $ from 'jquery'
// 省市区级联
import VDistpicker from 'v-distpicker'
// 图片验证码
import SIdentify from './components/identify'


Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.component("SIdentify",SIdentify)


// axios.defaults.baseURL = '/pre'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
