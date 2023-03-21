<template>
  <head>
    <title>SMC DESK | {{ user.name + "'s Profile" }}</title>
  </head>
  <SavedModal v-show="showModal" @close-modal="showModal = false" />

  <div class="pt-12 max-w-3xl md:px-6 px-3 mx-auto">
    <div class="flex lg:w-2/5 items-center mb-4 gap-4">
      <p
        class="bg-black rounded-xl text-white text-lg w-min p-3 font-bold dark:bg-white dark:text-black"
      >
        EDITOR
      </p>
      <button
        class="bg-red-400 py-2 px-6 text-xxs font-bold rounded-full text-white"
        @click="logout()"
      >
        LOG OUT
      </button>
    </div>

    <div class="md:w-4/5 mx-auto">
      <div class="flex justify-center">
        <figure class="w-[120px]">
          <img
            v-if="user.profileImage"
            :src="user.profileImage"
            alt=""
            class="rounded-full"
          />
          <img v-else src="@/assets/icons/Ellipse.png" alt="" />
        </figure>
      </div>
      <div class="save-btn flex justify-center items-center pt-5">
        <button
          class="border border-gray-300 px-3 rounded-xl savebtn"
          @click="showModal = true"
        >
          Edit Profile
        </button>
      </div>
      <div class="flex justify-center md:gap-12 gap-6 items-center">
        <p class="font-bold text-xl font-serifFamilty">{{ user.name }}</p>
        <p>
          <span class="text-gray-400 font-bold">Articles Written </span
          >{{ user.posts.length }}
        </p>
      </div>
      <div class="flex justify-center items-center">
        <p v-if="user.bio">
          <i>{{ user.bio }}</i>
        </p>
        <p v-else>No Bio</p>
      </div>
    </div>
    <nav
      class="flex gap-4 py-2 mb-12 border-b border-black dark:border-white overflow-y-auto scrollbar-hide"
    >
      <button
        @click="showblog()"
        class="font-bold"
        :class="{ 'text-blue-400': showBlog }"
      >
        Posts
      </button>
      <button
        @click="showPost()"
        class="font-bold"
        :class="{ 'text-blue-400': showAddPost }"
      >
        Create Post
      </button>
    </nav>

    <section class="" v-show="showAddPost">
      <label for="">Title</label><br />
      <input
        type="text"
        name="title"
        v-model="title"
        class="w-full border-b mb-8 bg-gray-200 dark:bg-gray-700 h-[3rem] border-black"
        id=""
      />
      <br />
      <label for="summary">Post Summary</label>
      <br />
      <textarea
        name="summary"
        id=""
        cols="30"
        rows="4"
        class="w-full border-b mb-8 bg-gray-200 dark:bg-gray-700 border-black"
        v-model="summary"
      ></textarea>
      <input
        type="file"
        @change="Changeimage"
        required
        class="border-dashed border-2 mb-12 dark:bg-gray-700 lg:py-[10%] lg:px-[30%] py-[20%] px-[10%] before:content-['Upload Main Image'] before:inline-block border-black bg-gray-200 item-center justify-center w-full h-[12rem]"
        accept="image/*"
      />

      <div class="mb-12 -z-50">
        <ckeditor
          required
          id="editor"
          :editor="editor"
          v-model="editorData"
          :config="editorConfig"
        />
      </div>

      <div class="grid grid-cols-2 lg:gap-12 gap-6 mb-12">
        <div class="border border-gray-700 capitalize">
          <p class="p-3">Add to a Category</p>
          <hr class="w-full border-black mt-5" />
          <div class="lg:p-8 p-2 lg:text-md text-sm">
            <div
              class=""
              v-for="choice in categorySel.autocompleteItems"
              :key="choice.slug"
            >
              <input
                type="radio"
                name="category"
                :value="choice.slug"
                id="category"
                v-model="categorySel.selected"
              />
              <label for="category" class="lg:px-4 pl-2">{{
                choice.cat_title
              }}</label>
            </div>
          </div>
        </div>
        <div class="border border-gray-700">
          <p class="p-3">Get featured on the Home screen</p>
          <hr class="border-black mt-5" />
          <div class="lg:p-8 p-2">
            <p class="mb-3 lg:text-md text-sm">
              Tag this post as <i>Editor's Pick</i> to get featured on the home
              screen
            </p>
            <label class="toggler-wrapper style-3">
              <input type="checkbox" name="editor" v-model="editorpost" />
              <div class="toggler-slider">
                <div class="toggler-knob"></div>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div class="w-full flex justify-center mb-12">
        <button
          class="bg-black text-white dark:text-black dark:bg-white p-3 uppercase w-4/5 mx-auto"
          @click="postForm()"
        >
          Upload
        </button>
      </div>
    </section>
    <section class="px-5">
      <BlogCardList v-if="user.posts" :posts="user.posts" v-show="showBlog" />
    </section>
  </div>
