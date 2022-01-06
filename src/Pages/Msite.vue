<template>
  <div>
    <MyNavBar :isShowLeft="true" iconLeft="search" :toLeft="searchPage" :iconSize="18"  :isShowRight="true" iconRight="location-o" :toRight="homePage">{{userLocation}}</MyNavBar>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(minArr, index) in foodEntryList" :key="index">
        <van-grid>
          <van-grid-item :to="'/food?geohash=' + geohash + '&title=' + foodEntry.title + '&restaurant_category_id=' + foodEntry.id" v-for="(foodEntry, index) in minArr" :key="index" :icon="'http://item.wangxuelong.vip:8001/img/' + foodEntry.image_url" :text="foodEntry.title" />
        </van-grid>
      </van-swipe-item>
    </van-swipe>
    <div class="fjShopClass">
      <van-icon name="shop-o" size="12" />
      <span>附近商家</span>
    </div>
    <van-divider />
    <RestaurantList :obj="obj"></RestaurantList>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import RestaurantList from '@/components/RestaurantList.vue'
import Tabbar from '@/components/Tabbar.vue'
import {getHttpLLGetLocal,getHttpFoodCate} from '@/service/getData.js'
import {searchPage,homePage} from '@/router/routerStr.js'
export default {
  name: 'Msite',
  components: {
    Tabbar,
    RestaurantList,
  },
  data() {
    return {
      //用户定位
      userLocation: '',
      lltude: [], //经纬度数组
      foodEntryList: [], //食品分类列表
      searchPage:'',
      homePage:''
    }
  },
  async created() {
    this.init()
  },
  watch: {
    '$route.query.geohash'(newVal , oldVal){
        this.$route.query.geohash && this.init()
        console.log("init ......change")
    },
  },
  computed: {
    ...mapState(['latitude', 'longitude', 'geohash']),
    obj() {
      return {
        url: '/shopping/restaurants',
        objData: {
          latitude: this.latitude,
          longitude: this.longitude,
        },
      }
    },
  },
  methods: {
    init() {
      this.homePage=homePage
      this.searchPage=searchPage
      //接收新坐标
      if (this.$route.query.geohash) {
        this.lltude = this.$route.query.geohash.split(',')
        //记录当前经纬度
        this.RECORD_ADDRESS(this.lltude)
        this.RECORD_GEOHASH(this.lltude)
        this.getUserLocation()
      } else {
        //默认坐标
        this.getUserLocation()
        this.lltude = [this.latitude, this.longitude]
      }
      this.getFoodList()
    },
    ...mapMutations(['RECORD_ADDRESS', 'RECORD_GEOHASH']),
    // 根据经纬度获取详细定位
    async getUserLocation() {
      const { data, status } = await getHttpLLGetLocal(this.latitude,this.longitude)
      if (status !== 200) {
        return this.$toast('获取详细定位失败')
      } else {
        this.userLocation = data.name
      }
    },
    async getFoodList() {
      const { data } = await getHttpFoodCate()
      const arr = []
      let minArr = []
      data.forEach((item) => {
        //如果小数组是满的，就创建一个新的
        if (minArr.length === 8) {
          minArr = []
        }
        if (minArr.length === 0) {
          arr.push(minArr)
        }
        minArr.push(item)
      })
      this.foodEntryList = arr
      console.log(1)
      console.log(this.foodEntryList)
    },
  },
}
</script>
<style lang="less" scoped>
.header{
    background-color: rgb(70, 182, 242);
}
.fjShopClass {
  position: absolute;
  top: 240px;
  bottom: 0;
  left: 10px;
  right: 0;
  width: 60px;
  height: 14px;
  font-size: 12px;
  color: rgb(155, 155, 155);
}
</style>
