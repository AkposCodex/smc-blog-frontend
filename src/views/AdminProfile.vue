<template>
  <section class="pt-2 px-5 w-full mx-auto" id="profile">
    <p class="text-xl md:text-3xl md:font-medium font-bold p-5 mb-9">Profile</p>
    <div class="lg:w-4/5 mx-auto">
      <div class="flex flex-col lg:flex-row gap-4 mb-9 relative items-center">
        <figure class="w-[150px]">
          <div
            class="before:content-[url(@/assets/icons/svgs/admin/remix-icons/Vector.png)] w-[150px] before:flex before:justify-center before:items-center before:w-[150px] before:h-[150px] before:rounded-full before:backdrop-brightness-50 before:absolute z-50"
          >
            <img
              v-if="proFile"
              :src="proFile"
              alt=""
              class="object-cover rounded-full h-[150px] w-[150px]"
            />
            <img
              v-else
              :src="user.profileImage"
              alt=""
              class="rounded-full object-cover h-[150px] w-[150px]"
            />
          </div>
          <input
            type="file"
            @change="changeProfileImage"
            required
            :style="`background:url(${user.profileImage})`"
            class="w-[150px] opacity-0 absolute top-0 rounded-full h-[150px] bg-center bg-contain border-black bg-gray-100 item-center justify-center cursor-pointer"
            accept="image/*"
          />
        </figure>
        <div class="flex flex-col gap-2 text-center md:text-left">
          <p class="font-bold text-3xl">{{ user.name }}</p>
          <p
            class="bg-gray-100 px-4 w-max py-1 dark:text-black text-xs rounded-md mx-auto md:mx-0 my-4"
          >
            {{ user.posts.length }}
            Articles Written
          </p>
          <div class="flex justify-center items-center">
            <p
              v-if="user.bio"
              class="md:text-left text-[#47464A] dark:text-white text-sm w-full"
            >
              {{ user.bio }}
            </p>

            <p v-else>No Bio</p>
          </div>
        </div>
      </div>
      <div class="">
        <p class="pb-9 font-bold text-xl md:text-2xl md:font-medium">
          Edit Profile
        </p>
        <div class="pb-9" id="userName">
          <p class="font-bold">Name</p>
          <input
            v-model="user.name"
            type="text"
            class="h-[2.5rem] bg-gray-100 p-1 focus:outline-none focus:border-b-green-300 w-full border-b border-b-black dark:border-b-white"
          />
        </div>
        <div class="pb-9" id="userName">
          <p class="font-bold">Role</p>
          <!-- <input
                v-model="role"
                type="text"
                class="h-[2.5rem] bg-gray-100 p-1 focus:outline-none focus:border-b-green-300 w-full border-b border-b-black dark:border-b-white"
                :readonly="!user.isSuper"
                /> -->
          <select
            v-model="user.roles[0]"
            class="h-[2.5rem] disabled:opacity-40 bg-gray-100 p-1 focus:outline-none focus:border-b-green-300 border w-full border-b-black dark:border-b-white"
          >
            <option
              v-for="group in allGroups"
              :key="group.id"
              :value="group.id"
            >
              {{ group.name }}
            </option>
          </select>
        </div>
        <div class="pb-9" id="bio">
          <p class="font-bold">Bio</p>
          <textarea
            cols="30"
            v-model="user.bio"
            rows="5"
            class="bg-gray-100 dark:bg-transparent p-1 text-sm text-[#47464A] dark:text-white focus:outline-none focus:border-b-green-300 w-full border-b border-b-black dark:border-b-white"
          ></textarea>
        </div>

        <button
          @click="UpdateProfile(role)"
          class="bg-black dark:bg-white/60 w-11/12 mx-auto h-[3rem] text-white text-base dark:text-black rounded-[10px] md:w-fit md:mx-0 px-10 block"
        >
          Save
        </button>
        <hr class="my-6" />

        <div class="pb-3 flex justify-center">
          <button
            @click="changePassword = true"
            class="pb-3 px-3 cursor-pointer flex items-center dark:bg-white/60 dark:text-black dark:pt-3 gap-2 text-xl shadow-lg rounded-[10px]"
          >
            <BaseIcon name="lock" class="dark:text-black" />
            Change password
          </button>
        </div>
      </div>
    </div>
  </section>
  <BaseModal :show="changePassword" @close="changePassword = false">
    <div class="font-baseFamily w-full">
      <header class="w-full">
        <h1 class="font-bold w-ful text-center text-2xl uppercase">
          Change Password
        </h1>
      </header>
      <form
        @submit.prevent="
          updatePassword({
            old_password: old_password,
            new_password: new_password,
          })
        "
        class="p-9 w-full min-h-[400px] flex gap-9 flex-col items-center justify-center"
        id="password"
      >
        <div class="w-full">
          <p class="w-full">Current Password</p>
          <input
            v-model="old_password"
            type="password"
            aria-autocomplete="both"
            required
            autocomplete="current password"
            class="p-1 h-[4rem] focus:outline-none focus:border-2 focus:border-b-green-300 border-2 w-full border-[#75777A] rounded-lg"
          />
        </div>
        <div class="w-full">
          <p class="w-full">New Password</p>
          <input
            v-model="new_password"
            type="password"
            aria-autocomplete="both"
            autocomplete="password"
            required
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
</template>

