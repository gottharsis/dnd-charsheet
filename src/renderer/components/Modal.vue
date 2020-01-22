<template>
  <div id="modal-container" class="is-clipped">
    <div
      :class="{
        modal: true,
        'is-active': shouldShowModal,
        'is-clipped': true
      }"
    >
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-content">
        <router-view @close="closeModal" name="modal"></router-view>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="closeModal"
      ></button>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions, mapState } = createNamespacedHelpers("Modal");
export default {
  computed: {
    shouldShowModal() {
      return this.$route.matched.some(
        ({ meta }) => meta.hasOwnProperty("showModal") && meta.showModal
      );
    }
  },
  methods: {
    closeModal() {
      this.$router.go(-1);
    }
  }
};
</script>

<style></style>
