<template>
  <div>
    <MyNavBar :isShowLeft="true">新增地址</MyNavBar>
    <van-form @submit="onSubmit">
      <van-field v-model="username" label-width="45px" name="姓名" label="姓名" :rules="[{ required: true, message: '请填写姓名' }]" />
          <van-field  v-model="address" label-width="45px"  name="地址" label="地址"  :rules="[{ required: true, message: '请填写地址' }]" />
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: '',
      address: '',
      addressInfo: '',
      phone: '',
      phone2: '',
      tag: '',
      sex: '',
      tag_type: '',
    }
  },
}
</script>

<style></style>