<script>
import { getAPI } from "../axios";
import BaseIcon from "../components/BaseIcon.vue";
import BaseModal from "../components/BaseModal.vue";
import { useToast, POSITION } from "vue-toastification";
import { mapGetters } from "vuex";

export default {
  setup() {
    const toast = useToast();
    return { toast, POSITION };
  },
  data() {
    return {
      old_password: "",
      new_password: "",
      changePassword: false,
      allGroups: [],
      proFile: null,
      file: "",
      role: [],
      allGroups: [],
    };
  },
  computed: mapGetters({
    user: "getUserState",
  }),
  components: { BaseIcon, BaseModal },
  methods: {
    async setRole(e) {
      await getAPI
        .patch(`/users/${this.user.slug}`, { groups: [e] })
        .then((e) => {
          // this.getRoles();
        });
    },
    async getRoles() {
      let roleList = [];

      console.log(this.user);
      await getAPI.get(`/users/${this.user.slug}`).then(async (e) => {
        roleList = e.data.groups;
        roleList.forEach((e) => {
          console.log("roleList: ", e);
          switch (e) {
            case 1:
              this.role.push("Editor");
              break;
            case 2:
              this.role.push("Writer");
              break;
            case 3:
              this.role.push("Head of Content");
              break;
            case 4:
              this.role.push("Team Lead");
              break;
          }
        });
        console.log("role:", this.role, "roleList:", roleList, "User:", e);
      });
    },
    changeProfileImage(e) {
      let file = e.target.files[0];
      this.file = file;
      let imageSRC = URL.createObjectURL(file);
      this.proFile = imageSRC;
      console.log(this.file, this.proFile);
    },
    async UpdateProfile(e) {
      let roleData = e;
      let data = new FormData();
      console.log(this.proFile === null && this.user.profileImage != null);
      if (this.proFile != null && this.file != "") {
        data.append("email", this.user.email);
        data.append("username", this.user.username);
        data.append("bio", this.user.bio);
        data.append("image", this.file);
        this.toast.info("Updating Profile...", {
          timeout: false,
          id: "login",
        });
        await getAPI
          .patch("/users/" + this.user.slug, data)
          .then((response) => {
            console.log(roleData);
            this.setRole(roleData).then((e) => {
              this.toast.dismiss("login");
              this.toast.success("Post Successful!", {
                timeout: 2000,
                id: "success",
              });
              this.success = true;
              console.log(response);
              this.mssg = "Updated";
            });
            // this.$router.go();
          })
          .catch((err) => {
            this.$emit("hasError", true, err.response.status);
            console.log(err);
          });

        console.log("image absent");
      } else if (this.proFile === null && this.user.profileImage != null) {
        data.append("email", this.user.email);
        data.append("username", this.user.username);
        data.append("bio", this.user.bio);
        this.toast.info("Updating Profile...", {
          timeout: false,
          id: "login",
        });
        await getAPI
          .patch("/users/" + this.user.slug, data)
          .then((response) => {
            this.setRole(roleData).then((e) => {
              this.toast.dismiss("login");
              this.toast.success("Profile Updated!", {
                timeout: 2000,
                id: "success",
              });
              this.success = true;
              console.log(response);
              this.mssg = "Updated";
              // this.$router.go();
            });
          })
          .catch((err) => {
            this.$emit("hasError", true, err.response.status);
            console.log(err);
          });
        console.log("image present");
      } else if (this.proFile != null && this.file === "") {
        data.append("email", this.user.email);
        data.append("name", this.user.name);
        data.append("bio", this.user.bio);
        this.toast.info("Updating Profile...", {
          timeout: false,
          id: "login",
        });
        await getAPI
          .patch("/users/" + this.user.slug, data)
          .then((response) => {
            this.setRole(roleData).then((e) => {
              this.toast.dismiss("login");
              this.toast.success("Profile Updated!", {
                timeout: 2000,
                id: "success",
              });
              this.success = true;
              console.log(response);
              this.mssg = "Updated";
              // this.$router.go();
            });
          })
          .catch((err) => {
            this.$emit("hasError", true, err.response.status);
            console.log(err);
          });
        console.log("image present");
      }
    },
    async updatePassword({ old_password, new_password }) {
      try {
        await getAPI.put(
          "/api/change-password/",
          {
            old_password,
            new_password,
          },
          {
            headers: {
              Authorization: `Token ${this.user.token}`,
            },
          }
        );
        this.toast.success("Password Updated");
        this.changePassword = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.proFile = this.user.profileImage;
    this.getRoles();
    getAPI
      .get(`/groups`, {
        headers: {
          Authorization: `Token ${this.user.token}`,
        },
      })
      .then((res) => {
        console.log("allgroups:", res.data);
        const groupMapping = res.data.map((group) => ({
          id: +group.url.split("/").at(-1),
          name: group.name,
        }));
        this.allGroups = groupMapping;
        console.log(this.allGroups);
      });
  },
};
</script>

<style scoped></style>
