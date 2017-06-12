<template>
  <div>
    <ul>
      <li>
        <div>
          Message
        </div>
        <article>
          <a href="">sass</a>
          <a href="">sass</a>
          <a href="">sass</a>
        </article>
      </li>
    </ul>
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



