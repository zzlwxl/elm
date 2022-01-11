import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/Vant.js'
import 'vant/lib/index.less';
import MyNavBar from '@/MyUI/'

import axios from 'axios'

Vue.mixin(MyNavBar)
Vue.config.productionTip = false
Vue.config.devtools = true;
axios.defaults.baseURL='http://elm.wangxuelong.vip:8001/'
Vue.prototype.$http=axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
