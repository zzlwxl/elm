<template>
  <div>
    <MyNavBar>搜索</MyNavBar>
    <div class="searchBox">
    <van-search @clear="clearInput"  clearable v-model="keyword" show-action placeholder="请输入商家或美食名称" @search="onLoadRestaurants">
      <template #action>
        <div @click="onLoadRestaurants">搜索</div>
      </template>
    </van-search>
    </div>
    <van-cell v-for="(item, index) in restaurantsAll" :key="index">
        <van-card @click="restaurantInfo(item.id)" :price="item.float_minimum_order_amount + '起送/' + item.piecewise_agent_fee.tips" :desc="'营业' + item.opening_hours" :title="item.name" :thumb="'http://elm.wangxuelong.vip:8001/img/' + item.image_path">
          <template #tags>
            <van-tag plain type="danger">品牌</van-tag>
            <div class="starClass">
              <van-rate gutter="1px" :readonly="true" color="#ffd21e" void-color="#c8c9cc" size="10px" v-model="item.rating" allow-half void-icon="star" />
              <span>{{ item.rating }}</span>
              <span class="orderNumClass">月售{{ item.rating_count }}单</span>
            </div>
          </template>
          <template #footer>
            <div class="bzpClass">
              <span class="bzpsClass" v-for="(bzpList, index) in item.supports" :key="index">{{ bzpList.icon_name }}</span>
            </div>
            <div class="fzClass">
              <span v-if="item.delivery_mode" class="fzs1Class">{{ item.delivery_mode.text }}</span>
              <span class="fzsClass">准时达</span>
            </div>
            <div class="addLengthClass">
              <span class="resBtn" size="mini">{{ item.distance }}/</span>
              <span class="resBtn2" size="mini">{{ item.order_lead_time }}</span>
            </div>
          </template>
        </van-card>
      </van-cell>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue'
import { mapState,mapMutations} from 'vuex'
import {restaurantInfoPage} from '@/router/routerStr.js'
import {getHttpSearchRestaurants} from '@/service/getData.js'
export default {
  components: {
    Tabbar,
  },
  data() {
    return {
      keyword: '', //商家或者美食名称
      restaurantsAll: [], //商铺总列表
    }
  },
  computed:{
      ...mapState(['latitude', 'longitude','geohash']), 
  },
  methods: {
    ...mapMutations(['SET_SHOPID']),
    async onLoadRestaurants() {
      const {data}=await getHttpSearchRestaurants(this.geohash,this.keyword)
      console.log(data)
      if(!data.length){
        return this.$toast.fail('搜索失败')
      }
      this.restaurantsAll = Array(data)[0]
    },
    restaurantInfo(id) {
      this.SET_SHOPID(id)
      this.$router.push(restaurantInfoPage(this.latitude,this.longitude,id))
    },
    clearInput(){
      this.restaurantsAll=[]
    }
  },
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.msiteBox::-webkit-scrollbar {
  width: 0;
}
.addLengthClass {
  float: left;
  position: absolute;
  top: 74px;
  bottom: 100px;
  left: 216px;
  right: 1px;
}
.resBtn {
  color: rgb(155, 155, 155);
  font-size: 10px;
}
.resBtn2 {
  color: rgb(70, 182, 242);
  font-size: 10px;
}
.bzpClass {
  position: absolute;
  top: 11px;
  bottom: 100px;
  right: 3px;
  width: 50px;
  height: 12px;
}
.searchBox{
  margin: 5px;
}
.bzpsClass {
  margin-left: 1px;
  color: rgb(155, 155, 155);
  border: 1px solid rgb(155, 155, 155);
}
.fzClass {
  position: absolute;
  top: 44px;
  bottom: 100px;
  right: 3px;
  width: 100px;
  height: 23px;
}
.fzsClass {
  box-sizing: border-box;
  margin-left: 1px;
  color: rgb(70, 182, 242);
  border: 1px solid rgb(70, 182, 242);
}
.fzs1Class {
  margin-left: 1px;
  z-index: 99999;
  font-size: 12px !important;
  color: rgb(255, 255, 255);
  border: 1px solid rgb(70, 182, 242);
  background-color: rgb(70, 182, 242);
}
.starClass {
  position: absolute;
  top: 40px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  width: 200px;
  height: 24px;
}
.starClass span {
  margin-left: 5px;
  color: #f4b700;
}
.starClass .orderNumClass {
  color: rgb(155, 155, 155);
}
.van-sidebar-item__info {
  background-color: rgb(70, 182, 242);
}
.van-info {
  top: -2px;
  right: -7px;
}
.van-dropdown-menu__title--active {
  color: rgb(70, 182, 242);
}
.van-sidebar-item--select::before {
  background-color: rgb(70, 182, 242);
}
.van-card__price-integer {
  font-size: -3px;
  color: rgb(155, 155, 155);
}
.van-card__price {
  color: rgb(155, 155, 155);
  font-size: -3px;
}
.van-card__title {
  margin-left: 42px;
  font-size: 15px;
}
.van-card__price-integer {
  font-size: 12px;
}
.van-tag--danger.van-tag--plain {
  top: -39px;
  right: -37px;
  bottom: 41px;
  left: 0px;
  border: 1px solid #ffcd38;
  font-size: 15px;
  color: #000000;
  background-color: #f4b700;
}
.van-card {
  padding: 8px 16px !important;
}
.van-cell {
  padding: 10px 0px;
}
.van-grid-item__icon {
  font-size: 46px;
}
</style>
