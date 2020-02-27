<template>
  <div id="wealth" class="has-margin-bottom-50">
    <div class="flex-row justify-space-between">
      <div class="is-size-3 has-text-weight-bold">
        Wealth
      </div>
      <b-button @click="show">
        <i class="fas fa-edit"></i>
      </b-button>
    </div>
    <div class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading is-size-4">CP</p>
          <p class="has-text-weight-bold is-size-3">{{ wealth.copper }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading is-size-4">SP</p>
          <p class="has-text-weight-bold is-size-3">{{ wealth.silver }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading is-size-4">GP</p>
          <p class="has-text-weight-bold is-size-3">{{ wealth.gold }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading is-size-4">PP</p>
          <p class="has-text-weight-bold is-size-3">{{ wealth.platinum }}</p>
        </div>
      </div>
    </div>

    <b-modal :active.sync="showEditWealth">
      <form @submit.prevent="submit" class="box">
        <h1 class="is-size-3">Edit Wealth</h1>
        <b-field label="Platinum">
          <b-input v-model="customWealth.platinum" />
        </b-field>
        <b-field label="Gold">
          <b-input v-model="customWealth.gold" />
        </b-field>
        <b-field label="Silver">
          <b-input v-model="customWealth.silver" />
        </b-field>
        <b-field label="Copper">
          <b-input v-model="customWealth.copper" />
        </b-field>
        <button class="button" type="submit">Submit</button>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("Character");
import deepclone from "lodash/cloneDeep";
export default {
  computed: {
    ...mapState({
      wealth: state => state.character.inventory.wealth
    })
  },
  data() {
    return {
      showEditWealth: false,
      customWealth: {
        gold: 0,
        silver: 0,
        copper: 0,
        platinum: 0
      }
    };
  },
  methods: {
    ...mapActions(["setWealth"]),
    show() {
      this.showEditWealth = true;
      this.customWealth = deepclone(this.wealth);
    },
    submit() {
      this.setWealth({ wealth: this.customWealth });
      this.showEditWealth = false;
    }
  }
};
</script>

<style></style>
