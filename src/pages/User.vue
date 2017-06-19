<template>
  <div class="user-component">
    <div v-if="avatar_url!=''">
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
          <img v-lazy="userInfo.avatar_url" alt="">
        </div>
        <div class="user-head-title">
          <div class="user-head-name" v-text="userInfo.loginname"></div>
          <div class="user-head-link">
            <a :href="`https://github.com/${userInfo.githubUsername}`">{{userInfo.githubUsername}}@github.com</a>
          </div>
        </div>
        <div class="user-head-intro">
          注册时间：{{userInfo.create_at | timeAgo}}
          <span>积分：{{userInfo.score}}</span>
        </div>
      </div>
      <mt-tab-container v-model="active">
        <mt-tab-container-item id="tab-container1">
          <mt-cell v-for="n in 10" title="最近回复"></mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container2">
          <mt-cell v-for="n in 5" title="最新发布"></mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container3">
          <mt-cell v-for="n in 7" title="话题收藏"></mt-cell>
        </mt-tab-container-item>
      </mt-tab-container>
      <div class="feed-box">
        <div v-for="i in displayList" class="feed-li">
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
      </div>
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
      accessToken:'f24da430-fbcd-4710-880c-f53bb289924f',
      avatar_url:this.$store.state.avatar_url,
      loginname:this.$store.state.loginname,
      userInfo:{},
      displayList:[],
      isShowBtnLogout:false,
      active:'tab-container1'
    }
  },
  activated(){
    this.$store.commit('SET_SHOWTABBAR',true);
    this.$store.commit('SET_PATH',{headTitle:'我',hasBack:false})
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
        })
          .then(result => {
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
          })
          .catch(() => {
            this.$toast({
              message: 'AccessToken错误',
               position: 'bottom',
              duration: 3000
            });
          })
      }
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
</style>