</template>
<script>
import BlogCardList from "./BlogCardList.vue";
import { getAPI } from "../axios";
import SavedModal from "./Modal.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";
import { mapGetters } from "vuex";

export default {
  components: {
    BlogCardList,
    SavedModal,
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      showModal: false,
      showBlog: false,
      showAddPost: false,
      title: "",
      summary: "",
      file: "",
      editorpost: false,
      editorData: "",
      editor: ClassicEditor,
      categorySel: {
        selected: [],
        autocompleteItems: this.categoriesItem,
      },
      editorConfig: {
        ckfinder: {
          uploadUrl: "http://127.0.0.1:8000/ckeditor/upload/",

          withCredentials: false,
        },
      },
      eConfig: {
        ui: {
          viewportOffset: { top: 90, right: 10, bottom: 10, left: 10 },
        },
      },
    };
  },
  computed: mapGetters({
    user: "getUserState",
  }),
  created() {
    this.showblog();
  },
  methods: {
    logout() {
      this.$store
        .dispatch("userModule/logout")
        .then(this.$router.push("/admin"));
    },
    postForm() {
      let data = new FormData();
      data.append("title", this.title);
      data.append("author", this.user.slug);
      data.append("categories", this.categorySel.selected);
      data.append("picked", this.editorpost);
      data.append("summary", this.summary);
      data.append("body", this.editorData);
      data.append("mainImage", this.file);
      data.append("slug", this.title.split(" ").join("").toLowerCase());

      this.$store.dispatch("userModule/createPost", {
        formData: data,
        slug: this.user.slug,
      });
      this.$router.go();
    },
    Changeimage(e) {
      let file = e.target.files[0];
      this.file = file;
    },
    showblog() {
      this.showBlog = true;
      this.showAddPost = false;
    },
    showPost() {
      getAPI
        .get("/categories")
        .then((response) => {
          this.categorySel.autocompleteItems = response.data;
        })
        .catch((err) => {});
      this.showBlog = false;
      this.showAddPost = true;
    },
  },
};
</script>
<style>
.ck-editor__editable {
  height: 12rem;
}

.toggler-wrapper {
  display: block;
  width: 45px;
  height: 25px;
  cursor: pointer;
  position: relative;
}

.toggler-wrapper input[type="checkbox"] {
  display: none;
}

.toggler-wrapper input[type="checkbox"]:checked + .toggler-slider {
  background-color: #44cc66;
}

.toggler-wrapper .toggler-slider {
  background-color: #ccc;
  position: absolute;
  border-radius: 100px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-transition: all 300ms ease;
  transition: all 300ms ease;
}

.toggler-wrapper .toggler-knob {
  position: absolute;
  -webkit-transition: all 300ms ease;
  transition: all 300ms ease;
}
.toggler-wrapper.style-3
  input[type="checkbox"]:checked
  + .toggler-slider
  .toggler-knob {
  left: calc(100% - 19px - 3px);
}

.toggler-wrapper.style-3 .toggler-knob {
  width: calc(25px + 6px);
  height: calc(25px + 6px);
  border-radius: 50%;
  left: -3px;
  top: -3px;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 6px rgba(153, 153, 153, 0.75);
  box-shadow: 0 2px 6px rgba(153, 153, 153, 0.75);
}
</style>
