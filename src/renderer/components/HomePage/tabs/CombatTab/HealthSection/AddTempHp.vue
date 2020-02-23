<template>
  <div id="add-temp-hp">
    <div class="box">
      <form @submit.prevent="submit">
        <div class="field">
          <label for="" class="label">Temporary HP</label>
          <div class="control">
            <input
              type="number"
              name=""
              id=""
              v-model.number="tempHp"
              class="input"
            />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button type="submit" class="button">Submit</button>
          </div>
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
      tempHp: 0
    };
  },
  methods: {
    ...mapActions(["setTempHp"]),
    submit() {
      this.setTempHp({ tempHp: this.tempHp });
    }
  }
};
</script>

<style></style>
