import Vue from 'vue'
// import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import moment from 'moment'
import $ from 'jquery'
import VDistpicker from 'v-distpicker'


Vue.use(ElementUI)
Vue.config.productionTip = false

// axios.defaults.baseURL = '/pre'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
