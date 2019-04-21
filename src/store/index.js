import Vue from 'vue';
import Vuex from 'vuex';

import gameField from './modules/game-field';
import moves from './modules/moves';
import game from './modules/game';
import timer from './modules/timer';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    gameField,
    moves,
    game,
    timer,
  },
});
