<template>
  <div>
    <div :class="['navBar']">
    <van-icon v-if="isShowLeft2" @click="clickLeft" class="left" :name="iconLeft2" :size="iconSize2" />
      <slot></slot>
    <van-icon v-if="isShowRight2" @click="clickRight" class="right" :name="iconRight2" :size="iconSize2" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyNavBar',
  props: {
    styleString: String,
    isShowLeft:Boolean,//默认不显示
    isShowRight:Boolean,
    iconLeft:String,
    iconRight:String,
    toLeft:String,
    toRight:String,
    iconSize:Number
  },
  data() {
      return {
          isShowLeft2:true,
          isShowRight2:true,
          iconLeft2:'arrow-left',//默认显示的图标
          iconRight2:'arrow-left',
          toLeft2:'',
          toRight2:'',
          iconSize2:12
      }
  },
  methods: {
      clickLeft(){
          if(this.toLeft2===''){
              this.$router.back()
          }else{
              this.$router.push(this.toLeft2)
          }
      },
      clickRight(){
          if(this.toRight2===''){
              this.$router.back()
          }else{
              this.$router.push(this.toRight2)
          }
      }
  },
  created() {
      this.isShowLeft2=(this.isShowLeft || false)
      this.isShowRight2=(this.isShowRight || false)
      this.toLeft2=(this.toLeft || '')
      this.toRight2=(this.toRight || '')
      this.iconSize2=(this.iconSize || this.iconSize2)
      if(this.isShowRight){
          this.iconRight2=(this.iconRight || this.iconRight2)
      }
      if(this.isShowLeft){
          this.iconLeft2=(this.iconLeft || this.iconLeft2)
      }
  },
}
</script>

<style lang="less" scoped>
.navBar {
  background-color: rgb(70, 182, 242);
  height: 30px;
  width: 100%;
  font-size: 14px;
  border-bottom: 1px solid rgb(240, 240, 240);
  text-align: center;
  color: rgb(255, 255, 255);
  padding-top: 10px;
}
.left{
    float: left;
    padding-top: 3px;
}
.right{
    float: right;
    padding-top: 3px;
}
</style>
