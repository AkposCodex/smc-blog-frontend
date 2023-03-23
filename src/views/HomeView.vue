<script>
import Placeholder from "../components/BlogPost.vue";
import PriceMarqueeWidget from "../components/PriceMarqueeWidget.vue";
import BlogCardList from "../components/BlogCardList.vue";
import { useDark, useToggle } from "@vueuse/core";
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
import BlogCard from "../components/BlogCard.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseIcon from "../components/BaseIcon.vue";
import { getAPI } from "../axios";

const isDark = useDark();

export default {
  data() {
    return {
      blogPosts: null,
      typedPosts: null,
      editorPosts: null,
      fall: false,
      count: 1,
      loading: true,
      isMobile: false,
      isDark: isDark,
    };
  },
  methods: {
    async fetchTypedPost(slug, count) {
      await getAPI
        .get("/posts?category=" + slug)
        .then((response) => {
          this.typedPosts = response.data;
        })
        .catch((err) => {});
      this.count = count;
    },
    navigate() {
      switch (this.count) {
        case 1:
          this.$router.push("/eq");
          break;
        case 2:
          this.$router.push("/bc");
          break;
        case 3:
          this.$router.push("/geo");
          break;
        case 4:
          this.$router.push("/eco");
          break;
      }
    },
  },
  async created() {
    this.fetchTypedPost("et", 1);
    await getAPI
      .get("/posts")
      .then((response) => {
        this.blogPosts = response.data;
      })
      .catch((err) => {});

    await getAPI
      .get("/posts?editor=True")
      .then((response) => {
        this.editorPosts = response.data;
      })
      .catch((err) => {});
  },
  components: {
    Placeholder,
    PriceMarqueeWidget,
    BlogCardList,
    BlogCard,
    BaseButton,
    BaseIcon,
    AppHeader,
    AppFooter,
  },
};
</script>

<template>
  <head>
    <title>SMC DESK | HOME</title>
  </head>
  <AppHeader></AppHeader>

  <header class="pb-4 capitalize">
    <div class="h-max" id="stats">
      <PriceMarqueeWidget class="dark:text-black" />
    </div>
  </header>
  <main
    class="max-w-4xl mx-auto"
    :class="{ 'overflow-hidden max-h-[100vh]': isMobile }"
  >
    <section class="py-4 px-6 w-full md:grid md:grid-cols-[1fr_180px] gap-10">
      <router-link :to="`/post/${blogPosts[0].slug}`">
        <div class="flex flex-col mx-auto justify-end">
          <div class="">
            <img
              :src="blogPosts[0].mainImage"
              class="object-contain w-full z-0"
              alt=""
            />
          </div>
          <div class="">
            <h1 class="font-bold text-2xl font-serifFamily capitalize">
              {{ blogPosts[0].title }}
            </h1>
            <p class="flex items-center gap-2 text-[#919094] text-[10px]">
              by {{ blogPosts[0].author }}
            </p>
          </div>
          <div class="flex space-x-2 hidden justify-center p-3">
            <p class="h-2 w-2 rounded-full bg-[#668AFF]"></p>
            <p class="h-2 w-2 bg-[#FEFBFF] rounded-full"></p>
            <p class="h-2 w-2 bg-[#FEFBFF] rounded-full"></p>
            <p class="h-2 w-2 bg-[#FEFBFF] rounded-full"></p>
          </div>
        </div>
      </router-link>
      <div class="hidden lg:block">
        <BlogCard v-if="editorPosts[0]" :post="editorPosts[0]" md-shrink />
        <BlogCard v-if="editorPosts[1]" :post="editorPosts[1]" md-shrink />
      </div>
    </section>
    <section class="py-4 w-full">
      <div
        class="flex items-center justify-between mb-8 border-t border-b dark:border-white border-black p-2"
      >
        <h2 class="text-xl font-bold text-left">Editor's Posts</h2>
      </div>
      <div class="px-5">
        <BlogCardList v-if="editorPosts" :posts="editorPosts" />
      </div>
    </section>

    <section class="mt-16 py-4 w-full">
      <nav
        class="flex gap-4 py-2 mx-5 mb-8 border-b border-black dark:border-white overflow-y-auto scrollbar-hide"
      >
        <button
          @click="fetchTypedPost('et', 1)"
          :class="{
            'text-blue-700 ': count == 1,
          }"
          class="font-bold"
        >
          Equity
        </button>
        <button
          @click="fetchTypedPost('bc', 2)"
          :class="{
            'text-blue-700 ': count == 2,
          }"
          class="font-bold"
        >
          Blockchain
        </button>
        <button
          @click="fetchTypedPost('ge', 3)"
          :class="{
            'text-blue-700 ': count == 3,
          }"
          class="font-bold"
        >
          Geopolitical
        </button>
        <button
          @click="fetchTypedPost('ec', 4)"
          :class="{
            'text-blue-700 ': count == 4,
          }"
          class="font-bold"
        >
          Economic
        </button>
      </nav>
      <div class="px-5">
        <BlogCardList
          v-if="typedPosts"
          :posts="typedPosts"
          variant="secondary"
        />
        <button
          @click="navigate"
          class="block mx-auto p-3 text-xs mt-6 font-semibold bg-black text-white"
        >
          Show more stories
        </button>
      </div>
    </section>
  </main>
  <AppFooter />
</template>
