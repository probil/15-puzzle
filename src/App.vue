<template>
  <div class="app">
    <PlayBox>
      <GameField/>
    </PlayBox>
  </div>
</template>
<script>
  import PlayBox from './PlayBox'
  import GameField from './game-field/GameField'

  export default {
    components: {
      PlayBox,
      GameField,
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
