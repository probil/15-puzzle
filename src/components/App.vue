<template>
  <div class="app">
    <div class="app__container">
      <InfoBar>
        <Moves :value="moves" slot="left"></Moves>
        <Timer
          slot="right"
          :is-running="isGameStarted && !isGameFinished"
          :started-at="startedAt"
        ></Timer>
      </InfoBar>
      <PlayBox>
        <GameField
          v-if="!isGameFinished"
          :grid="grid"
          @tile-clicked="moveTileByPoint"
        ></GameField>
        <template slot="overlay">
          <OverlayStartTheGame
            v-if="!isGameStarted"
            @start-game="startNewGame"
          ></OverlayStartTheGame>
          <OverlayYouWin
            v-if="isGameFinished"
            @restart="startNewGame"
            :total-moves="moves"
            :total-time="totalTime"
          ></OverlayYouWin>
        </template>
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
  import OverlayStartTheGame from './OverlayStartTheGame'
  import OverlayYouWin from './OverlayYouWin'

  export default {
    components: {
      PlayBox,
      GameField,
      Moves,
      InfoBar,
      Timer,
      OverlayStartTheGame,
      OverlayYouWin,
    },
    computed: {
      ...mapGetters(['isGameStarted', 'isGameFinished']),
      ...mapGetters('gameField', ['grid']),
      ...mapGetters('moves', ['moves']),
      ...mapGetters('timer', ['startedAt', 'totalTime']),
    },
    methods: {
      ...mapActions(['startNewGame', 'moveTileByPoint']),
    },
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
