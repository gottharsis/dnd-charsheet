<template>
  <div
    class="ability-scores-bar column has-page-height is-2 is-flex flex-column has-padding-20"
  >
    <ability-score-box
      v-for="(score, i) in character.abilityScores"
      :key="i"
      :score="score"
    />
  </div>
</template>

<script>
import AbilityScoreBox from "./AbilityScoresBar/AbilityScoreBox";
import { createNamespacedHelpers } from "vuex";

const { mapState } = createNamespacedHelpers("Character");
export default {
  name: "ability-scores-bar",
  components: {
    AbilityScoreBox
  },
  computed: {
    ...mapState({
      character: state => state.character
    }),
    scores() {
      return this.character.abilityScores;
    }
  }
};
</script>

<style lang="scss">
.ability-scores-bar {
}
</style>
