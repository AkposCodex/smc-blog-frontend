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
      blogPosts: [],
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
          this.typedPosts = response.data.results;
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
    this.fetchTypedPost("equity", 1);

    await getAPI
      .get("/posts")
      .then((response) => {
        console.log(response);
        response.data.results.forEach(async (e) => {
          console.log(e);
          let repo = e;
          if (e.author === "sir-mapy") {
            await getAPI.get(`/users?slug=${e.author}`).then((response) => {
              // console.log(email, response.data[0].name);
              this.blogPosts.push({
                title: repo.title,
                slug: repo.slug,
                picked: repo.picked,
                publishedAt: repo.publishedAt,
                summary: repo.summary,
                body: repo.body,
                mainImage: repo.mainImage,
                categories: repo.categories,
                author: response.data[0].name,
              });
              // console.log(this.blogPosts);
            });
          } else {
            await getAPI.get(`/users?slug=${e.author}`).then((response) => {
              // console.log(email, response.data[0].name);
              this.blogPosts.push({
                title: repo.title,
                slug: repo.slug,
                picked: repo.picked,
                publishedAt: repo.publishedAt,
                summary: repo.summary,
                body: repo.body,
                mainImage: repo.mainImage,
                categories: repo.categories,
                author: response.data[0].name,
              });
              console.log(response);
              console.log(this.blogPosts);
            });
          }
        });
      })
      .catch((err) => {});

    await getAPI
      .get("/posts?editor=True")
      .then((response) => {
        this.editorPosts = response.data.results;
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
  <AppHeader></AppHeader>

  <header class="pb-4 capitalize">
    <div class="h-max" id="stats">
      <PriceMarqueeWidget class="dark:text-black" />
    </div>
  </header>
  <main
    class="mx-auto font-baseFamily"
    :class="{ 'overflow-hidden max-h-[100vh]': isMobile }"
  >
    <section class="py-4 px-5 w-full">
      <div class="lg:h-full md:h-3/5 h-min max-w-5xl w-full mx-auto">
        <Carousel :wrap-around="true" :items-to-show="1">
          <!-- v-for="(slide, index) in blogPosts" :key="slide" -->
          <Slide v-for="(slide, index) in blogPosts" :key="index">
            <div class="w-full">
              <div
                class="grid md:grid-cols-2 grid-rows-2 md:grid-rows-1 grid-cols-1 mx-auto justify-end rounded-[15px] z-50 border border-[1px] border-[#111111]"
              >
                <div class="w-full lg:h-[400px] h-full rounded-l-[14px]">
                  <img
                    :src="slide.mainImage"
                    class="object-cover h-full w-full md:rounded-l-[14px] rounded-t-[14px] -z-20"
                    alt=""
                  />
                </div>
                <div class="p-10">
                  <p
                    class="bg-black capitalize p-1 mb-3 w-min text-white text-xl"
                  >
                    {{ slide.categories }}
                  </p>
                  <h1
                    class="font-bold text-2xl w-max mb-1 font-baseFamily capitalize"
                  >
                    {{ slide.title }}
                  </h1>
                  <h1
                    class="text-lg text-gray-300 w-max mb-12 font-baseFamily capitalize"
                  >
                    {{ slide.summary }}
                  </h1>
                  <div class="flex w-full justify-start">
                    <button
                      @click="
                        this.$router.push({ name: 'post', params: slide.slug })
                      "
                      class="text-black bg-transparent rounded-lg p-2 border border-2 border-[#111111]"
                    >
                      Read More &rangle;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Slide>
          <template #addons>
            <Navigation />
            <Pagination />
          </template>
        </Carousel>
        <div class="w-[400px] mx-auto">
          <free-style-shimmer
            :is-loading="false"
            height="400px"
            width="400px"
            color="#bdbdbd"
          />
        </div>
      </div>
    </section>
    <section class="mb-12 px-5" id="latest-posts">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center w-4/5 mx-auto justify-between mb-8 p-2">
          <h2 class="text-xl font-bold text-left">Latest Updates</h2>
          <div class="flex font-bold">All &Rightarrow;</div>
        </div>
        <div class="grid lg:grid-cols-3 grid-cols-2 gap-6">
          <div class="" v-for="post in blogPosts">
            <div class="h-[200px] w-full">
              <img
                :src="post.mainImage"
                alt="blog post"
                class="w-full rounded-md h-full object-cover"
              />
            </div>
            <p class="bg-black capitalize p-1 my-4 w-min text-white text-xl">
              {{ post.categories }}
            </p>
            <h1 class="font-bold text-xl w-max mb-1 font-baseFamily capitalize">
              {{ post.title }}
            </h1>
            <h1
              class="text-md text-gray-700 w-max mb-4 font-baseFamily capitalize"
            >
              {{ post.summary }}
            </h1>
            <div class="flex gap-4">
              <h1 class="text-xs text-black w-max font-baseFamily capitalize">
                By {{ post.author }}
              </h1>
              <h1
                class="text-xs text-gray-500 w-max font-baseFamily capitalize"
              >
                {{
                  new Date(post.publishedAt)
                    .toString()
                    .replace("GMT+0100 (West Africa Standard Time)", " ")
                    .trim()
                }}
              </h1>
            </div>
            <div class="flex w-full justify-start">
              <button
                class="text-black bg-transparent rounded-[2px] p-1 mt-2 border border-[1px] border-[#111111]"
              >
                Read More &rangle;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section
      class="bg-gradient-to-b from-black to-black/40 px-5"
      id="video-posts"
    >
      <div class="max-w-4xl mx-auto pb-10">
        <div
          class="flex items-center text-white w-4/5 mx-auto justify-between mb-8 p-2"
        >
          <h2 class="text-xl font-bold text-left mt-2">Video Headlines</h2>
          <div class="flex font-bold">All &Rightarrow;</div>
        </div>
        <div class="grid lg:grid-cols-3 grid-cols-2 gap-6">
          <div class="bg-white rounded-md" v-for="post in blogPosts">
            <div class="h-[160px] w-full">
              <img
                :src="post.mainImage"
                alt="blog post"
                class="w-full rounded-t-md h-full object-cover"
              />
            </div>
            <div class="p-3">
              <p class="bg-black capitalize p-1 my-1 w-min text-white text-lg">
                {{ post.categories }}
              </p>
              <h1 class="text-md w-max mb-1 font-baseFamily capitalize">
                {{ post.title }}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="all-posts" class="mt-16 py-4 px-5 w-full">
      <nav
        class="flex gap-4 py-2 mx-5 mb-8 border-b border-black dark:border-white overflow-y-auto scrollbar-hide"
      >
        <button
          @click="fetchTypedPost('equity', 1)"
          :class="{
            'text-blue-700 ': count == 1,
          }"
          class="font-bold"
        >
          Equity
        </button>
        <button
          @click="fetchTypedPost('blockchain', 2)"
          :class="{
            'text-blue-700 ': count == 2,
          }"
          class="font-bold"
        >
          Blockchain
        </button>
        <button
          @click="fetchTypedPost('geopolitics', 3)"
          :class="{
            'text-blue-700 ': count == 3,
          }"
          class="font-bold"
        >
          Geopolitical
        </button>
        <button
          @click="fetchTypedPost('economic', 4)"
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

        <div
          class="grid md:grid-cols-2 grid-rows-2 w-full gap-4 justify-center items-center"
        >
          <card-shimmer :is-loading="!typedPosts" />
          <card-shimmer :is-loading="!typedPosts" />
        </div>
        <button
          @click="navigate"
          class="block mx-auto p-3 text-xs mt-6 font-semibold bg-black text-white"
        >
          Show more stories
        </button>
      </div>
    </section>
    <section id="editor-posts" class="py-4 px-5 w-full">
      <div class="flex items-center justify-between mb-3 p-2">
        <h2 class="text-xl font-bold text-left">Editor's Posts</h2>
      </div>
      <p>Post specially selected by our editors for your</p>
      <div class="px-5">
        <BlogCardList v-if="editorPosts" :posts="editorPosts" />
        <div
          class="grid md:grid-cols-2 grid-rows-2 w-full gap-4 justify-center items-center"
        >
          <card-shimmer :is-loading="!editorPosts" />
          <card-shimmer :is-loading="!editorPosts" />
        </div>
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
  color: black;
}
.dark .carousel__prev {
  box-sizing: content-box;
  color: white;
}
.dark .carousel__next {
  box-sizing: content-box;
  color: white;
}
.dark .carousel__pagination-button--active::after {
  background-color: white;
}
</style>
