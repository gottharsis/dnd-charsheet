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
        <tabs />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import AbilityScoresBar from "./HomePage/AbilityScoresBar";
import ErrorIndicator from "./HomePage/ErrorIndicator";
import Tabs from "./HomePage/Tabs";

const { mapState, mapActions } = createNamespacedHelpers("Character");
const { mapGetters: guideGetters, mapState: Guide } = createNamespacedHelpers(
  "Guide"
);

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
    ...guideGetters(["getClassById"])
  },
  components: {
    AbilityScoresBar,
    ErrorIndicator,
    Tabs
  }
};
</script>

<style lang="scss">
.home {
  overflow: hidden;
}
</style>
