import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    showTabbar:true,
    headTitle: '',
    hasBack: '',
    accessToken:'',
    avatarUrl:'',
    loginname:'',
    id:''
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
    },
    SET_LOGININFO:(state,data) => {
      state.avatarUrl = data.avatarUrl;
      state.loginname = data.loginname;
      state.accessToken = data.accessToken;
      state.id = data.id;
    }
  },
  getters: {

  }
})
export default store