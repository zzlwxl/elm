import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import actions from './action.js'
import mutations from './mutations.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    latitude:'35.088595',//当前维度
    longitude:'113.431843',//当前精度
    geohash:'35.088595,113.431843',//当前位置坐标
    carList:{},//购物车列表,
    userInfo:null,//用户信息
    loginState:false//未登录
  },
  getters,
	actions,
	mutations,
})
