<template>
  <div class="timer">
    Time: {{ time | toMMSS }}
  </div>
</template>
<script>
import { toMMSS } from '../filters';

export default {
  $interval: null,
  filters: {
    toMMSS,
  },
  props: {
    isRunning: {
      type: Boolean,
      default: false,
    },
    startedAt: {
      type: String,
      default: () => new Date().toISOString(),
    },
  },
  data: () => ({
    time: 0,
  }),
  computed: {
    startedAtDate() {
      return new Date(this.startedAt);
    },
  },
  mounted() {
    this.$interval = setInterval(this.updateTime, 1000);
  },
  beforeDestroy() {
    clearInterval(this.$interval);
  },
  methods: {
    updateTime() {
      if (!this.isRunning) return;
      const diff = +new Date() - +this.startedAtDate;
      this.time = Math.round(diff / 1000);
    },
  },
};
</script>
