<template>
  <div class="userBox">
    <MyNavBar>我的</MyNavBar>
    <div class="userDataBox" @click="toUserInfo">
      <div class="useImgBox"><van-icon class="userImg" size="50" :name="userIcon" /></div>
      <div class="userName">
        <section>{{userName}}</section>
      </div>
      <div class="userInfoBtn"><van-icon name="arrow" color="rgb(244, 244, 244)" /></div>
    </div>
    <van-grid :column-num="3">
      <van-grid-item class="userOrtherData">
        <div class="userOrtherDataUnit"><span>{{balance}}</span>元</div>
        <div class="userOrtherDataUnit">我的余额</div>
      </van-grid-item>
      <van-grid-item class="userOrtherData">
        <div class="userOrtherDataUnit"><span>{{vouchers}}</span>个</div>
        <div class="userOrtherDataUnit">我的优惠</div>
      </van-grid-item>
      <van-grid-item class="userOrtherData">
        <div class="userOrtherDataUnit"><span>{{integral}}</span>分</div>
        <div class="userOrtherDataUnit">我的积分</div>
      </van-grid-item>
    </van-grid>
    <div class="userOrderBox">
      <van-cell icon="shop-o" title="我的订单" is-link to="/order" />
      <van-cell icon="vip-card-o" title="会员卡" is-link to="/vipCard" />
    </div>
    <div class="userOrderBox">
      <van-cell icon="shop-collect-o" title="服务中心" is-link to="/service" />
    </div>

    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue'
import {loginPage,userInfoPage} from '@/router/routerStr.js'
import {mapState,mapMutations} from 'vuex'
import MyNavBar from '@/MyUI/'
export default {
  components: {
    Tabbar,
  },
  data() {
    return {
        userName:'登录/注册',
        userIcon:'cross',
        balance:0,//余额
        vouchers:0,//优惠券
        integral:0,//积分
    }
  },

  mounted() {
      this.getUserInfo()
  },
  computed:{
      ...mapState(['userInfo','loginState'])
  },
  methods: {
      ...mapMutations(['SET_LOGINSTATE']),
      toUserInfo(){
          console.log(this.loginState)
          if(this.loginState){
              this.$router.push(userInfoPage)
          }else{
              this.$router.push(loginPage)
          }
      },
      getUserInfo(){
          console.log(this.userInfo)
          if(this.userInfo){
              this.userName=this.userInfo.username
              this.balance=this.userInfo.balance
              this.vouchers=this.userInfo.gift_amount
              this.integral = this.userInfo.point
              this.userIcon='manager-o'
              this.SET_LOGINSTATE(true)
          }
      }
  },
  watch:{
      userInfo(){
          this.getUserInfo()
      }
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.userImg{
    margin: 10px auto;
    color: rgb(74, 74, 74);
}
.userBox {
  background-color: rgb(244, 244, 244);
}
.userOrderBox {
  margin-top: 10px;
}
.userOrtherData:nth-child(1) div span {
  color: rgb(255, 87, 15);
  font-size: 25px;
}
.userOrtherData:nth-child(2) div span {
  color: rgb(255, 115, 55);
  font-size: 25px;
}
.userOrtherData:nth-child(3) div span {
  color: rgb(0, 130, 26);
  font-size: 25px;
}
.userOrtherDataUnit {
  font-size: 12px;
  color: rgb(86, 86, 86);
}
.userDataBox {
  height: 100px;
  background-color: rgb(70, 182, 242);
}
.header {
  background-color: rgb(70, 182, 242);
}
.useImgBox {
  float: left;
  margin: 10px;
  width: 80px;
  height: 80px;
  text-align: center;
  background-color: rgb(157, 234, 255);
  border-radius: 50%;
}
.userName {
  float: left;
  height: 30px;
  font-size: 12px;
  margin-top: 40px;
}
.userName section:nth-child(1) {
  color: aliceblue;
  font-size: 16px;
}
.userName section:nth-child(2) {
  color: rgb(218, 218, 218);
  font-size: 12px;
}
.userInfoBtn {
  float: right;
  margin-top: 40px;
  width: 20px;
}
</style>
