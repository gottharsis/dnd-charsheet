<template>
  <div id="app">
    <!-- <modal /> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import Buefy from "buefy";

Vue.use(Buefy);
export default {
  name: "dnd-charsheet"
};
</script>

<style lang="scss">
/* CSS */
@import "~bulmaswatch/darkly/variables";
@import "~bulma/bulma";
@import "~buefy/src/scss/buefy";
@import "~bulmaswatch/darkly/overrides";

@import "~@fortawesome/fontawesome-free/css/all.min.css";

#app {
  overflow: hidden;
}

body {
  height: 100vh;
}
</style>
