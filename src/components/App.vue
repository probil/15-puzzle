<template>
  <div class="app">
    <div class="app__container">
      <InfoBar v-show="isGameStarted && !isGameFinished">
        <Moves
          slot="left"
          :value="moves"
        ></Moves>
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
            :total-moves="moves"
            :total-time="totalTime"
            @restart="startNewGame"
          ></OverlayYouWin>
        </template>
      </PlayBox>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import PlayBox from './PlayBox.vue';
import GameField from './GameField.vue';
import Moves from './Moves.vue';
import InfoBar from './InfoBar.vue';
import Timer from './Timer.vue';
import OverlayStartTheGame from './OverlayStartTheGame.vue';
import OverlayYouWin from './OverlayYouWin.vue';

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
};
</script>
<style lang="stylus">
  body
    margin 0
    font-family: 'IBM Plex Mono', monospace;
    background: embedurl("../assets/bg-pattern.svg"), #e5e5e5

  .app
    min-height 100vh
    display flex
    justify-content center
    align-items center

    &__container
      margin 1rem
</style>
