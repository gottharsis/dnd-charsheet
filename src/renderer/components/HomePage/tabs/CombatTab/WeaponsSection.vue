<template>
  <section
    id="weapons-section"
    class="has-padding-top-10 has-padding-bottom-10"
  >
    <div class="flex-row justify-space-between">
      <h2 class="has-text-weight-bold is-size-3 has-text-weight-bold">
        Weapons
      </h2>
      <b-button
        icon-left="edit"
        icon-pack="fas"
        @click="isEditWeaponsModalOpen = true"
      >
        Edit
      </b-button>
    </div>
    <table class="table is-bordered is-striped is-fullwidth">
      <thead>
        <tr>
          <!-- <th class="has-text-centered">Id</th> -->
          <th class="has-text-centered">Name</th>
          <th class="has-text-centered">Damage</th>
          <th class="has-text-centered">Category</th>
          <th class="has-text-centered">Properties</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="weapon in weapons" :key="weapon.id">
          <!-- <td>{{ weapon.id }}</td> -->
          <td>{{ weapon.name }}</td>
          <td>{{ weapon.damage }}</td>
          <td>{{ weapon.category }}</td>
          <td>{{ weapon.properties }}</td>
        </tr>
      </tbody>
    </table>
    <b-modal :active.sync="isEditWeaponsModalOpen">
      <div class="content box">
        <h1 class="has-text-centered">Edit Weapons</h1>
        <form @submit.prevent="submit">
          <div class="columns is-multiline">
            <div
              class="column is-one-third"
              v-for="weapon in customWeapons"
              :key="weapon.id"
            >
              <div class="weapon-box ">
                <b-field label="Name">
                  <b-input v-model="weapon.name" />
                </b-field>

                <b-field label="Damage">
                  <b-input v-model="weapon.damage" />
                </b-field>

                <b-field label="Category">
                  <b-input v-model="weapon.category" />
                </b-field>

                <b-field label="Properties">
                  <b-input v-model="weapon.properties" />
                </b-field>

                <b-field>
                  <b-button
                    type="is-danger"
                    icon-left="trash"
                    icon-pack="fas"
                    @click="removeWeapon(weapon.id)"
                  >
                    Delete
                  </b-button>
                </b-field>
              </div>
            </div>

            <div class="column is-one-third">
              <div
                class="weapon-box flex-row justify-center align-items-center"
              >
                <b-button icon-left="plus" icon-pack="fas" @click="addWeapon">
                  New
                </b-button>
              </div>
            </div>
          </div>
          <b-button native-type="submit"> Save Changes </b-button>
        </form>
      </div>
    </b-modal>
  </section>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import cloneDeep from "lodash/cloneDeep";
import uuidv4 from "uuid/v4";
const {
  mapState: GuideState,
  mapGetters: GuideGetters
} = createNamespacedHelpers("Guide");
const { mapState: CharState, mapActions } = createNamespacedHelpers(
  "Character"
);
export default {
  methods: {
    ...GuideGetters(["getWeaponById"]),
    ...mapActions(["setWeapons"]),
    submit() {
      this.setWeapons({
        weapons: this.customWeapons
      });
      this.isEditWeaponsModalOpen = false;
    },
    addWeapon() {
      const id = uuidv4();
      this.customWeapons.push({
        name: "",
        damage: "",
        category: "",
        properties: "",
        id
      });
    },
    removeWeapon(id) {
      this.customWeapons = this.customWeapons.filter(i => i.id !== id);
    }
  },
  mounted() {
    this.customWeapons = cloneDeep(this.weapons);
  },
  data() {
    return {
      isEditWeaponsModalOpen: false,
      customWeapons: []
    };
  },
  computed: {
    ...CharState({
      weapons: state => state.character.inventory.weapons
    })
    // weapons() {
    //   return this.weaponIds.map(this.getWeaponById());
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "~bulmaswatch/superhero/variables";
@import "~bulma/bulma";
.weapon-box {
  // width: 300px;
  // margin-right: 20px;
  border: 1px solid $white-bis;
  padding: 20px;
}
</style>
