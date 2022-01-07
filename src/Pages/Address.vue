<template>
  <div>
    <MyNavBar :isShowLeft="true">编辑地址</MyNavBar>
    <button @click="routerAddressAdd">新增地址</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName:'',
    }
  },
  methods: {
    routerAddressAdd(){
      this.$router.push('/userinfo/addressedit/addressadd')
    },

  },

}
</script>

<style></style>
