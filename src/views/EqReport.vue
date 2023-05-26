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
      blogPosts: [],
      fall: false,
      loading: true,
      isMobile: false,
    };
  },
  components: {
    Placeholder,
    PriceMarqueeWidget,
    BlogCardList,
    AppHeader,
    AppFooter,
  },
  async created() {
    await getAPI
      .get("/posts?category=equity")
      .then((response) => {
        console.log(response);
        response.data.results.forEach(async (e) => {
          console.log(e);
          let repo = e;
          if (e.author === "sir-mapy") {
            await getAPI.get(`/users/${e.author}`).then((response) => {
              console.log(response.data.name);
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
              // console.log(this.blogPosts);
            });
          } else {
            await getAPI.get(`/users/${e.author}`).then((response) => {
              console.log(response.data);
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
                authmg: response.data.image,
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

<template>
  <AppHeader></AppHeader>
  <main class="pb-6 mb-20 font-baseFamily mx-auto">
    <section class="p-4 w-full mb-12">
      <p class="pb-8 text-2xl font-bold text-center">Equity Reports</p>
      <div
        class="font-baseFamily text-center font-bold text-4xl mt-32 mb-32"
        v-if="!blogPosts || !blogPosts.length"
      >
        <h1>No New Posts Here</h1>
      </div>
      <template v-else>
        <div class="w-full mb-20">
          <div
            class="md:grid md:grid-cols-2 flex flex-col grid-cols-1 mx-auto justify-end rounded-[15px] z-50 border border-[1px] border-[#111111] dark:border-white/30"
          >
            <div class="w-full lg:h-[400px] h-[400px] rounded-l-[14px]">
              <img
                :src="blogPosts[0].mainImage"
                class="object-cover h-full w-full rounded-l-[14px] -z-20"
                alt=""
              />
            </div>
            <div class="p-10">
              <h1
                class="font-bold text-2xl w-full mb-1 font-baseFamily capitalize"
              >
                {{ blogPosts[0].title }}
              </h1>
              <h1
                class="text-lg text-gray-500 w-full mb-12 font-baseFamily capitalize"
              >
                {{ blogPosts[0].summary }}
              </h1>
              <div class="flex w-full justify-start">
                <button
                  @click="
                    this.$router.push({
                      name: 'post',
                      params: { slug: blogPosts[0].slug },
                    })
                  "
                  class="text-black bg-transparent rounded-lg p-2 border border-2 border-[#111111]"
                >
                  Read More &rangle;
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          class="grid lg:grid-cols-3 max-w-2xl mx-auto w-full grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div class="" v-for="post in blogPosts">
            <div class="h-[200px] w-full">
              <img
                :src="post.mainImage"
                alt="blog post"
                class="w-full rounded-md h-full object-cover"
              />
            </div>
            <div
              class="flex items-center w-full text-[#919094] gap-2 pt-3 px-2 text-xxs mb-2"
            >
              <figure class="h-[16px] w-[16px]">
                <img
                  :src="post.authmg"
                  alt="author image"
                  class="w-full h-full object-cover rounded-full"
                />
              </figure>
              <p
                class="text-black font-bold w-full capitalize flex justify-between"
              >
                by {{ post.author }}
                <span class="text-black/40">{{
                  new Date(post.publishedAt)
                    .toLocaleString()
                    // .replace("GMT+0100 (West Africa Standard Time)", " ")
                    .trim()
                }}</span>
              </p>
            </div>
            <h1
              class="font-bold text-lg w-full mb-1 font-baseFamily capitalize"
            >
              {{ post.title }}
            </h1>
            <h1
              class="text-md text-gray-700 w-full mb-4 font-baseFamily capitalize"
            >
              {{ post.summary }}
            </h1>

            <div class="flex w-full justify-start">
              <button
                @click="
                  this.$router.push({
                    name: 'post',
                    params: { slug: post.slug },
                  })
                "
                class="text-black bg-transparent rounded-[2px] p-1 mt-2 border border-[1px] border-[#111111]"
              >
                Read More &rangle;
              </button>
            </div>
          </div>
        </div>
      </template>
    </section>
  </main>
  <AppFooter />
</template>
