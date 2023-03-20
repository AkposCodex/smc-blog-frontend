<template>
  <div
    class="absolute bg-black/50 backdrop-blur-xl flex justify-center items-center z-55 w-full h-full"
  >
    <!-- <img class="check" src="../assets/check-icon.png" alt="" /> -->
    <form @submit.prevent="UpdateForm" class="bg-white w-3/5">
      <div
        class="left w-full flex justify-end px-9"
        @click="$emit('close-modal')"
      >
        <p>X</p>
      </div>
      
      <div class="flex flex-col items-center">
          <h1 class="font-serifFamily text-4xl">UPDATE PROFILE</h1>
        <p class="uppercase m-0">Profile Picture</p>
        <input
          type="file"
          @change="Changeimage"
          required
          class="border-dashed border-2 mb-12 py-[12%] px-[12%] before:content-['Upload Main Image'] before:inline-block border-black bg-gray-200 item-center justify-center w-3/5 h-[12rem]"
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
          class="border-b border-black w-4/5"
          type="text"
          v-model="name"
          placeholder="Author Name"
        />
        <br /><br />
        <textarea
          class="border-b border-black w-4/5"
          v-model="newBio"
          placeholder="Bio..."
          cols="23"
        ></textarea>
        <br />
        <button class="bg-black text-white w-4/5 p-3 font-bold">Update</button>
        <br /><br />
        {{ mssg }}
      </div>
    </form>
  </div>
</template>

<script>
import { getAPI } from "../axios";
export default {
  data() {
    return {
      slug: this.$route.params.slug.toString(),
      file: "",
      email: "",
      name: "",
      newBio: "",
      mssg: "",
    };
  },
  created() {
    getAPI
      .get("/users/" + this.slug)
      .then((response) => {
        this.email = response.data.email;
        this.name = response.data.name;
        this.newBio = response.data.bio;
      })
      .catch((err) => {});
  },
  methods: {
    changeimage(e) {
      let file = e.target.files[0];
      this.file = file;
    },
    UpdateForm() {
      let data = new FormData();
      data.append("image", this.file);
      data.append("email", this.email);
      data.append("name", this.name);
      data.append("bio", this.newBio);
      data.append("slug", this.slug);
      getAPI
        .patch("/users/" + this.slug, data, {
          headers: {
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          },
        })
        .then((response) => {
          this.success = true;
          this.mssg = "Updated";
          this.$router.go();
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
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
