<template>
  <div id="heal-form" class="has-margin-bottom-10">
    <div class="box">
      <form @submit.prevent="submit" class="has-margin-bottom-20">
        <div class="has-text-weight-bold has-text-centered">Heal Damage</div>
        <div class="field">
          <label for="" class="label">Amount</label>
          <div class="control">
            <input class="input" type="number" name="" id="" v-model="amount" />
          </div>
        </div>
        <div>
          <button type="submit" class="button">Heal</button>
          <button class="button is-primary" @click="healAll">Heal all</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("Character");

export default {
  data() {
    return {
      amount: 0
    };
  },
  methods: {
    ...mapActions(["heal", "healAll"]),
    submit() {
      this.heal({
        amount: this.amount
      });
    }
  }
};
</script>

<style></style>
