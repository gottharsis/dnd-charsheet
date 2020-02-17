<template>
  <div id="combat-tab">
    <!-- <h1 class="has-text-weight-bold is-3 has-text-weight-bold">Combat</h1> -->
    <armor-section />
    <health-section />
    <div class="box has-margin-top-10 has-margin-bottom-10"><abilities /></div>
    <weapons-section />
  </div>
</template>

<script>
import WeaponsSection from "./CombatTab/WeaponsSection";
import HealthSection from "./CombatTab/HealthSection";
import ArmorSection from "./CombatTab/ArmorSection";
import Abilities from "./OverviewTab/Abilities";
export default {
  components: {
    WeaponsSection,
    HealthSection,
    ArmorSection,
    Abilities
  }
};
</script>

<style></style>
