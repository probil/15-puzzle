<template>
  <div class="moves">
    Moves: {{ value }}
  </div>
</template>
<script>
  export default {
    props: {
      value: {
        type: Number,
        default: 0
      }
    },
  }
</script>
