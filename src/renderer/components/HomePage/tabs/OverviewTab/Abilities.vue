<template>
  <div class="abilities">
    <h3 class="is-size-3 has-text-weight-bold">
      Abilities
    </h3>
    <div class="ability-row">
      <ability-indicator
        v-for="(ab, i) in abilities"
        :key="ab.id"
        :abilityId="ab.id"
      >
      </ability-indicator>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("Character");
import AbilityIndicator from "./Abilities/AbilityIndicator";

export default {
  computed: {
    ...mapState({
      abilities: state => state.character.abilities
    })
  },
  components: {
    AbilityIndicator
  }
};
</script>

<style lang="scss">
.ability-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
