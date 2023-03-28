import sanityClient from "../../services/sanity";

const getInitialState = () => {
  return {
    post: {
      title: "",
      slug: "",
      picked: true,
      publishedAt: "",
      summary: "",
      body: "",
      mainImage: "",
      categories: "",
      author: "",
    },
  };
};

const state = getInitialState();

export default {
  namespaced: true,
  state,
  mutations: {
    ADD_POST: function (state, payload) {
      state.post.author = payload.data.result.author.name;
      state.post.publishedAt = payload.data.result._createdAt;
      state.post.title = payload.data.result.title;
      state.post.mainImage = payload.data.result.mainImage;
      state.post.body = payload.data.result.body.children.text;
      state.post.slug = payload.data.result.slug;
      state.post.picked = payload.data.result.picked;
      state.post.summary = payload.data.result.summary;
      state.post.categories = payload.data.result.categories;
    },
  },
  actions: {
    async addPost({ commit }, payload) {
      const post = await sanityClient.loadPost(payload).then((response) => {
        commit("ADD_POST", response);
      });
    },
  },
};
