import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    showTabbar:true,
    headTitle: '',
    hasBack: '',
    userInfo:{
      accessToken:'',
      avatarUrl:'',
      loginname:'',
      id:'',
      recent_replies:[],
      recent_topics:[]
    },
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
      state.userInfo.avatarUrl = data.avatarUrl;
      state.userInfo.loginname = data.loginname;
      state.userInfo.accessToken = data.accessToken;
      state.userInfo.id = data.id;
    },
    SET_REPLIES:(state,data) => {
      state.userInfo.recent_replies = data.recent_replies;
      state.userInfo.recent_topics = data.recent_topics;
    }
  },
  getters: {

  }
})
export default store