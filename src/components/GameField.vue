<template>
  <div class="game-field">
    <template v-for="(row, y) in grid">
      <Tile
        v-for="(cell, x) in row"
        :key="`cell-${cell}-${y * 4 + x}`"
        :style="{ order: y * 4 + x }"
        :value="cell"
        :is-invisible="cell === 0"
        @click.native="tryToMoveTileByPoint({ x, y })"
      />
    </template>
  </div>
</template>
<script>
  import Tile from './Tile'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components: {
      Tile,
    },
    computed: {
      ...mapGetters('gameField', ['grid'])
    },
    methods: {
      ...mapActions('gameField', ['init', 'shuffle', 'tryToMoveTileByPoint'])
    },
    beforeMount() {
      this.init();
      this.shuffle();
    }
  }
</script>
<style lang="stylus">
  .game-field
    display: flex;
    justify-content space-between
    align-content space-between
    flex-wrap wrap
    box-sizing border-box
    height 100%
    width 100%
</style>
