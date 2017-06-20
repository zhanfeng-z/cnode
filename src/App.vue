<template>
  <div id="app">
    <mt-header fixed :title="headTitle">
      <mt-button icon="back" @click="$router.go(-1)" slot="left" v-if="hasBack"></mt-button>
    </mt-header>
    <transition name="page-slide">
      <keep-alive include="home,user">
        <router-view class="router-content"></router-view>
      </keep-alive>
    </transition>
    <mt-tabbar v-model="path" v-if="showTabbar">
      <mt-tab-item id="home" >
        <i slot="icon" class="icon-bookmark"></i>
        首页
      </mt-tab-item>
      <mt-tab-item id="订单">
        <i slot="icon" class="icon-edit"></i>
        发布
      </mt-tab-item>
      <mt-tab-item id="message">
        <i slot="icon" class="icon-envelope-alt"></i>
        消息
      </mt-tab-item>
      <mt-tab-item id="user">
        <i slot="icon" class="icon-reorder"></i>
        我
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
@import './libs/font-awesome.css';
#app {
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 14px;
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
  background-color: #282828;
}
.mint-tabbar > .mint-tab-item.is-selected{
  color: #80bd01;
}
.mint-tab-item-icon{
  font-size: 16px;
}
a{
  text-decoration: none;
  color: #333;
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
