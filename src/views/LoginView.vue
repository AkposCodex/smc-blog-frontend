<template>
  <head>
    <title>SMC DESK | LOGIN</title>
  </head>
  <header class="md:flex justify-start hidden md:block shadow-md py-3 w-full">
    <div class="flex lg:w-4/5 justify-between items-center p-3">
      <h1 class="text-xl font-bold h-min">LOG IN</h1>
      <img src="@/assets/icons/logo.png" alt="" class="w-3/5" />
    </div>
  </header>
  <div class="font-baseFamily md:h-full h-[100vh]">
    <div
      class="h-2/5 flex items-end md:bg-none bg-[url(@/assets/icons/svgs/admin/login-mobile-header.png)] bg-center bg-contain"
    >
      <!-- <img
        src="@/assets/icons/logo.png"
        class="md:p-9 md:w-[300px] mx-auto hidden md:block object-contain h-full"
        alt=""
      /> -->
      <p class="md:hidden text-white h-min font-bold p-3 text-xl">Log In</p>
    </div>
    <form
      method="post"
      @submit.prevent="loginForm(email, password)"
      class="w-full mx-auto px-5  pt-12"
    >
      <div class="flex flex-col space-y-6">
        <div class="flex flex-col md:w-3/5 w-full mx-auto">
          <label for="name" class="font-semibold">Email</label>
          <input
            type="text"
            name="text"
            v-model="email"
            required
            autocomplete="email"
            class="p-1 h-[4rem] focus:outline-none focus:border-4 focus:border-b-green-300 border-2 w-full border-b-gray-400"
          />
        </div>
        <div class="flex flex-col md:w-3/5 w-full mx-auto">
          <label for="email" class="font-semibold">Password</label>
          <input
            type="password"
            name="password"
            autocomplete="password"
            v-model="password"
            required
            class="p-1 h-[4rem] focus:outline-none focus:border-4 focus:border-b-green-300 border-2 w-full border-b-gray-400"
          />
        </div>
        <div class="flex justify-center w-full">
          <button
            class="bg-black dark:bg-white/10 md:w-3/5 w-full px-10 py-3 text-white border border-white dark:border-black"
          >
            LOGIN
          </button>
        </div>
        <div class="flex justify-center">
          <br />
          <p style="color: rgb(255, 0, 0)">{{ error }}</p>
        </div>
      </div>
    </form>
    <br /><br /><br />
  </div>
</template>

<style></style>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      userslg: "",
      success: null,
      error: null,
      token: null,
    };
  },
  computed: mapGetters({
    user: "getUserState",
  }),
  methods: {
    async loginForm(username, password) {
      //   getAPI
      //     .post("api/auth/token/login/", {
      //       username: this.email,
      //       password: this.password,
      //     })
      //     .then((response) => {
      //       console.log(response)
      //       this.success = true;
      //       this.token = response.data;
      //       getAPI
      //         .get("/users?email=" + this.email)
      //         .then((response) => {
      //           console.log(response)
      //           this.userslg = response.data[0].slug;
      //           this.$router.push({ path: "profile/" + this.userslg });
      //         })
      //         .catch((err) => {});
      //     })
      //     .catch((err) => {
      //       this.error = err;
      //     });
      await this.$store
        .dispatch("userModule/login", {
          username,
          password,
        })
        .then((response) => {
          this.$router.push({
            name: "adminProfile",
            params: { slug: this.user.slug },
          });
          console.log(this.user);
        });
    },
  },
};
</script>
