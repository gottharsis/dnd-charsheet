const state = {
  isDiceRollerOpen: false
};

const mutations = {
  SET_DICE_ROLLER_OPEN(state, isOpen) {
    state.isDiceRollerOpen = isOpen;
  }
};

const actions = {
  openDiceRoller({ commit }) {
    commit("SET_DICE_ROLLER_OPEN", true);
  },

  closeDiceRoller({ commit }) {
    commit("SET_DICE_ROLLER_OPEN", false);
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
