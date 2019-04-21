<template>
  <div class="info-bar">
    <div class="info-bar__left">
      <slot name="left"></slot>
    </div>
    <div class="info-bar__right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<style lang="stylus">
  .info-bar
    height 30px
    display flex
    font-size 1.2rem

    &__left
      flex-basis 50%

    &__right
      flex-basis 50%
      text-align right
</style>
