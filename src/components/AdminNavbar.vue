<template>
  <header class="md:flex justify-start shadow-md py-3 w-full px-12">
    <div class="flex md:w-full gap-9 items-center justify-between">
      <span class="lg:hidden"> &nbsp; </span>
      <div class="flex justify-start m-0">
        <AppLogo class="text-black dark:text-white" />
      </div>
      <button class="lg:hidden" @click="toggleMenu">
        <BaseIcon name="hamburger" v-if="!menuOpen" />
        <BaseIcon name="close" v-if="menuOpen" />
      </button>
      <div class="hidden lg:block" id="search" z-50>
        <form
          @submit.prevent="searchMini(word)"
          class="flex md:gap-4 gap-0 items-center rounded-lg w-2/5 md:w-full mx-auto bg-gray-100 px-6 py-1"
        >
          <BaseIcon name="search" class="text-gray-800" />
          <input
            type="text"
            placeholder="search posts"
            class="outline-none w-full bg-gray-100"
            v-model="word"
          />
        </form>
        <a
          @click="results = null"
          class="shadow mx-auto h-[100vh] w-full z-50 bg-transparent absolute transition-all"
          v-show="results"
        >
          <div class="h-min bg-white">
            <div class="" v-for="res in results" :key="res.slug">
              <a :href="`/post/${res.slug}`">
                <p class="p-3">{{ res.title }}</p>
              </a>
              <hr class="w-full" />
            </div>
          </div>
        </a>
      </div>
    </div>
  </header>
  <div class="pb-6 pt-2 lg:hidden" id="search" z-50>
    <form
      @submit.prevent="searchMini(word)"
      class="flex md:gap-4 gap-0 items-center rounded-lg w-2/5 mx-auto bg-gray-100 px-6 py-1"
    >
      <BaseIcon name="search" class="text-gray-800" />
      <input
        type="text"
        required
        placeholder="search posts"
        class="outline-none w-full bg-gray-100"
        v-model="word"
      />
      <!-- <button
        @click="searchMini(word)"
        class="bg-blue-600 uppercase text-white p-2 font-bold"
      >
        Search
      </button> -->
    </form>
    <a
      @click="results = null"
      class="shadow mx-auto h-[100vh] w-full z-50 bg-transparent absolute transition-all"
      v-show="results"
    >
      <div class="h-min bg-white">
        <div class="" v-for="res in results" :key="res.slug">
          <a :href="`/post/${res.slug}`">
            <p class="p-3">{{ res.title }}</p>
          </a>
          <hr class="w-full" />
        </div>
      </div>
    </a>
  </div>
  <a
    @click="results = null"
    class="shadow mx-auto h-[100vh] w-full z-30 bg-transparent absolute transition-all"
    v-show="results"
  >
    <div class="w-2/5"></div>
  </a>
</template>

<script>
import AppLogo from "./AppLogo.vue";
import BaseIcon from "./BaseIcon.vue";
import { useRouter } from "vue-router";
import { getAPI } from "../axios";

export default {
  components: {
    AppLogo,
    BaseIcon,
  },
  data() {
    return {
      menuOpen: false,
      word: "",
      results: null,
    };
  },
  emits: ["toggleMenu"],
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
      this.$emit("toggleMenu", this.menuOpen);
      document.body.classList.toggle("overflow-hidden");
    },
    async searchMini(e) {
      await getAPI
        .get(`/posts?name=${e}&?author=${this.user.slug}`)
        .then((response) => {
          this.results = response.data;
        });
    },
  },
  mounted() {
    const router = useRouter();
    router.beforeEach(() => {
      this.menuOpen = false;
      this.$emit("toggleMenu", this.menuOpen);
      document.body.classList.remove("overflow-hidden");
    });
  },
};
</script>

<style scoped></style>
