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
import { Carousel, Slide, Pagination } from "vue3-carousel";
import UpdatesCard from "../components/UpdatesCard.vue";

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
    this.loading = true;
    await getAPI
      .get("/post/review?state=Approved")
      .then((response) => {
        console.log(response.data.results.length);
        if (response.data.results.length === 0) this.loading = false;
        response.data.results.forEach(async (e) => {
          console.log(e);
          let repo = e;
          await getAPI.get(`posts/${e.post}`).then(async (e) => {
            let repo = e.data;
            console.log(repo.author, repo);
            if (repo.author === "sir-mapy") {
              await getAPI.get(`/users/${repo.author}`).then((response) => {
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
                this.loading = true;
              });
            } else {
              await getAPI.get(`/users/${repo.author}`).then((response) => {
                // console.log(email, response.data[0].name);
                console.log(response);
                this.blogPosts.push({
                  title: repo.title,
                  slug: repo.slug,
                  picked: repo.picked,
                  publishedAt: repo.publishedAt,
                  summary: repo.summary,
                  body: repo.body,
                  mainImage: repo.mainImage,
                  categories: repo.categories,
                  author: response.data.name,
                });
                this.loading = false;
                console.log(response);
                console.log(this.blogPosts);
              });
            }
          });
        });
      })
      .catch((err) => {});

    // await getAPI
    //   .get("/posts")
    //   .then((response) => {
    //     console.log(response);
    //     response.data.results.forEach(async (e) => {
    //       console.log(e);
    //       let repo = e;
    //       if (e.author === "sir-mapy") {
    //         await getAPI.get(`/users?slug=${e.author}`).then((response) => {
    //           // console.log(email, response.data[0].name);
    //           this.blogPosts.push({
    //             title: repo.title,
    //             slug: repo.slug,
    //             picked: repo.picked,
    //             publishedAt: repo.publishedAt,
    //             summary: repo.summary,
    //             body: repo.body,
    //             mainImage: repo.mainImage,
    //             categories: repo.categories,
    //             author: response.data[0].name,
    //           });
    //           // console.log(this.blogPosts);
    //         });
    //       } else {
    //         await getAPI.get(`/users?slug=${e.author}`).then((response) => {
    //           // console.log(email, response.data[0].name);
    //           this.blogPosts.push({
    //             title: repo.title,
    //             slug: repo.slug,
    //             picked: repo.picked,
    //             publishedAt: repo.publishedAt,
    //             summary: repo.summary,
    //             body: repo.body,
    //             mainImage: repo.mainImage,
    //             categories: repo.categories,
    //             author: response.data[0].name,
    //           });
    //           console.log(response);
    //           console.log(this.blogPosts);
    //         });
    //       }
    //     });
    //   })
    //   .catch((err) => {});

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
    UpdatesCard,
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
      <div class="h-max max-w-5xl w-full mx-auto">
        <!-- <h2 class="md:text-6xl text-3xl font-bold text-center">Hot Topics</h2> -->
        <Carousel
          snap-align="center"
          :wrap-around="true"
          :items-to-show="1"
          :autoplay="7000"
          v-if="blogPosts.length > 0"
        >
          <!-- v-for="(slide, index) in blogPosts" :key="slide" -->
          <Slide v-for="(slide, index) in blogPosts" :key="index">
            <div class="w-11/12">
              <div
                class="md:grid md:grid-cols-2 flex flex-col grid-cols-1 mx-auto justify-end rounded-lg z-50 border border-[#111111] dark:border-white/30"
              >
                <figure
                  class="max-h-72 w-full h-[400px] rounded-lg rounded-b-none md:rounded-tr-none md:rounded-bl-lg md:border-r-0 border-[#111111] dark:border-white/30 overflow-hidden"
                >
                  <img
                    :src="slide.mainImage"
                    class="object-cover h-full w-full"
                    alt=""
                  />
                </figure>
                <div class="p-5">
                  <p
                    class="bg-black rounded-sm capitalize p-1 mb-3 w-min text-white text-sm"
                  >
                    {{ slide.categories }}
                  </p>
                  <h1
                    class="font-semibold text-2xl md:text-3xl text-left w-full mb-1 font-baseFamily capitalize"
                  >
                    {{ slide.title }}
                  </h1>
                  <h1
                    class="hidden md:block text-base text-left w-full mb-12 text-[#11111186] dark:text-white/30"
                  >
                    {{ slide.summary }}
                  </h1>
                  <div class="flex w-full justify-start">
                    <button
                      @click="
                        this.$router.push({
                          name: 'post',
                          params: { slug: slide.slug },
                        })
                      "
                      class="mt-6 flex items-center bg-transparent rounded-[4px] p-2 border text-sm border-[#111111] dark:border-white/30"
                    >
                      <span>Read More</span>
                      <BaseIcon name="chevron-right" class="w-auto" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Slide>
          <template #addons>
            <Pagination />
          </template>
        </Carousel>
        <div class="" v-else>
          <div
            class="font-baseFamily text-center font-bold text-2xl mt-32 mb-32"
          >
            <h3>No New Posts</h3>
          </div>
        </div>
        <div class="w-100% mx-auto">
          <free-style-shimmer
            :is-loading="loading"
            height="400px"
            width="100%"
            color="#bdbdbd"
          />
        </div>
      </div>
    </section>
    <section class="mb-12 px-5" id="latest-posts">
      <div class="max-w-4xl mx-auto">
        <div
          class="flex items-center md:w-4/5 md:mx-auto border-[#111111] justify-between mb-8 p-2"
        >
          <h2 class="text-xl">Latest Updates</h2>
          <RouterLink to="latest" class="flex font-semibold">
            <span>All</span>
            <BaseIcon name="arrow-right" class="ml-2" />
          </RouterLink>
        </div>
        <div
          class="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-6"
          v-if="blogPosts.length > 0"
        >
          <template v-for="post in blogPosts" :key="post.slug">
            <UpdatesCard :post="post" />
          </template>
        </div>
        <div class="" v-else>
          <div
            class="font-baseFamily text-center font-bold text-2xl mt-32 mb-32"
          >
            <h3>No New Posts</h3>
          </div>
        </div>
        <div
          class="grid md:grid-cols-2 grid-rows-2 w-full gap-4 justify-center items-center"
        >
          <card-shimmer :is-loading="loading" />
          <card-shimmer :is-loading="loading" />
          <card-shimmer :is-loading="loading" />
        </div>
      </div>
    </section>
    <section
      class="bg-gradient-to-b from-black to-black/40 px-5"
      id="video-posts"
    >
      <div class="max-w-4xl mx-auto pb-10">
        <div
          class="flex items-center text-white md:w-4/5 md:mx-auto border-[#111111] justify-between pt-5 mb-8 p-2"
        >
          <h2 class="text-xl">Video Headlines</h2>
          <RouterLink to="videos" class="flex font-semibold">
            <span>All</span>
            <BaseIcon name="arrow-right" class="ml-2" />
          </RouterLink>
        </div>
        <div
          class="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-6"
          v-if="blogPosts.length > 0"
        >
          <RouterLink
            :to="`post/${post.slug}`"
            class="bg-white rounded-md"
            v-for="post in blogPosts"
            :key="post.slug"
          >
            <div class="h-[160px] w-full">
              <img
                :src="post.mainImage"
                alt="blog post"
                class="w-full rounded-t-md h-full object-cover"
              />
            </div>
            <div class="p-3">
              <p
                class="bg-black capitalize p-1 my-1 w-min text-white text-sm rounded-sm"
              >
                {{ post.categories }}
              </p>
              <h1 class="text-black w-max">
                {{ post.title }}
              </h1>
            </div>
          </RouterLink>
        </div>
        <template v-else>
          <div
            class="font-baseFamily text-center text-white font-bold text-2xl mt-32 mb-32"
          >
            <h3>No New Posts</h3>
          </div>
        </template>
        <div
          class="grid md:grid-cols-2 grid-rows-2 w-full gap-4 justify-center items-center"
        >
          <card-shimmer :is-loading="!blogPosts" />
          <card-shimmer :is-loading="!blogPosts" />
          <card-shimmer :is-loading="!blogPosts" />
        </div>
      </div>
    </section>
    <section id="all-posts" class="mt-16 py-4 px-6 md:px-20 w-full">
      <nav
        class="flex gap-4 mb-8 md:border-b border-black dark:border-white overflow-y-auto scrollbar-hide mx-auto md:w-4/5"
      >
        <button
          @click="fetchTypedPost('equity', 1)"
          :class="{
            'text-blue-700 font-semibold after:h-1 after:w-full relative after:absolute after:bg-blue-700 after:bottom-0 after:left-0':
              count == 1,
          }"
          class="py-2"
        >
          Equity
        </button>
        <button
          @click="fetchTypedPost('blockchain', 2)"
          :class="{
            'text-blue-700 font-semibold after:h-1 after:w-full relative after:absolute after:bg-blue-700 after:bottom-0 after:left-0':
              count == 2,
          }"
          class="py-2"
        >
          Blockchain
        </button>
        <button
          @click="fetchTypedPost('geopolitics', 3)"
          :class="{
            'text-blue-700 font-semibold after:h-1 after:w-full relative after:absolute after:bg-blue-700 after:bottom-0 after:left-0':
              count == 3,
          }"
          class="py-2"
        >
          Geopolitical
        </button>
        <button
          @click="fetchTypedPost('economic', 4)"
          :class="{
            'text-blue-700 font-semibold after:h-1 after:w-full relative after:absolute after:bg-blue-700 after:bottom-0 after:left-0':
              count == 4,
          }"
          class="py-2"
        >
          Economics
        </button>
      </nav>
      <div class="px-5">
        <BlogCardList v-if="typedPosts" :posts="typedPosts" />

        <div
          class="grid md:grid-cols-2 grid-cols-1 md:grid-rows-2 w-full gap-4 justify-center items-center"
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
      <div class="mb-3 p-2 border-[#111111]">
        <h2 class="text-xl font-bold text-left">Editor's Posts</h2>
        <p>Post specially curated by our editors</p>
      </div>
      <div class="px-5">
        <BlogCardList v-if="editorPosts" :posts="editorPosts" />
        <div
          class="grid md:grid-cols-2 grid-cols-1 md:grid-rows-2 w-full gap-4 justify-center items-center"
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
  /* align-items: center; */
}

.carousel__slide {
  /* padding: 10px; */
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
/* .dark .carousel__pagination-button--active::after {
  background-color: blue;
} */
.carousel__track {
  touch-action: auto;
}
.carousel__pagination {
  gap: 4px;
}
.carousel__pagination-button::after {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #d9d9d9 !important;
}
.carousel__pagination-button--active::after {
  background-color: #000 !important;
  border-radius: 14px;
  width: 33px;
}
</style>
