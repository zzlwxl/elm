<template>
  <div>

    <van-nav-bar :title="cityName" left-text="返回" left-arrow @click-left="$router.back()" />
    <van-search @clear="clearInput" clearable v-model="inputAddress" show-action placeholder="请输入学校、写字楼、地址" @search="onSearch">
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <van-cell v-for="(item, index) in searchAddressList" 
    :key="'key'+index" icon="location-o" 
    :label="item.address" 
    :title="item.name" 
    @click="subAddress(index, { latitude: item.latitude + '', longitude: item.longitude + '' })" />
    <div v-show="isShowHistory" class="historyClass">历史记录</div>
    <van-cell v-show="isShowHistory" v-for="(item, index) in hisorySerachAddressList" 
    :key="index" icon="location-o" 
    :label="item.address" 
    :title="item.name" 
    @click="subAddress(index, { latitude: item.latitude + '', longitude: item.longitude + '' })" />
    <van-button v-show="isShowHistory" @click="clearHistory" block>清除所有</van-button>
  </div>
</template>

<script>
import { getStore, setStore ,removeStore} from '@/utils/utils.js'
import {getHttpCityName,getHttpSearchCityName} from '@/service/getData.js'
import {searchFoodsPage} from '@/router/routerStr.js'
import {mapMutations,mapState} from 'vuex'
export default {
  props: ['id'],
  data() {
    return {
      cityName: '',
      inputAddress: '',
      searchAddressList: [],
      isShowHistory: true,
      
    }
  },
  created() {
    this.getCityName()
    this.initData()
  },
  computed:{
    ...mapState(['hisorySerachAddressList'])
  },
  methods: {
    ...mapMutations(['GET_ADDRESS','CLEAR_HISORYADDRESS','ADD_HISTORYCITY']),
    initData() {
      //获取搜索历史记录
      if (getStore('placeHistory')) {
        this.GET_ADDRESS()
      } else {
          //没有历史记录就不用显示清楚按钮了
        this.isShowHistory=false
      }
    },
    async getCityName() {
      const { data, status } = await getHttpCityName(this.id)
      if (status !== 200) {
        return this.$toast('获取城市名失败')
      } else {
        this.cityName = data.name
      }
    },
    //搜索城市里具体地址
    async onSearch() { 
      if(this.inputAddress){
      const { data, status } = await getHttpSearchCityName(this.id,this.inputAddress)
      if (status !== 200) {
        return this.$toast('搜索失败')
      } else {
        this.isShowHistory=false
        this.searchAddressList = data
        console.log(this.searchAddressList)
      }
      }else{
        alert('请输入内容')
      }
    },
    subAddress(index, geohash) {
      this.isShowHistory = false
      let history = getStore('placeHistory') //获取历史记录，便于后面的追加
      let chooseLocation = this.searchAddressList[index] //拿到搜索列表选择的地址
      if (history) {
        //如果有历史记录且不重复，就追加
        let noRepChooseLocation = false
        //获取历史记录
        // this.hisorySerachAddressList = JSON.parse(getStore('placeHistory'))
        this.ADD_HISTORYCITY(JSON.parse(getStore('placeHistory')))
        this.hisorySerachAddressList.forEach((item) => {
          //如果历史记录每一条记录和准备追加的记录都不一致，即是新纪录，追加。
          if (item.latitude + '' === geohash.latitude && item.longitude + '' === geohash.longitude) {
            noRepChooseLocation = true
          }
        })
        if (!noRepChooseLocation) {
          //就把新纪录的所有信息追加到列表上去
          this.hisorySerachAddressList.push(chooseLocation)
        }
      } else {
        //没有历史记录，就新添加一条记录列表
        this.hisorySerachAddressList.push(chooseLocation)
      }
      //把已经追加、添加的列表重新记录到本地
      setStore('placeHistory', JSON.stringify(this.hisorySerachAddressList))
      this.$router.push(searchFoodsPage(geohash.latitude,geohash.longitude))
    },
    clearInput() {
      this.searchAddressList = []
      this.isShowHistory = true
    },
    clearHistory() {
        this.isShowHistory=false
      removeStore('placeHistory')
      this.CLEAR_HISORYADDRESS()
      this.initData()
    },
  },
}
</script>

<style lang="less" scoped>
.historyClass{
    margin-left: 15px;
    font-size: 12px;
    color: rgb(195, 189, 189);
}
.van-cell__left-icon{
  margin-left:  4px !important;
}
</style>
