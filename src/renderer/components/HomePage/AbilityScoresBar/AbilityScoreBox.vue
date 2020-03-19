<template>
  <div class="ability-score-box box tile">
    <!-- <div class="tile is-ancestor"> -->
    <div class="tile is-vertical">
      <div
        class="tile is-child has-text-centered is-size-4 flex-column justify-space-evenly"
      >
        <div class="has-text-weight-bold">{{ score.stat }}</div>
        <div>{{ score.score }}</div>
      </div>
    </div>
    <div class="tile">
      <div
        class="tile is-child has-text-centered is-size-1 has-text-weight-bold flex-column justify-center"
      >
        {{ modifier }}
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("Character");

export default {
  name: "ability-score-box",
  computed: {
    modifier() {
      const mod = Math.floor((this.score.score - 10) / 2);
      return mod < 0 ? mod : `+${mod}`;
    }
  },
  props: {
    score: Object
  }
};
</script>

<style lang="scss">
.ability-score-box {
  // flex-grow: 1;
  justify-content: center;
  align-items: center;
  // background: $scheme-main-bis;
  height: calc(1 / 6 * 100vh - 24px);
}
</style>
