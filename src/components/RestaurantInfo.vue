<template>
  <div class="box">
    <van-nav-bar class="navClass" left-arrow @click-left="$router.back()" />
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
    <div class="routerFoodOrComm">
      <van-tabs line-height="0px" line-width="0px" title-active-color="rgb(70, 182, 242)">
        <van-tab title="标签 1"></van-tab>
        <van-tab title="标签 2"></van-tab>
      </van-tabs>
    </div>
    <div class="footer">
      <div id="nav" class="foodCageClass">
        <ul>
          <li id="top" v-for="(item, index) in foodItem" :key="index">
            <van-button v-if="index == 0" id="btnLiId" class="on" type="default">{{ item.name }}</van-button>
            <van-button v-else id="btnLiId" class="btnLiClass" type="default">{{ item.name }}</van-button>
          </li>
        </ul>
      </div>
      <div class="foodClass" id="wrap">
        <!-- 根据所有食物列表的滚动来变化食物分类列表 -->
        <ul>
          <!-- 分类标题 -->
          <li v-for="(foodsData, index) in foodItem" :key="index">
            <van-divider content-position="left">{{ foodsData.name }}</van-divider>
            <!-- 食物列表 -->
            <div v-for="(foodsList, index) in foodsData.foods" :key="index">
              <van-card v-if="foodsList.specfoods[0].price" class="foodListClass" :desc="foodsList.description" :title="foodsList.name" :thumb="'http://item.wangxuelong.vip:8001/img/' + imgList[foodsList.specfoods[0].price % 3]">
                <template #tags>
                  <span class="tipsClass">{{ foodsList.tips }}</span>
                  <br />
                  <span v-if="foodsList.specfoods.length >= 2" class="priceClass">
                    {{ '¥' + computedPrice(foodsList.specfoods) }}
                    <span class="fontColorClass">起</span>
                    <span class="addCarNumBoxClass">
                      <AddCar @childChooseSpecs="chooseFoodDataFun" :foods="foodsList" :shopId="id"></AddCar>
                    </span>
                  </span>
                  <span v-else class="priceClass"
                    >{{ '¥' + foodsList.specfoods[0].price }}
                    <span class="addCarNumBoxClass">
                      <AddCar @childChooseFood="childChooseFoodFun" :foods="foodsList" :shopId="id"></AddCar>
                    </span>
                  </span>
                </template>
              </van-card>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div id="toTop" class="topBtnNoneClass">
      <van-icon color="rgb(70, 182, 242)" size="30" name="upgrade" />
    </div>
    <van-goods-action>
      <van-goods-action-icon @click="showCar" icon="cart-o" text="购物车" :badge="thisShopAllFoodNum" />
      <div class="orderPrice">
        <div>总价:{{thisShopAllPrice}}元</div>
        <div>{{ tips }}</div>
      </div>
      <van-goods-action-button class="actionOrder" text="立即购买" @click="onClickButton" />
    </van-goods-action>

    <van-dialog v-model="showSpcesDialog" title="选择规格" cancelButtonText="关闭" :showConfirmButton="false" show-cancel-button>
      <van-radio-group class="spcesDialogClass" v-model="radio">
        <div class="spcesListClass" v-for="(specsData, index) in chooseFoodData" :key="index" :name="index">
          {{ specsData.specs_name }}
          <div class="van-hairline--top"></div>
          <span class="priceClass"
            >{{ '¥' + specsData.price }}
            <span class="spcesAddClass">
              <button v-if="carNum(index)" @click="chooseDelBtn(index)" class="addCarBtnClass"><van-icon name="minus" /></button>
              <span v-if="carNum(index)" class="addCarNum">{{ carNum(index) }}</span>
              <button @click="chooseAddBtn(index)" class="addCarBtnClass"><van-icon name="plus" /></button>
            </span>
          </span>
        </div>
      </van-radio-group>
    </van-dialog>
    <van-popup closeable :safe-area-inset-bottom="true" class="carFooter" v-model="showCarDialog" position="bottom">
      <van-icon class="clearAll" @click="clearAll" name="delete-o">清空购物车</van-icon>
      <van-radio-group class="spcesDialogClass" v-model="radio">
        <div class="spcesListClass" v-for="(foodRow, index) in thisTimeCarList" :key="index" :name="index">
          <div class="thisTimeCarBox">
            <div class="food">{{ foodRow.name }}</div>
            <span v-if="foodRow.specs.length" class="food">{{ foodRow.specs[0].value }}</span>
            <span v-else class="food">默认</span>
          <span class="priceClass">
            {{ '¥' + foodRow.price }}
            <span class="spcesAddClass">
              <button v-if="foodRow.num" @click="delCarList(foodRow.cate_id,foodRow.item_id,foodRow.name,foodRow.food_id,foodRow.price,foodRow.specs)" class="addCarBtnClass"><van-icon name="minus" /></button>
              <span v-if="foodRow.num" class="addCarNum">{{foodRow.num }}</span>
              <button @click="addCarList(foodRow.cate_id,foodRow.item_id,foodRow.name,foodRow.food_id,foodRow.price,foodRow.specs),testData(foodRow)" class="addCarBtnClass"><van-icon name="plus" /></button>
            </span>
          </span>
        </div>
        </div>
      </van-radio-group>
      <van-goods-action>
        <van-goods-action-icon icon="cart-o" text="购物车" :badge="thisShopAllFoodNum" />
        <div class="orderPrice">
          <div>总价:{{thisShopAllPrice}}元</div>
          <div>{{ tips }}</div>
        </div>
        <van-goods-action-button class="actionOrder" text="立即购买" @click="onClickButton" />
      </van-goods-action>
    </van-popup>
  </div>
