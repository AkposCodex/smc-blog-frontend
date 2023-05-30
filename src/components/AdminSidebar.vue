<template>
  <aside
    class="space-y-10 md:space-y-0 border-t border-black dark:border-white top-0 md:border-none text-left z-50 h-full md:h-auto absolute mt-[3rem] md:mt-0 md:relative w-full dark:text-white items-center flex-col md:bg-gray-100 bg-white dark:bg-[#1b1b1f] lg:flex overflow-auto"
    :class="menuOpen ? 'flex' : 'hidden'"
    id="sidebar"
  >
    <div class="w-4/5 mt-9">
      <div class="w-4/5 flex pb-6 gap-6">
        <figure class="w-[70px]">
          <div class="w-[70px]">
            <img
              v-if="user.profileImage"
              :src="user.profileImage"
              alt=""
              class="rounded-full w-[70px] h-[70px] object-cover"
            />
            <img v-else src="@/assets/icons/Ellipse.png" alt="" />
          </div>
        </figure>
        <div class="font-baseFamily flex flex-col justify-center items-start">
          <p class="text-2xl">{{ user.name }}</p>
          <p class="text-base text-gray-400">
            {{ getGroupName(user.roles[0]) }}
          </p>
        </div>
      </div>
      <hr class="w-full border" />
    </div>
    <div
      class="text-base 2xl:text-xl flex flex-col justify-center gap-10 w-4/5 pt-5 !m-0"
    >
      <RouterLink
        to="/admin"
        class="hover:cursor-pointer w-max flex gap-3 items-center"
        exact-active-class="text-blue-600 decoration-4"
      >
        <BaseIcon name="user" class="" />
        <p>Profile</p>
      </RouterLink>
      <a
        v-if="user.isSuper"
        href="https://analytics.google.com/analytics/web/?authuser=1"
        class="w-max flex text-[#E37400] hover:cursor-pointer gap-3 items-center"
      >
        <BaseIcon name="chart_line" class=" " />
        <p>Analytics</p>
      </a>
      <RouterLink
        to="/admin/create-article"
        class="hover:cursor-pointer w-max flex gap-3 items-center"
        exact-active-class="text-blue-600 decoration-4"
      >
        <BaseIcon name="plusButton" class="" />
        <p>Create new article</p>
      </RouterLink>
      <RouterLink
        to="/admin/create-video-article"
        class="hover:cursor-pointer w-max flex gap-3 items-center"
        exact-active-class="text-blue-600 decoration-4"
      >
        <BaseIcon name="video" class="" />
        <p>Create Video Post</p>
      </RouterLink>
      <RouterLink
        to="/admin/articles"
        class="w-max hover:cursor-pointer flex gap-3 items-center"
        exact-active-class="text-blue-600 decoration-4"
      >
        <BaseIcon name="articles" class="" />
        <p>Your articles</p>
      </RouterLink>
      <button
        class="w-max flex hover:cursor-pointer gap-3 items-center"
        v-if="user.isSuper"
        @click="$emit('openPriceIndex')"
      >
        <BaseIcon name="chart_line" />
        <p>Price Index</p>
      </button>
      <RouterLink
        v-if="user.isSuper"
        to="/admin/reviews"
        class="w-max flex hover:cursor-pointer gap-3 items-center"
        exact-active-class="text-blue-600 decoration-4"
      >
        <BaseIcon name="list_check" class="" />
        <p>Review</p>
      </RouterLink>
      <button class="w-max flex gap-3 items-center" @click="toggleDark()">
        <BaseIcon name="mode" class="stroke-black dark:stroke-white" />
        <p>Dark Mode</p>
      </button>
      <button
        @click="logout()"
        class="w-max flex gap-3 hover:cursor-pointer items-center"
      >
        <BaseIcon name="logOut" class="" />

        <p>Log out</p>
      </button>
      <hr class="w-full border" />
      <RouterLink
        to="/"
        class="font-semibold text-base"
        exact-active-class="text-[#366bff]"
      >
        home
      </RouterLink>
      <RouterLink
        to="/bc"
        class="font-semibold text-base"
        active-class="text-[#366bff]"
        exact-active-class="text-[#366bff]"
        >blockchain report
      </RouterLink>
      <RouterLink
        to="/eq"
        class="font-semibold text-base"
        active-class="text-[#366bff]"
        exact-active-class="text-[#366bff]"
      >
        equity report</RouterLink
      >
      <RouterLink
        to="/eco"
        class="font-semibold text-base"
        active-class="text-[#366bff]"
        exact-active-class="text-[#366bff]"
      >
        economics report</RouterLink
      >
      <RouterLink
        to="/geo"
        class="font-semibold text-base"
        active-class="text-[#366bff]"
        exact-active-class="text-[#366bff]"
      >
        geopolitical report</RouterLink
      >
    </div>
  </aside>
</template>

<script>
import { mapGetters } from "vuex";
import { useDark, useToggle } from "@vueuse/core";
import BaseIcon from "@/components/BaseIcon.vue";
import { getAPI } from "../axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const isDark = useDark();
    const toggleDark = useToggle(isDark);
    return { isDark, toggleDark };
  },
  data() {
    return {
      allGroups: [],
    };
  },
  props: {
    menuOpen: Boolean,
  },
  emits: ["openPriceIndex"],
  components: {
    BaseIcon,
  },
  computed: mapGetters({
    user: "getUserState",
  }),
  methods: {
    getGroupName(id) {
      const group = this.allGroups.find((group) => group.id === id);
      return group ? group.name : "No Role";
    },
    logout() {
      this.$store.dispatch("userModule/logout").then(() => {
        this.$router.push("/login");
      });
    },
  },
  async created() {
    getAPI
      .get(`/groups`, {
        headers: {
          Authorization: `Token ${this.user.token}`,
        },
      })
      .then((res) => {
        const groupMapping = res.data.map((group) => ({
          id: +group.url.split("/").at(-1),
          name: group.name,
        }));
        this.allGroups = groupMapping;
        console.log(this.allGroups);
      });
  },
  mounted() {
    const router = useRouter();
    router.beforeEach(() => {
      document.body.classList.remove("overflow-hidden");
    });
  },
};
</script>

<style scoped></style>
