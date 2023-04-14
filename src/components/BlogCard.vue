<template>
  <!-- TODO: Refactor dimensions, Fixed Height/Widths, tidy component -->
  <article
    class="dark:text-white text-black flex lg:flex-row flex-col max-w-sm lg:max-w-full w-[100%] p-3 gap-2 items-center"
  >
    <div class="h-[10rem] w-full">
      <img
        :src="post.mainImage"
        alt="blog post"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="w-full">
      <h3 class="font-bold font-baseFamily uppercase mb-1 leading-5">
        {{ post.title }}
      </h3>
      <div
        class="flex items-center w-full text-[#919094] gap-2 pt-3 px-2 text-xxs mb-2"
      >
        <figure class="h-5 w-5">
          <img
            :src="athmg"
            alt="author image"
            class="w-full h-full object-cover rounded-full"
          />
        </figure>
        <p class="font-bold w-full capitalize flex justify-between">
          by {{ ath }}
          <span class="text-black/40 dark:text-white/60">{{
            new Date(post.publishedAt)
              .toLocaleString()
              // .replace("GMT+0100 (West Africa Standard Time)", " ")
              .trim()
          }}</span>
        </p>
      </div>
      <h2 class="text-sm my-3">{{ post.summary }}</h2>
      <button
        class="border-[#111111] border-b dark:border-white/30"
        @click="
          this.$router.push({
            name: 'post',
            params: { slug: post.slug },
          })
        "
      >
        Read More &rangle;
      </button>
    </div>
  </article>
</template>

<script>
import { getAPI } from "../axios";
export default {
  name: "BlogCard",
  data() {
    return {
      localVariable: null,
      ath: null,
      athmg: null,
    };
  },
  props: {
    variant: {
      type: String,
      default: "default", // secondary, default
    },
    mdShrink: {
      type: Boolean,
      default: false,
    },
    post: {
      type: Object,
      required: true,
    },
  },
  created() {
    var vsc = this.post.author;
    getAPI
      .get("/users/" + vsc)
      .then((response) => {
        this.localVariable = response.data;
        this.ath = this.localVariable.name;
        this.athmg = this.localVariable.image;
      })
      .catch((err) => {});
  },
};
</script>

<style scoped></style>
