/* eslint-disable no-shadow, no-param-reassign */

const state = {
  isStarted: false,
  isFinished: false,
};

const getters = {
  isGameStarted: state => state.isStarted,
  isGameFinished: state => state.isFinished,
};

const mutations = {
  startNewGame(state) {
    state.isStarted = true;
    state.isFinished = false;
  },
  finishGame(state) {
    state.isFinished = true;
  },
};

const actions = {
  startNewGame({ commit, dispatch }) {
    dispatch('gameField/reset');
    dispatch('gameField/shuffle');
    dispatch('moves/reset');
    dispatch('timer/start');
    commit('startNewGame');
  },
  moveTileByPoint({ dispatch }, point) {
    dispatch('gameField/tryToMoveTileByPoint', point)
      .then((isMoved) => {
        if (!isMoved) return;
        dispatch('moves/increment');
        dispatch('checkIsReadyToFinish');
      });
  },
  checkIsReadyToFinish({ rootGetters, dispatch }) {
    const isSolved = rootGetters['gameField/isSolved'];
    console.log('isSolved', isSolved);
    if (!isSolved) return;
    dispatch('finishTheGame');
  },
  finishTheGame({ commit, dispatch }) {
    dispatch('gameField/reset');
    dispatch('timer/stop');
    commit('finishGame');
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
