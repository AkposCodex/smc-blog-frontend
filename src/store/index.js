import { createStore } from "vuex";
import postModule from "./modules/post.module";
import userModule from "./modules/user.module";
import createPersistedState from "vuex-persistedstate";

// Create a new store instance.
const store = createStore({
  plugins: [createPersistedState()],
  state() {},
  mutations: {},
  modules: {
    postModule,
    userModule,
  },
  getters: {
    getPost(state) {
      return state.postModule.post;
    },
    getUserState(state) {
      return state.userModule.user;
    },
    isLoggedIn(state) {
      return state.userModule.user.isLoggedIn;
    },
  },
});

export default store;
