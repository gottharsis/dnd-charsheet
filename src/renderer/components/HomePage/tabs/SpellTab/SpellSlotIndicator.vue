<template>
  <div class="spell-slot-indicator">
    <circle-progress :value="percentage" :radius="100">
      <div class="has-text-centered has-text-weight-bold">
        Level {{ level }}
      </div>
      <div>
        <span class="is-size-2">{{ available }}</span> / {{ max }}
      </div>
      <button :class="['button', buttonClass]" @click="cast">
        Cast
      </button>
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
    restore() {
      this.restoreSlot({ level: this.level });
    }
  }
};
</script>

<style>
.spell-slot-indicator {
  display: inline-block;
}
</style>
