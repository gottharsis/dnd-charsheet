<template>
  <section
    id="weapons-section"
    class="has-padding-top-10 has-padding-bottom-10"
  >
    <h2 class="has-text-weight-bold is-size-3 has-text-weight-bold">Weapons</h2>
    <table class="table is-bordered is-striped is-fullwidth">
      <thead>
        <tr>
          <th class="has-text-centered">Id</th>
          <th class="has-text-centered">Name</th>
          <th class="has-text-centered">Damage</th>
          <th class="has-text-centered">Category</th>
          <th class="has-text-centered">Properties</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="weapon in weapons" :key="weapon.id">
          <td>{{ weapon.id }}</td>
          <td>{{ weapon.name }}</td>
          <td>{{ weapon.damage }}</td>
          <td>{{ weapon.category }}</td>
          <td>{{ weapon.properties }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const {
  mapState: GuideState,
  mapGetters: GuideGetters
} = createNamespacedHelpers("Guide");
const { mapState: CharState } = createNamespacedHelpers("Character");
export default {
  methods: {
    ...GuideGetters(["getWeaponById"])
  },
  computed: {
    ...CharState({
      weaponIds: state => state.character.inventory.weaponIds
    }),
    weapons() {
      return this.weaponIds.map(this.getWeaponById());
    }
  }
};
</script>

<style></style>
