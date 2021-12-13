<template>
  <div>
    <van-nav-bar :title="userLocation">
      <template #left>
        <van-icon @click="goSearch" name="search" size="18" />
      </template>
      <template #right>
        <van-icon @click="goCityList" name="location-o" size="18" />
      </template>
    </van-nav-bar>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(minArr, index) in foodEntryList" :key="index">
        <van-grid>
          <van-grid-item :to="'/food?geohash=' + geohash + '&title=' + foodEntry.title + '&restaurant_category_id=' + foodEntry.id" v-for="(foodEntry, index) in minArr" :key="index" :icon="'http://item.wangxuelong.vip:8001/img/' + foodEntry.image_url" :text="foodEntry.title" />
        </van-grid>
      </van-swipe-item>
    </van-swipe>
    <div class="fjShopClass">
    <van-icon  name="shop-o" size="12" />
    <span >附近商家</span>
    </div>
    <van-divider />
    <restaurantList :obj="obj" ></restaurantList>
   <Tabbar></Tabbar>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import RestaurantList from '@/components/RestaurantList.vue'
import Tabbar from '@/components/Tabbar.vue'
export default {
  name:'Msite',
  components:{
    Tabbar,
    RestaurantList
  },
  data() {
    return {
      //用户定位
      userLocation: '',
      lltude: [], //经纬度数组
      foodEntryList: [], //食品分类列表
    }
  },
  async created() {
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
      this.lltude=[this.latitude,this.longitude]
    }
    this.getFoodList()
    
  },
  computed: {
    ...mapState(['latitude', 'longitude','geohash']),
    obj(){
      return{
        url:'/shopping/restaurants',
        objData:{
          latitude:this.latitude,
          longitude:this.longitude
        }
      }
    }
  },
  methods: {
    ...mapMutations(['RECORD_ADDRESS','RECORD_GEOHASH']),
    // 根据经纬度获取详细定位
    async getUserLocation() {
      const { data, status } = await this.$http.get(`/v2/pois/${this.latitude},${this.longitude}`)
      if (status !== 200) {
        return this.$toast('获取详细定位失败')
      } else {
        this.userLocation = data.name
      }
    },
    goCityList() {
      this.$router.push('/home')
    },
    async getFoodList() {
      const { data } = await this.$http.get('/v2/index_entry')
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
    goSearch(){
      this.$router.push('/search')
    }
  },
}
</script>
<style lang="less" scoped>
.fjShopClass{
  position:absolute;
  top: 245px;
  bottom: 0;
  left: 10px;
  right: 0;
  width: 60px;
  height: 14px;
  font-size: 12px;
  color: rgb(155, 155, 155);
}
</style>