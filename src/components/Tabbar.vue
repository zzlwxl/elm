<template>
  <div>
    <van-tabbar active-color="#2196F3" inactive-color="#000" route>
      <van-tabbar-item replace to="/msite"  icon="smile-o">外卖</van-tabbar-item>
      <van-tabbar-item replace to="/search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item replace to="/order/orderlist"  icon="shop-o">订单</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  data() {
    return {
      
    }
  },
  methods: {
  },
}
</script>

<style></style>
