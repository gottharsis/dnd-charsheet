<template>
  <div class="ability-indicator">
    <circle-progress v-if="ability !== null" :radius="120" :value="ratio">
      <div
        class="has-text-centered has-text-weight-bold"
        @click="showModal = true"
      >
        {{ ability.name }}
      </div>
      <div>{{ available }} / {{ max }}</div>
      <div>
        <b-button @click="restore">
          <i class="fas fa-scroll"></i>
        </b-button>
        <b-button @click="restoreAll">
          <i class="fas fa-sync-alt"></i>
        </b-button>
        <b-button @click="use">
          <i class="fas fa-dragon"></i>
        </b-button>
      </div>
    </circle-progress>
    <b-modal :active.sync="showModal">
      <ability-modal :ability="ability"></ability-modal>
    </b-modal>
  </div>
</template>

<script>
import CircleProgress from "@/components/global/CircleProgress";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("Character");

import AbilityModal from "./AbilityModal";

export default {
  data() {
    return {
      showModal: false
    };
  },
  components: {
    CircleProgress,
    AbilityModal
  },
  props: {
    abilityId: String
  },
  computed: {
    ...mapState({
      abilities: state => state.character.abilities
    }),
    ability() {
      return this.abilities.find(ab => ab.id === this.abilityId);
    },
    available() {
      return this.ability.max - this.ability.used;
    },
    max() {
      return this.ability.max;
    },
    ratio() {
      return (this.available / this.max) * 100;
    }
  },
  methods: {
    ...mapActions(["setAbility"]),
    use() {
      this.submit(this.ability.used + 1);
    },
    restore() {
      this.submit(this.ability.used - 1);
    },
    restoreAll() {
      this.submit(0);
    },
    submit(used) {
      if (used < 0 || used > this.ability.max) {
        return;
      }
      const ability = {
        ...this.ability,
        used
      };
      this.setAbility({ id: this.abilityId, ability });
    }
  }
};
</script>
