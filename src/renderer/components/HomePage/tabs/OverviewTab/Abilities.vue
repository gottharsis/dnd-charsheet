<template>
  <div class="abilities">
    <div class="is-flex justify-space-between">
      <h3 class="is-size-3 has-text-weight-bold">
        Abilities
      </h3>
      <b-button class="corner-button" @click="showEditModal = true">
        <i class="fas fa-edit"></i>
      </b-button>
    </div>
    <div class="ability-row">
      <ability-indicator
        v-for="(ab, i) in abilities"
        :key="ab.id"
        :abilityId="ab.id"
      >
      </ability-indicator>
    </div>

    <b-modal :active.sync="showEditModal">
      <abilities-edit-modal />
    </b-modal>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("Character");
import AbilityIndicator from "./Abilities/AbilityIndicator";
import AbilitiesEditModal from "./Abilities/AbilitiesEditModal";
export default {
  computed: {
    ...mapState({
      abilities: state => state.character.abilities
    })
  },
  components: {
    AbilityIndicator,
    AbilitiesEditModal
  },
  data() {
    return {
      showEditModal: false
    };
  }
};
</script>

<style lang="scss">
.ability-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.abilities {
  position: relative;
}
</style>
