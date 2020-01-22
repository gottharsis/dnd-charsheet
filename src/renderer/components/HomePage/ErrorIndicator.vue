<template>
  <div class="error-indicator">
    <div class="message is-danger has-margin-top-10" v-if="errorIsPresent">
      <div class="message-header">
        <p>Error</p>
        <button class="delete" @click="clearError"></button>
      </div>
      <div class="message-body">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import isNil from "lodash/isNil";
const { mapState, mapActions } = createNamespacedHelpers("Errors");
export default {
  computed: {
    ...mapState(["error"]),
    errorIsPresent() {
      return !isNil(this.error) && this.error !== "";
    }
  },
  methods: {
    ...mapActions(["clearError"])
  }
};
</script>

<style></style>
