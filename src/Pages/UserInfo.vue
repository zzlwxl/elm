<template>
  <div>
    <div v-show="routerFlag">
      <MyNavBar :isShowLeft="true">基本信息</MyNavBar>
      <van-cell :center="true" value="头像" is-link>
        <template #right-icon>
          <div class="useImgBox"><van-icon class="userImg" name="manager-o" size="40" /></div>
        </template>
      </van-cell>
      <van-cell @click="text()" is-link to="/userinfo/setusername">
        <template #title>
          <span class="custom-title">{{ username }}</span>
        </template>
      </van-cell>
      <van-cell @click="text()" to="/userinfo/address" is-link>
        <template #title>
          <span class="custom-title">收货地址</span>
        </template>
      </van-cell>
      <van-cell value="修改" @click="text()" to="/forget" is-link>
        <template #title>
          <span class="custom-title">登录密码</span>
        </template>
      </van-cell>
      <van-button class="outBtn" @click="outLogin" round type="danger" size="large">退出</van-button>
    </div>
    <div v-show="!routerFlag">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import {removeStore} from '@/utils/utils.js'
export default {
  data() {
    return {
        //路由切换父组件隐藏
      routerFlag: false,
      username: '',
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    ...mapMutations(['SET_LOGINSTATE','OUT_LOGIN']),
    init() {
      this.username = this.userInfo.username
    },
    text(){
        console.log('改了一次')
        this.routerFlag=false
    },
    outLogin(){
        removeStore('user_id')
        this.$router.push('/user')
        this.OUT_LOGIN()
    }
  },
  mounted() {
      console.log('组件被创建了',this.routerFlag)
  },
  deactivated() {
      console.log('组件被缓存了',this.routerFlag)
      this.routerFlag=false
  },
  activated() {
    console.log('组件被激活了',this.routerFlag)
    this.routerFlag = true
    this.userInfo && this.init()
  },
  watch: {
    userInfo() {
      this.userInfo && this.init()
    },
  },
}
</script>

<style lang="less" scoped>
.outBtn {
  margin-top: 10px;
}
.useImgBox {
  float: left;
  width: 50px;
  height: 50px;
  text-align: center;
  background-color: rgb(157, 234, 255);
  border-radius: 50%;
}
.userImg {
  margin: 5px auto;
}
</style>
