<template>
  <div>
    <van-nav-bar :title="userLocation">
      <template #left>
        <van-icon name="search" size="18" />
      </template>
      <template #right>
        <van-icon @click="goCityList" name="location-o" size="18" />
      </template>
    </van-nav-bar>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(minArr, index) in foodEntryList" :key="index">
        <van-grid>
          <van-grid-item :to="'/food?geohash=' + latitude + ',' + longitude + '&title=' + foodEntry.title + '&restaurant_category_id=' + foodEntry.id" v-for="(foodEntry, index) in minArr" :key="index" :icon="'http://item.wangxuelong.vip:8001/img/' + foodEntry.image_url" :text="foodEntry.title" />
        </van-grid>
      </van-swipe-item>
    </van-swipe>
    <restaurantList :lltude="lltude"></restaurantList>
    <van-tabbar active-color="#2196F3" inactive-color="#000" route>
      <van-tabbar-item replace to="/msite" icon="smile-o">外卖</van-tabbar-item>
      <van-tabbar-item replace to="/search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item replace to="/search" icon="point-gift-o">订单</van-tabbar-item>
      <van-tabbar-item replace to="/search" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import restaurantList from '@/components/restaurantList.vue'
export default {
  components:{
    restaurantList
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
    if (this.$route.query.geohash) {
      this.lltude = this.$route.query.geohash.split(',')
      //记录当前经纬度
      this.RECORD_ADDRESS(this.lltude)
      this.getUserLocation()
    } else {
      this.getUserLocation()
      this.lltude=[this.latitude,this.longitude]
    }
    this.getFoodList()
    
  },
  computed: {
    ...mapState(['latitude', 'longitude']),
  },
  methods: {
    ...mapMutations(['RECORD_ADDRESS']),
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
    },
    
  },
}
</script>
<style lang="less" scoped>
</style>