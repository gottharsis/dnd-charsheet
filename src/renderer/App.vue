<template>
  <div id="app">
    <modal />
    <router-view name="page"></router-view>
  </div>
</template>

<script>
import Modal from "./components/Modal";
export default {
  name: "dnd-charsheet",
  components: {
    Modal
  }
};
</script>

<style lang="scss">
/* CSS */
@import "~bulmaswatch/darkly/variables";
@import "~bulma/bulma";
@import "~bulmaswatch/darkly/overrides";

@import "~@fortawesome/fontawesome-free/css/all.min.css";

#app {
  overflow: hidden;
}

body {
  height: 100vh;
}
</style>
