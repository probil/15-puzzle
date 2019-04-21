<template>
  <div class="game-field">
    <template v-for="(row, y) in grid">
      <Tile
        v-for="(cell, x) in row"
        :key="`cell-${cell}-${y}-${x}`"
        :style="{ order: pointToSequenceNumber({ x, y }) }"
        :value="cell"
        :is-invisible="isEmptySpace(cell)"
        @click.native="handleClick({ x, y })"
      ></Tile>
    </template>
  </div>
</template>
<script>
import Tile from './Tile.vue';
import {
  EMPTY_CELL_VALUE,
  GAME_FIELD_WIDTH,
} from '../constants';

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
    isEmptySpace: value => value === EMPTY_CELL_VALUE,
    pointToSequenceNumber: ({ x, y }) => y * GAME_FIELD_WIDTH + x,
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
