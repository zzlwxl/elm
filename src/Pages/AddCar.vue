<template>
  <div>
    <span v-if="foods.specfoods.length >= 2" class="priceClass">
      
      <span v-if="carNum" class="addCarNum">{{ carNum }}</span>
      <van-button @click="chooseSpecs(foods)" class="specBtn" size="mini">选规格</van-button>
    </span>
    <span v-else class="priceClass">
      <button v-if="carNum" class="addCarBtnClass" @click="delCarList(shopId, foods.category_id, foods.item_id, foods.name, foods.specfoods[0].food_id, foods.specfoods[0].price, foods.specfoods[0].specs)"><van-icon class="btnIcon" name="minus" /></button>
      <span v-if="carNum" class="addCarNum">{{ carNum }}</span>
      <button class="addCarBtnClass" @click="addCarList(shopId, foods.category_id, foods.item_id, foods.name, foods.specfoods[0].food_id, foods.specfoods[0].price, foods.specfoods[0].specs)"><van-icon class="btnIcon" name="plus" /></button>
    </span>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {}
  },
  props: ['foods', 'shopId'],
  computed: {
    ...mapState(['carList']),
    // 拿到指定商家的所有加购列表:监听cartList变化，更新当前卖家购物车信息tempCarList，同时返回一个新的对象
    tempCarList() {
      return Object.assign({}, this.carList[this.shopId])
    },
    // 只要tempCarList发生就重新计算当前食品的数量
    carNum() {
      let cate_id = this.foods.category_id
      let item_id = this.foods.item_id
      if (this.tempCarList && this.tempCarList[cate_id] && this.tempCarList[cate_id][item_id]) {
        let num = 0
        Object.values(this.tempCarList[cate_id][item_id]).forEach((item, index) => {
          // 如果减购到0，vux会把这个规格改为null，所以这里直接返回0
          if(!item){
            return 0
          }
          num += item.num
        })
        return num
      } else {
        return 0
      }
    },
  },
  methods: {
    ...mapMutations(['ADDCAR_LIST', 'DELCAR_LIST']),
    chooseSpecs(foods) {
      this.$emit('childChooseSpecs', foods)
    },
    addCarList(shop_id, cate_id, item_id, name, food_id, price, specs) {
      this.$emit('childChooseFood',true)
      this.ADDCAR_LIST({ shop_id, cate_id, item_id, name, food_id, price, specs })
    },
    delCarList(shop_id, cate_id, item_id, name, food_id, price, specs) {
      this.DELCAR_LIST({ shop_id, cate_id, item_id, name, food_id, price, specs })
    },
  },
}
</script>

<style lang="less">
.addCarBtnClass {
  width: 20px;
  height: 20px;
  color: rgb(155, 155, 155);
  border: 1px solid rgb(155, 155, 155);
  border-radius: 50%;
  margin-left: 2px;
  margin-right: 2px;
  background-color: transparent;
}
.addCarNum {
  margin-left: 2px;
  margin-right: 2px;
  width: 5px;
  height: 20px;
  color: rgb(113, 113, 113);
}
.btnIcon {
  margin: -4px;
}
.specBtn {
  background-color: rgb(17, 172, 255) !important;
  color: rgb(255, 255, 255) !important;
  border-radius: 15% !important;
  float: right;
  height: 21px;
}
.priceClass {
  color: rgb(254, 119, 0);
}
</style>
