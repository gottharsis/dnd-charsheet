<template>
  <div id="inventory-tab">
    <wealth />
    <div class="flex-row justify-space-between">
      <h2 class="is-size-3 has-text-centered has-text-weight-bold">Items</h2>
      <div>
        <b-button>
          <i class="fas fa-plus"></i>
        </b-button>
        <b-button @click="isInventoryEditOpen = true">
          <i class="fas fa-edit"></i>
        </b-button>
      </div>
    </div>
    <table class="table is-bordered is-fullwidth" id="items-table">
      <thead>
        <tr class="has-background-grey-darker">
          <th class="has-text-centered">Name</th>
          <th class="has-text-centered">Quantity</th>
          <th class="has-text-centered">Weight</th>
          <th class="has-text-centered">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.weight }}</td>
          <td>{{ item.description }}</td>
        </tr>
      </tbody>
    </table>
    <div class="flex-row justify-flex-end">
      <div class="is-size-3">
        <span class="has-text-weight-bold">Total Weight:</span>
        {{ totalWeight }} lb.
      </div>
    </div>

    <b-modal :active.sync="isInventoryEditOpen">
      <edit-inventory-modal />
    </b-modal>
    <h2 class="is-size-3 has-text-centered has-text-weight-bold">
      Magic Items
    </h2>
    <!-- <div class="container"> -->
    <div class="">
      <magic-item
        v-for="item in magicItems"
        :key="item.name"
        :magic-item="item"
      />
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("Character");

import MagicItem from "./InventoryTab/MagicItem";
import EditInventoryModal from "./InventoryTab/EditInventoryModal";
import Wealth from "./InventoryTab/Wealth";

export default {
  computed: {
    ...mapState({
      items: state => state.character.inventory.items,
      magicItems: state => state.character.inventory.magicItems
    }),
    totalWeight() {
      return (
        this.items.map(i => i.weight * i.quantity).reduce((a, b) => a + b, 0) +
        this.magicItems.map(i => i.weight).reduce((a, b) => a + b, 0)
      );
    }
  },
  components: {
    MagicItem,
    EditInventoryModal,
    Wealth
  },
  data() {
    return {
      isInventoryEditOpen: false,
      isMagicEditOpen: false
    };
  }
};
</script>

<style></style>
