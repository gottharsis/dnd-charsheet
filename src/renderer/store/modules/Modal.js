import isNil from "lodash/isNil";
const state = {
  modalUrl: null
};

const mutations = {
  SET_MODAL_URL(state, { modalUrl }) {
    state.modalUrl = modalUrl;
  }
};

const actions = {
  setModalUrl({ commit }, { modalUrl }) {
    commit("SET_MODAL_URL", { modalUrl });
  },
  clearModal({ commit }) {
    commit("SET_MODAL_URL", { modalUrl: null });
  }
};

const getters = {
  shouldShowModal: state => !isNil(state.modalUrl) && state.modalUrl !== ""
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
