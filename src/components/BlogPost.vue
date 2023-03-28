<script>
import { useDark } from "@vueuse/core";
import { h } from "vue";
import BlogCardList from "../components/BlogCardList.vue";
import BaseIcon from "./BaseIcon.vue";
import { getAPI } from "../axios";
import AddComment from "../components/AddComment.vue";
import Comment from "../components/Comment.vue";
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";

const isDark = useDark();

export default {
  data() {
    return {
      loading: true,
      isDark: isDark,
      posts: [],
      similarposts: [],
      thsl: this.$route.params.slug.toString(),
      cat: null,
      auth_img: null,
      auth_name: null,
      text: "",
    };
  },
  created() {
    getAPI
      .get("/posts/" + this.thsl)
      .then((response) => {
        this.loading = false;
        this.posts = response.data;
        this.text = this.posts.body;
        this.cat = this.posts.categories;

        getAPI
          .get("/categories/" + this.cat)
          .then((response) => {
            this.cat = response.data.cat_title;
          })
          .catch((err) => {});

        getAPI
          .get("/users/" + this.posts.author)
          .then((response) => {
            this.auth_name = response.data.name;
            this.auth_img = response.data.image;
          })
          .catch((err) => {});

        getAPI
          .get("/posts?category=" + this.cat)
          .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].id == this.posts.id) {
                response.data.splice(i, 1);
                this.similarposts = response.data;
                break;
              }
            }
          })
          .catch((err) => {});
      })
      .catch((err) => {});
  },
  components: {
    BlogCardList,
    BaseIcon,
    AddComment,
    Comment,
    AppHeader,
    AppFooter,
  },
};
</script>
<template>
  <head>
    <title class="capitalize">{{ posts.title }}</title>
  </head>
  <AppHeader></AppHeader>

  <main class="max-w-4xl mx-auto">
    <section class="pb-6 mb-20 font-baseFamily mx-auto">
      <div>
        <div v-if="posts" class="p-5">
          <h1
            class="font-bold bg-blue-600 w-max my-4 uppercase text-white p-2 text-sm text-center"
          >
            {{ cat }}
          </h1>
          <h1
            class="md:text-4xl text-2xl my-10 font-serifFamily capitalize font-bold"
          >
            {{ posts.title }}
          </h1>
          <div class="flex items-center gap-2 my-6">
            <div class="w-8 h-8">
              <img class="w-full h-full rounded-full" v-if="!loading" :src="auth_img" alt="" />
              <free-style-shimmer
                :is-loading="loading"
                height="35px"
                width="35px"
                border-radius="50px"
                color="#bdbdbd"
              />
            </div>
            <div class="text-[#919094] text-xs w-full">
              <h1 class="font-semibold text-sm text-[#a6a2b5]" v-if="!loading">
                by {{ auth_name }}
              </h1>
              <paragraph-shimmer
                :is-loading="loading"
                :lines="1"
                :random-size="true"
              />
              <div class="flex items-center gap-2" v-if="!loading">
                <span>{{ posts.publishedAt }}</span>
                <p class="h-1 w-1 bg-current rounded-full"></p>
                <!-- <span>{{ posts.timeToRead || "15 mins read" }}</span> -->
              </div>
              <paragraph-shimmer
                :is-loading="loading"
                :lines="1"
                :random-size="true"
              />
            </div>
          </div>

          <div class="w-full h-[300px] mb-6">
            <img
              v-if="posts.mainImage"
              class="object-cover w-full h-full my-4"
              :src="posts.mainImage"
            />
            <div class="flex w-full justify-center">
              <free-style-shimmer
                :is-loading="loading"
                height="300px"
                width="90vw"
                color="#bdbdbd"
                class="mx-auto"
              />
            </div>
          </div>

          <div class="">
            <div
              class="flex-nowrap content mx-auto flex flex-col space-y-9 text-lg text-elipsis"
            >
              <div class="text-md" v-html="text"></div>
            </div>
            <paragraph-shimmer
              :is-loading="loading"
              :lines="10"
              :random-size="true"
            />
            <br />
            <div class="border-2 w-3/5 p-6 border-[#E3BADA]">
              <p class="font-bold text-xl uppercase">Key Points</p>
              <h1>{{ posts.summary }}</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center flex justify-center space-x-6 mx-6 mt-10">
        <div class="after:content-[''] h-[3rem] w-6 bg-gray-300"></div>
        <p class="italic">
          <span class="font-bold">Disclaimer: </span>
          All posts and articles are opinions and views of the writers only and
          do not constitute financial or legal advice
        </p>
      </div>
    </section>
    <div class="">
      <p
        class="p-2 mb-8 text-xl font-bold text-left border-t border-b border-black dark:border-white"
      >
        Comments
      </p>
      <div class="md:mx-12 mx-5">
        <div class="comment-space">
          <comment class="message" />
        </div>
        <hr />
        <add-comment />
      </div>
    </div>

    <section class="py-4 w-full">
      <p
        class="p-2 mb-8 text-xl font-bold text-left border-t border-b border-black dark:border-white"
      >
        More Like This
      </p>
      <div class="px-5">
        <BlogCardList v-if="similarposts" :posts="similarposts" />
      </div>
    </section>
  </main>
  <AppFooter />
</template>

<style scoped>
.comment-space {
  font-size: 0.9em;
}

ul,
ol {
  font-size: 1.3rem;
  line-height: 1.75em;
  margin: 1.2em 0;
}
.content {
  align-items: start;
}

.content p {
  text-align: left;
  /* width: fit-content; */
}

.content a {
  text-decoration: underline;
}

main {
  min-height: 100vh;
}
</style>
