<template>
  <div class="home columns">
    <ability-scores-bar />
    <div class="column main-content">
      <error-indicator />
      <h1 class="is-size-1 has-text-centered has-text-weight-bold">
        {{ character.name }}
      </h1>
      <h2 class="is-size-3 has-text-centered">
        {{ playerClass }} {{ character.level }}
      </h2>

      <div class="container">
        <tabs ref="tabs" />
        <router-view />
      </div>
    </div>
    <dice-roller />
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import AbilityScoresBar from "./HomePage/AbilityScoresBar";
import ErrorIndicator from "./HomePage/ErrorIndicator";
import Tabs from "./HomePage/Tabs";
import DiceRoller from "./HomePage/DiceRoller";

const { mapState, mapActions } = createNamespacedHelpers("Character");
const { mapGetters: guideGetters, mapState: Guide } = createNamespacedHelpers(
  "Guide"
);

const { mapActions: hotkeys } = createNamespacedHelpers("Hotkeys");

export default {
  computed: {
    ...mapState({
      character: state => state.character
    }),
    playerClass() {
      return this.getClassById()(this.character.classId).name;
    }
  },
  methods: {
    ...guideGetters(["getClassById"]),
    ...hotkeys(["openDiceRoller"]),
    keyListener(event) {
      if (!event.shiftKey) return;
      switch (event.key) {
        case "R":
          this.openDiceRoller();
          break;
        case "O":
          this.$router.push("/overview");
          this.$refs.tabs.setActiveIndex(0);
          break;
        case "S":
          this.$router.push("/spells");
          this.$refs.tabs.setActiveIndex(1);
          break;
        case "C":
          this.$router.push("/combat");
          this.$refs.tabs.setActiveIndex(2);
          break;
        case "I":
          this.$router.push("/inventory");
          this.$refs.tabs.setActiveIndex(3);
      }
    }
  },
  components: {
    AbilityScoresBar,
    ErrorIndicator,
    Tabs,
    DiceRoller
  },
  data() {
    return {};
  },
  mounted() {
    window.addEventListener("keyup", this.keyListener);
  },
  beforeDestroy() {
    window.removeEventListener("keyup", this.keyListener);
  }
};
</script>

<style lang="scss">
.home {
  overflow: hidden;
}
</style>
