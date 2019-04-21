<template>
  <OverlayBase>
    <div class="overlay-you-win">
      <h2 class="overlay-you-win__heading">Bravo! You win!</h2>
      <div class="overlay-you-win__stats">
        <span>
          Time: {{ totalTime }}
        </span>
        <span>
          Moves: {{ totalMoves }}
        </span>
      </div>
      <button class="overlay-you-win__btn-restart" @click="restart">Restart</button>
    </div>
  </OverlayBase>
</template>
<script>
  import OverlayBase from './OverlayBase'

  export default {
    props: {
      totalMoves: {
        type: Number,
        default: 0,
      },
      totalTime: {
        type: Number,
        default: 0,
      }
    },
    components: {
      OverlayBase,
    },
    methods: {
      restart() {
        return this.$emit('restart');
      }
    }
  }
</script>
<style lang="stylus">
  .overlay-you-win
    &__heading
      margin 0
      text-align center
      line-height 1

    &__stats
      margin-top 25px
      width 330px
      display flex
      justify-content space-between
      font-size 1.5rem

    &__btn-restart
      display block
      font-size 2rem
      border-radius 0.5rem
      margin: 25px auto 0
      padding 1px 10px 2px
</style>
