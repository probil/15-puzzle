/* eslint-disable no-shadow, no-param-reassign */
import { differenceInSeconds } from '../../../utils/date';

const state = {
  isStarted: false,
  startedAt: null,
  finishedAt: null,
};

const mutations = {
  start(state) {
    state.isStarted = true;
    state.startedAt = new Date().toISOString();
  },
  stop(state) {
    state.isStarted = false;
    state.finishedAt = new Date().toISOString();
  },
};

const getters = {
  startedAt: state => state.startedAt,
  totalTime: state => differenceInSeconds(state.finishedAt, state.startedAt),
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
