<template>
  <div>
    <div class="box">
      <div :class="['navBar']">
        <span>
          <van-icon v-if="isShowLeft2" @click="clickLeft" class="left" :name="iconLeft2" :size="iconSize2" />
        </span>
        <span>
          <slot></slot>
        </span>
        <span>
          <van-icon v-if="isShowRight2" @click="clickRight" class="right" :name="iconRight2" :size="iconSize2" />
        </span>
      </div>
    </div>
    <div id="show"></div>
  </div>
</template>

<script>
import { getStore } from '@/utils/utils.js'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'MyNavBar',
  props: {
    styleString: String,
    isShowLeft: Boolean, //默认不显示
    isShowRight: Boolean,
    iconLeft: String,
    iconRight: String,
    toLeft: String,
    toRight: String,
    iconSize: Number,
  },
  data() {
    return {
      isShowLeft2: true,
      isShowRight2: true,
      iconLeft2: 'arrow-left', //默认显示的图标
      iconRight2: 'arrow-left',
      toLeft2: '',
      toRight2: '',
      iconSize2: 12,
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    ...mapActions(['getUserInfo']),
    clickLeft() {
      if (this.toLeft2 === '') {
        this.$router.back()
      } else {
        this.$router.push(this.toLeft2)
      }
    },
    clickRight() {
      if (this.toRight2 === '') {
        this.$router.back()
      } else {
        this.$router.push(this.toRight2)
      }
    },
    getUserInfoFun() {
      console.log('this.userInfo')
      //vuex里没有值，且session里有值
      if (!this.userInfo && getStore('user_id')) {
        var id = getStore('user_id')
        console.log('用户ID' + id)
        this.getUserInfo(id)
      }
    }
  },
  mounted() {
    this.getUserInfoFun()
  },
  created() {
    this.isShowLeft2 = this.isShowLeft || false
    this.isShowRight2 = this.isShowRight || false
    this.toLeft2 = this.toLeft || ''
    this.toRight2 = this.toRight || ''
    this.iconSize2 = this.iconSize || this.iconSize2
    if (this.isShowRight) {
      this.iconRight2 = this.iconRight || this.iconRight2
    }
    if (this.isShowLeft) {
      this.iconLeft2 = this.iconLeft || this.iconLeft2
    }
  },
}
</script>

<style lang="less" scoped>
.box {
  background-color: rgb(70, 182, 242);
  position: fixed;
  z-index: 999;
  width: 100%;
  // border-bottom: 1px solid rgb(240, 240, 240);
}
#show{
    width: 100%;
    height: 41px;
}
.navBar {
  position: relative;
  background-color: rgb(70, 182, 242);
  height: 30px;
  width: 96%;
  font-size: 14px;
  text-align: center;
  padding-top: 10px;
  margin: 0 2px;
}
.navBar span {
  color: rgb(255, 255, 255);
}
.navBar span:nth-child(1) {
  float: left;
  width: 20px;
  color: rgb(255, 255, 255);
}
.left {
  position:fixed;
  float: left;
  padding-top: 3px;
}
.right {
  position: absolute;
  right: 0;
  float: right;
  padding-top: 3px;
}
</style>
