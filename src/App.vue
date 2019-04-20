<template>
  <div class="app">
    <PlayBox/>
  </div>
</template>
<script>
  import PlayBox from './PlayBox'

  export default {
    components: {
      PlayBox,
    }
  }
</script>
<style lang="stylus">
  body
    margin 0

  .app
    min-height 100vh
    display flex
    justify-content center
    align-items center
</style>
