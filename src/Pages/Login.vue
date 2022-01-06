<template>
  <div>
    <MyNavBar :isShowLeft="true">登录</MyNavBar>
    <van-form @submit="onSubmit">
      <van-field v-model="username" label-width="45px" name="用户名" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
      <div class="passwordBox">
        <div class="inputBox">
          <van-field id="inputPassword" v-model="password" label-width="45px" type="password" name="密码" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
        </div>
        <span class="isShowPassword">显示密码</span>
        <span class="btnBox">
          <template>
            <van-switch v-model="isShowPassword" size="20"></van-switch>
          </template>
        </span>
      </div>
      <div class="passwordBox">
        <div class="inputBox">
          <van-field id="inputPassword" v-model="captcha_code" label-width="45px" name="验证码" label="验证码" placeholder="验证码" :rules="[{ required: true, message: '验证码' }]" />
        </div>
        <span class="codeBox">
          <template>
            <img @click="getCode" :src="captchaCodeImg" />
          </template>
        </span>
      </div>
      <div class="infoBox">
        <div class="psInfo">温馨提示：</div>
        <div class="psInfo">未注册过的账号，登录时将自动注册</div>
        <div class="psInfo">注册过的用户可凭账号密码直接登录</div>
      </div>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
      <div class="forgetPassword" @click="$router.push('/forget')">忘记密码</div>
    </van-form>
  </div>
</template>

<script>
import { postHttpCode, postHttpLogin } from '@/service//getData.js'
import {mapMutations,mapState} from 'vuex'
import {setStore} from '@/utils/utils.js'
export default {
  data() {
    return {
      username: '',
      password: '',
      captcha_code: '',
      isShowPassword: false,
      captchaCodeImg: '',
      cap:'',
    }
  },
  computed:{
      ...mapState(['loginState'])
  },
  methods: {
      ...mapMutations([
          'WRITE_USERINFO','SET_LOGINSTATE'
      ]),
    async onSubmit() {
      const {data} = await postHttpLogin(this.username, this.password, this.captcha_code,this.cap)
      console.log(data)
      if(data.message){
          this.$toast.fail(data.message);
      }else{
          this.$toast.success('登录成功');
          this.SET_LOGINSTATE(true)
          //记录用户信息
          this.WRITE_USERINFO(data)
          if(this.$router.history.current.path !== '/login'){
              this.$router.go(-1)
          }else{
              //用户直接进入登录页面，直接跳到用户信息页面
              this.$router.replace('/user')
          }
      }
    },
    async getCode() {
      const { data } = await postHttpCode()
      this.captchaCodeImg = data.code
      this.cap=data.cap.toString()
    },
  },
  watch: {
    isShowPassword() {
      var inputPassword = document.querySelector('#inputPassword')
      if (this.isShowPassword) {
        inputPassword.type = ''
      } else {
        inputPassword.type = 'password'
      }
    },
  },
  mounted() {
    this.getCode()
  },
}
</script>

<style lang="less" scoped>
.forgetPassword {
  float: right;
  margin-right: 10px;
  color: rgb(70, 182, 242);
  font-size: 12px;
}
.infoBox {
  margin: 10px;
  float: left;
}
.psInfo {
  color: rgb(155, 155, 155);
  font-size: 12px;
}
.inputBox {
  float: left;
  width: 70%;
}
.btnBox {
  float: right;
  width: 15%;
  margin-top: 10px;
}
.isShowPassword {
  float: right;
  margin-top: 13px;
  margin-right: 5px;
  font-size: 12px;
  color: rgb(177, 177, 177);
}
.codeBox {
  float: right;
  width: 30%;
}
</style>
