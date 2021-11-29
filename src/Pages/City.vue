<template>
  <div>

    <van-nav-bar :title="cityName" left-text="返回" left-arrow @click-left="$router.back()" />
    <van-search @clear="clearInput" clearable v-model="inputAddress" show-action placeholder="请输入学校、写字楼、地址" @search="onSearch">
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <van-cell v-for="(item, index) in searchAddressList" :key="index" icon="location-o" :label="item.address" :title="item.name" @click="subAddress(index, { latitude: item.latitude + '', longitude: item.longitude + '' })" />
    <div v-show="isShowHistory" class="historyClass">历史记录</div>
    <van-cell v-show="isShowHistory" v-for="(item, index) in hisorySerachAddressList" :key="index" icon="location-o" :label="item.address" :title="item.name" @click="subAddress(index, { latitude: item.latitude + '', longitude: item.longitude + '' })" />
    <van-button v-show="isShowHistory" @click="clearHistory" block>清除所有</van-button>
  </div>
</template>

<script>
import { getStore, setStore ,removeStore} from '@/utils/utils.js'
export default {
  props: ['id'],
  data() {
    return {
      cityName: '',
      inputAddress: '',
      searchAddressList: [],
      hisorySerachAddressList: [],
      isShowHistory: true,
    }
  },
  created() {
    this.getCityName()
    this.initData()
  },
  methods: {
    initData() {
      //获取搜索历史记录
      if (getStore('placeHistory')) {
        //如果有历史记录就添加
        this.hisorySerachAddressList = JSON.parse(getStore('placeHistory'))
      } else {
          //没有历史记录就不用显示清楚按钮了
        this.isShowHistory=false
        this.hisorySerachAddressList = []
      }
      console.log(this.hisorySerachAddressList)
    },
    async getCityName() {
      const { data, status } = await this.$http.get(`/v1/cities/${this.id}`)
      if (status !== 200) {
        return this.$toast('获取城市名失败')
      } else {
        this.cityName = data.name
      }
    },
    //搜索城市里具体地址
    async onSearch() {
      const { data, status } = await this.$http.get(`/v1/pois?city_id=${this.id}&keyword=${this.inputAddress}&type=search`)
      if (status !== 200) {
        return this.$toast('搜索失败')
      } else {
        this.searchAddressList = data
        console.log(this.searchAddressList)
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
        this.hisorySerachAddressList = JSON.parse(getStore('placeHistory'))
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
      this.$router.push({ path: `/msite?geohash=${geohash.latitude},${geohash.longitude}` })
    },
    clearInput() {
      this.searchAddressList = []
      this.isShowHistory = true
    },
    clearHistory() {
        this.isShowHistory=false
      removeStore('placeHistory')
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
</style>
