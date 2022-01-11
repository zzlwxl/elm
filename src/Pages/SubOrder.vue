<template>
  <div>
    <MyNavBar :isShowLeft="true">下单</MyNavBar>
    <van-cell v-if="addressData" is-link to="/suborder/subchooseaddress" value="重新选择地址">
      <template #title>
        <span class="custom-title">{{ addressData.name }}</span>
        <span>{{ addressData.phone }}</span>
      </template>
      <template #label>
        <van-tag :type="tabColor(addressData.tag_type)">{{ addressData.tag }}</van-tag>
        {{ addressData.address }}
      </template>
    </van-cell>
    <van-cell v-else is-link to="/suborder/subchooseaddress" value="您还未添加过任何地址，请先添加地址"> </van-cell>
    <div class="heard">
      <van-card :price="item.float_minimum_order_amount + '起送/' + tips" :desc="'营业' + item.opening_hours" :title="item.name" :thumb="'http://elm.wangxuelong.vip:8001/img/' + item.image_path">
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
    <van-cell v-for="(item, index) in thisTimeCarList" :key="index" center :title="item.name" :label="item.specs.length ? item.specs[0].value : ''">
      <template #default>
        <span class="numColor">{{ 'x ' + item.quantity }}</span>
        <span>{{ '¥' + item.price }}</span>
      </template>
    </van-cell>
    <van-cell center title="配送费">
      <template #default>
        <span>{{ '¥' + getCaption(tips, 1, '¥') }}</span>
      </template>
    </van-cell>
    <van-cell center title="订单总价">
      <template #default>
        <span class="orderPriceColor">{{ '¥' + orderPriceCom }}</span>
      </template>
    </van-cell>
    <van-cell-group>
      <van-field v-model="note" label="备注" placeholder="可输入喜欢的口味" />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="info" @click="subOrder">提交</van-button>
    </div>
  </div>
</template>

<script>
import { getStore, setStore, removeStore } from '@/utils/utils.js'
import { getHttpAddressList, getHttpRestaurantsHeader, postHttpOrder } from '@/service/getData.js'
import { mapState, mapMutations } from 'vuex'
import { restaurantInfoPage } from '@/router/routerStr.js'
export default {
  data() {
    return {
      id: '',
      shop_id: '',
      tips: '',
      addressData: {},
      carData: [],
      shopData: {},
      thisTimeCarList: [],
      item: {},
      orderPrice: 0,
      note: '',
    }
  },
  computed: {
    ...mapState(['chooseAddress', 'carID', 'carList', 'geohash', 'userInfo', 'latitude', 'longitude']),
    orderPriceCom() {
      return this.orderPrice + this.getCaption(this.tips, 1, '¥')
    },
  },
  methods: {
    ...mapMutations(['GET_CARALL_LIST', 'SET_SUBSUCCESS']),
    async subOrder() {
      if(!this.addressData){
        this.$toast.fail('请添加地址')
        return
      }
      console.log('提交了')
      let order = []
      order.push(this.thisTimeCarList)
      const { data } = await postHttpOrder(this.userInfo.id, this.carID, this.addressData.id, this.id, this.geohash, this.note, order)
      if (data.status === 1) {
        this.$toast.success('下单成功')
        let sessionCarList = JSON.parse(getStore('carList'))
        console.log(typeof session)
        Object.keys(sessionCarList).forEach((shop_id) => {
          if (shop_id === this.id) {
            delete sessionCarList[shop_id]
          }
        })
        removeStore('carList')
        setStore('carList', sessionCarList)
        this.GET_CARALL_LIST()
        this.SET_SUBSUCCESS(true)
        this.$router.replace(restaurantInfoPage(this.latitude, this.longitude, this.id))
      } else {
        this.$toast.fail(data.message)
      }
    },
    getCaption(obj, state, str) {
      var index = obj.lastIndexOf(str)
      if (state == 0) {
        obj = obj.substring(0, index)
      } else {
        obj = obj.substring(index + 1, obj.length)
      }
      return parseInt(obj)
    },
    async getRestaurant() {
      console.log('此时')
      this.id = this.$route.query.shop_id
      Object.keys(this.carList[this.id]).forEach((cate_id) => {
        console.log('1')
        console.log('2')
        Object.keys(this.carList[this.id][cate_id]).forEach((food_id) => {
          console.log('3',this.carList[this.id][cate_id][food_id])
          Object.keys(this.carList[this.id][cate_id][food_id]).forEach((item) => {
            if(this.carList[this.id][cate_id][food_id][item]){
              this.thisTimeCarList.push(this.carList[this.id][cate_id][food_id][item])
              this.orderPrice += this.carList[this.id][cate_id][food_id][item].price * this.carList[this.id][cate_id][food_id][item].quantity
            }
          })
        })
      })
      console.log('这家', this.thisTimeCarList)
      const { data } = await getHttpRestaurantsHeader(this.id)
      this.tips = data.piecewise_agent_fee.tips
      console.log('配送费', this.getCaption(this.tips, 1, '¥'))
      this.item = data
      console.log('item',this.item)
    },
    tabColor(type) {
      switch (type) {
        case 2:
          return 'primary'
        case 3:
          return 'warning'
        case 4:
          return 'danger'
      }
    },
    async getAddress() {
      console.log('id=', this.carID)
      // 如果vuex里有选择的地址，就不请求了
      if (this.chooseAddress.address) {
        this.addressData = this.chooseAddress
        console.log('有地址',this.addressData)
        return
      }
      const { data } = await getHttpAddressList(getStore('user_id'))
      this.addressData = data[0]
      console.log('地址' + this.addressData)
      console.log(data)
    },
    getCar() {
      console.log('购物车列表', this.carList)
    },
  },
  mounted() {
    this.getAddress()
    this.getCar()
    this.getRestaurant()
  },
}
</script>

<style lang="less" scoped>
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
  right: 3px;
  width: 100px;
  height: 23px;
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
  right: 3px;
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
.van-card__desc {
  font-size: 12px;
  color: rgb(155, 155, 155);
}
.van-cell__left-icon {
  margin-left: 4px !important;
}
</style>
