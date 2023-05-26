<template>
  <section class="" id="articles">
    <div class="flex md:flex-row flex-col w-full" id="main-header">
      <p class="text-xl font-bold p-5">Your Articles</p>
      <nav
        class="flex flex-row gap-4 p-5 dark:border-white overflow-y-auto scrollbar-hide"
      >
        <button
          @click="showPost('equity')"
          :class="{
            'underline underline-offset-[10px] text-blue-600 decoration-4': et,
          }"
        >
          Equity
        </button>
        <button
          @click="showPost('blockchain')"
          :class="{
            'underline underline-offset-[10px] text-blue-600 decoration-4': bc,
          }"
        >
          Blockchain
        </button>
        <button
          @click="showPost('geopolitics')"
          :class="{
            'underline underline-offset-[10px] text-blue-600 decoration-4': ge,
          }"
        >
          Geopolitical
        </button>
        <button
          @click="showPost('economic')"
          :class="{
            'underline underline-offset-[10px] text-blue-600 decoration-4': ec,
          }"
        >
          Economics
        </button>
      </nav>
    </div>
    <main
      class="dark:bg-inherit bg-gray-100 lg:bg-white p-5 flex flex-col mt-10 gap-10"
    >
      <template v-if="posts && posts.length > 0">
        <div
          v-for="post in posts"
          :key="post.slug"
          class="flex flex-col gap-4 bg-white rounded-xl p-5 mb-6 items-end lg:items-start lg:flex-row-reverse"
        >
          <div
            v-if="post.mainImage"
            class="sm:h-[12rem] h-[8rem] lg:h-60 lg:max-h-56 w-full lg:w-[50%]"
          >
            <img
              :src="post.mainImage"
              alt="blog post"
              class="lg:w-4/5 w-full rounded-lg h-full object-cover"
            />
          </div>
          <div class="lg:w-[50%] w-full">
            <div class="mb-5">
              <h3 class="font-semibold text-black capitalize leading-5">
                {{ post.title }}
              </h3>
              <h3 class="text-gray-500 text-[11px] mt-2 mb-3 leading-5">
                {{ formatDate(post.publishedAt) }}
              </h3>
              <p class="text-sm text-black leading-4">
                {{ post.summary }}
              </p>
            </div>
            <div class="grid grid-cols-2 gap-4 w-4/5 text-sm">
              <RouterLink
                class="text-center block h-full bg-black rounded-md text-white p-3"
                :to="{
                  name: 'post',
                  params: { slug: post.slug },
                }"
              >
                Read More
              </RouterLink>
              <button
                @click="deletePost({ slug: post.slug })"
                class="block bg-white border-red-600 border-2 rounded-md text-red-600 p-3"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </template>
      <div class="w-full flex justify-center items-center h-[50vh]" v-else>
        <h1 class="font-bold text-black text-2xl">No Posts</h1>
      </div>
    </main>
  </section>
</template>

<script>
import { formatDate } from "../helpers/date";
import { mapGetters } from "vuex";
import { getAPI } from "../axios";

export default {
  setup() {
    return {};
  },
  data() {
    return {
      posts: [],
      showBlog: false,
      showDrafts: false,
      showAddPost: true,
      et: true,
      bc: false,
      ge: false,
      ec: false,
    };
  },
  computed: mapGetters({
    user: "getUserState",
  }),
  methods: {
    formatDate,

    async showPost(e) {
      switch (e) {
        case "equity":
          this.ge = false;
          this.bc = false;
          this.ec = false;
          this.et = true;
          break;
        case "blockchain":
          this.ge = false;
          this.et = false;
          this.ec = false;
          this.bc = true;
          break;
        case "geopolitics":
          this.et = false;
          this.bc = false;
          this.ec = false;
          this.ge = true;
          break;
        case "economic":
          this.ge = false;
          this.et = false;
          this.bc = false;
          this.ec = true;
          break;

        default:
          break;
      }
      let res = await this.$store.dispatch("userModule/loadPostsByGenre", {
        slug: this.user.slug,
        category: e,
      });
      this.posts = res;
      // console.log(this.posts);
      // blog;
      this.showBlog = false;
      this.showDrafts = false;
      this.showAddPost = true;
    },
    async deletePost(e) {
      await getAPI
        .delete(`/posts/${e.slug}`)
        .then(() => {
          this.$router.go();
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
  created() {
    this.showPost("equity");
  },
};
</script>

<style scoped></style>
