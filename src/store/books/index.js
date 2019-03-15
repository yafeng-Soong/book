import Vue from 'vue';
import Vuex from 'vuex';
import actions from "../actions";

Vue.use(Vuex);

const state = {
  bookId: 0
}

const mutations = {
  SET_SESSION: (state, payload) => {
    state.session = payload;
    sessionStorage.setItem('user', payload);
  }
}

const getters = {
  getBaseUrl: state => state.bookId
}



const store = new Vuex.Store({
  getters,
  mutations,
  actions,
  state
})

export default store
