<template>
  <div>
      <MyNavBar :isShowLeft="true">订单详情</MyNavBar>

<div class="heard">
      <van-card :price="item.float_minimum_order_amount + '起送/' + tips" :desc="'营业' + item.opening_hours" :title="item.name" :thumb="'http://item.wangxuelong.vip:8001/img/' + item.image_path">
        <template #tags>
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
        </template>
      </van-card>
    </div>
    <van-divider content-position="left">订单明细</van-divider>
    <van-cell v-for="(item,index) in orderList" :key="index" center :title="item.name"  :label="item.specs.length ? item.specs[0].value : ''" >
      <template #default>
        <span class="numColor">{{'x '+item.quantity}}</span>
        <span>{{'¥'+item.price}}</span>
      </template>
    </van-cell>
    <van-cell  center title="配送费">
      <template #default>
        <span>{{'¥'+getCaption(tips,1,'¥')}}</span>
      </template>
    </van-cell>
    <van-cell  center title="餐盒">
      <template #default>
        <span>{{'¥'+foodBoxPrice}}</span>
      </template>
    </van-cell>
    <van-cell  center title="平台优惠">
      <template #default>
        <span>{{'-¥'+1}}</span>
      </template>
    </van-cell>
    <van-cell  center title="订单总价">
      <template #default>
        <span class="orderPriceColor">{{'¥'+orderPrice}}</span>
      </template>
    </van-cell>
<van-divider content-position="left">配送信息</van-divider>
<van-cell  center title="送货地址">
      <template #default>
        <span>{{orderData.addressDetail}}</span>
      </template>
    </van-cell>
<van-cell  center title="配送方式">
      <template #default>
        <span>蜂鸟专送</span>
      </template>
    </van-cell>
    <van-divider content-position="left">订单信息</van-divider>
    <van-cell  center title="订单编号">
      <template #default>
        <span>{{orderID}}</span>
      </template>
    </van-cell>
    <van-cell  center title="下单时间">
      <template #default>
        <span>{{orderTime}}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import {getHttpOrderInfo,getHttpRestaurantsHeader} from '@/service/getData.js'
import {getStore} from '@/utils/utils.js'
import { mapState } from 'vuex'
export default {
data() {
    return {
         item:{},
         id:'',//商家ID
         tips:'',
         orderData :{},
         orderList :[],
         orderPrice : '',
         foodBoxPrice :'',
         orderID:'',
         orderTime :''
    }
},
computed:{
},
methods: {
    async getOrderInfo(){
        const {data} = await getHttpOrderInfo(getStore('user_id'),this.$route.query.order_id)
        console.log('1',data)
        this.orderData = data
        this.orderList = this.orderData._doc.basket.group[0]
        console.log('订单信息',this.orderData)
        this.id = data._doc.restaurant_id
        this.orderPrice = data._doc.total_amount
        this.foodBoxPrice = this.orderData._doc.basket.packing_fee.price
        this.orderID = this.orderData._doc.id
        this.orderTime = this.orderData._doc.formatted_created_at
        this.getHead()
    },
   async getHead(){
        const {data} = await getHttpRestaurantsHeader(this.id)
        console.log('2',data)
      this.tips = data.piecewise_agent_fee.tips
      console.log('配送费',this.getCaption(this.tips,1,'¥'))
      this.item = data
   },
   getCaption(obj,state,str) {
    var index=obj.lastIndexOf(str);
    if(state==0){
        obj=obj.substring(0,index);
    }else {
        obj=obj.substring(index+1,obj.length);
    }
    return obj;
},
},
mounted() {
    this.getOrderInfo()
},
}
</script>

<style lang="less" scopde>
.starClass {
  top: 40px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  width: 250px;
  height: 24px;
}
.fzClass {
  position: absolute;
  top: 44px;
  bottom: 100px;
  left: 269px;
  right: 0px;
  width: 100px;
  height: 23px;
}
.orderPriceColor{
  color: #ff6200;
  font-size: 20px;
}
.numColor{
  color: #ff6200;
  margin-right: 40px;
}
.fzsClass {
  box-sizing: border-box;
  font-size: 12px !important;
  margin-left: 1px;
  color: rgb(70, 182, 242);
  border: 1px solid rgb(70, 182, 242);
}
.fzs1Class {
    margin-left: 1px;
    font-size: 12px !important;
  color: rgb(255, 255, 255);
  border: 1px solid rgb(70, 182, 242);
  background-color: rgb(70, 182, 242);
}
.bzpsClass {
  margin-left: 2px;
  color: rgb(155, 155, 155);
  border: 1px solid rgb(155, 155, 155);
}
.bzpClass {
  position: absolute;
  top: 11px;
  bottom: 100px;
  left: 324px;
  right: 0px;
  width: 50px;
  height: 12px;
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
  font-size: 12px !important;
  color: rgb(155, 155, 155);
}
.van-card__price {
    color: rgb(155, 155, 155) !important;
    font-size: 12px !important;
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
  padding: 8px -2px;
}

.van-grid-item__icon {
  font-size: 46px;
}
.van-card__desc {
  font-size: 12px;
  color: rgb(155, 155, 155);
}
</style>