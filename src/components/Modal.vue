<template>
  <div
    class="absolute bg-black/50 backdrop-blur-lg flex justify-center items-center z-55 w-full"
  >
    <!-- <img class="check" src="../assets/check-icon.png" alt="" /> -->
    <form
      @submit.prevent="UpdateForm"
      class="bg-white dark:bg-[#1B1B1F] lg:w-3/5 w-4/5 mb-20"
    >
      <button
        @click="$emit('close-modal')"
        class="left w-full flex justify-end px-9 md:pt-0 font-bold"
      >
        <p>X</p>
      </button>

      <div class="flex flex-col items-center">
        <h1 class="font-serifFamily text-2xl md:text-4xl">UPDATE PROFILE</h1>
        <p class="uppercase m-0 text-sm">Profile Picture</p>
        <input
          type="file"
          @change="changeimage"
          required
          class="border-dashed border-2 dark:bg-gray-700 mb-12 py-[12%] px-[12%] before:content-['Upload Main Image'] before:inline-block border-black bg-gray-200 item-center justify-center lg:w-3/5 w-4/5 h-[12rem]"
          accept="image/*"
        />
      </div>
      <div class="flex flex-col items-center">
        <!-- <input
          class="border-b border-black w-4/5"
          type="email"
          v-model="email"
          placeholder="Email"
        />
        <br /><br /> -->
        <input
          class="border-b border-black w-4/5 dark:bg-gray-700 p-6"
          type="text"
          v-model="user.name"
          placeholder="Author Name"
        />
        <br /><br />
        <textarea
          class="border-b border-black w-4/5 dark:bg-gray-700 p-6"
          v-model="user.bio"
          placeholder="Bio..."
          cols="23"
        ></textarea>
        <br />
        <button
          class="bg-black dark:bg-white dark:text-black text-white w-4/5 p-3 font-bold"
        >
          Update
        </button>
        <br /><br />
        {{ mssg }}
      </div>
    </form>
  </div>
</template>

<script>
import { getAPI } from "../axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      file: "",
      email: "",
      name: "",
      newBio: "",
      mssg: "",
    };
  },
  computed: mapGetters({
    user: "getUserState",
  }),
  created() {
  },
  methods: {
    changeimage(e) {
      let file = e.target.files[0];
      this.file = file;
    },
    UpdateForm() {
      let data = new FormData();
      data.append("image", this.file);
      data.append("email", this.user.email);
      data.append("name", this.user.name);
      data.append("bio", this.user.bio);
      data.append("slug", this.user.slug);
      getAPI
        .patch("/users/" + this.user.slug, data, {
          headers: {
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          },
        })
        .then((response) => {
          this.success = true;
          this.mssg = "Updated";
          this.$router.go();
        })
        .catch((err) => {});
    },
  },
};
</script>

<style scoped>
.an {
  padding: 5%;
  border-radius: 0px;
  border: 1px solid;
}
.container {
  display: flex;
  justify-content: space-between;
}
.col1 {
  width: 25%;
}
html.dark .col2 {
  color: rgb(255, 255, 255);
  width: 70%;
}
.d-inline-block {
  display: inline-block;
}
html .col2 {
  color: rgb(0, 0, 0);
  width: 70%;
}
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  text-align: center;
  background-color: white;
  height: 60%;
  width: 50%;
  margin-top: 10%;
  padding: 5%;
  border-radius: 20px;
}
.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}
html .close {
  color: #fff;
}

.check {
  width: 150px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}

p {
  font-size: 16px;
  margin: 20px 0;
}

html .sb {
  padding: 20px;
  padding-right: 86px;
  padding-left: 86px;
  border: 1px solid;
  background-color: #000;
  color: #fff;
}
html.dark .modal {
  background-color: black;
}
</style>
