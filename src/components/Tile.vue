<template>
  <div
    class="tile"
    :class="{ 'tile--invisible': isInvisible }"
  >
    {{ value }}
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: [String, Number],
    },
    isInvisible: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="stylus">
  .tile
    height 100px
    width 100px
    background-color: rgba(255, 255, 165, 1)
    border-radius 1rem
    display flex
    justify-content center
    align-items center
    transition: all 0.2s ease-out 0s
    cursor pointer
    font-size 2.5rem
    user-select none

    &:hover
      background-color: rgba(255, 255, 165, 0.88)

    &--invisible
      opacity 0
</style>
