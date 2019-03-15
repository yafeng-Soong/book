import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions'

Vue.use(Vuex);

const state = {
  userInfo: {},
  session: '',
  baseUrl: 'http://132.232.89.108:8082'
}

const mutations = {
  SET_USERINFO: (state, payload) => {
    sessionStorage.setItem("currentUser",JSON.stringify(payload))
    state.userInfo = payload
  },
  SET_SESSION: (state, payload) => {
    state.session = payload;
    sessionStorage.setItem('user', payload);
  }
}

const getters = {
  getSession: (state) => {
    if(!state.session){
      state.session = sessionStorage.getItem('user')
    }
    return state.session
  },
  getCurrentUser: (state) => {
    if (sessionStorage.getItem("currentUser"))
      state.userInfo = JSON.parse(sessionStorage.getItem("currentUser"))
    return state.userInfo
  },
  getBaseUrl: state => state.baseUrl
}



const store = new Vuex.Store({
  getters,
  mutations,
  actions,
  state
})

export default store
