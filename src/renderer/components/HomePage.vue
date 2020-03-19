<template>
  <div class="home columns">
    <ability-scores-bar />
    <div class="column main-content">
      <div @dblclick="editBasicInfo">
        <h1 class="is-size-1 has-text-centered has-text-weight-bold">
          {{ character.name }}
        </h1>
        <h2 class="is-size-3 has-text-centered">
          {{ classString }}
        </h2>
      </div>

      <div class="container">
        <tabs ref="tabs" />
        <router-view />
      </div>
    </div>
    <dice-roller />

    <b-modal :active.sync="showBasicInfoEdit">
      <basic-info-edit-modal />
    </b-modal>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import AbilityScoresBar from "./HomePage/AbilityScoresBar";
import ErrorIndicator from "./HomePage/ErrorIndicator";
import BasicInfoEditModal from "./HomePage/BasicInfoEditModal";
import EditAbilityScoresModal from "./HomePage/EditAbilityScoresModal";
import Tabs from "./HomePage/Tabs";
import DiceRoller from "./HomePage/DiceRoller";

const { mapState, mapActions, mapGetters } = createNamespacedHelpers(
  "Character"
);
const { mapGetters: guideGetters, mapState: Guide } = createNamespacedHelpers(
  "Guide"
);

const { mapActions: hotkeys } = createNamespacedHelpers("Hotkeys");

export default {
  computed: {
    ...mapState({
      character: state => state.character
    }),
    ...mapGetters(["classString"])
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
          break;
        case "N":
          this.$router.push("/notes");
          this.$refs.tabs.setActiveIndex(4);
          break;
      }
    },
    editBasicInfo() {
      this.showBasicInfoEdit = true;
    }
  },
  components: {
    AbilityScoresBar,
    BasicInfoEditModal,
    EditAbilityScoresModal,
    ErrorIndicator,
    Tabs,
    DiceRoller
  },
  data() {
    return {
      showBasicInfoEdit: false
    };
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
