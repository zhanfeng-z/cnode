<template>
  <div id="app">
    <transition name="page-slide">
      <router-view keep-alive></router-view>
    </transition>
    <mt-tabbar v-model="path">
      <mt-tab-item id="home" >
        <img slot="icon" src="../src/assets/logo.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="订单">
        <img slot="icon" src="../src/assets/logo.png">
        发布
      </mt-tab-item>
      <mt-tab-item id="message">
        <img slot="icon" src="../src/assets/logo.png">
        消息
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img slot="icon" src="../src/assets/logo.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
      path : this.$store.state.path
    }
  },
  watch:{
    path:function(){
      this.$router.push({name: this.path});
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body{
  margin: 0;
}
.mint-tabbar{
  position: fixed;
}
/*.page-slide-enter-active {
  transition: all .3s ease;
}
.page-slide-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.page-slide-enter, .page-slide-leave-active {
  transform: translateX(10px) translateY(-50px);
  opacity: 0;
}*/
/*.page-slide-enter-active,.page-slide-leave-active{
  transition: all .5s
}
.page-slide-enter{
  transform: translateX(100%)
}
.page-slide-leave-active{
  transform: translateX(-100%)
}*/
  
</style>
