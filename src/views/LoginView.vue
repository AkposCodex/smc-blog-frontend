<template>
  <ToastError v-if="hasError" :code="errorCode"></ToastError>
  <div class="font-baseFamily md:h-full h-[100vh]">
    <div class="mb-16"></div>
    <div
      class="flex flex-col justify-start max-w-xl mx-auto items-start md:bg-none mb-10 bg-center bg-contain"
    >
      <p class="h-min font-bold p-3 text-3xl">Welcome!</p>
      <p class="h-min font-bold p-3 text-xl">Sign in to continue</p>
    </div>
    <form
      method="post"
      @submit.prevent="loginForm(email, password)"
      class="mx-auto max-w-xl px-5 pt-12"
    >
      <div class="flex flex-col space-y-6">
        <div class="flex flex-col md:w-3/5 w-full mx-auto">
          <input
            type="email"
            name="email"
            v-model="email"
            required
            placeholder="Email"
            autocomplete="email"
            class="p-1 h-[4rem] focus:outline-none focus:border-2 focus:border-b-green-300 border-2 border-[#75777A] w-full rounded-lg"
          />
        </div>
        <div class="flex flex-col md:w-3/5 w-full mx-auto">
          <input
            type="password"
            name="password"
            autocomplete="password"
            v-model="password"
            placeholder="Password"
            required
            class="p-1 h-[4rem] focus:outline-none focus:border-2 focus:border-b-green-300 border-2 w-full border-[#75777A] rounded-lg"
          />
        </div>
        <div class="flex flex-col items-center justify-center w-full">
          <button
            class="bg-blue-600 dark:bg-white/10 md:w-3/5 w-full px-10 py-3 text-white border border-white dark:border-black rounded-lg"
          >
            LOGIN
          </button>
          <a class="text-blue-600 font-bold" href="">forgot password?</a>
        </div>
        <div class="flex flex-col items-center justify-center w-full">
          <BaseIcon name="powered" class="text-black w-[150px]" />
        </div>

        <div class="flex justify-center">
          <br />
          <p style="color: rgb(255, 0, 0)">{{ error }}</p>
        </div>
      </div>
    </form>
    <br /><br /><br />

    <!-- <button
      @click="generateUsers"
      class="bg-black dark:bg-white/10 md:w-3/5 w-full px-10 py-3 text-white border border-white dark:border-black"
    >
      GENERATE USERS
    </button> -->
  </div>
</template>

<style></style>

<script>
import { mapGetters } from "vuex";
import ToastError from "../services/error.vue";
import { useToast, POSITION } from "vue-toastification";
import BaseIcon from "../components/BaseIcon.vue";
import { getAPI } from "../axios";
export default {
  setup(props) {
    const toast = useToast();
    return { toast };
  },
  components: {
    ToastError,
    BaseIcon,
  },
  data() {
    return {
      users: [
        {
          email: "abimbola.hammed@smcreport.com",
          password: "@4SmcDesk",
          name: "Abimbola Hammed",
          slug: "abimbola-hammed",
          username: "Abimbola",
        },
        {
          email: "birima.ibrahim@smcreport.com",
          password: "@4SmcDesk",
          name: "Birima Ibrahim",
          slug: "birima-ibrahim",
          username: "Birima",
        },
        {
          email: "adebowale.odunoren@smcreport.com",
          password: "@4SmcDesk",
          name: "Adebowale Odunoren",
          slug: "adebowale-odunoren",
          username: "Adebowale",
        },
        {
          email: "adeoye.imisioluwa@smcreport.com",
          password: "@4SmcDesk",
          name: "Adeoye Imisioluwa",
          slug: "adeoye-imisioluwa",
          username: "Adeoye",
        },
        {
          email: "osigwe.michael@smcreport.com",
          password: "@4SmcDesk",
          name: "Osigwe Michael",
          slug: "osigwe-michael",
          username: "Osigwe",
        },
        {
          email: "opeyemi.oladepo@smcreport.com",
          password: "@4SmcDesk",
          name: "Opeyemi Oladepo",
          slug: "opeyemi-oladepo",
          username: "Opeyemi",
        },
        {
          email: "oladepo.johnson@smcreport.com",
          password: "@4SmcDesk",
          name: "Oladepo Johnson",
          slug: "oladepo-johnson",
          username: "Oladepo",
        },
        {
          email: "akunna.chiamaka@smcreport.com",
          password: "@4SmcDesk",
          name: "Akunna Chiamaka",
          slug: "akunna-chiamaka",
          username: "Akunna",
        },
        {
          email: "idheme.wisdom@smcreport.com",
          password: "@4SmcDesk",
          name: "Idheme Wisdom",
          slug: "idheme-wisdom",
          username: "Idheme",
        },
        {
          email: "idisi.hope@smcreport.com",
          password: "@4SmcDesk",
          name: "Idisi Hope",
          slug: "idisi-hope",
          username: "Idisi",
        },
        {
          email: "ogbuinya.winifred@smcreport.com",
          password: "@4SmcDesk",
          name: "Ogbuinya Winifred",
          slug: "ogbuinya-winifred",
          username: "Ogbuinya",
        },
        {
          email: "enojo.grace@smcreport.com",
          password: "@4SmcDesk",
          name: "Enojo Grace",
          slug: "enojo-grace",
          username: "Enojo",
        },
        {
          email: "ebuka.ifeanyichukwu@smcreport.com",
          password: "@4SmcDesk",
          name: "Ebuka Ifeanyichukwu",
          slug: "ebuka-ifeanyichukwu",
          username: "Ebuka",
        },
        {
          email: "adeyemo.samuel@smcreport.com",
          password: "@4SmcDesk",
          name: "Adeyemo Samuel",
          slug: "adeyemo-samuel",
          username: "Adeyemo",
        },
      ],
      email: "",
      password: "",
      userslg: "",
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
          position: POSITION.BOTTOM_CENTER,
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
        this.hasError = true;
        // console.log(this.hasError);
        this.errorCode = error.response.status;
        this.toast.dismiss("login");
        setTimeout(() => {
          this.hasError = false;
          // console.log(this.hasError);
        }, 4000);
      }
    },
    async generateUsers() {
      this.users.forEach(generate);
      async function generate(e) {
        await getAPI.patch(`/users/${e.slug}`, e);
      }
    },
  },
};
</script>
