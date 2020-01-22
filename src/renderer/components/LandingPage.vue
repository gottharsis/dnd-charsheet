<template>
  <div id="wrapper">
    Loading
    <button @click="loadGuide">Load Guide</button>
    <div>initialized: {{ isGuideInitialized }}</div>
    <div>Armors:</div>
    <div>{{ armors }}</div>

    <router-link to="/choose-character">Choose character screen</router-link>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapState: mapStateC } = createNamespacedHelpers("Character");
const {
  mapState: mapStateG,
  mapActions: mapActionsG,
  mapGetters: mapGettersG
} = createNamespacedHelpers("Guide");

export default {
  name: "landing-page",
  computed: {
    ...mapStateC({
      wasSet: state => state.characterWasSet
    }),
    ...mapStateG({
      // isGuideInitialized: state => state.isInitialized,
      armors: state => JSON.stringify(state.armors)
    }),
    ...mapGettersG({
      isGuideInitialized: "isInitialized"
    })
  },
  methods: {
    ...mapActionsG(["loadGuide"])
  },
  async mounted() {
    await this.loadGuide();
    if (!this.isGuideInitialized) {
      console.error("Guide is not initialized");
    }
    if (this.characterWasSet) {
      this.$router.push("/home");
    } else {
      this.$router.push("/character-select");
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

main {
  display: flex;
  justify-content: space-between;
}

main > div {
  flex-basis: 50%;
}

.left-side {
  display: flex;
  flex-direction: column;
}

.welcome {
  color: #555;
  font-size: 23px;
  margin-bottom: 10px;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}

.doc p {
  color: black;
  margin-bottom: 10px;
}

.doc button {
  font-size: 0.8em;
  cursor: pointer;
  outline: none;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}

.doc button.alt {
  color: #42b983;
  background-color: transparent;
}
</style>
