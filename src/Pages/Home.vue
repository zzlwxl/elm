<template>
  <div>
    <MyNavBar :isShowLeft="true"></MyNavBar>
    <van-skeleton animate :row="30" :loading="loading">
      <van-index-bar>
        <span v-for="(item, key) in sortCityList" :key="key">
          <van-index-anchor :index="key" />
          <van-grid>
            <van-grid-item :to="'/city/' + itemList.id" v-for="itemList in item" :key="itemList.id" :text="itemList.name" />
          </van-grid>
        </span>
      </van-index-bar>
    </van-skeleton>
  </div>
</template>

<script>
import {getHttpCitys} from '@/service/getData.js'
export default {
  data() {
    return {
      loading: true,
      sortCityList: {}, //已排好序的城市列表
    }
  },
  created() {
    this.getCityList()
  },
  methods: {
    async getCityList() {
      const { data } = await getHttpCitys()
      let citySortList = {} //新建一个对象用于赋给sortCityList，如果不新建而用自己去进行排序，这样会导致vue检测不到对象发生变化，也就不会渲染页面，
      for (let i = 65; i <= 90; i++) {
        if (data[String.fromCharCode(i)]) {
          citySortList[String.fromCharCode(i)] = data[String.fromCharCode(i)]
        }
      }
      this.sortCityList = citySortList //但是此时是把整个对象给赋给它了，所以对象发生了变化，也就被vue检测到了，就会渲染到页面
      console.log(this.sortCityList)
      this.loading = false
    },
  },
  computed: {},
}
</script>

<style lang="less" scoped></style>
