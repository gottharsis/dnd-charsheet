<template>
  <div class="spell-slot-indicator">
    <circle-progress :value="percentage" :radius="120">
      <div class="has-text-centered has-text-weight-bold">
        Level {{ level }}
      </div>
      <div>
        <span class="is-size-2">{{ available }}</span> / {{ max }}
      </div>
      <!-- <button :class="['button', buttonClass]" @click="cast">
        Cast
      </button> -->
      <div>
        <b-button @click="restore(1)">
          <i class="fas fa-scroll"></i>
        </b-button>
        <b-button @click="restore(-1)">
          <i class="fas fa-sync-alt"></i>
        </b-button>
        <b-button @click="cast">
          <i class="fas fa-dragon"></i>
        </b-button>
      </div>
    </circle-progress>
    <br />
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
  props: {
    level: {
      type: Number,
      required: true
    }
  },
  computed: {
    percentage() {
      return (100 * this.available) / this.max;
    },
    ...mapState({
      slot(state) {
        return state.character.magic.spellSlots.find(
          s => s.level === this.level
        );
      }
    }),
    max() {
      return this.slot.max || 0;
    },
    used() {
      return this.slot.used || 0;
    },
    available() {
      return this.max - this.used;
    },
    buttonClass() {
      if (this.percentage > 75) {
        return "is-primary";
      } else if (this.percentage > 50) {
        return "is-info";
      } else if (this.percentage > 25) {
        return "is-warning";
      } else {
        return "is-danger";
      }
    }
  },
  methods: {
    ...mapActions(["castSpell", "restoreSlot"]),
    cast() {
      this.castSpell({ level: this.level });
    },
    restore(amount = -1) {
      this.restoreSlot({ level: this.level, amount });
    }
  }
};
</script>

<style>
.spell-slot-indicator {
  display: inline-block;
}
</style>
