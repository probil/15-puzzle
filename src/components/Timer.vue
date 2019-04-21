<template>
  <div class="timer">Time: {{ time | toMMSS }}</div>
</template>
<script>
  /**
   * @param {Number} number
   * @returns {String}
   */
  const pad = number => (`0${number}`).slice(-2);

  /**
   * @param {Number} value
   * @return {string}
   */
  const toMMSS = value =>  {
    const minutes = Math.trunc(value / 60);
    const seconds = value % 60;
    return `${pad(minutes)}:${pad(seconds)}`;
  };

  export default {
    $interval: null,
    data: () => ({
      time: 0
    }),
    props: {
      isRunning: {
        type: Boolean,
        default: false,
      },
      startedAt: {
        type: String,
      }
    },
    computed: {
      startedAtDate() {
        return new Date(this.startedAt);
      },
    },
    methods: {
      updateTime() {
        if (!this.isRunning) return;
        const diff = +new Date() - +this.startedAtDate;
        this.time = Math.round(diff / 1000);
      }
    },
    filters: {
      toMMSS
    },
    mounted() {
      this.$interval = setInterval(this.updateTime, 1000);
    },
    beforeDestroy() {
      clearInterval(this.$interval)
    }
  }
</script>
