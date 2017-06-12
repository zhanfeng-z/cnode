<template>
  <div>
    <ul>
      <li class="feed-li">
        <div class="feed-title">
          <div class="feed-label feed-label-top">置顶</div>
          <p>饿了么大前端 Node.js 进阶教程</p>
        </div>
        <div class="feed-content">
          <a href="javascript:void(0)" class="" data-xs-href="/user?id=lellansin">
            <div class="avatar">
              <img src="https://avatars1.githubusercontent.com/u/2081487?v=3&amp;s=120" alt="headImgUrl">
            </div>
          </a>
          <div class="feed-right">
            <div class="feed-right-top">
              <div class="feed-name">lellansin</div>
              <div class="feed-count">
                <span>150</span> / 56848
              </div>
            </div>
            <div class="feed-right-bottom">
              <div class="feed-time">
                创建于：
                <span>2017-02-22 19:32:43</span>
              </div>
              <div class="feed-pass">
                3 小时前
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'home',
  created() {
    this.$http.get('https://cnodejs.org/api/v1/topics').then(response => {
      console.log(response)
      // success callback
    }, response => {
      // error callback
    })
  }
}
</script>
<style lang="scss">
ul{
  margin: 0;
  padding: 0;
}
.feed-li{
  list-style: none;
  padding: 14px;
  position: relative;
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



