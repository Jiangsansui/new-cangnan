// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Echarts from 'echarts'
import $ from 'jquery'
import axios from 'axios'
Vue.prototype.$axios =axios
Vue.prototype.echarts = Echarts

Vue.prototype.$ = $
Vue.use(Echarts)
Vue.config.productionTip = false
import 'echarts/map/js/province/zhejiang.js'
axios.defaults.baseURL="http://10.10.10.149:9900"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
