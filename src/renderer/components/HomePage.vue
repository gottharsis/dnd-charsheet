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
        <div class="tabs is-toggle is-centered">
          <ul>
            <li
              v-for="(tab, i) in tabs"
              :key="tab.name"
              :class="{ 'is-active': i == activeIndex }"
            >
              <router-link :to="tab.link" @click.native="setActiveIndex(i)">
                {{ tab.name }}
              </router-link>
            </li>
          </ul>
        </div>
        <router-view name="page" />
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import AbilityScoresBar from "./HomePage/AbilityScoresBar";
import ErrorIndicator from "./HomePage/ErrorIndicator";
import { ipcRenderer } from "electron";

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
    ...guideGetters(["getClassById"]),
    setActiveIndex(i) {
      this.activeIndex = i;
    },
    showEditSlotsModal() {
      ipcRenderer.send("edit-slots");
    }
  },
  components: {
    AbilityScoresBar,
    ErrorIndicator
  },
  data() {
    return {
      tabs: [
        {
          name: "Spells",
          link: "/spells"
        },
        {
          name: "Combat",
          link: "/combat"
        },
        {
          name: "Inventory",
          link: "/inventory"
        }
      ],
      activeIndex: 0
    };
  }
};
</script>

<style lang="scss">
.home {
  overflow: hidden;
}
</style>
