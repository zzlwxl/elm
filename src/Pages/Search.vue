<template>
  <div>
    <MyNavBar>搜索</MyNavBar>
    <van-search @clear="clearInput" clearable v-model="keyword" show-action placeholder="请输入商家或美食名称" @search="onSearch">
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <RestaurantList :obj='obj'></RestaurantList>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue'
import RestaurantList from '@/components/RestaurantList.vue'
import {requestGet} from '@/API/getData.js'
import { mapState} from 'vuex'
export default {
  components: {
    Tabbar,
    RestaurantList
  },
  data() {
    return {
      keyword: '', //商家或者美食名称
    }
  },
  computed:{
      ...mapState(['latitude', 'longitude','geohash']),
      obj(){
        return{
          url:'/shopping/restaurants',
          objData:{
            geohash:this.geohash,
            keyword:this.keyword
          }
        }
      }
  },
  methods: {
    clearInput() {},
    async onSearch() {
        const data=await requestGet('/v4/restaurants',{geohash:this.geohash,keyword:this.keyword})
        this.keyword=''
    },
  },
}
</script>

<style></style>
