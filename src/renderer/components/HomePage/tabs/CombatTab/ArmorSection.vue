<template>
  <section id="armor-section" class="has-padding-top-10 has-padding-bottom-10">
    <!-- <h2 class="has-text-weight-bold is-4 has-text-weight-bold">Armor</h2> -->
    <div class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading is-size-4">Armor Class</p>
          <p class="is-size-3 has-text-weight-bold">{{ ac }}</p>
          <p v-if="armor.addDexMod">{{ armor.ac }} + DEX</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading is-size-4">Armor</p>
          <p class="has-text-weight-bold is-size-3">{{ armor.name }}</p>
        </div>
      </div>
    </div>
    <router-link to="/edit-armor" class="button">Edit</router-link>
  </section>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("Character");
const { mapGetters: guideGetters } = createNamespacedHelpers("Guide");
export default {
  computed: {
    ...mapState({
      ac: state => state.character.ac,
      armorId: state => state.character.armorId,
      armor: state => state.character.armor,
      dex: state =>
        state.character.abilityScores.find(i => i.stat === "DEX").score
    }),
    dexMod() {
      const mod = this.calculateModifier(this.dex);
      return mod >= 0 ? `+${mod}` : "" + mod;
    }
    // armor() {
    //   return this.getArmorById()(this.armorId);
    // }
  },
  methods: {
    // ...guideGetters(["getArmorById"])
    calculateModifier(stat) {
      return Math.floor((stat - 10) / 2);
    }
  }
};
</script>

<style></style>
