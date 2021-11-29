import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/Vant.js'
import 'vant/lib/index.less';

import axios from 'axios'


Vue.config.productionTip = false
Vue.config.productionTip = false
axios.defaults.baseURL='http://item.wangxuelong.vip:8001/'
Vue.prototype.$http=axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
