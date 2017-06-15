import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    showTabbar:true,
    headTitle: '',
    hasBack: ''
  },
  actions: {  

  },
  mutations: {
    SET_SHOWTABBAR:(state,bool) => {
      state.showTabbar = bool;
    },
    SET_PATH:(state,data) => {
      state.headTitle = data.headTitle;
      state.hasBack = data.hasBack;
      console.log(data);
    }
  },
  getters: {

  }
})
export default store