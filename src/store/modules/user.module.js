import { getAPI } from "../../axios";

const getInitialState = () => {
  return {
    user: {
      slug: "",
      profileImage: null,
      bio: "",
      name: "",
      username: "",
      email: "",
      token: "",
      password: "",
      posts: [],
      roles: [],
      isLoggedIn: false,
      drafts: null,
      isSuper: false,
    },
  };
};
// const state = getInitialState();

export default {
  namespaced: true,
  state: getInitialState(),
  mutations: {
    LOGIN: function (state) {
      console.log("login", state);
      state.user.isLoggedIn = true;
    },

    LOAD_TOKEN: function (state, payload) {
      state.user.token = payload;
    },

    UPDATE_USER: function (state, payload) {
      state.user.name = payload.name;
      state.user.username = payload.username;
      state.user.profileImage = payload.image;
      state.user.bio = payload.bio;
      state.user.slug = payload.slug;
      state.user.email = payload.email;
      state.user.password = payload.password;
      state.user.isSuper = payload.is_superuser;
    },

    LOAD_ROLE: function (state, payload) {
      state.user.roles = payload;
    },

    REVIEW_POST: function (state, payload) {
      state.user.drafts.push(payload);
    },

    CREATE_POST: function (state, payload) {},

    LOAD_POST: function (state, payload) {
      state.user.posts = payload;
    },

    LOGOUT: function (state) {
      state.user.isLoggedIn = false;
      Object.assign(state, getInitialState());
    },

    CREATE_DRAFT: function (state, payload) {
      state.user.drafts = payload;
    },
  },
  actions: {
    async login({ commit, dispatch }, payload) {
      let req = {
        username: payload.username,
        password: payload.password,
      };
      // console.log(req);
      try {
        let response = await getAPI
          .post("api/auth/token/login/", req)
          .then(async (response) => {
            console.log(response);
            let token = response.data.auth_token;
            commit("LOAD_TOKEN", token);
            try {
              await getAPI
                .get(`/users?email=${payload.username}`)
                .then((response) => {
                  const user = response.data[0];
                  dispatch("updateUser", user).then(async (e) => {
                    commit("LOGIN");
                    console.log(user.groups)
                    commit("LOAD_ROLE", user.groups);
                  });
                  dispatch("loadPosts", user.slug);
                  return response;
                  // this.$router.push({ path: "profile/" + state.user.slug });
                });
            } catch (err) {
              throw err;
            }
          })
          .catch((err) => {
            throw err;
          });
      } catch (err) {
        throw err;
      }
    },

    async updateUser({ commit, dispatch }, payload) {
      commit("UPDATE_USER", payload);
    },

    async createPost({ commit, dispatch }, payload) {
      await getAPI
        .post("/posts", payload.formData, {
          headers: {
            Authorization: `token ${payload.auth}`,
            "Content-Type": `multipart/form-data; boundary=${payload._boundary}`,
          },
        })
        .then((response) => {
          console.log(payload.postSlug);
          getAPI.post("/post/review", { post: payload.postSlug }).then((e) => {
            dispatch("loadPosts", payload.slug);
          });
          //   this.success = true;
          //   this.$router.go();
        })
        .catch((err) => {
          throw err;
        });
    },

    async reviewPost({ commit, dispatch }, payload) {
      dispatch("createPost", payload);
    },

    async loadPosts({ commit, dispatch }, payload) {
      getAPI
        .get("/posts?user=" + payload)
        .then((response) => {
          // console.log(payload, response);
          commit("LOAD_POST", response.data.results);
          //   this.blogPosts = response.data;
        })
        .catch((err) => {});
    },

    async loadPostsByGenre({ commit, dispatch }, payload) {
      let res = await getAPI
        .get(`/posts?user=${payload.slug}&category=${payload.category}`)
        .then((response) => {
          // console.log(payload, response);
          return response.data.results;
          //   this.blogPosts = response.data;
        })
        .catch((err) => {});

      return res;
    },

    logout({ commit }) {
      return commit("LOGOUT");
    },

    createDraft({ commit }, payload) {
      console.log(payload);
      return commit("CREATE_DRAFT", payload);
    },
  },
  getters: {},
};
