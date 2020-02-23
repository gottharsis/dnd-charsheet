<template>
  <div class="box">
    <div class="flex-row justify-space-between">
      <h1 class="has-text-weight-bold">
        Hit Dice
      </h1>
      <div>
        <b-button @click="edit">
          <i class="fas fa-edit"></i>
        </b-button>
      </div>
    </div>
    <circle-progress :value="percentage" :radius="100">
      <p>{{ hitDice }}</p>
      <p class="is-size-2">{{ remainingHitDice }}</p>
      <div>
        <b-button @click="reset">
          <i class="fas fa-sync"></i>
        </b-button>
        <b-button @click="use">
          <i class="fas fa-dragon"></i>
        </b-button>
      </div>
    </circle-progress>

    <b-modal :active.sync="isEditOpen">
      <form class="box" @submit.prevent="submitForm">
        <b-field label="Hit Dice">
          <b-input v-model="newHitDice"></b-input>
        </b-field>
        <b-field label="Max. Hit Dice">
          <b-input v-model.number="newMaxHitDice" type="number"></b-input>
        </b-field>
        <b-button native-type="submit">Save</b-button>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { createNamespacedHelpers as helpers } from "vuex";
const { mapState, mapActions } = helpers("Character");
import CircleProgress from "@/components/global/CircleProgress";

export default {
  components: {
    CircleProgress
  },
  computed: {
    ...mapState({
      hitDice: state => state.character.health.hitDice,
      remainingHitDice: state => state.character.health.remainingHitDice,
      maxHitDice: state => state.character.health.maxHitDice
    }),
    percentage() {
      return (this.remainingHitDice / this.maxHitDice) * 100;
    }
  },
  data() {
    return {
      isEditOpen: false,
      newHitDice: "",
      newMaxHitDice: -1
    };
  },
  methods: {
    ...mapActions(["setHitDice", "setRemainingHitDice", "setMaxHitDice"]),
    reset() {
      this.setRemainingHitDice({ remainingHitDice: this.maxHitDice });
    },
    use() {
      this.setRemainingHitDice({ remainingHitDice: this.remainingHitDice - 1 });
    },
    edit() {
      this.newHitDice = this.hitDice;
      this.newMaxHitDice = this.maxHitDice;
      this.isEditOpen = true;
    },
    submitForm() {
      this.setHitDice({ hitDice: this.newHitDice });
      this.setMaxHitDice({ maxHitDice: this.newMaxHitDice });
      this.isEditOpen = false;
    }
  }
};
</script>

<style></style>