</template>

<script>
import { getHttpFoodList, getHttpRestaurantsHeader } from '@/service/getData.js'
import { mapState, mapMutations } from 'vuex'
import AddCar from '@/Pages/AddCar.vue'
export default {
  data() {
    return {
      //餐馆ID
      id: '',
      item: {},
      tips: '',
      foodItem: [],
      imgList: ['17d60c1c8d639884.png', '17d60c2527f39885.png', '17d60c4f8d339886.jpeg'],
      top: 0,
      flag: 0, //记录上次滑动的偏移量
      loading: true,
      showSpcesDialog: false, //是否显示选择规格提示框
      radio: '1',
      chooseFoodData: null, //选择食物规格的信息
      chooseFoodAllData: null, //当前选择食物的所有信息
      chooseFood_id: '', //当前选择的食物规格ID
      showCarDialog: false, //是否展示购物车
      watchFlag: false, //首次进入侦听器不工作
      thisTimeCarList: [],
      thisShopAllPrice:0,//当前商家购物车总价格
      thisShopAllFoodNum:0,//当前商家购物车总数量
    }
  },
  components: {
    AddCar,
  },
  computed: {
    ...mapState(['carList']),
    // 拿到指定商家的所有加购列表:监听carList变化，更新当前卖家购物车信息tempCarList，同时返回一个新的对象
    tempCarList() {
      return Object.assign({}, this.carList[this.id])
    },
  },
  watch: {
    // 只要tempCarList发生就重新计算当前食品的数量，以及更新目前购物车列表
    tempCarList() {
      this.getThisTimeCarList()
      this.getAllPrice()
      //开启深度监听，只要对象中任何一个属性变化，都会触发对象的监听器
      deep:true
    },
    thisShopAllFoodNum(){
      if(!this.thisShopAllFoodNum){
        this.showCarDialog=false
      }
    }
  },
  methods: {
    ...mapMutations(['ADDCAR_LIST', 'DELCAR_LIST','DELCARALL_LIST']),
    //计算购物车总价格
    getAllPrice(){
      let allNum=0;
      let allPrice=0
      this.thisTimeCarList.forEach((item,index)=>{
        allNum+=item.num
        allPrice+=item.num*item.price
      })
      this.thisShopAllPrice=allPrice
      this.thisShopAllFoodNum=allNum
      //当vuex里列表清空后
        if(!Object.values(this.carList)[0]){
          this.thisShopAllFoodNum=0
          this.thisShopAllPrice=0
          this.thisTimeCarList=[]
        }
    },
    //当前购物车
    getThisTimeCarList() {
      let i = 0
      if (this.watchFlag) {
        Object.keys(this.tempCarList).forEach((cate_id) => {
          Object.keys(this.tempCarList[cate_id]).forEach((item_id) => {
            Object.values(this.tempCarList[cate_id][item_id]).forEach((item) => {
              if (item && item.num > 0) {
                this.thisTimeCarList[i] = {}
                this.thisTimeCarList[i].shop_id = this.id
                this.thisTimeCarList[i].cate_id = cate_id
                this.thisTimeCarList[i].item_id = item_id
                this.thisTimeCarList[i].name = item.name
                this.thisTimeCarList[i].food_id = item.food_id
                this.thisTimeCarList[i].price = item.price
                this.thisTimeCarList[i].specs = item.specs
                this.thisTimeCarList[i].num = item.num
                i++
              }else{
                //如果列表里某一个食物个数已经为0了，就删除这个食物
                this.thisTimeCarList.splice(i,1)
              }
            })
          })
        })
      }
    },
    carNum(index) {
      if (this.chooseFoodAllData.specfoods[index]) {
        let cate_id = this.chooseFoodAllData.category_id
        let item_id = this.chooseFoodAllData.item_id
        let chooseTheFood_id = this.chooseFoodAllData.specfoods[index].food_id
        if (this.tempCarList && this.tempCarList[cate_id] && this.tempCarList[cate_id][item_id] && this.tempCarList[cate_id][item_id][chooseTheFood_id] &&this.tempCarList[cate_id][item_id][chooseTheFood_id].num) {
          let num = 0
          num += this.tempCarList[cate_id][item_id][chooseTheFood_id].num
          return num
        } else {
          return 0
        }
      }
    },

    //测试数据
    testData(data){
      console.log('!!!!!!!!!')
      console.log(data)
      console.log('!!!!!!!!!')
    },
      //子传过来的值
      chooseFoodDataFun(chooseFoodData) {
        this.chooseFoodData = chooseFoodData.specfoods
        this.showSpcesDialog = true
        this.chooseFoodAllData = chooseFoodData
      },
      //子组件加购也要改变watchFlag的值
      childChooseFoodFun(flag){
        this.watchFlag=flag
      },
    //点击加购的按钮
    chooseAddBtn(index) {
      this.addCarList(
        this.chooseFoodAllData.category_id, 
        this.chooseFoodAllData.item_id, 
        this.chooseFoodAllData.name, 
        this.chooseFoodAllData.specfoods[index].food_id, 
        this.chooseFoodAllData.specfoods[index].price, 
        this.chooseFoodAllData.specfoods[index].specs)
      this.watchFlag = true
      this.carNum()
    },
    //点击减购的按钮
    chooseDelBtn(index) {
      this.delCarList(this.chooseFoodAllData.category_id, this.chooseFoodAllData.item_id, this.chooseFoodAllData.name, this.chooseFoodAllData.specfoods[index].food_id, this.chooseFoodAllData.specfoods[index].price, this.chooseFoodAllData.specfoods[index].specs)
    },
    addCarList(cate_id, item_id, name, food_id, price, specs) {
      this.chooseFood_id = food_id
      this.ADDCAR_LIST({ shop_id: this.id, cate_id, item_id, name, food_id, price, specs })
    },
    //清空购物车
    clearAll(){
      this.DELCARALL_LIST(this.id)
    },
    delCarList(cate_id, item_id, name, food_id, price, specs) {
      this.DELCAR_LIST({
        shop_id: this.id,
        cate_id,
        item_id,
        name,
        food_id,
        price,
        specs,
      })
    },
    showCar() {
      //如果购物车总数量为0就不能点击显示购物车列表
      if(!this.thisShopAllFoodNum){
        this.showCarDialog = false
      }else{
        this.showCarDialog=true
      }
    },

    onClickIcon() {
      Toast('点击图标')
    },
    onClickButton() {
      Toast('点击按钮')
    },
    async getRestaurantInfo() {
      const { data } = await getHttpRestaurantsHeader(this.id)
      this.item = data
      this.tips = this.item.piecewise_agent_fee.tips
    },
    async getFoodsList() {
      const { data } = await getHttpFoodList(this.id)
      this.foodItem = data
    },
    computedPrice(list) {
      var arr = []
      list.forEach((item) => {
        arr.push(item.price)
      })
      return Math.max(...arr)
    },
    scroolFoodsList() {
      var wrapScrollNode = document.querySelector('#wrap')
      var navScrollNode = document.querySelector('#nav')
      var toTop = document.querySelector('#toTop')
      var allfoodsLi = document.querySelectorAll('#wrap li') //文档
      var allNavLi = document.querySelectorAll('#nav li #btnLiId') //导航

      function debounce(func, wait) {
        let timer = null
        return function () {
          if (timer !== null) {
            clearTimeout(timer)
          }
          timer = setTimeout(func, wait)
        }
      }
      function scrollFoodsList() {
        //获取所有食物列表滚动条高度
        var scrollLineHeight = wrapScrollNode.scrollTop
        //获取所有食物列表可视区高度
        var canViewHeight = wrapScrollNode.clientHeight
        // 如果滚动条的高度大于可视区的高度就显示返回顶部按钮
        if (scrollLineHeight > canViewHeight) {
          toTop.className = 'topBtnClass'
        } else {
          toTop.className = 'topBtnNoneClass'
        }
        for (var i = 0; i < allfoodsLi.length; i++) {
          // 如果 所有食物列表滚动条 高度 大于所有食物列表中某一个食物的上方的偏移量，就显示这个食物的分类
          if (scrollLineHeight >= allfoodsLi[i].offsetTop) {
            for (var j = 0; j < allfoodsLi.length; j++) {
              //排他
              allNavLi[j].className = 'btnLiClass'
            }
            allNavLi[i].className = 'on'
            //所有食物列表滑动到某一个食物列表上时，
            // 就拿这个食物列表的下标去拿对应下标的 食物分类 的上方偏移量，
            // 然后再拿着偏移量去改变 所有食物分类 的上方偏移量

            navScrollNode.scrollTo({
              top: allNavLi[i].offsetTop,
              behavior: 'smooth',
            })
          }
        }
      }
      ;(function () {
        wrapScrollNode.onscroll = debounce(scrollFoodsList, 1000)
      })()
      ;(function () {
        // 点击li滑动食物列表
        for (var i = 0; i < allNavLi.length; i++) {
          allNavLi[i].index = i //记住每一个食物分类导航的下标，因为下面代码时异步的
          allNavLi[i].addEventListener('click', function () {
            for (var j = 0; j < allNavLi.length; j++) {
              //排他
              allNavLi[j].className = 'btnLiClass'
            }
            allNavLi[this.index].className = 'on'
            for (var j = 0; j < allNavLi.length; j++) {
              wrapScrollNode.scrollTo({
                // 根据点击的allNavLi的下标获取这个下标对应的 食品列表 的上方偏移量来更改 所有食品列表 的上方偏移量
                top: allfoodsLi[this.index].offsetTop,
                behavior: 'smooth',
              })
            }
          })
        }
      })()
      //点击按钮返回顶部
      ;(function () {
        toTop.addEventListener('click', function () {
          for (var j = 0; j < allNavLi.length; j++) {
            //排他
            allNavLi[j].className = 'btnLiClass'
          }
          allNavLi[0].className = 'on'
          animate(navScrollNode, 0)
          function animate(obj, target) {
            clearInterval(obj.timer)
            obj.timer = setInterval(function () {
              //把步长值改为整数（往上取整），不然小数会出现走不到目标位置的问题
              var step = (target - obj.scrollTop) / 10
              //当步长大于0就往上取整（即取大值的整数），小于0就往下取整（即取小值的整负数）
              step = step > 0 ? Math.ceil(step) : Math.floor(step)
              if (obj.scrollTop == target) {
                clearInterval(obj.timer)
              }
              obj.scrollTop = obj.scrollTop + step
            }, 0)
          }
          //导航列表返回后，点击一下第一个导航
          allNavLi[0].click()
        })
      })()
    },
  },
  updated() {
    this.scroolFoodsList()
  },
  created() {
    this.id = this.$route.query.id
    this.getRestaurantInfo()
    this.getFoodsList()
  },
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.clearAll{
  color: rgb(155, 155, 155);
  font-size: 14px;
  margin-left: 18px;
  margin-top: 25px;

}
.carFooter{
  height: 40%;
  padding-bottom: 50px;
}
.thisTimeCarBox {
  padding: 5px;
}
.thisTimeCarBox .food:nth-child(2){
  margin-right: 5px;
  font-size: 12px;
  color: rgb(155, 155, 155);
}
.spcesListClass {
  margin-bottom: 10px;
}
.spcesAddClass {
  float: right;
}
.spcesDialogClass {
  padding: 20px;
}
.orderPrice div {
  color: rgb(155, 155, 155);
}
.orderPrice div:nth-child(2) {
  font-size: 12px;
  color: rgb(155, 155, 155);
}
.actionOrder {
  background-color: rgb(70, 182, 242);
  color: rgb(255, 255, 255);
}
.specBtn {
  background-color: rgb(70, 182, 242);
  color: rgb(255, 255, 255);
  border-radius: 15%;
  float: right;
  height: 21px;
}
.addCarBtnClass {
  width: 20px;
  height: 20px;
  color: rgb(155, 155, 155);
  border: 1px solid rgb(155, 155, 155);
  border-radius: 40%;
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
.addCarNumBoxClass {
  position: relative;
  float: right;
  height: 30px;
  // background-color: red;
}
.foodListClass {
  margin-left: 0;
  font-size: 15px;
}
.priceClass {
  color: rgb(254, 119, 0);
}
.fontColorClass {
  color: rgb(155, 155, 155);
}
.btnLiClass {
  width: 100%;
  height: 65px;
  border: 0;
  color: rgb(0, 0, 0);
  font-size: 15px;
  background-color: rgb(239, 239, 239);
}
.topBtnClass {
  display: block;
  position: absolute;
  top: 700px;
  left: 320px;
  background-color: rgb(255 255 255 / 0%);
  border: 0;
}
.on {
  color: aliceblue;
  font-size: 15px;
  border: 0;
  width: 100%;
  height: 65px;
  background-color: rgb(70, 182, 242);
}

.topBtnNoneClass {
  display: none;
}
.routerFoodOrComm {
  position: absolute;
  top: 110px;
  width: 100%;
}
.box {
  position: relative;
}
.navClass {
  background-color: rgb(255 255 255 / 20%);
  float: left;
}
.heard {
  position: fixed;
}
.footer {
  height: 660px;
  position: absolute;
  top: 150px;
  width: 100%;
}
.foodCageClass {
  float: left;
  overflow: auto;
  width: 25%;
  height: 100%;
}
.foodClass {
  float: left;
  overflow: auto;
  width: 75%;
  height: 100%;
}
.foodClass::-webkit-scrollbar {
  width: 0;
}
.foodCageClass::-webkit-scrollbar {
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
  left: 324px;
  right: 0px;
  width: 50px;
  height: 12px;
}
.bzpsClass {
  margin-left: 2px;
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
.starClass {
  top: 40px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  width: 250px;
  height: 24px;
}
.starClass span {
  margin-left: 5px;
  color: #f4b700;
}
.starClass .orderNumClass {
  color: rgb(155, 155, 155);
}
.tipsClass {
  color: rgb(155, 155, 155);
  font-size: 10px;
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
.van-cell {
  padding: 10px 0px;
}
.van-grid-item__icon {
  font-size: 46px;
}
.van-card__desc {
  font-size: 12px;
  color: rgb(155, 155, 155);
}
</style>
