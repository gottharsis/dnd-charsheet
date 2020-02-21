<template>
  <div class="edit-inventory-modal box">
    <form @submit.prevent="submit">
      <h2 class="has-text-centered is-size-2">
        Edit Inventory
      </h2>
      <div class="columns is-multiline">
        <div class="column is-one-third" v-for="item in items" :key="item.id">
          <div class="card ">
            <header class="card-header">
              <div class="flex-row justify-space-between align-items-center">
                <p class="card-header-title">
                  <b-input v-model="item.name"> </b-input>
                </p>
                <div>
                  <b-button @click="remove(item.id)">
                    <i class="fas fa-trash"></i>
                  </b-button>
                </div>
              </div>
            </header>

            <div class="card-content">
              <b-field label="Description">
                <textarea class="textarea" v-model="item.description" />
              </b-field>

              <b-field label="Quantity">
                <b-input v-model.number="item.quantity" type="number"></b-input>
              </b-field>

              <b-field label="Weight">
                <b-input v-model.number="item.weight" type="number" />
              </b-field>
            </div>
          </div>
        </div>
        <div class="column flex-row justify-center align-items-center">
          <b-button @click="addItem">
            <b-icon pack="fas" icon="plus" />
          </b-button>
        </div>
      </div>
      <div>
        <b-button native-type="submit">
          Save changes
        </b-button>
      </div>
    </form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("Character");
import uuidv4 from "uuid/v4";

export default {
  computed: {
    ...mapState({
      currentItems: state => state.character.inventory.items
    })
  },

  data() {
    return {
      items: []
    };
  },

  mounted() {
    this.items = this.currentItems;
  },
  methods: {
    addItem() {
      const id = "item_" + uuidv4();
      this.items.push({
        id,
        name: "",
        weight: 0,
        description: "",
        quantity: 1
      });
    },
    remove(id) {
      this.items = this.items.filter(i => i.id !== id);
    },
    ...mapActions(["setInventoryItems"]),
    submit() {
      const items = this.items.filter(i => i.name !== "");
      this.setInventoryItems({
        items
      });
      this.$parent.close();
    }
  }
};
</script>

<style></style>
