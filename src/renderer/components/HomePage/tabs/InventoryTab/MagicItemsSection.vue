<template>
  <div>
    <h2 class="is-size-3 has-text-centered has-text-weight-bold">
      Magic Items
    </h2>
    <!-- <div class="container"> -->
    <div class="flex-row wrap">
      <magic-item
        v-for="item in magicItems"
        :key="item.name"
        :magic-item="item"
      />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("Character");

import MagicItem from "./MagicItem";

export default {
  computed: {
    ...mapState({
      magicItems: state => state.character.inventory.magicItems
    })
  },
  components: {
    MagicItem
  }
};
</script>

<style></style>
