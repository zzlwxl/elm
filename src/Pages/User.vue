<template>
  <div class="userBox">
    <MyNavBar :isShowLeft="true">我的</MyNavBar>
    <div class="userDataBox">
      <div class="useImg">xx</div>
      <div class="userName">
        <section>dd</section>
        <section>dd</section>
      </div>
      <div class="userInfoBtn">xx</div>
    </div>
    <van-grid :column-num="3">
      <van-grid-item class="userOrtherData">
        <div class="userOrtherDataUnit"><span>22</span>元</div>
        <div class="userOrtherDataUnit">我的余额</div>
      </van-grid-item>
      <van-grid-item class="userOrtherData">
        <div class="userOrtherDataUnit"><span>0</span>个</div>
        <div class="userOrtherDataUnit">我的优惠</div>
      </van-grid-item>
      <van-grid-item class="userOrtherData">
        <div class="userOrtherDataUnit"><span>0</span>分</div>
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
import MyNavBar from '@/MyUI/'
export default {
  components: {
    Tabbar,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
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
.useImg {
  float: left;
  margin: 10px;
  width: 80px;
  height: 80px;
  text-align: center;
  background-color: red;
  border-radius: 50%;
}
.userName {
  float: left;
  height: 30px;
  font-size: 12px;
  margin-top: 40px;
  background-color: green;
}
.userName section:nth-child(1) {
  color: aliceblue;
  font-size: 14px;
}
.userName section:nth-child(2) {
  color: rgb(218, 218, 218);
  font-size: 12px;
}
.userInfoBtn {
  float: right;
  margin-top: 40px;
  width: 20px;
  background-color: pink;
}
</style>
