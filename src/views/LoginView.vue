<template>
  <ToastError v-if="hasError" :code="errorCode"></ToastError>
  <BaseModal :show="resetPassword" @close="resetPassword = false">
    <div class="font-baseFamily w-full">
      <header class="w-full">
        <h1 class="font-bold w-ful text-center text-2xl uppercase">
          Reset your Password
        </h1>
      </header>
      <form
        @submit.prevent="
          resetPasswordFn({
            email: email,
          })
        "
        class="p-9 w-full min-h-[400px] flex gap-9 flex-col items-center justify-center"
        id="password"
      >
        <div class="w-full">
          <p class="w-full">Email</p>
          <input
            v-model="email"
            type="email"
            aria-autocomplete="both"
            required
            autocomplete="email"
            class="p-1 h-[4rem] focus:outline-none focus:border-2 focus:border-b-green-300 border-2 w-full border-[#75777A] rounded-lg"
          />
        </div>
        <div class="w-full flex">
          <button
            type="submit"
            class="bg-black uppercase dark:bg-white/60 w-4/5 mx-auto h-[3rem] text-white dark:text-black font-bold rounded-md"
          >
            Confirm
          </button>
        </div>
        <div class="flex flex-col items-center justify-center w-full">
          <BaseIcon name="powered" class="text-black w-[150px]" />
        </div>
      </form>
    </div>
  </BaseModal>
  <div class="font-baseFamily mx-auto max-w-xl w-5/6">
    <div class="flex justify-start m-0 px-6 pt-3">
      <a href="/">
        <AppLogo class="text-black dark:text-white" />
      </a>
    </div>
    <div
      class="flex flex-col justify-start items-start md:bg-none mb-20 bg-center bg-contain mt-16"
    >
      <p class="font-bold text-3xl">Welcome!</p>
      <p class="mt-1 text-xl">Sign in to continue</p>
    </div>
    <form
      method="post"
      @submit.prevent="loginForm(email, password)"
      class="md:px-5 md:pt-6"
    >
      <div class="flex flex-col w-5/6 mx-auto md:w-full">
        <div class="flex flex-col md:w-3/5 w-full mx-auto">
          <input
            type="email"
            name="email"
            v-model="email"
            required
            placeholder="Email"
            autocomplete="email"
            class="p-4 focus:outline-none font-baseFamily focus:border-b-green-300 border border-[#75777A] w-full rounded-xl"
          />
        </div>
        <div class="flex flex-col md:w-3/5 w-full mx-auto mt-9">
          <input
            type="password"
            name="password"
            autocomplete="password"
            v-model="password"
            placeholder="Password"
            required
            class="p-4 focus:outline-none font-baseFamily focus:border-b-green-300 border w-full border-[#75777A] rounded-xl"
          />
        </div>
        <div class="flex flex-col items-center justify-center w-full mt-12">
          <button
            class="bg-blue-600 dark:bg-white/10 md:w-3/5 w-full px-10 py-3 text-white dark:border-black rounded-xl font-semibold text-sm tracking-widest"
            type="submit"
          >
            Login
          </button>
          <button
            class="text-blue-600 text-sm mt-3"
            type="button"
            @click="resetPassword = true"
          >
            Forgot password?
          </button>
        </div>
      </div>
    </form>
    <div class="flex flex-col items-center justify-center w-full mt-28">
      <BaseIcon name="powered" class="text-black w-[150px]" />
    </div>
  </div>
</template>

<style></style>

<script>
import { mapGetters } from "vuex";
import ToastError from "../services/error.vue";
import { useToast } from "vue-toastification";
import BaseIcon from "../components/BaseIcon.vue";
import BaseModal from "../components/BaseModal.vue";
import AppLogo from "../components/AppLogo.vue";
import { getAPI } from "../axios";
export default {
  setup(props) {
    const toast = useToast();
    return { toast };
  },
  components: {
    ToastError,
    BaseIcon,
    BaseModal,
    AppLogo,
  },
  data() {
    return {
      email: "",
      password: "",
      userslg: "",
      resetPassword: false,
      success: null,
      error: null,
      token: null,
      hasError: false,
      errorCode: "",
    };
  },
  computed: mapGetters({
    user: "getUserState",
  }),
  methods: {
    async loginForm(username, password) {
      try {
        this.toast.info("Logging In...", {
          timeout: false,
          id: "login",
        });
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
            this.toast.dismiss("login");
            // console.log(this.user, response);
          });
      } catch (error) {
        console.log(error);
        if (
          error.response.data.non_field_errors[0] ===
          "Unable to log in with provided credentials."
        ) {
          this.toast.error("Please check your email and password", {
            timeout: 2000,
          });
          this.toast.dismiss("login");
        } else {
          this.hasError = true;
          // console.log(this.hasError);
          this.errorCode = error.response.status;
          this.toast.dismiss("login");
          setTimeout(() => {
            this.hasError = false;
            // console.log(this.hasError);
          }, 4000);
        }
      }
    },
    async resetPasswordFn(email) {
      try {
        this.toast.info("Checking...", {
          timeout: false,
          id: "checking",
        });
        let newUser = await getAPI
          .get(`/users?email=${email.email.toLowerCase()}`)
          .then(async () => {
            let newPass = await getAPI
              .post(`/api/password_reset/`, email)
              .then(() => {
                this.toast.dismiss("checking");
                this.toast.success("Check your email to reset your password", {
                  timeout: 2000,
                });
              }); // for some odd reason you need to append slash to the end of the url
            console.log(newPass);
          })
          .catch((e) => {
            console.log(e);
            this.toast.dismiss("checking");
            this.toast.error(e.response.data.email[0], {
              timeout: 2000,
            });
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
