<template>
  <div class="app">
    <PlayBox>
      <GameField
        :grid="grid"
        @tile-clicked="moveTileByPoint"
      ></GameField>
    </PlayBox>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import PlayBox from './PlayBox'
  import GameField from './GameField'

  export default {
    components: {
      PlayBox,
      GameField,
    },
    computed: {
      ...mapGetters(['isGameStarted']),
      ...mapGetters('gameField', ['grid']),
    },
    methods: {
      ...mapActions(['startNewGame', 'moveTileByPoint']),
    },
    beforeMount() {
      this.startNewGame();
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
