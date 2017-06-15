<template>
  <div id="app">
    <mt-header fixed :title="headTitle">
      <mt-button icon="back" @click="$router.go(-1)" slot="left" v-if="hasBack"></mt-button>
    </mt-header>
    <transition name="page-slide">
      <keep-alive include="home">
        <router-view class="router-content"></router-view>
      </keep-alive>
    </transition>
    <mt-tabbar v-model="path" v-if="showTabbar">
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
    return{
      path:'home'
    }
  },
  computed:{
    showTabbar(){
      return this.$store.state.showTabbar;
    },
    headTitle(){
      return this.$store.state.headTitle;
    },
    hasBack(){
      return this.$store.state.hasBack;
    }
  },
  watch:{
    path:function(){
      this.$router.push({name: this.path});
    }
  }
}
</script>

<style >
@import './libs/globalSet.less';
@import './libs/markdown.less';
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
.router-content{
  margin: 40px 0 55px;
}
.mint-header{
  background-color: #80bd01;
}
.mint-tabbar > .mint-tab-item.is-selected{
  color: #80bd01;
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
