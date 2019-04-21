/* eslint-disable no-shadow, no-param-reassign */
const state = {
  isStarted: false,
  startedAt: null,
};

const mutations = {
  start(state) {
    state.isStarted = true;
    state.startedAt = new Date().toISOString();
  },
  stop(state) {
    state.isStarted = false;
  },
};

const getters = {
  startedAt: state => state.startedAt,
};

const actions = {
  start: ({ commit }) => commit('start'),
  stop: ({ commit }) => commit('stop'),
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
