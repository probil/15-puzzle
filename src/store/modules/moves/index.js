/* eslint-disable no-shadow, no-param-reassign */
const state = {
  value: 0,
};

const getters = {
  moves: state => state.value,
};

const mutations = {
  increment(state) {
    state.value += 1;
  },
  reset(state) {
    state.value = 0;
  },
};

const actions = {
  reset: ({ commit }) => commit('reset'),
  increment: ({ commit }) => commit('increment'),
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
