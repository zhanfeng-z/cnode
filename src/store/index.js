import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    path: '首页',
    hasBack: false
  },
  actions: {  

  },
  mutations: {
   link (state,payload) {
     console.log(state);
      state.path = payload.path;
      state.hasBack = payload.hasBack;
    }
  },
  getters: {

  }
})
export default store