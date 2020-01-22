import isNil from "lodash/isNil";
const state = {
  error: null
};

const getters = {
  errorIsPresent: state => !isNil(state.error)
};

const mutations = {
  SET_ERROR(state, { errorText }) {
    state.error = errorText;
  },
  CLEAR_ERROR(state) {
    state.error = null;
  }
};

const actions = {
  setError({ commit, dispatch }, { errorText, duration = 3000 }) {
    commit("SET_ERROR", { errorText });
    setTimeout(() => dispatch("clearError"), duration);
  },
  clearError({ commit }) {
    commit("CLEAR_ERROR");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
