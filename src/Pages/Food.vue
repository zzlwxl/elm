<template>
  <div>
    <van-nav-bar :title="title">
      <template #left>
        <van-icon @click="$router.back()" name="arrow-left" size="18" />
      </template>
    </van-nav-bar>
    <van-dropdown-menu>
      <van-dropdown-item title="分类">
        <van-tree-select selected-icon="" :items="entryItems" :active-id.sync="activeId" :main-active-index.sync="activeIndex" />
        <template #content>
            <van-icon @click="$router.back()" name="arrow-left" size="18" />
        </template>
      </van-dropdown-item>
      <van-dropdown-item title="分类">
        <van-tree-select :items="entryItems" :active-id.sync="activeId" :main-active-index.sync="activeIndex" />
      </van-dropdown-item>
      <!-- <van-dropdown-item -model="value" :options="option" /> -->

      <van-dropdown-item title="筛选" ref="item">
        <van-cell center title="包邮">
          <template #right-icon>
            <van-switch v-model="switch1" size="24" active-color="#ee0a24" />
          </template>
        </van-cell>
        <van-cell center title="团购">
          <template #right-icon>
            <van-switch v-model="switch2" size="24" active-color="#ee0a24" />
          </template>
        </van-cell>
        <div style="padding: 5px 16px">
          <van-button type="danger" block round @click="onConfirm"> 确认 </van-button>
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  data() {
    return {
      lltude: [], //经纬度
      title: '', //标题
      restaurant_category_id: '', //分类ID
      value: 0,
      switch1: false,
      switch2: false,
      entryObject: {}, //每一个分类所包含的数据对象
      entryItems: [], //分类显示所需的数据
      activeId: 1, //右侧选中项的 id，支持传入数组
      activeIndex: 0, //左侧选中项的索引
    }
  },
  created() {
    this.lltude = this.$route.query.geohash.split(',')
    this.title = this.$route.query.title
    this.restaurant_category_id = this.$route.query.restaurant_category_id
    this.getFoodEntryList()
  },
  computed:{
      ...mapState(["latitude", "longitude"])
  },
  methods: {
    async getFoodEntryList() {
      const { data } = await this.$http.get('/shopping/v2/restaurant/category', { latitude: this.latitude, longitude: this.latitude })
      console.log(data)
      this.entryItems=((data.map((item) => {
          return {
              text:item.name,
              badge:item.count,
              children:item.sub_categories.map((sub)=>{
                  return{
                      text:sub.name,
                      id:sub.id,
                      badge:sub.count
                  }
              })
          }
      })))
      console.log(this.entryItems)
    },
    onConfirm() {
      this.$refs.item.toggle()
    },
  },
}
</script>

<style lang="less" scoped>
.van-info .van-sidebar-item__info{
  background-color: rgb(21, 79, 196);
}
</style>
