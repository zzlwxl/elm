<template>
  <div>
    <MyNavBar :isShowLeft="true">新增地址</MyNavBar>
    <van-form @submit="onSubmit">
      <van-field v-model="userName" placeholder="请填写姓名" :rules="[{ required: true }]" />
      <van-field @blur="blurAddressInput" @input="debounce(getSearchCityName, 1000,true)" v-model="addressInput" placeholder="请选择地址" :rules="[{ required: true }]" />
      <van-cell v-show="showSerachCityList" v-for="(item, index) in searchAddressList" :key="'key' + index" icon="location-o" :label="item.address" :title="item.name" @click="subAddress(index, item.latitude + ','+item.longitude)" />
      <van-field v-model="addressInfo" placeholder="请填写详细地址" :rules="[{ required: true }]" />
      <van-field name="radio" label="标签">
        <template #input>
          <van-radio-group v-model="tag" direction="horizontal">
            <van-radio @click="tag_type = 2" name="家">家</van-radio>
            <van-radio @click="tag_type = 3" name="公司">公司</van-radio>
            <van-radio @click="tag_type = 4" name="学校">学校</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field v-model="phone" placeholder="请填写手机号" :rules="[{ required: true }]" />
      <van-field v-model="phone2" placeholder="请填写备用手机号" :rules="[{ required: true }]" />
      <van-field name="radio" label="性别">
        <template #input>
          <van-radio-group v-model="sex" direction="horizontal">
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getHttpSearchCityName ,postHttpAddAddress} from '@/service/getData.js'
export default {
  data() {
    return {
      userName: '',
      addressInput: '',
      geohash: '',
      addressInfo: '',
      phone: '',
      phone2: '',
      tag: '',
      sex: '',
      tag_type: '',
      searchAddressList: [],
      //是否展示搜索的列表
      showSerachCityList: false,
      trueAddress: true,
    }
  },
  computed: {
      ...mapState(['address', 'cityID','userInfo']),
  },
  methods: {
      blurAddressInput(){
   
      },
      async onSubmit() {
          if(!this.trueAddress){
              return this.$toast.fail('填入正确地址')
          }else if(!this.tag){
            return this.$toast.fail('选择标签')
          }else if(!this.sex){
            return this.$toast.fail('选择性别')
          }
          
     const data = await postHttpAddAddress(
         this.userInfo.user_id,
         this.addressInput,
         this.addressInfo,
         this.geohash,
         this.userName,
         this.phone,
         this.tag,
         this.sex,
         this.phone2,
         this.tag_type
         )
         this.$toast.success('添加成功')
         this.$router.go(-1)

      },
    async subAddress(index, geohash) {
        this.trueAddress=true
      this.showSerachCityList = false
      this.addressInput = this.searchAddressList[index].name
      this.geohash = geohash
    },
    async getSearchCityName() {
        console.log('搜索')
      const { data } = await getHttpSearchCityName(this.cityID, this.addressInput)
      let temp = data
      if (!data.message) {
        if (data.length === 0) {
            this.trueAddress=false
            this.showSerachCityList = false
          return this.$toast('搜索不到地址')
        }
        this.showSerachCityList = true
        this.searchAddressList = temp
      } else {
        this.searchAddressList = []
      }
    },
    //函数防抖
    debounce(func, wait,triggleNow) {
        console.log('进入防抖函数')
      var timer = null
       var debounced = function () {
          var _self= this,args = arguments;
        if (!timer) {
            console.log('清除定时器')
          clearTimeout(timer)
        }
        if(triggleNow){
            var exec = !timer
            timer = setTimeout(function(){
                timer = null;
                console.log('设置定时器',timer)
                 func.apply(_self,args)
            },wait)
            //首次进入就执行
            if(exec){
                console.log('首次不防抖，执行',exec,timer)
                func.apply(_self,args)
            }
        }else{
            console.log('首次就防抖')
            timer=setTimeout(function(){
                func.apply(_self,args);
            },wait)
        }
      }
      debounced.remove = function(){
          console.log('remove')
          clearTimeout(timer);
          timer=null
      }
      return debounced()
    },
  },
  mounted() {},
}
</script>

<style lang="less" scoped>
.van-cell__left-icon{
  margin-left:  4px !important;
}
</style>
