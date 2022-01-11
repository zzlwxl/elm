<template>
  <div>
    <MyNavBar :isShowLeft="true" :isShowRight="true" iconRight="plus" toRight="/userinfo/addressedit/addressadd">选择地址</MyNavBar>

    <van-cell v-for="(item, index) in AddressList" :key="'key' + index">
      <template #title>
        <span class="custom-title">{{ item.name }}</span>
        <span>{{ item.phone }}</span>
      </template>
      <template #right-icon>
        <van-icon @click="choose(item)" name="circle" />
      </template>
      <template #label>
        <van-tag :type="tabColor(item.tag_type)">{{ item.tag }}</van-tag>
        {{ item.address }}
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getStore } from '@/utils/utils.js'
import {mapMutations} from 'vuex'
import {getHttpAddressList} from '@/service/getData.js'

export default {
  data() {
    return {

      AddressList: [],
    }
  },
  methods: {
      ...mapMutations(['CHOOSE_ADDRESSS']),
      choose(item){
          this.CHOOSE_ADDRESSS(item)
          this.$toast.success('选择成功')
          this.$router.go(-1)
      },
      tabColor(type) {
      switch (type) {
        case 2:
          return 'primary'
        case 3:
          return 'warning'
        case 4:
          return 'danger'
      }
    },
    async getAddress() {
      const { data } = await getHttpAddressList(getStore('user_id'))
      if(!data.length){
        this.$toast.fail('您还未添加过任何地址')
      }
      let temp = data
      this.AddressList = temp
    },
  },
  mounted() {
    this.getAddress()
  },
  
}
</script>

<style lang="less" scopd>
.van-cell__left-icon{
  margin-left:  4px !important;
}
</style>
