<template>
  <section class="" id="drafts">
    <p class="text-xl font-bold p-5">Drafts</p>
    <div class="bg-gray-100 p-5">
      <div
        v-for="(post, index) in drafts"
        :key="index"
        class="flex flex-col lg:flex-row bg-white rounded-xl p-5 mb-6 gap-4 lg:h-[20vh] items-end lg:flex-row-reverse"
      >
        <div
          v-if="post.mainImage"
          class="sm:h-[12rem] h-[8rem] lg:h-full w-full lg:w-[50%]"
        >
          <img
            :src="post.mainImage"
            alt="blog post"
            class="lg:w-4/5 w-full rounded-lg h-full object-cover"
          />
        </div>
        <div class="lg:w-[50%] w-full">
          <div class="mb-5">
            <h3 class="font-bold font-baseFamily uppercase leading-5">
              {{ post.title }}
            </h3>
            <h3
              class="font-serifFamily text-gray-500 text-[11px] mb-3 leading-5"
            >
              {{
                new Date(post.publishedAt)
                  .toString()
                  .replace("GMT+0100 (West Africa Standard Time)", " ")
                  .trim()
              }}
            </h3>
            <p class="text-xs leading-4">
              {{ post.summary }}
            </p>
          </div>
          <div class="grid grid-cols-2 hidden gap-4 w-4/5">
            <button class="bg-black rounded-md text-white px-3 py-1">
              Post
            </button>
            <button class="bg-white rounded-md border border-black px-3 py-1">
              Edit
            </button>
          </div>
        </div>
      </div>
      <!-- <div class="w-full flex justify-center items-center h-[50vh]" v-else>
            <h1 class="font-bold text-black text-2xl">No Drafts</h1>
          </div> -->
    </div>
  </section>
</template>

<script>
import { getAPI } from "../axios";
import { mapGetters } from "vuex";

export default {
  setup() {
    return {};
  },
  data() {
    return {
      drafts: [],
    };
  },
  computed: mapGetters({
    user: "getUserState",
  }),
  methods: {
    async loadDraftPosts() {
      await getAPI.get(`/post/review?state=InReview`).then((response) => {
        let res = response.data.results;
        let count = response.data.count;
        // console.log(res, count);
        while (count > 0) {
          getAPI.get(`/posts/${res[count - 1].post}`).then((r) => {
            let res = r.data;
            // console.log(res);
            if (res.author === this.user.slug) {
              this.drafts.push(res);
            }
          });
          // console.log(this.drafts);
          count--;
        }
      });
    },
    async loadAdminPosts() {
      let result;
      await getAPI.get(`/post/review`).then(async (response) => {
        result = response.data.results;
        console.log(result);
        let count = response.data.count;
        while (count > 0) {
          await getAPI
            .get(`/posts/${result[count - 1].post}`)
            .then((r) => {
              let res = r.data;
              let pos = count;
              // this.reviewPosts.push(res);
              this.reviewPosts.push({
                id: result[0].id,
                title: res.title,
                slug: res.slug,
                picked: res.picked,
                publishedAt: res.publishedAt,
                summary: res.summary,
                body: res.body,
                mainImage: res.mainImage,
                categories: res.categories,
                author: res.author,
                review: result[pos].review,
              });
            })
            .then(count--);
        }
      });
    },
  },
  async created() {
    this.reviewPosts = [];
    this.loadDraftPosts();
    this.loadAdminPosts();
    console.log(
      "userModule/drafts: " + this.user.drafts,
      "AdminProfile/drafts: " + this.drafts
    );
  },
};
</script>

<style scoped></style>
