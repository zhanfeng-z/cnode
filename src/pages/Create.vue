<template>
  <div class="create-box">
    <mt-field label="标题" placeholder="标题，字数10字以上" v-model="title" class="border-bottom"></mt-field>
    <div class="select-box border-bottom">
      <div class="select-title">分类</div>
      <select name="" id="" v-model="selectType">
        <option value="share">分享</option>
        <option value="ask">问答</option>
        <option value="job">招聘</option>
        <option value="dev">测试</option>
      </select>
    </div>
    <mt-field label="内容" placeholder="说点什么吧。。" type="textarea" rows="4" v-model="content" class="border-bottom"></mt-field>
    <mt-button type="primary" class="submit" @click="onSendArticle">发布</mt-button>
  </div>
</template>

<script>
export default {
  name: 'create',
  data(){
    return {
      title:'',
      selectType:'',
      content:'',
    }
  },
  created(){
    this.$store.commit('SET_SHOWTABBAR',true);
    this.$store.commit('SET_PATH',{headTitle:'发布',hasBack:false})
  },
  methods:{
    onSendArticle:function(){
      this.$http.post('https://cnodejs.org/api/v1/topics',{
        accesstoken:this.$store.state.userInfo.accessToken,
        title:this.title,
        tab:this.selectType,
        content:this.content
      }).then(response => {
        if(response.data.success){
          this.$router.push({ name: 'detail', query: { id: response.data.topic_id }});
        }
      }).catch( err => {
        this.$toast({
          message: err.response.data.error_msg,
          position: 'bottom',
          duration: 3000
        });
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .create-box{
    margin-left: 10px;
  }
  .mint-cell{
    min-height: 44px;
  }
  .select-box{
    position: relative;
    padding: 0 10px;
    font-size: 16px;
    display: flex;
    height: 44px;
    line-height: 44px;
    .select-title{
      width: 105px;
    }
    select{
      flex-grow: 1;
      height: 44px;
      font-size: 16px;
    }
    &::after{
      content: " ";
      display: inline-block;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
      height: 6px;
      width: 6px;
      border-width: 2px 2px 0 0;
      border-color: #c8c8cd;
      border-style: solid;
      position: relative;
      top: -2px;
      position: absolute;
      top: 50%;
      right: 15px;
      margin-top: -3px;
    }
  }
  .border-bottom{
    position: relative;
    &::before{
      content: " ";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      border-top: 1px solid #d9d9d9;
      color: #d9d9d9;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(.5);
      transform: scaleY(.5);
    }
  }
  .submit{
    width: 80%;
    margin: 10px auto;
    display: block;
    background-color: #04be02;
  }
</style>



