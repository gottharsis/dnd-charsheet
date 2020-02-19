<template>
  <div id="app">
    <!-- <modal /> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import Buefy from "buefy";

import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("Character");

Vue.use(Buefy);
export default {
  name: "dnd-charsheet",
  methods: {
    ...mapActions(["saveCharacter"])
  },
  mounted() {
    window.addEventListener("beforeunload", this.saveCharacter);
  }
  // async beforeDestroy() {
  //   await this.saveCharacter();
  // }
};
</script>

<style lang="scss">
/* CSS */
@import "~bulma-divider";
@import "~bulmaswatch/superhero/variables";
@import "~bulma/bulma";
@import "~buefy/src/scss/buefy";
@import "~bulmaswatch/superhero/overrides";

@import "~@fortawesome/fontawesome-free/css/all.min.css";
@import "~animate.css/animate.css";
#app {
  overflow: hidden;
}

body {
  height: 100vh;
}

input.input {
  background-color: $dark !important;
}

textarea.textarea {
  background-color: $dark !important;
}
</style>
