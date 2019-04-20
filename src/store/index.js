import Vue from 'vue';
import Vuex from 'vuex';

import gameField from './modules/game-field';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    gameField,
  },
});
