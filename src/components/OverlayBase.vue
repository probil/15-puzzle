<template>
  <div class="overlay-base">
    <slot></slot>
  </div>
</template>
<style lang="stylus">
  @import "../_variables.styl"

  .overlay-base
    position absolute
    top 0
    left 0
    width $playbox-width
    height $playbox-height
    background-color: rgba(36, 36,36, .6);
    border-radius 1rem
    display: flex;
    justify-content center
    align-items  center
    box-sizing border-box
    z-index 1
    color white
    font-size 2rem
</style>
