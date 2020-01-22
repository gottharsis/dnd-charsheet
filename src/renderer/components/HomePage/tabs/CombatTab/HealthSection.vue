<template>
  <section id="health-section" class="has-padding-top-10 has-padding-bottom-10">
    <h2 class="has-text-weight-bold is-4 has-text-weight-bold">Health</h2>
    <div class="level">
      <div class="level-item"><health-indicator /></div>
      <div class="level-item"><heal-form /></div>
      <div class="level-item"><damage-form /></div>
      <div class="level-item"><add-temp-hp /></div>
    </div>
  </section>
</template>

<script>
import HealthIndicator from "./HealthSection/HealthIndicator";
import DamageForm from "./HealthSection/DamageForm";
import HealForm from "./HealthSection/HealForm";
import AddTempHp from "./HealthSection/AddTempHp.vue";
export default {
  components: {
    HealthIndicator,
    DamageForm,
    HealForm,
    AddTempHp
  },
  computed: {}
};
</script>

<style></style>
