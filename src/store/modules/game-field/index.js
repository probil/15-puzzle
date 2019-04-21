/* eslint-disable no-shadow, no-param-reassign */
import {
  generateField,
  fillWithInitialData,
  findPointByValue,
  swapPoints,
  isSolved,
  shuffle,
  isSwapPossible,
} from './utils';
import {
  GAME_FIELD_HEIGHT,
  GAME_FIELD_WIDTH,
  EMPTY_CELL_VALUE,
} from '../../../constants';

const state = {
  grid: generateField({
    height: GAME_FIELD_HEIGHT,
    width: GAME_FIELD_WIDTH,
  }),
};

const getters = {
  grid: state => state.grid,
  isSolved: state => isSolved(state.grid),
};

const mutations = {
  reset(state) {
    state.grid = fillWithInitialData(state.grid);
  },

  shuffle(state) {
    state.grid = shuffle(state.grid);
  },

  swapPoints(state, { point1, point2 }) {
    state.grid = swapPoints(point1, point2, state.grid);
  },
};

const actions = {
  reset: ({ commit }) => commit('reset'),
  shuffle: ({ commit }) => commit('shuffle'),

  tryToMoveTileByPoint({ commit, state }, clickedPoint) {
    const emptyCellPoint = findPointByValue(EMPTY_CELL_VALUE, state.grid);
    if (!isSwapPossible(state.grid, clickedPoint, emptyCellPoint)) return false;
    commit('swapPoints', { point1: emptyCellPoint, point2: clickedPoint });
    return true;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
