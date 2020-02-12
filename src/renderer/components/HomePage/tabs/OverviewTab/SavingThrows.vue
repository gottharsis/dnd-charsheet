<template>
  <div class="saving-throws">
    <h3 class="has-text-weight-bold is-size-4">
      Saving Throws
    </h3>
    <ul>
      <li v-for="stat in savingThrows" :key="stat.name">
        <span class="has-text-left">
          {{ stat.name }}
        </span>

        <span class="has-text-right has-text-weight-bold">
          {{ stat.mod }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import zip from "lodash/zip";
import { modifierString } from "@/util";
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("Character");
const { mapState: Guide } = createNamespacedHelpers("Guide");

export default {
  computed: {
    ...mapGetters(["savingThrowBonuses"]),
    ...Guide(["stats"]),
    savingThrows() {
      const res = zip(this.savingThrowBonuses, this.stats).map(
        ([bonus, stat]) => ({
          name: stat.name,
          mod: modifierString(bonus)
        })
      );
      return res;
    }
  }
};
</script>

<style></style>
