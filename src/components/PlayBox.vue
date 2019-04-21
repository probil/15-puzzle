<template>
  <div class="play-box">
    <div class="play-box__grid">
      <slot/>
    </div>
    <div class="play-box__underlay">
      <div
        class="play-box__underlay-tile"
        v-for="n in 16"
        :key="`underlay-tile-${n}`"
      ></div>
    </div>
  </div>
</template>
<style lang="stylus">
  @import "../_variables.styl"

  .play-box
    background-color rgba(0, 151, 167, 0.29)
    height $playbox-height
    width $playbox-width
    border-radius 1rem
    padding 1.5rem
    position relative
    box-sizing border-box

    &__grid
      height 100%
      width 100%

    &__underlay
      position absolute
      top 0
      left 0
      width $playbox-width
      height $playbox-height
      padding 1.5rem
      display: flex;
      justify-content space-between
      align-content space-between
      flex-wrap wrap
      box-sizing border-box
      z-index -1

    &__underlay-tile
      height $tile-size
      width $tile-size
      border-radius 1rem
      background-color: rgba(0, 0, 0, 0.11);
</style>
