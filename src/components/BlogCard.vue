<template>
  <!-- TODO: Refactor dimensions, Fixed Height/Widths, tidy component -->
  <article
    class="dark:text-white text-black flex lg:flex-row flex-col max-w-sm lg:max-w-full w-[100%] p-3 gap-2 md:gap-5 items-center border md:border-none rounded-[10px]"
  >
    <div class="h-[10rem] w-full rounded-[5px] overflow-hidden">
      <img
        :src="post.mainImage"
        alt="blog post"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="w-full">
      <div
        class="md:hidden flex items-center w-full text-[#070707] gap-2 pt-3 px-2 mb-5 mt-2"
      >
        <figure class="h-5 w-5">
          <img
            :src="athmg"
            alt="author image"
            class="w-full h-full object-cover rounded-full text-xxs"
          />
        </figure>
        <p class="text-xs w-full capitalize flex justify-between">
          {{ ath }}
          <span class="text-black/40 dark:text-white/60">{{
            formatDate(post.publishedAt)
          }}</span>
        </p>
      </div>
      <h3 class="text-lg capitalize mb-1 leading-5 line-clamp-2">
        {{ post.title }}
      </h3>
      <div class="hidden md:flex items-center w-full text-[#070707] gap-2 py-3">
        <figure class="h-5 w-5">
          <img
            :src="athmg"
            alt="author image"
            class="w-full h-full object-cover rounded-full text-xxs"
          />
        </figure>
        <div class="flex gap-2 text-[10px]">
          <span class="capitalize text-[#070707] dark:text-white">
            By {{ ath }}
          </span>
          <span class="text-black/40 dark:text-white/60">{{
            formatDate(post.publishedAt)
          }}</span>
        </div>
      </div>
      <p class="text-sm my-3 md:hidden">{{ post.summary }}</p>
      <RouterLink
        class="mt-6 md:mt-0 w-fit flex items-center rounded-[4px] md:rounded-none bg-transparent p-2 md:p-0 md:py-2 border md:border-0 md:border-b text-sm border-[#111111] dark:border-white/30"
        :to="{
          name: 'post',
          params: { slug: post.slug },
        }"
      >
        <span>Read More</span>
        <BaseIcon name="chevron-right" class="w-auto" />
      </RouterLink>
    </div>
  </article>
</template>

<script>
import { getAPI } from "../axios";
import { formatDate } from "../helpers/date";
import BaseIcon from "./BaseIcon.vue";
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
  methods: {
    formatDate,
  },
  created() {
    // FIXME: this really isn't gonna work out
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
  components: {
    BaseIcon,
  },
};
</script>

<style scoped></style>
