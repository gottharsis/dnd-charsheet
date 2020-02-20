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
    <p>
      {{ lastRoll }}
    </p>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";
import { DiceRoll } from "rpg-dice-roller/lib/esm/bundle";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("Hotkeys");

export default {
  methods: {
    roll() {
      const roll = new DiceRoll(this.rollInput);
      this.lastRoll = roll.toString();
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
      lastRoll: "",
      rollInput: ""
    };
  },
  mixins: [clickaway],
  mounted() {
    window.addEventListener("keyup", this.closeOnEsc);
    this.$refs.rollInput.focus();
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
</style>
