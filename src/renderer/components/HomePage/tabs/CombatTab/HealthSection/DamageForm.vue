<template>
  <div id="damage-form">
    <div class="box">
      <form @submit.prevent="submit">
        <div class="has-text-weight-bold has-text-centered">Take Damage</div>
        <div class="field">
          <label for="" class="label">Damage</label>
          <div class="control">
            <input type="number" class="input" v-model.number="damage" />
          </div>
        </div>

        <div class="field">
          <label for="" class="label">Damage Modifier </label>
          <div class="control">
            <label class="radio">
              <input type="radio" name="modifier" value="" v-model="modifier" />
              None
            </label>
            <label class="radio">
              <input
                type="radio"
                name="modifier"
                value="vulnerable"
                v-model="modifier"
              />
              Vulnerability
            </label>
            <label class="radio">
              <input
                type="radio"
                name="modifier"
                value="resistant"
                v-model="modifier"
              />
              Resistance
            </label>
          </div>
        </div>

        <div>
          <span class="has-text-weight-bold">Calculated: </span>
          {{ calculatedDamage }}
        </div>

        <div class="control">
          <button type="submit" class="button">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("Character");
export default {
  methods: {
    ...mapActions(["takeDamage"]),
    submit() {
      this.takeDamage({
        damage: this.calculatedDamage
      });
    }
  },
  computed: {
    calculatedDamage() {
      if (this.modifier.toLowerCase().startsWith("r")) {
        return Math.ceil(this.damage / 2);
      } else if (this.modifier.toLowerCase().startsWith("v")) {
        return this.damage * 2;
      } else {
        return this.damage;
      }
    }
  },
  data() {
    return {
      damage: 0,
      modifier: ""
    };
  }
};
</script>

<style></style>
