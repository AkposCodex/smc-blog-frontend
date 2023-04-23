<template>
  <footer
    id="footer"
    class="text-center bg-[#1B1B1F] dark:bg-black text-white py-9 px-3 text-xs font-baseFamily"
  >
    <div class="md:w-1/2 mx-auto">
      <h1 class="text-3xl font-bold capitalize">
        Sign up for daily report in your inbox
      </h1>
      <div class="mt-4 my-6">
        <p>Get daily analysis, new and updates right into your inbox!</p>
        <p>Sign up here so you don't miss a single newsletter</p>
      </div>
      <form method="post" @submit.prevent="submitForm">
        <input
          class="border-b outline-none bg-transparent w-4/5 p-3 text-xs"
          type="text"
          name="email"
          v-model="email"
          placeholder="Enter your email address"
          required
        />
        <br />
        <button
          class="bg-white h-[50px] p-3 m-4 w-4/5 text-black text-xs font-semibold"
        >
          Subscribe
        </button>
        <p v-if="success"></p>
        <pre>{{ response }}</pre>
      </form>
    </div>
    <div class="lg:px-24 px-3 py-6 md:justify-between text-xs text-[#767680]">
      <div class="flex md:justify-between justify-center gap-3 flex-wrap">
        <div class="flex items-center md:space-x-4 text-sm justify-center">
          <span>&copy;2023 SMC Report &nbsp;|</span>
          <div class="mx-3 flex justify-center items-center space-x-6">
            <a href="https://twitter.com/smcdao"
              ><img src="@/assets/icons/twitter.png" alt="" width="12"
            /></a>
            <a href="https://youtube.com/@smcdao"
              ><img src="@/assets/icons/youtube.png" alt="" width="12"
            /></a>
            <a href="https://t.me/smcnewdesk"
              ><img src="@/assets/icons/telegram.png" alt="" width="12"
            /></a>
          </div>
        </div>
        <ul class="flex gap-3">
          <li>About us</li>
          <li>Privacy</li>
          <li>Cookie Policy</li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
import { getAPI } from "../axios";
export default {
  data() {
    return {
      email: "",
      response: "",
      success: null,
    };
  },
  methods: {
    submitForm() {
      getAPI
        .post("/subscribe", { email: this.email })
        .then((response) => {
          this.success = true;
          this.response = "Subscribed";
          this.email = "";
        })
        .catch((err) => {
          if (err.response.status === 400) {
            this.response = "Email already subscribed";
          } else {
            this.response = "Something went wrong";
          }
          this.success = false;
        });
    },
  },
};
</script>
