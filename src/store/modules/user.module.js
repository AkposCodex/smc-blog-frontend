import { getAPI } from "../../axios";

const getInitialState = () => {
  return {
    user: {
      slug: "",
      profileImage: "",
      bio: "",
      name: "",
      email: "",
      posts: [],
      isLoggedIn: false,
    },
  };
};
const state = getInitialState();

export default {
  namespaced: true,
  state,
  mutations: {
    LOGIN: function (state) {
      state.user.isLoggedIn = true;
    },

    UPDATE_USER: function (state, payload) {
      state.user.name = payload.username;
      state.user.profileImage = payload.image;
      state.user.bio = payload.bio;
      state.user.slug = payload.slug;
      state.user.email = payload.email;
    },

    CREATE_POST: function (state, payload) {},

    LOAD_POST: function (state, payload) {
      state.user.posts = payload;
    },

    LOGOUT: function (state) {
      state.user.isLoggedIn = false;
      Object.assign(state, getInitialState());
    },
  },
  actions: {
    async login({ commit, dispatch }, payload) {
      let req = {
        username: payload.username,
        password: payload.password,
      };
      try {
        response = await getAPI
          .post("api/auth/token/login/", req)
          .then(async (response) => {
            await getAPI
              .get(`/users?email=${payload.username}`)
              .then((response) => {
                console.log(response);
                dispatch("updateUser", response.data[0]).then(commit("LOGIN"));
                dispatch("loadPosts", response.data[0].slug);
                return response;
                // this.$router.push({ path: "profile/" + state.user.slug });
              })
              .catch((err) => {});
          })
          .catch((err) => {});
      } catch {}
    },

    async updateUser({ commit, dispatch }, payload) {
      commit("UPDATE_USER", payload);
    },

    async createPost({ commit, dispatch }, payload) {
      await getAPI
        .post("/posts", payload.formData, {
          headers: {
            Authorization: `token 6e8cf68a4fc854801686530dcd0ec256e39a9e43`,
            "Content-Type": `multipart/form-data; boundary=${payload._boundary}`,
          },
        })
        .then((response) => {
          dispatch("loadPosts", payload.slug);
          //   this.success = true;
          //   this.$router.go();
        })
        .catch((err) => {});
    },

    async loadPosts({ commit, dispatch }, payload) {
      getAPI
        .get("/posts?user=" + payload)
        .then((response) => {
          console.log(payload, response);
          commit("LOAD_POST", response.data);
          //   this.blogPosts = response.data;
        })
        .catch((err) => {});
    },

    logout({ commit }) {
      return commit("LOGOUT");
    },
  },
  getters: {},
};