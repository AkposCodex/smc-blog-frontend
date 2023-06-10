//could become an app config file

const getInitialState = () => {
  return {
    app: {
      token: true,
    },
  };
};

export default {
  state: getInitialState(),
  namespaced: true,
  mutations: {
    MARK_APP: function (state) {
      state.app.token = false;
    },
  },
  actions: {
    markApp({ commit, dispatch }) {
      commit("MARK_APP");
    },
  },
};
