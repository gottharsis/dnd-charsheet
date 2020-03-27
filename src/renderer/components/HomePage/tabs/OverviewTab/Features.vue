<template>
  <div class="features">
    <div class="flex-row justify-space-between">
      <h3 class="is-size-3 has-text-weight-bold">
        Features
      </h3>
      <b-button
        icon-left="edit"
        icon-pack="fas"
        @click="isEditModalOpen = true"
      ></b-button>
    </div>
    <div v-for="feature in features" :key="feature.name">
      <p class="has-text-weight-bold">
        {{ feature.name }}
      </p>

      <p>
        {{ feature.description }}
      </p>
    </div>

    <b-modal :active.sync="isEditModalOpen">
      <div class="box content">
        <h2 class="has-text-centered">Edit Features</h2>
        <form @submit.prevent="submit">
          <div class="columns is-multiline">
            <div
              class="column is-one-third"
              v-for="feature in customFeatures"
              :key="feature.id"
            >
              <b-field label="Name">
                <b-input v-model="feature.name" />
              </b-field>
              <b-field label="Description">
                <textarea class="textarea" v-model="feature.description" />
              </b-field>
              <b-field label="Source">
                <b-input v-model="feature.source" />
              </b-field>

              <b-field>
                <b-button
                  type="is-danger"
                  icon-left="trash"
                  icon-pack="fas"
                  @click="removeFeature(feature.id)"
                >
                  Delete
                </b-button>
              </b-field>
            </div>
            <div
              class="column is-one-third flex-row justify-center align-items-center"
            >
              <b-button icon-left="plus" icon-pack="fas" @click="addFeature">
                Add
              </b-button>
            </div>
          </div>
          <b-button native-type="submit"> Save Changes </b-button>
        </form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("Character");

import cloneDeep from "lodash/cloneDeep";
import uuid from "uuid/v4";

export default {
  name: "Features",
  mounted() {
    this.customFeatures = cloneDeep(this.features);
  },
  data() {
    return {
      isEditModalOpen: false,
      customFeatures: []
    };
  },
  computed: {
    ...mapState({
      features: state => state.character.features
    })
  },
  methods: {
    ...mapActions(["setFeatures"]),
    submit() {
      const features = this.customFeatures.filter(
        i => i.name && i.description && i.source
      );
      this.setFeatures({ features });
    },
    addFeature() {
      const id = "feature_" + uuid();
      const newFeature = {
        id,
        name: "",
        description: "",
        source: ""
      };
      this.customFeatures.push(newFeature);
    },
    removeFeature(id) {
      this.customFeatures = this.customFeatures.filter(i => i.id !== id);
    }
  }
};
</script>

<style lang="scss" scoped></style>
