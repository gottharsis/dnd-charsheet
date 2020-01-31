<template>
  <div id="character-select">
    <section class="hero is-bold is-medium is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="has-text-weight-bold is-2">
            Choose Character
          </h1>
        </div>
      </div>
    </section>
    <section class="selector-section has-margin-top-20" v-if="isLoaded">
      <div class="container">
        <div class="box">
          <h1 class="has-text-weight-bold has-text-centered">
            Characters
          </h1>
          <div class="tile is-ancestor">
            <div
              class="tile is-parent"
              v-for="character in characters"
              :key="character.name"
            >
              <div
                class="tile is-child box has-background-primary is-info has-text-white has-text-centered"
                @click="select(character.file)"
              >
                {{ character.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="loading-section has-margin-top-20" v-else>
      <div class="container">
        <div class="box">
          <h1 class="has-text-weight-bold has-text-centered">
            Loading data
          </h1>
          <progress class="progress is-small is-info"></progress>
        </div>
      </div>
    </section>
    <p>Selected Character File: {{ selectedFile }}</p>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { characterList } from "../data/persistCharacter";

const { mapActions } = createNamespacedHelpers("Character");

export default {
  data() {
    return {
      characters: [],
      isLoaded: false,
      selectedFile: ""
    };
  },
  async mounted() {
    const lst = await characterList();
    this.characters = lst;
    this.isLoaded = true;
  },
  methods: {
    ...mapActions(["chooseCharacter"]),
    async select(file) {
      this.selectedFile = file;
      await this.chooseCharacter({
        characterFile: file
      });
      this.$router.push("/home");
    }
  }
};
</script>

<style></style>
