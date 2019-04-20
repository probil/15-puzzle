<template>
  <div class="game-field">
    <template v-for="(row, y) in grid">
      <Tile
        v-for="(cell, x) in row"
        :key="`cell-${cell}-${y * 4 + x}`"
        :style="{ order: y * 4 + x }"
        :value="cell"
        :is-invisible="cell === 0"
      />
    </template>
  </div>
</template>
<script>
  import Tile from './Tile'

  export default {
    data: () => ({
      grid: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]]
    }),
    components: {
      Tile,
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
