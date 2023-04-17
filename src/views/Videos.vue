<template>
  <AppHeader></AppHeader>
  <main class="font-baseFamily">
    <section class="md:absolute z-10">
      <h2 class="pb-8 px-8 text-2xl mt-6 font-bold md:text-white">
        Video Headlines
      </h2>
    </section>
    <div class="lg:h-full mb-12 h-3/5 w-full mx-auto">
      <Carousel :wrap-around="true" :items-to-show="1" :autoplay="7000">
        <!-- v-for="(slide, index) in blogPosts" :key="slide" -->
        <Slide v-for="(slide, index) in blogPosts" :key="index">
          <div
            class="w-full bg-center bg-cover lg:max-h-[70vh] lg:h-screen flex items-end h-56"
            :style="`background-image:linear-gradient(360deg, #1B1B1F 14.06%, rgba(0, 0, 0, 0) 50%), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),url(${slide.mainImage})`"
          >
            <div class="p-10">
              <p
                class="bg-black capitalize p-1 mb-3 w-min text-white text-sm rounded-sm"
              >
                {{ slide.categories }}
              </p>
              <h1
                class="font-semibold text-2xl text-white w-max mb-1 font-baseFamily capitalize"
              >
                {{ slide.title }}
              </h1>
              <h1
                class="text-lg hidden text-gray-300 w-max font-baseFamily capitalize"
              >
                {{ slide.summary }}
              </h1>
              <button
                class="text-white bg-transparent rounded-lg flex items-center"
              >
                <BaseIcon name="play_circle" />
                <span>Watch Now</span>
              </button>
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
    <section>
      <h2 class="my-12 text-center font-semibold text-2xl">Latest Headline</h2>
      <div
        class="grid md:grid-cols-2 gap-5 md:place-items-stretch px-8 mb-32 place-items-center"
      >
        <div v-for="(slide, index) in blogPosts" :key="index" class="w-full">
          <div
            class="w-full bg-center bg-cover lg:max-h-[400px] flex items-end h-56"
            :style="`background-image:linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),url(${slide.mainImage});`"
          >
            <div class="p-4">
              <p
                class="bg-black capitalize p-1 mb-3 w-min text-white rounded-[2px] text-xxs md:text-sm"
              >
                {{ slide.categories }}
              </p>
              <h3
                class="font-bold text-sm md:text-base text-white w-max mb-1 font-baseFamily"
              >
                {{ slide.title }}
              </h3>
              <div class="flex w-full justify-start">
                <RouterLink
                  :to="{
                    name: 'post',
                    params: { slug: slide.slug },
                  }"
                  class="text-white bg-transparent rounded-lg flex items-center text-sm md:text-base"
                >
                  <BaseIcon name="play_filled" />
                  <span>Watch Now</span>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <AppFooter />
</template>
<script>
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { getAPI } from "../axios";
import BlogCardList from "../components/BlogCardList.vue";
import BaseIcon from "../components/BaseIcon.vue";

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
    BaseIcon,
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
