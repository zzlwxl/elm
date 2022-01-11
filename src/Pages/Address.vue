<template>
  <div>
    <MyNavBar :isShowLeft="true" :isShowRight="true" iconRight="plus" toRight="/userinfo/addressedit/addressadd">编辑地址</MyNavBar>
    <van-cell v-for="(item, index) in AddressList" :key="'key' + index">
      <template #title>
        <span class="custom-title">{{ item.name }}</span>
        <span>{{ item.phone }}</span>
      </template>
      <template #right-icon>
        <van-icon @click="delAddress(item.id)" name="cross" />
      </template>
      <template #label>
        <van-tag :type="tabColor(item.tag_type)">{{ item.tag }}</van-tag>
        {{ item.address }}
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getHttpAddressList, delHttpDelAddress } from '@/service/getData.js'
import { getStore } from '@/utils/utils.js'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      userName: '',
      AddressList: [],
      id: '',
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
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
    async delAddress(addressID) {
      const data = await delHttpDelAddress(addressID, getStore('user_id'))
      console.log(data)
      this.getAddress(getStore('user_id'))
    },
    async getAddress() {
      console.log('执行了一次')
      const { data } = await getHttpAddressList(getStore('user_id'))
      let temp = data
      this.AddressList = temp
      console.log(data)
    },
  },
  mounted() {
    this.getAddress()
  },
}
</script>

<style lang="less" scoped>
.custom-title {
  margin-right: 4px;
}
.van-cell__left-icon{
  margin-left:  4px !important;
}
</style>
