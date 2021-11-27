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
  </div>
</template>

<script>
export default {
data() {
  return {
    //用户定位
    userLocation:'',
    lltude:[],//经纬度数组
  }
},
created() {
  if(this.$route.query.geohash){
    this.lltude=this.$route.query.geohash.split(',')
    this.getUserLocation()
  }else{
    this.userLocation='未定位'
  }
  },
methods: {
  // 根据经纬度获取详细定位
  async getUserLocation(){
    const {data,status}=await this.$http.get(`/v2/pois/${this.lltude[0]},${this.lltude[1]}`)
    if(status !== 200){
      return this.$toast('获取详细定位失败');
    }else{
      this.userLocation=data.name
    }
  },
  goCityList(){
    this.$router.push('/home')
  }
},
}
</script>

<style>

</style>