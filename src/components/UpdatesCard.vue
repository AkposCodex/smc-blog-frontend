<template>
  <article class="flex gap-4 md:flex-col">
    <figure class="rounded-md h-20 flex-1 overflow-hidden">
      <img
        :src="post.mainImage"
        :alt="`${post.slug} image`"
        class="h-full w-full object-cover"
      />
    </figure>
    <div class="flex-[2]">
      <div class="flex items-center text-xxs justify-between md:mb-5">
        <span
          class="md:text-sm capitalize rounded-sm py-1 px-2 bg-black text-white dark:bg-white dark:text-black"
          >{{ post.categories }}</span
        >
        <div class="flex gap-1 md:hidden">
          <span>By {{ post.author }}</span>
          <span class="text-[#666666]">{{ formatDate(post.publishedAt) }}</span>
        </div>
      </div>
      <RouterLink
        :to="{
          name: 'post',
          params: { slug: post.slug },
        }"
      >
        <p class="tracking-[0.15px] mt-2 md:text-xl line-clamp-2">
          {{ post.title }}
        </p>
      </RouterLink>
      <div class="hidden md:block">
        <p class="text-sm text-[#111]/60 mt-2 dark:text-white">
          {{ post.summary }}
        </p>
        <div class="gap-1 hidden md:flex text-[10px] my-3">
          <span>By {{ post.author }}</span>
          <span class="text-[#666666]">{{ formatDate(post.publishedAt) }}</span>
        </div>
        <RouterLink
          :to="{
            name: 'post',
            params: { slug: post.slug },
          }"
          class="w-fit flex items-center bg-transparent rounded-sm p-2 border border-[#111111] dark:border-white/30"
        >
          <span>Read More</span>
          <BaseIcon name="chevron-right" class="w-auto" />
        </RouterLink>
      </div>
    </div>
  </article>
</template>

<script setup>
import BaseIcon from "./BaseIcon.vue";
import { formatDate } from "../helpers/date";

defineProps({
  post: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped></style>
