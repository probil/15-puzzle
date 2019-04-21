<template>
  <div class="game-field">
    <template v-for="(row, y) in grid">
      <Tile
        v-for="(cell, x) in row"
        :key="`cell-${cell}-${y * 4 + x}`"
        :style="{ order: y * 4 + x }"
        :value="cell"
        :is-invisible="cell === 0"
        @click.native="handleClick({ x, y })"
      ></Tile>
    </template>
  </div>
</template>
<script>
import Tile from './Tile.vue';

export default {
  components: {
    Tile,
  },
  props: {
    grid: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleClick(point) {
      this.$emit('tile-clicked', point);
    },
  },
};
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
