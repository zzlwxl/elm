<template>
  <div>
    <transition name="fade" mode="out-in">
    <keep-alive exclude="RestaurantInfo,RestaurantList">
      <router-view  v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    </transition>
    <transition name="fade" mode="out-in">
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
}
</script>
<style lang="less" scoped>
</style>
