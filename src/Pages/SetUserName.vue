<template>
  <div>
      <MyNavBar :isShowLeft="true">修改用户名</MyNavBar>
      <van-form @submit="setUserName">
  <van-field
    v-model="newUserName"
    name="用户名"
    label="用户名"
    placeholder="用户名"
    :rules="[{ required: true, message: '请填写用户名' }]"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">提交</van-button>
  </div>
</van-form>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    data() {
        return {
            newUserName:''
        }
    },
methods: {
    ...mapMutations(['SET_USERNAME']),
    setUserName(){
        if(this.newUserName !== ''){
            this.SET_USERNAME(this.newUserName)
            this.$router.go(-1)
        }else{
            this.toast.fail('请输入用户名');
        }
    }
},
}
</script>

<style>

</style>