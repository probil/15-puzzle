<template>
  <OverlayBase>
    Press <button class="btn-start" @click="startNewGame">Play</button> to start
  </OverlayBase>
</template>
<script>
  import OverlayBase from './OverlayBase'

  export default {
    components: {
      OverlayBase,
    },
    methods: {
      startNewGame() {
        return this.$emit('start-game');
      }
    }
  }
</script>
<style lang="stylus">
  .btn-start
    font-size 2rem
    border-radius 0.5rem
    margin-left 10px
    margin-right 10px
    padding 1px 10px 2px
</style>
