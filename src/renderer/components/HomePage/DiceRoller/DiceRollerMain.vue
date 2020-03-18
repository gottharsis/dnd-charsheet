<template>
  <div class="dice-roller-main box has-background-black-ter">
    <h2 class="is-size-2 has-text-centered">
      Roll Dice
    </h2>
    <form @submit.prevent="roll">
      <b-field>
        <input class="input" v-model="rollInput" ref="rollInput" />
      </b-field>
      <b-field>
        <b-button native-type="submit">
          Roll
        </b-button>
      </b-field>
    </form>
    <div v-if="rollInputLast" class="results">
      <p>
        Result of rolling
        <span class="has-text-weight-bold">{{ rollInputLast }}</span>
      </p>
      <div
        class="flex-row has-padding-top-10 has-padding-bottom-10 justify-space-evenly wrap"
        style="overflow-y: scroll; max-height: 250px; max-width: 400px"
      >
        <div
          v-for="(roll, i) in rollsFinal"
          :key="i"
          class="has-margin-5"
          style="flex: 1; min-width: 60px"
        >
          <p class="has-text-centered is-size-1 ">
            {{ roll.total }}
          </p>
          <hr class="has-background-white-bis" />
          <p class="has-text-centered is-size-3">
            {{ roll.individual }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";
import { DiceRoll, DiceRoller } from "rpg-dice-roller/lib/esm/bundle";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("Hotkeys");
import flatten from "lodash/flattenDeep";

export default {
  computed: {
    rollsFinal() {
      const total = roll => roll.total;
      const individual = roll =>
        roll.rolls
          .map(
            i =>
              `[${i.rolls
                .map(r => (r.useInTotal ? r.value : r.value + "d"))
                .toString()}]`
          )
          .join(" ");

      const process = roll => ({
        total: total(roll),
        individual: individual(roll)
      });

      return Array.isArray(this.lastRoll)
        ? this.lastRoll.map(process)
        : [process(this.lastRoll)];
    }
  },
  methods: {
    roll() {
      const input = this.rollInput || this.rollInputLast;
      const inputParse = input.split(",").map(i => i.trim());
      const roll = this.roller.roll.apply(this.roller, inputParse);
      this.lastRoll = roll;
      this.rollInputLast = input;
      this.rollInput = "";
      this.$refs.rollInput.focus();
    },
    closeOnEsc(event) {
      if (event.key === "Escape") {
        this.closeDiceRoller();
      }
    },
    ...mapActions(["closeDiceRoller"])
  },
  data() {
    return {
      lastRoll: [],
      rollInput: "",
      rollInputLast: "",
      roller: null
    };
  },
  mixins: [clickaway],
  mounted() {
    window.addEventListener("keyup", this.closeOnEsc);
    this.$refs.rollInput.focus();
    this.roller = new DiceRoller();
  },
  beforeDestroy() {
    window.removeEventListener("keyup", this.closeOnEsc);
  }
};
</script>

<style lang="scss" scoped>
.dice-roller-main {
  flex-grow: 1;
}
form {
  min-height: 100px;
}

.results {
  height: 300px;
}
</style>
