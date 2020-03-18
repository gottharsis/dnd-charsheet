<template>
  <div class="dice-roller" :style="size">
    <dice-roller-button @click="toggle" />
    <transition
      name="dice-roller-transition"
      enter-active-class="animated fadeInUp faster"
      leave-active-class="animated fadeOutDown faster"
    >
      <dice-roller-main
        v-on-clickaway="closeDiceRoller"
        v-if="showDiceRoller"
      />
    </transition>
  </div>
</template>

<script>
import DiceRollerMain from "./DiceRoller/DiceRollerMain";
import DiceRollerButton from "./DiceRoller/DiceRollerButton";
import { mixin as clickaway } from "vue-clickaway";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("Hotkeys");
export default {
  components: {
    DiceRollerMain,
    DiceRollerButton
  },
  computed: {
    ...mapState({
      showDiceRoller: state => state.isDiceRollerOpen
    }),
    size() {
      if (this.showDiceRoller) {
        return {
          width: 450 + "px",
          height: "556px"
        };
      } else {
        return {
          width: "auto",
          height: "auto"
        };
      }
    }
  },
  methods: {
    // show() {
    //   this.showDiceRoller = true;
    // },
    // hide() {
    //   this.showDiceRoller = false;
    // },
    ...mapActions(["openDiceRoller", "closeDiceRoller"]),
    toggle() {
      if (this.showDiceRoller) {
        this.closeDiceRoller();
      } else {
        this.openDiceRoller();
      }
    }
  },
  mixins: [clickaway],

  data() {
    return {};
  }
};
</script>

<style lang="scss">
.dice-roller {
  z-index: 10;
  position: fixed;
  // width: 300px;
  // height: 480px;
  left: auto;
  top: auto;
  right: 30px;
  bottom: 50px;
  display: flex;
  flex-direction: column-reverse;
  transition: width 1s;
}

@keyframes fade-in-a {
  0% {
    opacity: 0;
    transform: translateY(15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
.fade-in {
  animation: fade-in-a 0.5s;
}
</style>
