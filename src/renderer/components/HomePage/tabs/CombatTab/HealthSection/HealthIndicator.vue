<template>
  <div class="health-indicator box ">
    <circle-progress
      :radius="110"
      :value="100"
      :strokeFunc="() => (shouldShowTempHp ? 'goldenrod' : 'transparent')"
      :showBackground="false"
      :strokeWidth="6"
    >
      <circle-progress :radius="100" :value="ratio">
        <div>
          <span class="is-size-2">{{ currentHp }}</span> / {{ maxHp }}
        </div>
        <section id="temp-hp-section" v-if="shouldShowTempHp">
          <div class="has-text-centered has-text-weight-bold">
            Temporary HP:
          </div>
          <div class="has-text-centered is-size-3">{{ tempHp }}</div>
        </section>
      </circle-progress>
    </circle-progress>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import CircleProgress from "@/components/global/CircleProgress";

const { mapState, mapActions } = createNamespacedHelpers("Character");
export default {
  components: {
    CircleProgress
  },
  computed: {
    ...mapState({
      health: state => state.character.health
    }),
    maxHp() {
      return this.health.maxHp;
    },
    tempHp() {
      return this.health.tempHp;
    },
    currentHp() {
      return this.health.currentHp;
    },
    ratio() {
      return (100 * this.currentHp) / this.maxHp;
    },
    shouldShowTempHp() {
      return this.tempHp > 0;
    }
  },
  methods: {}
};
</script>

<style></style>
