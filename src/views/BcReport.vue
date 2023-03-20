<script>
import Placeholder from "../components/BlogPost.vue";

import PriceMarqueeWidget from "../components/PriceMarqueeWidget.vue";
import BlogCardList from "../components/BlogCardList.vue";
import { getAPI } from "../axios";

export default {
  name: "Posts",
  data() {
    return {
      blogPosts: null,
      fall: false,
      loading: true,
      isMobile: false,
    };
  },
  components: {
    Placeholder,
    PriceMarqueeWidget,
    BlogCardList,
  },
  created() {
    getAPI
      .get("/posts?category=" + "bc")
      .then((response) => {
        this.loading = false;
        ("");
        this.blogPosts = response.data;
      })
      .catch((err) => {});
  },
};
</script>

<template>
  <head>
    <title>SMC DESK | Blockchain Report</title>
  </head>
  <main class="pb-6 mb-20 font-baseFamily mx-auto">
    <section class="py-4 max-w-4xl mx-auto w-full mb-12">
      <p class="pb-8 text-2xl font-bold text-center">Blockchain Reports</p>
      <div
        class="font-baseFamily text-center font-bold text-4xl mt-32 mb-32"
        v-if="!blogPosts || !blogPosts.length"
      >
        <h1>No New Posts Here</h1>
      </div>
      <template v-else>
        <BlogCardList v-if="blogPosts" :posts="blogPosts" />
      </template>
    </section>
  </main>
</template>
