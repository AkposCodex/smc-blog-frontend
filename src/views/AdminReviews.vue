<template>
  <section class="" id="review">
    <p class="text-xl font-bold p-5">Pending Posts</p>
    <div class="dark:bg-transparent p-5" v-if="reviewPosts.length > 0">
      <div
        v-for="post in reviewPosts"
        checked=" &checkmark;"
        unchecked=" &excl;"
        :class="{
          approved: post.review === `Approved`,
          disapproved: post.review === `InReview` || post.review === `Rejected`,
        }"
        :key="post.slug"
        class="flex flex-col relative lg:flex-row bg-white shadow-md rounded-xl p-5 mb-6 gap-6 items-end"
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
          <div class="">
            <div class="">
              <h3
                class="font-bold flex flex-col w-max text-black font-baseFamily uppercase leading-5"
              >
                {{ post.title }}
                <span
                  ><p class="capitalize text-sm text-black/40">
                    by {{ post.author }}
                  </p></span
                >
              </h3>
            </div>
            <div class="flex w-full justify-between my-2 items-center">
              <h3 class="text-black font-bold text-xs leading-5">
                {{
                  new Date(post.publishedAt)
                    .toString()
                    .replace("GMT+0100 (West Africa Standard Time)", " ")
                    .trim()
                }}
              </h3>
              <h3 class="bg-stone-600 font-bold p-2 text-md text-white h-min">
                {{ post.review }}
              </h3>
            </div>
            <div class="mt-5">
              <a
                :href="`/post/${post.slug}`"
                class="font-baseFamily bg-black text-white p-2 font-bold text-sm leading-5"
              >
                Go to preview &rangle;
              </a>
            </div>
            <hr class="mb-3 border-0" />
            <p class="leading-4 text-black">
              {{ post.summary }}
            </p>
          </div>
          <div class="flex mt-12 gap-4 w-4/5">
            <button
              @click="
                review({ id: post.id, slug: post.slug, review: `Approved` })
              "
              class="bg-white border-2 border-green-600 text-green-600 px-3 py-1"
            >
              Approve
            </button>
            <button
              @click="
                review({ id: post.id, slug: post.slug, review: `Rejected` })
              "
              class="bg-white border-black border-2 text-black px-3 py-1"
            >
              Reject
            </button>
            <button
              @click="deletePost({ slug: post.slug })"
              class="bg-white border-red-600 border-2 text-red-600 px-3 py-1"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-center items-center h-[50vh]" v-else>
      <h1 class="font-bold text-black text-2xl">No Drafts</h1>
    </div>
  </section>
</template>

<script>
import { getAPI } from "../axios";

export default {
  data() {
    return {
      reviewPosts: [],
    };
  },
  methods: {
    async review(e) {
      await getAPI
        .patch(`/post/review/${e.id}`, {
          post: e.slug,
          review: e.review,
        })
        .then(() => {
          this.$router.go();
        })
        .catch((e) => {
          console.error(e);
        });
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
    this.loadAdminPosts();
  },
};
</script>

<style scoped>
.approved::before {
  position: absolute;
  top: 0%;
  left: -1%;
  content: "" attr(checked) "";
  border-radius: 50%;
  background-color: #29a247;
  color: white;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.disapproved::before {
  position: absolute;
  top: 0%;
  left: -1%;
  content: "" attr(unchecked) "";
  border-radius: 50%;
  background-color: rgb(204, 47, 47);
  color: white;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
