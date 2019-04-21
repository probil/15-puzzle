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
