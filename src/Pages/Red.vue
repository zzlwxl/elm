<template>
  <div>
    <MyNavBar :isShowLeft="true">红包详情</MyNavBar>
    <van-list class="msiteBox" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoadRedList(offset, limit)">
      <div class="heard" v-for="(item, index) in redListAll" :key="index">
        <van-card
  :desc="item.description_map.sum_condition"
>
<template #title>
<span class="redPrice">
    {{'¥'+item.amount}}
</span>
</template>
  <template #tags>
  </template>
  <template #price>
      {{'红包来源：'+item.name}}
  </template>
  <template #num>
      {{item.end_date+'到期'}}
  </template>
</van-card>
      <van-divider />
      </div>
    </van-list>
  </div>
</template>

<script>
import { getHttpRed } from '@/service/getData.js'
import { getStore } from '@/utils/utils.js'
export default {
  data() {
    return {
      redListAll: [], 
      redList: [], 
      loading: false,
      finished: false,
      offset: 0,
      limit: 5,
    }
  },
  methods: {
    async onLoadRedList(offset, limit) {
      const { data } = await getHttpRed(getStore('user_id'), limit, offset)
      this.redList = Array(data)[0]
      //下一次请求的起点
      this.offset += limit
      this.loading = false //加载结束
      //全部加载完成
      if (this.redList.length === 0) {
        this.finished = true
        return
      }
      //加载完成后追加到总列表
      this.redListAll.push(...this.redList)
      console.log(this.redListAll)
    },
  },
  mounted() {
    this.onLoadRedList(this.offset, this.limit)
  },
}
</script>

<style lang="less" scopd>
.redPrice{
    font-size: 30px !important;
    color: rgb(255, 69, 27) !important;
}
</style>
