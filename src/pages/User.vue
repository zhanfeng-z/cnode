<template>
  <div>
    <div v-if="avatar_url == ''">
      <div class="login-logo">
        <img src="https://cnodejs.org/public/images/cnodejs.svg" alt="">
      </div>
      <div class="login-title">
        登录到Cnodejs.org
      </div>
      <mt-field label="AccessToken"  v-model="accessToken"></mt-field>
      <div class="btn-box">
          <mt-button type="default">随便逛逛</mt-button>
          <mt-button type="primary" @click="onLogin">立即登录</mt-button>
      </div>
    </div>
    <div class="user-box" v-else='avatar_url'>
      <div class="user-head-box">
        <div class="big-avatar">
          <img v-lazy="avatar_url" alt="">
        </div>
        <div class="user-head-title">
          <div class="user-head-name" v-text="loginname"></div>
          <div class="user-head-link">
            <a :href="'https://github.com/${userInfo.githubUsername}'">{{githubUsername}}@github.com</a>
          </div>
        </div>
        <div class="user-head-intro">
          注册时间：{{create_at | timeAgo}}
          <span>积分：{{score}}</span>
        </div>
      </div>
      <mt-navbar v-model="active">
        <mt-tab-item id="tab-container1">最近回复</mt-tab-item>
        <mt-tab-item id="tab-container2">最新发布</mt-tab-item>
        <mt-tab-item id="tab-container3">话题收藏</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="active">
        <mt-tab-container-item id="tab-container1" class="feed-box">
          <div v-for="i in recent_replies" :key="i.id" class="feed-li">
            <router-link :to="{name: 'detail', query: { id: i.id }}">
              <div class="feed-content">
                <div class="avatar">
                  <img v-lazy="i.author.avatar_url" alt="headImgUrl">
                </div>
                <div class="feed-right">
                  <div class="feed-right-top">
                    <div class="feed-title">
                      <p v-text="i.title"></p>
                    </div>
                  </div>
                  <div class="feed-right-bottom">
                    <div class="feed-time">
                      <span>{{i.author.loginname}}</span>
                    </div>
                    <div class="feed-pass">
                      {{i.last_reply_at | timeAgo}}
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container2">
          <div v-for="i in recent_topics" :key="i.id" class="feed-li">
            <router-link :to="{name: 'detail', query: { id: i.id }}">
              <div class="feed-content">
                <div class="avatar">
                  <img v-lazy="i.author.avatar_url" alt="headImgUrl">
                </div>
                <div class="feed-right">
                  <div class="feed-right-top">
                    <div class="feed-title">
                      <p v-text="i.title"></p>
                    </div>
                  </div>
                  <div class="feed-right-bottom">
                    <div class="feed-time">
                      <span>{{i.author.loginname}}</span>
                    </div>
                    <div class="feed-pass">
                      {{i.last_reply_at | timeAgo}}
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container3">
          <div v-for="i in topic_collect" :key="i.id" class="feed-li">
            <router-link :to="{name: 'detail', query: { id: i.id }}">
              <div class="feed-content">
                <div class="avatar">
                  <img v-lazy="i.author.avatar_url" alt="headImgUrl">
                </div>
                <div class="feed-right">
                  <div class="feed-right-top">
                    <div class="feed-title">
                      <p v-text="i.title"></p>
                    </div>
                  </div>
                  <div class="feed-right-bottom">
                    <div class="feed-time">
                      <span>{{i.author.loginname}}</span>
                    </div>
                    <div class="feed-pass">
                      {{i.last_reply_at | timeAgo}}
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
      <div class="ext-btn-reply btn-logout" @click="onLogout" :class="{'hide': !isShowBtnLogout}">
        注销
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user',
  data(){
    return{
      accessToken:' 639a362f-c599-4c6f-b3b0-c1c36e51e08a',
      userInfo:{},
      displayList:[],
      isShowBtnLogout:false,
      active:'tab-container1',
      topic_collect:[],
      create_at:'',
      score:'',
      githubUsername:''
    }
  },
  computed:{
    avatar_url(){
      return this.$store.state.userInfo.avatarUrl
    },
    loginname(){
      return this.$store.state.userInfo.loginname
    },
    recent_topics(){
      return this.$store.state.userInfo.recent_topics
    },
    recent_replies(){
      return this.$store.state.userInfo.recent_replies
    }
  },
  activated(){
    this.$store.commit('SET_SHOWTABBAR',true);
    this.$store.commit('SET_PATH',{headTitle:'我',hasBack:false})
  },
  watch:{
    active:function(){
      if(this.active == 'tab-container3'){
        this.getCollect();
      }
    }
  },
  methods:{
    onLogin(){
      if (!this.accessToken) {
        this.$toast({
          message: '请输入AccessToken',
          position: 'bottom',
          duration: 3000
        });
        return false
      } else {
        this.$http.post(' https://cnodejs.org/api/v1/accesstoken', {
          accesstoken: this.accessToken
        }).then(result => {
          console.log(result)
          localStorage.setItem('accessToken', this.accessToken)
          this.$store.commit('SET_LOGININFO', {
            avatarUrl: result.data.avatar_url,
            id: result.data.id,
            loginname: result.data.loginname,
            accessToken: this.accessToken
          })
          this.$toast({
            message: '登录成功',
              position: 'bottom',
            duration: 3000
          });
          return result.data.loginname;
        }).then(
          loginname => {
            this.$http.get('https://cnodejs.org/api/v1/user/'+loginname+'').then(result => {
              console.log(result);
              this.$store.commit('SET_REPLIES', {
                recent_replies: result.data.data.recent_replies,
                recent_topics: result.data.data.recent_topics,
              })
              this.create_at = result.data.data.create_at;
              this.score = result.data.data.score;
              this.githubUsername = result.data.data.githubUsername;
            })
          }
        ).catch(() => {
          this.$toast({
            message: 'AccessToken错误',
            position: 'bottom',
            duration: 3000
          });
        })
      }
    },
    getCollect(){
      this.$http.get('https://cnodejs.org/api/v1/topic_collect/'+this.loginname+'').then(result => {
        console.log(result);
        this.topic_collect = result.data.data;
      })
    },
    onLogout(){

    }
  }

}
</script>

<style lang="scss" scoped>
.user-component{
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}
.login-logo{
  padding: 14px 20px;
}
.btn-box{
  margin: 20px 20px 0;
  display: flex;
  justify-content: space-between;
  button{
    width: 100%;
    flex-grow: 1;
    margin: 0 5px;
  }
  .mint-button--primary{
    background-color: #04be02;
  }
}
.user-head-box{
  background: url('../assets/head_bg.jpg') 50%;
  background-size: cover;
}
.user-head-link a{
  color: #ddd;
}
.feed-title p{
  margin: 0;
}
.mint-navbar{
  position: relative;
  &::before{
    content: " ";
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 100%;
    height: 1px;
    border-bottom: 1px solid #bcbab6;
    color: #bcbab6;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}
.mint-navbar .mint-tab-item.is-selected{
  border-bottom: 3px solid #80bd01;
  color: #80bd01;
  margin-bottom: -3px;
}
</style>




