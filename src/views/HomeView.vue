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
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

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
      slides: [
        { id: "1", title: "Vue 3 Introduction", content: "VueJS is a library" },
        { id: "2", title: "Vue 3 Components", content: "Know the components" },
        {
          id: "3",
          title: "Vue 3 Conditional",
          content: "Rendering Conditionally",
        },
        { id: "4", title: "Vue 3 Reactivity", content: "VueJS is Reactive" },
        {
          id: "5",
          title: "Vue 3 Compute",
          content: "VueJS uses computed properties",
        },
      ],
      // breakpoints are mobile first
      // any settings not specified will fallback to the carousel settings
    };
  },
  methods: {
    slideTo(val) {
      this.currentSlide = val;
    },
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
    Carousel,
    Slide,
    Pagination,
    Navigation,
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
    <section class="py-4 w-full grid grid-cols-[700px_2fr] gap-1">
      <div class="h-full">
        <Carousel :wrap-around="true" :items-to-show="1">
          <!-- v-for="(slide, index) in blogPosts" :key="slide" -->
          <Slide v-for="(slide, index) in blogPosts" :key="index">
            <div class="w-full">
              <div class="flex flex-col mx-auto justify-end">
                <div class="w-full h-[600px]">
                  <img
                    :src="slide.mainImage"
                    class="object-cover h-full w-full "
                    alt=""
                  />
                </div>
                <div class="">
                  <h1 class="font-bold text-2xl w-max font-serifFamily capitalize">
                    {{ slide.title }}
                  </h1>
                  <p class="flex items-center gap-2 text-[#919094] text-lg">
                    by {{ slide.author }}
                  </p>
                </div>
                <div class="flex space-x-2 hidden justify-center p-3">
                  <p class="h-2 w-2 rounded-full bg-[#668AFF]"></p>
                  <p class="h-2 w-2 bg-[#FEFBFF] rounded-full"></p>
                  <p class="h-2 w-2 bg-[#FEFBFF] rounded-full"></p>
                  <p class="h-2 w-2 bg-[#FEFBFF] rounded-full"></p>
                </div>
              </div>
            </div>
          </Slide>
          <template #addons>
            <Navigation />
            <Pagination />
          </template>
        </Carousel>
      </div>
      <div class="hidden lg:block" v-if="editorPosts">
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
<style>
.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>
