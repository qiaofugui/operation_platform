<script lang="ts" setup>
import Rank from './Rank.vue'
import Year from './Year.vue'
import Counter from './Counter.vue'
</script>

<template>
  <div class="left">
    <Rank class="rank"/>
    <Year class="year"/>
    <Counter class="counter"/>
  </div>
</template>

<style lang="scss" scoped>
.left {
  display: flex;
  flex-direction: column;

  .rank {
    flex: 1.3;
    margin: 20px 0 15px 0;
  }

  .year {
    flex: 1;
    margin: 15px 0;
  }

  .counter {
    flex: 1;
    margin-top: 15px;
  }
}
</style>
