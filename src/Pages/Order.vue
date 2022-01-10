<template>
  <div>
    <MyNavBar>订单</MyNavBar>
    <van-list class="msiteBox" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoadOrderList(offset, limit)">
      <div @click="orderInfo(item.id)" class="heard" v-for="(item, index) in orderListAll" :key="index">
        <van-card  :title="item.restaurant_name" :thumb="'http://item.wangxuelong.vip:8001/img/' + imgList[item.total_amount % 3]">
         
          <template #tags> 
              <div class="orderID">{{'商品名：'+ item.basket.group[0][0].name }}{{ item.basket.group[0].length > 1 ? ' 等' + item.basket.group[0].length + '件商品' : '' }} </div>
              <div>{{item.formatted_created_at}}</div>
              <div class="orderID">{{'订单编号：'+ item.id}} </div>
          </template>
          <template #footer>
            <div class="fzClass">
              {{ item.total_amount + ' 元' }}
            </div>
          </template>
        </van-card>
      </div>
    </van-list>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue'
import { mapState,mapMutations } from 'vuex'
import {orderInfo} from '@/router/routerStr.js'
import { getHttpOrderList } from '@/service/getData.js'
import { getStore } from '@/utils/utils.js'
export default {
  components: {
    Tabbar,
  },
  computed: {
    ...mapState(['userInfo']),
  },
  data() {
    return {
      orderListAll: [], 
      orderList: [], 
      loading: false,
      finished: false,
      offset: 0,
      limit: 5,
      imgList: ['17d60c1c8d639884.png', '17d60c2527f39885.png', '17d60c4f8d339886.jpeg'],
    }
  },
  methods: {
      orderInfo(id){
          this.$router.push(orderInfo(id))
      },
    async onLoadOrderList(offset, limit) {
      if(!getStore('user_id')){
        this.$toast.fail('还未登录，所以没有订单')
        this.orderListAll=[]
        this.offset=0
        this.finished = true
        return
      }
      console.log('调用了一次onLoadRestaurants--------------------------------------', this.userInfo)
      const { data } = await getHttpOrderList(getStore('user_id'), limit, offset)
      console.log(data)
      this.orderList = Array(data)[0]
      //下一次请求的起点
      this.offset += limit
      this.loading = false //加载结束
      //全部加载完成
      if (this.orderList.length === 0) {
        this.finished = true
        return
      }
      //加载完成后追加到总列表
      this.orderListAll.push(...this.orderList)
      console.log(this.orderListAll)
    },
  },
  activated() {
    this.onLoadOrderList(this.offset,this.limit)
    
  },
  mounted() {
      this.onLoadOrderList(this.offset,this.limit)
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
.orderID{
    color: rgb(155,155,155);
    font-size: 12px;
}
.fzClass {
  position: absolute;
  top: 44px;
  bottom: 100px;
  left: 269px;
  right: 0px;
  width: 100px;
  color: #ff6200;
  height: 23px;
  font-size: 18px;
}
.orderPriceColor {
  color: #ff6200;
}
.numColor {
  color: #ff6200;
  margin-right: 40px;
}
.fzsClass {
  box-sizing: border-box;
  font-size: 12px;
  margin-left: 1px;
  color: rgb(70, 182, 242);
  border: 1px solid rgb(70, 182, 242);
}
.fzs1Class {
  margin-left: 1px;
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
  font-size: -3px;
  color: rgb(155, 155, 155);
}
.van-card__price {
  color: rgb(155, 155, 155);
  font-size: -3px;
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
  padding: 8px -2px;
}

.van-grid-item__icon {
  font-size: 46px;
}


</style>
