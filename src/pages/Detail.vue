<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'message',
  created(){
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
  article a{
    color:blue;
    &:hover{
      font-size:18px;
      color: red;
    }
  }
</style>



