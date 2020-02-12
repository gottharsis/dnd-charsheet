<template>
  <div :style="style" class="ability-spacer" />
</template>

<script>
import debounce from "lodash/debounce";
export default {
  beforeMount() {
    window.addEventListener("scroll", debounce(this.scrollListener, 100));
  },
  data() {
    return {
      height: 0
    };
  },
  computed: {
    style() {
      return {
        height: this.height + "px"
      };
    }
  },
  methods: {
    scrollListener() {
      const scrollOffset = window.scrollY;
      this.height = scrollOffset;
    }
  }
};
</script>

<style lang="scss">
.ability-spacer {
  transition: height 0.4s ease-in-out;
}
</style>
