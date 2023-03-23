<script>
import BlogCard from "./BlogCard.vue";

export default {
  name: "BlogCardRow",
  components: {
    BlogCard,
  },

  props: {
    posts: {
      type: Array,
      required: true,
    },
    variant: {
      type: String,
      default: "default",
    },
    message: {
      type: String,
      default: "No New Posts Here",
    },
  },
  created() {
  },
  methods: {
    scrollLeft() {
      const scrollContainer = document.getElementById("scrollContainer");
      scrollContainer.scrollLeft -= 100;
    },
    scrollRight() {
      const scrollContainer = document.getElementById("scrollContainer");
      scrollContainer.scrollLeft += 100;
    },
  },
};
</script>

<template>
  <div
    class="font-baseFamily text-center font-bold text-2xl mt-32 mb-32"
    v-if="!posts || !posts.length"
  >
    <h3>{{ message }}</h3>
  </div>
  <div
    class="grid md:grid-cols-2 gap-5 md:place-items-stretch place-items-center"
    v-else
  >
    <BlogCard
      v-for="post in posts"
      :key="post.slug"
      :post="post"
      :variant="variant"
    />
  </div>
</template>

<style scoped></style>
