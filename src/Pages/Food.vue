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
      <van-dropdown-item title="排序" ref="sortSubToggle">
        <van-cell :clickable="true" @click="sortSubEvent('4')" center title="智能排序"></van-cell>
        <van-cell :clickable="true" center @click="sortSubEvent(index)" v-for="(item,index) in sortItems" :key="index" :title="item">
        </van-cell>
      </van-dropdown-item>
      <van-dropdown-item title="筛选" ref="item">
        <van-cell center title="包邮">
          <template #right-icon>
            <van-switch v-model="switch1" size="24" active-color="#ee0a24" />
          </template>
        </van-cell>
        <div style="padding: 5px 16px">
          <van-button type="danger" block round @click="onConfirm"> 确认 </van-button>
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>
    <!-- <RestaurantList :obj="obj"></RestaurantList> -->
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import RestaurantList from '@/components/RestaurantList.vue'
import {getHttpFoodItemList} from '@/service/getData.js'
export default {
  components:{
    RestaurantList
  },
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
      activeIndex: 0, //左侧选中项的索引
      activeId: 1, //分类右侧选中项的 id
      // 排序选择数据 
      sortSubId:'4',
      sortItems:{
        '5':'距离最近',
        '6':'销量最高',
        '1':'起送价最低',
        '2':'配送速度最快',
        '3':'评分最高'
      }
    }
  },
  created() {
    this.lltude = this.$route.query.geohash.split(',')
    this.title = this.$route.query.title
    //餐馆分类ID
    this.restaurant_category_id = this.$route.query.restaurant_category_id
    this.getFoodEntryList()
  },
  computed:{
      ...mapState(["latitude", "longitude"])
  },
  methods: {
    async getFoodEntryList() {
      const { data } = await getHttpFoodItemList(this.latitude,this.latitude)
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
    sortSubEvent(id){
      this.$refs.sortSubToggle.toggle();
      //通过ID可以控制排序的方式
      console.log(id)
    }
  },
  computed:{
    obj(){

    }
  }
}
</script>

<style scoped>
.van-info .van-sidebar-item__info{
  background-color: rgb(21, 79, 196);
}
</style>
