<template>
  <div class="ability-scores-bar column is-2  has-padding-20">
    <div
      class="ability-scores-container"
      :style="style"
      @dblclick="editAbilityScores()"
    >
      <!-- <spacer /> -->
      <ability-score-box
        v-for="(score, i) in character.abilityScores"
        :key="i"
        :score="score"
      />
    </div>
    <b-modal :active.sync="showEditAbilityScore">
      <edit-ability-scores />
    </b-modal>
  </div>
</template>

<script>
import AbilityScoreBox from "./AbilityScoresBar/AbilityScoreBox";
import EditAbilityScores from "./EditAbilityScoresModal";
import Spacer from "./AbilityScoresBar/AbilityScoreSpacer";
import { createNamespacedHelpers } from "vuex";
import debounce from "lodash/debounce";

const { mapState } = createNamespacedHelpers("Character");
export default {
  name: "ability-scores-bar",
  components: {
    AbilityScoreBox,
    EditAbilityScores,
    Spacer
  },
  computed: {
    ...mapState({
      character: state => state.character
    }),
    scores() {
      return this.character.abilityScores;
    },
    style() {
      return {
        top: this.offset + "px"
      };
    }
  },
  data() {
    return {
      offset: 0,
      showEditAbilityScore: false
    };
  },
  mounted() {
    window.addEventListener("scroll", debounce(this.scrollListener, 100));
    console.log(new Date());
  },
  methods: {
    scrollListener() {
      const y = window.scrollY;
      this.offset = y;
    },

    editAbilityScores() {
      this.showEditAbilityScore = true;
    }
  }
};
</script>

<style lang="scss">
.ability-scores-bar {
  min-height: 100vh;
  height: 100%;
}

.ability-scores-container {
  position: relative;
  transition: top 0.3s ease-in-out;
}
</style>
