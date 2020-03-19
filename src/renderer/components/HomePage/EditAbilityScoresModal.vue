<template>
  <div class="box">
    <h1 class="has-text-centered">Edit Ability Scores</h1>
    <form @submit.prevent="submit">
      <div class="input-grid">
        <div v-for="score in scores" :key="score.stat">
          <p class="is-size-2 has-text-weight-bold has-margin-right-50">
            {{ score.stat }}
          </p>
          <b-field label="Score" style="flex: 1">
            <b-input
              native-type="numeric"
              v-model.number="score.score"
              @input="calculate(score)"
            ></b-input>
          </b-field>

          <b-field label="Modifier">
            <b-input :value="modifierString(score.mod)" disabled></b-input>
          </b-field>
        </div>
      </div>
      <b-field>
        <b-button native-type="submit">
          Save Changes
        </b-button>
      </b-field>
    </form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import cloneDeep from "lodash/cloneDeep";
const { mapState, mapActions } = createNamespacedHelpers("Character");
import { calculateModifier, modifierString } from "@/util";

export default {
  computed: {
    ...mapState({
      currScores: state => state.character.abilityScores
    })
  },

  data() {
    return {
      scores: []
    };
  },
  mounted() {
    this.scores = cloneDeep(this.currScores);
  },
  methods: {
    ...mapActions(["setAbilityScores"]),
    calculate(score) {
      score.mod = calculateModifier(score.score);
    },
    submit() {
      this.setAbilityScores({ abilityScores: this.scores });
      this.$parent.close();
    },
    modifierString: modifierString
  }
};
</script>

<style lang="scss">
.input-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
}
</style>
