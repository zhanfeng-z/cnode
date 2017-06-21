<template>
  <div class="feed-box">
    <mt-loadmore :top-method="loadTop" ref="loadmore">
      <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <li class="feed-li" @click="goDetail(item.id)"  v-for="item in data" :key="item.id">
          <div class="feed-title">
            <div class="feed-label" :class="[item.top ? 'feed-label-top' : 'feed-label-other']">{{item.tab | translateTab(item.top)}}</div>
            <p>{{item.title}}</p>
          </div>
          <div class="feed-content">
            <router-link to="/detail">
              <div class="avatar">
                <img :src="item.author.avatar_url" alt="headImgUrl">
              </div>
            </router-link>
            <div class="feed-right">
              <div class="feed-right-top">
                <div class="feed-name">{{item.author.loginname}}</div>
                <div class="feed-count">
                  <span>{{item.reply_count}}</span> / {{item.visit_count}}
                </div>
              </div>
              <div class="feed-right-bottom">
                <div class="feed-time">
                  创建于：
                  <span>{{item.create_at | formatDate('yyyy-MM-dd hh:mm:ss')}}</span>
                </div>
                <div class="feed-pass">
                  {{item.last_reply_at | timeAgo}}
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </mt-loadmore>
  </div>
</template>

<script>
export default {
  name: 'home',
  data(){
    return {
      data : [],
      page: 1,
      loading: true
    }
  },
  mounted() {
    this.loadTop();
  },
  updated(){
    console.log('updated')
  },
  activated(){
    this.$store.commit('SET_SHOWTABBAR',true);
    this.$store.commit('SET_PATH',{headTitle:'首页',hasBack:false})
    this.loading = false;
  },
  deactivated(){
    this.loading = true;
  },
  methods:{
    loadTop:function(){
      this.$http.get('https://cnodejs.org/api/v1/topics',{params: {limit: 10,page: 1}}).then(response => {
        console.log('首次加载');
        console.log(response.data.data);
        this.data = response.data.data;
        this.loading = false;
        this.$refs.loadmore.onTopLoaded();
        // success callback
      }, response => {
        // error callback
      })
    },
    loadMore:function(){
      this.page ++ ;
      this.loading = true;
      this.$http.get('https://cnodejs.org/api/v1/topics',{params: {limit: 10,page: this.page}}).then(response => {
        console.log('加载更多');
        console.log(response.data.data);
        for(var i in response.data.data){
          this.data.push(response.data.data[i]);
        }
        this.loading = false;
        // success callback
      }, response => {
        // error callback
      })
    },
    goDetail:function(id){
      // this.$store.commit('link',{path:'详情',hasBack:true});
      this.$router.push({ name: 'detail', query: { id: id }})
    }
  }
}
</script>
<style lang="scss">
ul{
  padding: 0;
  margin: 0;
}
.feed-li{
  list-style: none;
  padding: 14px;
  position: relative;
  display: block;
  color: #333;
  text-decoration: none;
  &::before{
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    border-bottom: 1px solid #bcbab6;
    color: #bcbab6;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5)
  }
}
.feed-title {
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  min-width: 0;
  p{
    margin: 0 0 0 8px;
    font-size: 14px;
    line-height: 24px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    -webkit-box-flex: 1;
    flex: 1;
    min-width: 0
  }
}
.feed-content {
  display: -webkit-box;
  display: flex;
  font-size: 13px;
  margin-top: 8px
}
.feed-time {
  font-size: 12px;
  color: #666
}
.feed-right {
  -webkit-box-flex: 1;
  flex: 1;
  min-width: 0;
  margin-left: 8px
}
.feed-count span {
  color: #80bd01
}
.feed-label {
  font-size: 12px;
  border-radius: 4px;
  padding: 0 5px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  flex-shrink: 0;
  box-sizing: border-box;
}
.feed-label-top {
  background-color: #80bd01;
  color: #fff
}
.feed-label-other {
  background-color: #e3e3e3;
  color: #333
}
.feed-right .feed-right-bottom,.feed-right .feed-right-top {
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between
}
.avatar {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden
}

.avatar img {
  height: 100%;
  width: 100%
}

</style>



