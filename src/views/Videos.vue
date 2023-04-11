<template>
  <AppHeader></AppHeader>
  <main>
    <section>
      <p class="pb-8 text-2xl font-bold text-center">Video Headlines</p>
    </section>
    <div class="lg:h-full mb-12 h-3/5 w-full mx-auto">
      <Carousel :wrap-around="true" :items-to-show="1">
        <!-- v-for="(slide, index) in blogPosts" :key="slide" -->
        <Slide v-for="(slide, index) in blogPosts" :key="index">
          <div
            class="w-full bg-center lg:h-[400px] flex items-end"
            :style="`background:url(${slide.mainImage});background-size: cover;`"
          >
            <div class="p-10">
              <p class="bg-black capitalize p-1 mb-3 w-min text-white text-xl">
                {{ slide.categories }}
              </p>
              <h1
                class="font-bold text-2xl text-white w-max mb-1 font-baseFamily capitalize"
              >
                {{ slide.title }}
              </h1>
              <h1
                class="text-lg hidden text-gray-300 w-max font-baseFamily capitalize"
              >
                {{ slide.summary }}
              </h1>
              <div class="flex w-full justify-start">
                <button class="text-white bg-transparent rounded-lg p-2">
                  Watch Now &rangle;
                </button>
              </div>
            </div>
          </div>
        </Slide>
        <template #addons>
          <!-- <Navigation /> -->
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
    <!-- <BlogCardList v-if="blogPosts" :posts="blogPosts" variant="secondary" /> -->
    <div
      class="grid md:grid-cols-2 gap-5 md:place-items-stretch px-8 place-items-center"
    >
      <div v-for="(slide, index) in blogPosts" :key="index">
        <div
          class="w-full bg-center lg:h-[400px] flex items-end"
          :style="`background:url(${slide.mainImage});background-size: cover;`"
        >
          <div class="p-4">
            <p class="bg-black capitalize p-1 mb-3 w-min text-white text-xl">
              {{ slide.categories }}
            </p>
            <h1
              class="font-bold text-2xl text-white w-max mb-1 font-baseFamily capitalize"
            >
              {{ slide.title }}
            </h1>
            <h1
              class="text-lg hidden text-gray-300 w-max font-baseFamily capitalize"
            >
              {{ slide.summary }}
            </h1>
            <div class="flex w-full justify-start">
              <button class="text-white bg-transparent rounded-lg p-2">
                Watch Now &rangle;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <AppFooter />
</template>
<script>
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { getAPI } from "../axios";
import BlogCardList from "../components/BlogCardList.vue";

export default {
  data() {
    return {
      blogPosts: [],
    };
  },

  components: {
    AppHeader,
    AppFooter,
    Carousel,
    BlogCardList,
    Slide,
    Pagination,
    Navigation,
  },

  async created() {
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
  },
};
</script>
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
  padding: 0;
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
