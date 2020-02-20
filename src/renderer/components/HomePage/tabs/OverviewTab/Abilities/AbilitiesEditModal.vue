<template>
  <div class="abilities-edit-modal box">
    <h3 class="is-size-2 has-text-weight-bold has-text-centered">
      Edit Abilities
    </h3>
    <hr class="has-background-white-bis" />
    <div class="container">
      <form @submit.prevent="submit">
        <div class="columns is-multiline">
          <div
            v-for="ability in abilities"
            :key="ability.id"
            class="column is-half"
          >
            <div class="card">
              <header class="card-header">
                <div class="card-header-title">
                  <b-input
                    v-model="ability.name"
                    placeholder="Name..."
                  ></b-input>
                </div>
                <div class="card-header-icon">
                  <i class="fas fa-trash" @click="remove(ability.id)"></i>
                </div>
              </header>
              <div class="card-content">
                <b-field label="Description">
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    class="textarea has-background-dark"
                    v-model="ability.description"
                    placeholder="Enter the description of the ability"
                  ></textarea>
                </b-field>

                <b-field label="Max. Uses (-1 if not tracked)">
                  <b-input
                    v-model.number="ability.max"
                    custom-class="has-background-dark"
                    type="number"
                  ></b-input>
                </b-field>
              </div>
            </div>
          </div>

          <div
            class="column add-button flex-row justify-center align-items-center"
          >
            <b-button @click="addAbility">
              <b-icon pack="fas" icon="plus"></b-icon>
            </b-button>
          </div>
        </div>
        <b-button native-type="submit" class="is-success">
          Submit changes
        </b-button>
      </form>
      <b-button class="is-primary" @click="$parent.close()">
        Close
      </b-button>
    </div>
  </div>
</template>

<script>
import max from "lodash/max";
import deepclone from "lodash/cloneDeep";
import remove from "lodash/remove";
import uuidv4 from "uuid/v4";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("Character");

export default {
  methods: {
    ...mapActions(["setAbilityList"]),
    submit() {
      const ab = this.abilities.filter(i => i.name !== "");
      this.setAbilityList({
        abilityList: ab
      });
      this.$parent.close();
    },
    addAbility() {
      const uid = uuidv4();
      const id = "ability_" + uid;
      const newAbility = {
        name: "",
        description: "",
        max: 0,
        used: 0,
        id
      };
      this.abilities.push(newAbility);
      this.newId++;
    },
    remove(id) {
      this.abilities = this.abilities.filter(i => i.id !== id);
    }
  },
  computed: {
    ...mapState({
      currentAbilities: state => state.character.abilities
    })
  },
  data() {
    return {
      abilities: [],
      newId: -1
    };
  },
  mounted() {
    this.abilities = deepclone(this.currentAbilities);
    const ids = this.abilities.map(ab => ab.id);
    this.newId = 1 + max(ids);
  }
};
</script>

<style lang="scss">
.add-column {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

// button {
//   display: block;
// }
</style>
