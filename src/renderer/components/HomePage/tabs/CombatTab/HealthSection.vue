<template>
  <section id="health-section" class="has-padding-top-10 has-padding-bottom-10">
    <h2 class="has-text-weight-bold is-size-3 has-text-weight-bold">Health</h2>
    <div class="level">
      <div class="level-item"><health-indicator /></div>
      <div class="level-item">
        <div>
          <heal-form />
          <add-temp-hp />
        </div>
      </div>
      <div class="level-item"><damage-form /></div>
      <!-- <div class="level-item"><add-temp-hp /></div> -->
      <div class="level-item"><set-hit-dice /></div>
    </div>
  </section>
</template>

<script>
import HealthIndicator from "./HealthSection/HealthIndicator";
import DamageForm from "./HealthSection/DamageForm";
import HealForm from "./HealthSection/HealForm";
import AddTempHp from "./HealthSection/AddTempHp.vue";
import SetHitDice from "./HealthSection/SetHitDice";
export default {
  components: {
    HealthIndicator,
    DamageForm,
    HealForm,
    AddTempHp,
    SetHitDice
  },
  computed: {}
};
</script>

<style></style>
