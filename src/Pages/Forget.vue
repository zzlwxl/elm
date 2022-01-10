<template>
  <div>
    <MyNavBar :isShowLeft="true">重置密码</MyNavBar>
    <van-form @submit="changePassword">
      <van-field v-model="username" label-width="45px" name="用户名" label="用户名" placeholder="用户名" :rules="[{ required: true }]" />
      <div class="passwordBox">
        <div class="inputBox">
          <van-field id="inputPassword" v-model="oldpassWord" label-width="45px" type="password" name="旧密码" label="旧密码" placeholder="旧密码" :rules="[{ required: true }]" />
        </div>
      </div>
      <div class="passwordBox">
        <div class="inputBox">
          <van-field id="inputPassword" v-model="newpassword" label-width="45px" type="password" name="新密码" label="新密码" placeholder="新密码" :rules="[{ required: true }]" />
        </div>
      </div>
      <div class="passwordBox">
        <div class="inputBox">
          <van-field id="inputPassword" v-model="confirmpassword" label-width="70px" type="password" name="确认新密码" label="确认新密码" placeholder="确认新密码" :rules="[{ required: true}]" />
        </div>
      </div>
      <div class="passwordBox">
        <div class="inputBox">
          <van-field id="inputPassword" v-model="captcha_code" label-width="45px" name="验证码" label="验证码" placeholder="验证码" :rules="[{ required: true }]" />
        </div>
        <span class="codeBox">
          <template>
            <img @click="getCode" :src="codeImg">
          </template>
        </span>
      </div>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {postHttpCode} from '@/service/getData.js'
import {mapState} from 'vuex'
import {postHttpChangePassword} from '@/service/getData.js'
export default {
  data() {
    return {
      username: '',
      oldpassWord: '',
      newpassword: '',
      confirmpassword: '',
      captcha_code: '',
      codeImg: '',
      cap:''
    }
  },
  computed:{
      ...mapState(['userInfo'])
  },
  methods: {
    async getCode(){
        const {data} = await postHttpCode()
        this.codeImg=data.code
        this.cap=data.cap.toString()
    },
    async changePassword(){
        const {data} = await postHttpChangePassword(
            this.username,
            this.oldpassWord,
            this.newpassword,
            this.confirmpassword,
            this.captcha_code,
            this.cap)
            console.log(data)
            if(data.status === 1){
                this.$toast.success(data.success)
                this.$router.go(-1)
            }else{
                this.$toast.fail(data.message);
            }
    },
    init(){
        this.username=this.userInfo.username
    }
  },
  watch: {
      userInfo(){
          if(this.userInfo){
              this.init()
          }
      }
  },
  mounted(){
      this.getCode()
    },
}
</script>

<style lang="less" scoped>
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
.codeBox{
    float: right;
    width: 30%;
}
</style>
