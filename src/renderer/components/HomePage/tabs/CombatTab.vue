<template>
  <div id="combat-tab">
    <!-- <h1 class="has-text-weight-bold is-3 has-text-weight-bold">Combat</h1> -->
    <armor-section />
    <health-section />
    <weapons-section />
  </div>
</template>

<script>
import WeaponsSection from "./CombatTab/WeaponsSection";
import HealthSection from "./CombatTab/HealthSection";
import ArmorSection from "./CombatTab/ArmorSection";
export default {
  components: {
    WeaponsSection,
    HealthSection,
    ArmorSection
  }
};
</script>

<style></style>
