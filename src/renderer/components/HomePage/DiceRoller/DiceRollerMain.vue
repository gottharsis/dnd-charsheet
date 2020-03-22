<template>
  <div class="dice-roller-main box has-background-black-ter">
    <h2 class="is-size-2 has-text-centered">
      Roll Dice
    </h2>
    <form @submit.prevent="roll">
      <b-field>
        <input class="input" v-model="rollInput" ref="rollInput" />
      </b-field>

      <div class="buttons">
        <b-button
          v-for="[key, saved] in Object.entries(savedRolls)"
          :key="key"
          :type="lastSavedRoll == key ? 'is-info' : ''"
          @click="roll(saved.roll)"
        >
          {{ saved.name }} ({{ key }})
        </b-button>
        <b-button
          icon-left="edit"
          icon-pack="fas"
          @click="isEditModalOpen = true"
        ></b-button>
      </div>
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

    <b-modal :active.sync="isEditModalOpen">
      <div class="box content">
        <h2 class="has-text-centered">Edit Saved rolls</h2>
        <form @submit.prevent="submitForm">
          <div v-for="key in rollKeys" :key="key" class="columns">
            <div class="column is-2">
              <h1 class="has-text-centered">
                {{ key }}
              </h1>
            </div>
            <div class="column flex-row">
              <b-field label="Name" class="roll-input">
                <b-input v-model="customRolls[key].name"></b-input>
              </b-field>
              <b-field label="Roll" class="roll-input">
                <b-input v-model="customRolls[key].roll"></b-input>
              </b-field>
              <hr />
            </div>
          </div>
          <b-button native-type="submit">Save Changes</b-button>
        </form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";
import { DiceRoll, DiceRoller } from "rpg-dice-roller/lib/esm/bundle";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("Hotkeys");
import flatten from "lodash/flattenDeep";
import isNil from "lodash/isNil";
import cloneDeep from "lodash/cloneDeep";
const {
  mapState: charState,
  mapActions: charActions
} = createNamespacedHelpers("Character");

export default {
  computed: {
    ...charState({
      savedRolls: state => state.character.savedRolls
    }),
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
    roll(expression) {
      const input =
        typeof expression == "string"
          ? expression
          : this.rollInput || this.rollInputLast;
      const inputParse = input.split(",").map(i => i.trim());
      const roll = this.roller.roll.apply(this.roller, inputParse);
      this.lastRoll = roll;
      this.rollInputLast = input;
      this.rollInput = "";
      if (typeof expression != "string") {
        this.lastSavedRoll = "";
      }
      this.$refs.rollInput.focus();
    },
    keyListener(event) {
      if (event.key === "Escape") {
        this.closeDiceRoller();
        return;
      }
      const saved = this.savedRolls[event.key];
      if (!isNil(saved)) {
        this.roll(saved.roll);
        this.lastSavedRoll = event.key;
      }
    },
    ...mapActions(["closeDiceRoller"]),
    ...charActions(["setSavedRolls"]),
    submitForm() {
      const rolls = cloneDeep(this.customRolls);
      for (const key in rolls) {
        console.log(key);
        if (!(rolls[key] && rolls[key].name && rolls[key].roll)) {
          delete rolls[key];
        }
      }
      this.setSavedRolls({
        savedRolls: rolls
      });
      console.log("successfully sset rolls ");
      this.isEditModalOpen = false;
      console.log("closed edit modal");
    }
  },
  data() {
    return {
      lastRoll: [],
      rollInput: "",
      rollInputLast: "",
      lastSavedRoll: "",
      roller: null,
      isEditModalOpen: false,
      rollKeys: ["q", "w", "e", "r", "t"],
      customRolls: {
        q: {
          name: "",
          roll: ""
        },
        w: {
          name: "",
          roll: ""
        },
        e: {
          name: "",
          roll: ""
        },
        r: {
          name: "",
          roll: ""
        },
        t: {
          name: "",
          roll: ""
        }
      }
    };
  },
  mixins: [clickaway],
  mounted() {
    window.addEventListener("keyup", this.keyListener);
    this.$refs.rollInput.focus();
    this.roller = new DiceRoller();

    // for (const key of this.rollKeys) {
    //   if (this.savedRolls.hasOwnProperty(key)) {
    //     this.customRolls[key].name = this.savedRolls[key].name;
    //     this.customRolls[key].roll = this.savedRolls[key].roll;
    //   }
    // }
    const rls = cloneDeep(this.savedRolls);
    Object.assign(this.customRolls, rls);
  },
  beforeDestroy() {
    window.removeEventListener("keyup", this.keyListener);
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

.roll-input {
  flex: 1;
  margin-right: 30px;
  &:last-child {
    margin-right: 0px;
  }
}
</style>
