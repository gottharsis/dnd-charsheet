<template>
  <div id="combat-tab">
    <!-- <h1 class="has-text-weight-bold is-3 has-text-weight-bold">Combat</h1> -->
    <armor-section />
    <health-section />
    <div class="has-margin-top-10 has-margin-bottom-10 flex-row">
      <div class="box has-margin-right-50">
        <saving-throws />
      </div>
      <div class="box">
        <abilities />
      </div>
    </div>
    <weapons-section />
  </div>
</template>

<script>
import WeaponsSection from "./CombatTab/WeaponsSection";
import HealthSection from "./CombatTab/HealthSection";
import ArmorSection from "./CombatTab/ArmorSection";
import Abilities from "./OverviewTab/Abilities";
import SavingThrows from "./OverviewTab/SavingThrows";
export default {
  components: {
    WeaponsSection,
    HealthSection,
    ArmorSection,
    Abilities,
    SavingThrows
  }
};
</script>

<style></style>
