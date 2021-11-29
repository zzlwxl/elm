<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoadRestaurants(offset, limit)">
      <van-cell v-for="(item, index) in restaurantsAll" :key="index">
        <van-card :price="item.float_minimum_order_amount + '起送/' + item.piecewise_agent_fee.tips" :desc="'营业'+item.opening_hours" :title="item.name" :thumb="'http://item.wangxuelong.vip:8001/img/' + item.image_path">>
          <template #tags>
            <van-tag plain type="danger">品牌</van-tag>
            <div class="starClass">
              <van-rate  gutter="1px" :readonly="true" color="#ffd21e" void-color="#c8c9cc" size="10px" v-model="item.rating" allow-half void-icon="star" />
            <span>{{item.rating}}</span>
           <span class="orderNumClass">月售{{item.rating_count}}单</span>
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
    </van-list>
  </div>
</template>

<script>
import { getRestaurants } from '@/API/getData.js'
import { mapState, mapMutations } from 'vuex'
export default {
  props: [
    // 'lltude'
  ],
  data() {
    return {
      restaurantsAll: [], //商铺总列表
      restaurants: [], //商铺列表
      loading: false,
      finished: false,
      offset: 0,
      limit: 20,
    }
  },
  created() {
    this.onLoadRestaurants(this.offset, this.limit)
  },
  computed: {
    ...mapState(['latitude', 'longitude']),
  },
  methods: {
    //按需请求数据
    async onLoadRestaurants(offset, limit) {
      await getRestaurants(this.latitude, this.longitude, offset, limit).then((item) => {
        this.restaurants = Array(item.data)[0]
        //下一次请求的起点
        this.offset += limit
        this.loading = false //加载结束
        //全部加载完成
        if (this.restaurants.length === 0) {
          this.finished = true
          return
        }
        //加载完成后追加到总列表
        this.restaurantsAll.push(...this.restaurants)
        console.log(this.restaurantsAll)
      })
    },
  },
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
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
  left: 324px;
  right: 0px;
  width: 45px;
  height: 12px;
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
  left: 269px;
  right: 0px;
  width: 100px;
  height: 23px;
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
.starClass{
    position: absolute;
  top: 40px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  width: 200px;
  height: 24px;
}
.starClass span{
    margin-left: 5px;
    color: #f4b700;
}
.starClass .orderNumClass{
    color: rgb(155, 155, 155);
}
</style>
