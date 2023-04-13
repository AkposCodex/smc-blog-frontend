<script>
import BaseButton from "./BaseButton.vue";
import AppLogo from "./AppLogo.vue";
import { useDark, useToggle } from "@vueuse/core";
import BaseIcon from "./BaseIcon.vue";
import { useRouter } from "vue-router";
import { getAPI } from "../axios";

export default {
  setup() {
    const isDark = useDark();
    const toggleDark = useToggle(isDark);

    return {
      isDark,
      toggleDark,
    };
  },
  data() {
    return {
      isMenuOpen: false,
      searchWord: "",
      word: "",
      results: null,
    };
  },
  methods: {
    openMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      document.body.classList.toggle("overflow-hidden");
    },
    async search(e) {
      await getAPI
        .get(`/posts?name=${e}`)
        .then((response) => {
          this.results = response.data;
        })
        .catch((e) => {});
    },
    async searchMini(e) {
      await getAPI
        .get(`/posts?name=${e}`)
        .then((response) => {
          this.results = response.data;
        })
        .catch((e) => {});
    },
    navigate(e) {
      this.$router.push({
        name: "post",
        params: { slug: e },
      });
      // this.$router.go();
    },
  },
  mounted() {
    const router = useRouter();
    router.beforeEach((to, from) => {
      this.isMenuOpen = false;
    });
  },
  components: { BaseButton, AppLogo, BaseIcon },
};
</script>
<template>
  <div
    class="flex flex-col sticky font-baseFamily top-0 z-50 shadow"
    :class="{
      'h-screen': isMenuOpen,
    }"
  >
    <nav
      class="grid place-items-center grid-cols-[minmax(25px,8rem)_1fr_minmax(25px,8rem)] px-5 md:pt-4 pt-8 pb-4 gap-9 w-full items-center justify-between lg:text-lg bg-white dark:bg-[#1B1B1F]"
    >
      <!-- class="flex px-5 py-4 gap-9 w-full items-center justify-between lg:text-lg" -->
      <div class="hidden lg:block">
        <button class="flex gap-2 items-center" @click="toggleDark()">
          <BaseIcon name="mode" />
        </button>
      </div>
      <div class="lg:hidden md:block">
        <div
          class="flex gap-2 bg-white dark:bg-[#1B1B1F] transition-all items-center justify-center w-full text-sm group"
        >
          <form
            @submit.prevent="search(searchWord)"
            class="flex gap-0 items-center rounded-lg md:w-[35%] w-full group-focus-within:w-full transition-all mx-auto bg-gray-200 p-2"
          >
            <BaseIcon name="search" class="text-gray-800" />
            <input
              type="text"
              class="outline-none w-full dark:text-black bg-gray-200"
              v-model="searchWord"
            />
          </form>
        </div>
      </div>
      <RouterLink class="lg:hidden" to="/">
        <AppLogo class="text-black dark:text-white" />
      </RouterLink>
      <div class="hidden lg:flex gap-9 w-full capitalize justify-evenly">
        <div class="flex items-center gap-4">
          <RouterLink
            class="font-bold text-sm"
            to="/bc"
            exact-active-class="text-[#366bff]"
            active-class="text-[#366bff]"
            >blockchain report
          </RouterLink>
          <RouterLink
            class="font-bold text-sm"
            to="/eq"
            exact-active-class="text-[#366bff]"
            active-class="text-[#366bff]"
          >
            equity report</RouterLink
          >
        </div>
        <RouterLink to="/">
          <AppLogo class="text-black dark:text-white" />
        </RouterLink>
        <div class="flex items-center gap-4">
          <RouterLink
            class="font-bold text-sm"
            to="/eco"
            exact-active-class="text-[#366bff]"
            active-class="text-[#366bff]"
          >
            economics report</RouterLink
          >
          <RouterLink
            class="font-bold text-sm"
            to="/geo"
            exact-active-class="text-[#366bff]"
            active-class="text-[#366bff]"
          >
            geopolitical report</RouterLink
          >
        </div>
      </div>
      <div class="hidden lg:block">
        <form
          @submit.prevent="search(searchWord)"
          class="flex md:gap-4 gap-0 items-center rounded-lg w-2/5 md:w-full mx-auto bg-gray-200 px-6 py-1"
        >
          <BaseIcon name="search" class="text-gray-800 text-xl" />
          <input
            type="text"
            placeholder="search posts"
            class="outline-none w-full bg-gray-200"
            v-model="searchWord"
          />
        </form>
      </div>
      <div class="lg:hidden">
        <button @click="openMenu" v-if="!isMenuOpen">
          <BaseIcon name="hamburger" />
        </button>
        <button @click="openMenu" v-if="isMenuOpen">
          <BaseIcon name="close" />
        </button>
      </div>
      <!-- TODO: Refactor mobile menu dropdown -->
      <div
        v-if="isMenuOpen"
        class="flex absolute bg-white dark:bg-[#272626] mt-[4.5rem] md:mt-[3.5rem] h-[100vh] z-50 items-center text-left flex-col space-y-10 w-full capitalize border-t border-black dark:border-white top-0"
      >
        <div class="w-full pt-6 px-12">
          <button class="flex gap-2 items-center" @click="toggleDark()">
            <BaseIcon name="mode" />
          </button>
        </div>
        <div class="flex flex-col justify-center gap-10 h-1/2 !m-0">
          <a href="/" class="font-bold" exact-active-class="text-[#366bff]">
            home
          </a>
          <a
            href="/bc"
            class="font-bold"
            active-class="text-[#366bff]"
            exact-active-class="text-[#366bff]"
            >blockchain report
          </a>
          <a
            href="/eq"
            class="font-bold"
            active-class="text-[#366bff]"
            exact-active-class="text-[#366bff]"
          >
            equity report</a
          >
          <a
            href="/eco"
            class="font-bold"
            active-class="text-[#366bff]"
            exact-active-class="text-[#366bff]"
          >
            economics report</a
          >
          <a
            href="/geo"
            class="font-bold"
            active-class="text-[#366bff]"
            exact-active-class="text-[#366bff]"
          >
            geopolitical report</a
          >
        </div>
        <hr class="border w-full" />
        <a
          href="#footer"
          class="block mx-auto p-3 text-xs font-semibold bg-black text-white"
          @click="openMenu"
        >
          Subscribe to our Newsletter
        </a>
        <div class="flex justify-center space-x-6">
          <a href="https://twitter.com/smcdao"
            ><img src="@/assets/icons/twitter.png" alt="" width="20"
          /></a>
          <a href="https://youtube.com/@smcdao"
            ><img src="@/assets/icons/youtube.png" alt="" width="20"
          /></a>
          <a href="https://t.me/smcnewdesk"
            ><img src="@/assets/icons/telegram.png" alt="" width="20"
          /></a>
        </div>
      </div>
    </nav>
  </div>
  <a
    @click="results = null"
    class="shadow mx-auto h-[100vh] w-full z-50 bg-transparent absolute transition-all"
    v-show="results"
  >
    <div class="h-min bg-white">
      <div class="" v-for="res in results">
        <a :href="`/post/${res.slug}`">
          <p class="p-3">{{ res.title }}</p>
        </a>
        <hr class="w-full" />
      </div>
    </div>
  </a>
</template>
