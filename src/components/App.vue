<template>
  <div class="app">
    <div class="app__container">
      <InfoBar>
        <Moves :value="moves" slot="left"></Moves>
        <Timer
          slot="right"
          :is-running="isGameStarted"
          :started-at="startedAt"
        ></Timer>
      </InfoBar>
      <PlayBox>
        <GameField
          :grid="grid"
          @tile-clicked="moveTileByPoint"
        ></GameField>
      </PlayBox>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import PlayBox from './PlayBox'
  import GameField from './GameField'
  import Moves from './Moves'
  import InfoBar from './InfoBar'
  import Timer from './Timer'

  export default {
    components: {
      PlayBox,
      GameField,
      Moves,
      InfoBar,
      Timer,
    },
    computed: {
      ...mapGetters(['isGameStarted']),
      ...mapGetters('gameField', ['grid']),
      ...mapGetters('moves', ['moves']),
      ...mapGetters('timer', ['startedAt']),
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

    &__container
      margin 1rem
</style>
