<template>
  <div class="box">
    <van-nav-bar class="navClass" left-arrow @click-left="$router.back()" />
    <div class="heard">
      <van-card :price="item.float_minimum_order_amount + '起送/' + tips" :desc="'营业' + item.opening_hours" :title="item.name" :thumb="'http://item.wangxuelong.vip:8001/img/' + item.image_path">
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
            <van-button v-if="index==0" id="btnLiId" class="on" type="default">{{ item.name }}</van-button>
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
              <van-card num="2" price="2.00" desc="描述信息" :title="foodsList.name" :thumb="'http://item.wangxuelong.vip:8001/img/' + imgList[Math.floor(Math.random() * 3)]">
                <template #tags>
                  <!-- <van-tag plain type="danger">标签</van-tag> -->
                </template>
                <template #footer>
                  <!-- <van-button size="mini">按钮</van-button> -->
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
  </div>
</template>

<script>
import {getHttpFoodList,getHttpRestaurantsHeader} from '@/service/getData.js'
export default {
  data() {
    return {
      //餐馆ID
      id: '',
      item: {},
      tips: '',
      foodItem: [],
      imgList: ['17d60c1c8d639884.png', '17d60c2527f39885.png', '17d60c4f8d339886.jpeg'],
    }
  },
  methods: {
    async getRestaurantInfo() {
      const { data } = await getHttpRestaurantsHeader(this.id)
      this.item = data
      this.tips = this.item.piecewise_agent_fee.tips
    },
    async getFoodsList() {
      const {data}= await getHttpFoodList(this.id)
      this.foodItem = data
    },
    loadFoodsList() {
        console.log('2=================')
        var wrapScrollNode = document.querySelector('#wrap')
        var navScrollNode = document.querySelector('#nav')
        var toTop = document.querySelector('#toTop')
        var allfoodsLi = document.querySelectorAll('#wrap li') //文档
        var allNavLi = document.querySelectorAll('#nav li #btnLiId') //导航
        // 滑动变化li
        ;(function () {
          wrapScrollNode.onscroll = function () {
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
  updated(){
    this.loadFoodsList()
  },
  created() {
    this.id = this.$route.query.id
    console.log(this.id)
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
.btnLiClass {
  width: 100%;
  height: 65px;
  border: 0;
  color: rgb(0, 0, 0);
}
.topBtnClass {
  display: block;
  position: absolute;
  top: 760px;
  left: 320px;
  background-color: rgb(255 255 255 / 0%);
  border: 0;
}
.on {
  color: aliceblue;
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
  padding: 8px -2px;
}
.van-cell {
  padding: 10px 0px;
}
.van-grid-item__icon {
  font-size: 46px;
}
</style>
