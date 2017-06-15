<template>
  <div class="article-box">
    <div class="head-box" v-if="article.title">
      <h2 class="head-title" v-text="article.title">
      </h2>
      <div class="head-intro">
        <div class="avatar">
          <img v-lazy="author.avatar_url" alt="headImgUrl">
        </div>
        <div class="head-middle">
          <div class="head-middle-top">
            <div class="feed-label" :class="[article.top ? 'feed-label-top' : 'feed-label-other']">
              {{article.tab | translateTab(article.top)}}
            </div>
            <span class="head-author-name" v-text="author.loginname"></span>
          </div>
          <div class="head-middle-bottom">
            {{article.create_at | timeAgo}}创建 ·
            <span v-text="article.visit_count"></span>次预览
            <div class="icon-eye-open"></div>
          </div>
        </div>
        <div class="head-right">
          <i :class="[article.is_collect ? 'icon-heart' : 'icon-heart-empty']"></i>
        </div>
      </div>
    </div>
    <div class="content-box markdown-body" v-html="article.content"></div>
    <div class="comment-box" v-if="article.title">
      <div class="comment-title">
        {{article.reply_count}} 条回复
      </div>
      <div class="comment-li" v-for="(c, index) in displayCommentList">
        <div class="comment-head">
          <router-link :to="{name: 'home'}">
            <div class="avatar">
              <img v-lazy="c.author.avatar_url" alt="headImgUrl">
            </div>
          </router-link>
          <div class="comment-middle">
            <div class="comment-middle-top" v-text="c.author.loginname">
            </div>
            <div class="comment-middle-bottom">
              <span>{{index + 1}}楼</span> · {{c.create_at | timeAgo}}
            </div>
          </div>
          <div class="comment-right">
            <div @click="onLikeThisComment(c.id, index)" style="display: flex;"
                 :class="{ 'active': index < 60 }">
              <i class="icon-thumbs-up"></i>
              <span v-text="c.ups.length"></span>
            </div>
            <i class="icon-reply" @click="onReplyComment(c.id, c.author.loginname, index)"></i>
          </div>
        </div>
        <div class="comment-content markdown-body" v-html="c.content">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'message',
  data() {
    return {
      article: {},
      author: {},
      displayCommentList:[]
    }
  },
  created() {
    this.$store.commit('SET_SHOWTABBAR',false);
    this.$store.commit('SET_PATH',{headTitle:'详情',hasBack:true});
    this.$indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
  },
  mounted(){
    let id = this.$route.query.id;
    this.$http.get('https://cnodejs.org/api/v1/topic/' + id).then(response => {
      console.log(response);
      this.article = response.data.data;
      this.author = response.data.data.author;
      this.displayCommentList = response.data.data.replies;
      this.$indicator.close();
      // success callback
    }, response => {
      // error callback
    })
  }
}
</script>
<style lang="scss">
.article-box {
  background: #f4f4f4
}

.head-title {
  font-size: 18px;
  margin: 0
}

.head-box {
  padding: 14px;
  background: #fff
}

.head-intro {
  display: -webkit-box;
  display: flex;
  margin-top: 8px;
  -webkit-box-align: center;
  align-items: center
}

.head-middle {
  -webkit-box-flex: 1;
  flex: 1;
  margin-left: 10px
}

.head-right {
  width: 36px;
  flex-shrink: 0;
  text-align: center;
  font-size: 16px
}

.head-right .icon-heart {
  color: #80bd01
}

.head-middle-top {
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center
}

.head-middle-bottom {
  line-height: 20px;
  font-size: 13px;
  color: #666;
  margin-top: 2px
}

.head-author-name {
  margin-left: 8px
}

.content-box {
  padding: 0 14px;
  background: #fff;
  box-shadow: 0 2px 2px #cecece
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

.markdown-body {
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    color: #333;
    overflow: hidden;
    font-size: 16px;
    line-height: 1.6;
    word-wrap: break-word
}
.feed-label-top {
  background-color: #80bd01;
  color: #fff
}
.icon-reply{
  margin-left: 10px;
}
.comment-right span{
  margin-left: 2px;
  position: relative;
  top: -2px;
}
.comment-middle-bottom span{
  color: #80bd01;
}
.comment-title:before {
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
    transform: scaleY(.5);
}

</style>



