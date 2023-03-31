<script>
import Placeholder from "../components/BlogPost.vue";
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
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
    BlogCardList,AppHeader,
    AppFooter,
  },
  created() {
    getAPI
      .get("/posts?category=equity")
      .then((response) => {
        this.loading = false;
        ("");
        this.blogPosts = response.data.results;
      })
      .catch((err) => {});
  },
};
</script>

<template>
  <AppHeader></AppHeader>
  <main class="pb-6 mb-20 font-baseFamily mx-auto">
    <section class="py-4 max-w-2xl mx-auto w-full mb-12">
      <p class="pb-8 text-2xl font-bold text-center">Equity Reports</p>
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
  <AppFooter />
</template>
