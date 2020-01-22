<template>
  <div id="edit-armor" class="has-padding-top-20 box">
    <h1 class="has-text-centered has-text-weight-bold is-size-2">
      Edit Armor
    </h1>
    <div class="container">
      <form @submit.prevent="submit">
        <div class="field">
          <label for="" class="label">Name</label>
          <input type="text" class="input" v-model="armor.name" />
        </div>
        <div class="field">
          <label for="" class="label">AC</label>
          <div class="control">
            <input
              type="number"
              name=""
              id=""
              class="input"
              v-model.number="armor.ac"
              @change="updateAc"
            />
            <label for="" class="checkbox">
              <input
                type="checkbox"
                name=""
                id=""
                v-model="armor.addDexMod"
                @change="updateAc"
              />
              Add DEX modifier? ({{ dexMod }})
            </label>
          </div>
        </div>
        <div class="field">
          <label for="" class="label">Description</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="4"
            class="textarea"
            v-model="armor.attributes"
          ></textarea>
        </div>
        <div class="field">
          <label for="" class="label">Total AC</label>
          <input type="text" class="input" v-model="ac" />
        </div>
        <button type="submit" class="button">Save</button>
      </form>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("Character");

export default {
  computed: {
    ...mapState({
      currentArmor: state => state.character.armor,
      dexMod: state =>
        state.character.abilityScores.find(i => i.stat === "DEX").mod,
      currentAc: state => state.character.ac
    })
  },
  data() {
    return {
      armor: {
        name: "",
        ac: 0,
        addDexMod: false,
        category: "",
        attributes: ""
      },
      ac: 0
    };
  },
  mounted() {
    this.armor = this.currentArmor;
    this.ac = this.currentAc;
  },
  methods: {
    ...mapActions(["setArmor", "setAc"]),
    submit() {
      this.setArmor({
        armor: this.armor
      });
      this.setAc({
        ac: this.ac
      });

      this.$emit("close");
    },
    updateAc() {
      let ac = this.armor.ac;
      if (this.armor.addDexMod) {
        ac += this.dexMod;
      }
      this.ac = ac;
    }
  }
};
</script>

<style></style>
