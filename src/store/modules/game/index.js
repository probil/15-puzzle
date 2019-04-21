/* eslint-disable no-shadow, no-param-reassign */

const state = {
  isStarted: false,
  isFinished: false,
};

const getters = {
  isGameStarted: state => state.isStarted,
};

const mutations = {
  startNewGame(state) {
    state.isStarted = true;
    state.isFinished = false;
  },
};

const actions = {
  startNewGame({ commit, dispatch }) {
    dispatch('gameField/reset');
    dispatch('gameField/shuffle');
    dispatch('moves/reset');
    commit('startNewGame');
  },
  moveTileByPoint({ dispatch }, point) {
    dispatch('gameField/tryToMoveTileByPoint', point)
      .then((isMoved) => {
        if (!isMoved) return;
        dispatch('moves/increment');
      });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
