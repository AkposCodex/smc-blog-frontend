<template>
  <head>
    <title>SMC DESK | {{ user.name + "'s Profile" }}</title>
  </head>
  <header class="md:flex justify-start shadow-md py-3 w-full px-12">
    <div class="flex md:w-full gap-9 items-center lg:justify-between">
      <button class="w-1/5 lg:hidden" @click="isMenuOpen = !isMenuOpen">
        <BaseIcon name="hamburger" v-if="!isMenuOpen" />
        <BaseIcon name="close" v-if="isMenuOpen" />
      </button>
      <div class="w-3/5 md:w-2/5 flex justify-start m-0">
        <img src="@/assets/icons/logo.png" alt="" class="w-min" />
      </div>
      <div class="hidden lg:block" id="search" z-50>
        <form
          @submit.prevent="searchMini(word)"
          class="flex md:gap-4 gap-0 items-center rounded-lg w-2/5 md:w-full mx-auto bg-gray-200 px-6 py-1"
        >
          <BaseIcon name="search" class="text-gray-800" />
          <input
            type="text"
            placeholder="search posts"
            class="outline-none w-full bg-gray-200"
            v-model="word"
          />
        </form>
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
      </div>
    </div>
  </header>
  <a
    v-if="isMenuOpen"
    class="flex absolute bg-white dark:bg-[#272626] md:mt-[4.4rem] mt-[3.5rem] h-[100%] overflow-scroll md:mt-[3.5rem] z-50 items-center text-left flex-col space-y-10 w-full capitalize border-t border-black dark:border-white top-0"
  >
    <div class="w-4/5 mt-9">
      <div class="w-4/5 flex pb-6 gap-6">
        <figure class="w-[70px]">
          <img
            v-if="user.profileImage"
            :src="user.profileImage"
            alt=""
            class="rounded-full"
          />
          <img v-else src="@/assets/icons/Ellipse.png" alt="" />
        </figure>
        <div class="flex flex-col justify-center w-min items-start">
          <p class="font-bold text-xl font-serifFamilty">{{ user.name }}</p>
          <p class="text-s font-serifFamilty text-gray-400">Editor</p>
        </div>
      </div>
      <hr class="w-full border" />
    </div>
    <div class="flex flex-col justify-center gap-10 w-4/5 pt-5 !m-0">
      <a
        @click="
          pages = 1;
          isMenuOpen = false;
        "
        class="font-bold w-max flex gap-3"
        :class="{
          ' text-blue-600 decoration-4': pages === 1,
        }"
      >
        <img src="@/assets/icons/admin/User/Vector.png" alt="" />
        <p>Profile</p>
      </a>
      <a
        @click="
          pages = 4;
          isMenuOpen = false;
        "
        class="font-bold w-max flex gap-3"
        :class="{
          ' text-blue-600 decoration-4': pages === 4,
        }"
      >
        <img src="@/assets/icons/admin/Edit/Vector.png" alt="" />
        <p>Create new article</p>
      </a>
      <a
        @click="
          pages = 2;
          isMenuOpen = false;
        "
        class="font-bold w-max flex gap-3"
        :class="{
          ' text-blue-600 decoration-4': pages === 2,
        }"
      >
        <img src="@/assets/icons/admin/File/Vector.png" alt="" />
        <p>Your articles</p>
      </a>
      <a
        @click="
          pages = 3;
          isMenuOpen = false;
        "
        class="font-bold w-max flex gap-3"
        :class="{
          ' text-blue-600 decoration-4': pages === 3,
        }"
      >
        <img src="@/assets/icons/admin/File/Vector-1.png" alt="" />
        <p>Drafts</p>
      </a>
      <a
        @click="logout()"
        class="font-bold w-max flex gap-3"
        active-class="text-[#366bff]"
        exact-active-class="text-[#366bff]"
      >
        <img src="@/assets/icons/admin/Interface/Vector.png" alt="" />
        <p>Log out</p>
      </a>
      <hr class="w-full border" />
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
  </a>
  <div class="pb-6 pt-2 lg:hidden" id="search" z-50>
    <form
      @submit.prevent="searchMini(word)"
      class="flex md:gap-4 gap-0 items-center rounded-lg w-2/5 mx-auto bg-gray-200 px-6 py-1"
    >
      <BaseIcon name="search" class="text-gray-800" />
      <input
        type="text"
        placeholder="search posts"
        class="outline-none w-full bg-gray-200"
        v-model="word"
      />
      <!-- <button
        @click="searchMini(word)"
        class="bg-blue-600 uppercase text-white p-2 font-bold"
      >
        Search
      </button> -->
    </form>
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
  </div>
  <a
    @click="results = null"
    class="shadow mx-auto h-[100vh] w-full z-30 bg-transparent absolute transition-all"
    v-show="results"
  >
    <div class="w-2/5"></div>
  </a>
  <SavedModal v-show="showModal" @close-modal="showModal = false" />
  <div class="lg:grid grid-cols-[1fr_3fr] h-[100vh] overflow-scroll">
    <div
      class="w-full  hidden lg:flex items-center flex-col bg-gray-100"
    >
      <div class="w-4/5 mt-9">
        <div class="w-4/5 flex pb-6 gap-6">
          <figure class="w-[70px]">
            <img
              v-if="user.profileImage"
              :src="user.profileImage"
              alt=""
              class="rounded-full"
            />
            <img v-else src="@/assets/icons/Ellipse.png" alt="" />
          </figure>
          <div class="flex flex-col justify-center w-min items-start">
            <p class="font-bold text-xl font-serifFamilty">{{ user.name }}</p>
            <p class="text-s font-serifFamilty text-gray-400">Editor</p>
          </div>
        </div>
        <hr class="w-full border" />
      </div>
      <div class="flex flex-col justify-center gap-10 w-4/5 pt-5 !m-0">
        <a
          @click="
            pages = 1;
            isMenuOpen = false;
          "
          class="font-bold w-max flex gap-3"
          :class="{
            ' text-blue-600 decoration-4': pages === 1,
          }"
        >
          <img src="@/assets/icons/admin/User/Vector.png" alt="" />
          <p>Profile</p>
        </a>
        <a
          @click="
            pages = 4;
            isMenuOpen = false;
          "
          class="font-bold w-max flex gap-3"
          :class="{
            ' text-blue-600 decoration-4': pages === 4,
          }"
        >
          <img src="@/assets/icons/admin/Edit/Vector.png" alt="" />
          <p>Create new article</p>
        </a>
        <a
          @click="
            pages = 2;
            isMenuOpen = false;
          "
          class="font-bold w-max flex gap-3"
          :class="{
            ' text-blue-600 decoration-4': pages === 2,
          }"
        >
          <img src="@/assets/icons/admin/File/Vector.png" alt="" />
          <p>Your articles</p>
        </a>
        <a
          @click="
            pages = 3;
            isMenuOpen = false;
          "
          class="font-bold w-max flex hidden gap-3"
          :class="{
            ' text-blue-600 decoration-4': pages === 3,
          }"
        >
          <img src="@/assets/icons/admin/File/Vector-1.png" alt="" />
          <p>Drafts</p>
        </a>
        <a
          @click="logout()"
          class="font-bold w-max flex gap-3"
          active-class="text-[#366bff]"
          exact-active-class="text-[#366bff]"
        >
          <img src="@/assets/icons/admin/Interface/Vector.png" alt="" />
          <p>Log out</p>
        </a>
        <hr class="w-full border" />
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
    </div>
    <div class="w-full">
      <section class="pt-2 px-5 w-full mx-auto" v-if="pages == 1" id="profile">
        <p class="text-xl font-bold p-5 mb-9">Profile</p>
        <div class="lg:w-3/5 mx-auto">
          <div
            class="flex flex-col lg:flex-row gap-4 mb-9 relative items-center"
          >
            <figure class="w-[150px]">
              <div
                class="before:content-[url(@/assets/icons/admin/remix-icons/Vector.png)] before:flex before:justify-center before:items-center before:w-[150px] before:h-[150px] before:rounded-full before:backdrop-brightness-50 before:absolute z-50"
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
                  class="rounded-full h-[150px] w-[150px]"
                />
              </div>
              <input
                v-if="user.profileImage"
                type="file"
                @change="changeProfileImage"
                required
                :style="`background:url(${user.profileImage})`"
                class="w-[150px] opacity-0 absolute top-0 rounded-full h-[150px] bg-center bg-contain border-black bg-gray-200 item-center justify-center"
                accept="image/*"
              />
              <img v-else src="@/assets/icons/Ellipse.png" alt="" />
            </figure>
            <div class="flex flex-col gap-2">
              <p class="font-bold text-xl font-serifFamilty">{{ user.name }}</p>
              <p class="bg-gray-200 px-4 py-1 text-xs rounded-md">
                Articles Written
                {{ user.posts.length }}
              </p>
              <div class="flex justify-center items-center">
                <p v-if="user.bio" class="md:text-left text-center w-full">
                  {{ user.bio }}
                </p>
                <p v-else>No Bio</p>
              </div>
            </div>
          </div>
          <div class="">
            <p class="pb-9 font-bold text-xl">Edit Profile</p>
            <div class="pb-9">
              <p class="font-bold">Name</p>
              <input
                v-model="user.name"
                type="text"
                class="h-[2.5rem] bg-gray-200 p-1 focus:outline-none focus:border-4 focus:border-b-green-300 border-2 w-full border-b-gray-400"
              />
            </div>
            <div class="pb-9">
              <p class="font-bold">Bio</p>
              <textarea
                cols="30"
                v-model="user.bio"
                rows="5"
                class="bg-gray-200 p-1 focus:outline-none focus:border-4 focus:border-b-green-300 border-2 w-full border-b-gray-400"
              ></textarea>
            </div>
            <button
              @click="UpdateProfile"
              class="bg-black w-full h-[3rem] text-white rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </section>
      <section class="" v-if="pages == 2" id="articles">
        <div class="flex md:flex-row flex-col  w-full" id="main-header">
          <p class="text-xl font-bold p-5">Your Articles</p>
          <nav
            class="flex flex-row gap-4 p-5 dark:border-white overflow-y-auto scrollbar-hide"
          >
            <button
              @click="showPost('et')"
              class="font-bold"
              :class="{
                'underline underline-offset-[10px] text-blue-600 decoration-4':
                  et,
              }"
            >
              Equity
            </button>
            <button
              @click="showPost('bc')"
              class="font-bold"
              :class="{
                'underline underline-offset-[10px] text-blue-600 decoration-4':
                  bc,
              }"
            >
              Blockchain
            </button>
            <button
              @click="showPost('ge')"
              class="font-bold"
              :class="{
                'underline underline-offset-[10px] text-blue-600 decoration-4':
                  ge,
              }"
            >
              Geopolitical
            </button>
            <button
              @click="showPost('ec')"
              class="font-bold"
              :class="{
                'underline underline-offset-[10px] text-blue-600 decoration-4':
                  ec,
              }"
            >
              Economics
            </button>
          </nav>
        </div>
        <main class="bg-gray-100 lg:bg-white p-5">
          <div
            v-for="post in posts"
            v-if="posts.length > 0"
            class="flex flex-col lg:flex-row gap-4 lg:h-[20vh] items-end lg:flex-row-reverse"
          >
            <div v-if="post.mainImage" class=" sm:h-[12rem] h-[8rem] lg:h-full w-full lg:w-[50%]">
              <img
                :src="post.mainImage"
                alt="blog post"
                class="lg:w-4/5 w-full rounded-lg h-full object-cover"
              />
            </div>
            <div class="lg:w-[50%] w-full">
              <div class="mb-5">
                <h3 class="font-bold font-baseFamily uppercase leading-5">
                  {{ post.title }}
                </h3>
                <h3
                  class="font-serifFamily text-gray-500 text-[11px] mb-3 leading-5"
                >
                  {{ post.publishedAt }}
                </h3>
                <p class="text-xs leading-4">
                  {{ post.summary }}
                </p>
              </div>
              <div class="grid grid-cols-2 gap-4 w-4/5">
                <button
                  class="bg-black rounded-md text-white px-3 py-1"
                  @click="
                    this.$router.push({
                      name: 'post',
                      params: { slug: post.slug },
                    })
                  "
                >
                  Read More
                </button>
                <button class="bg-white rounded-md border border-black px-3 py-1">
                  Edit
                </button>
              </div>
            </div>
          </div>
          <div class="w-full flex justify-center items-center h-[50vh]" v-else>
            <h1 class="font-bold text-black text-2xl">No Posts</h1>
          </div>
        </main>
      </section>
      <section class="" v-if="pages == 3" id="drafts"></section>
      <section class="px-5" v-if="pages == 4" id="createPosts">
        <p class="text-xl font-bold py-5">Create Post</p>
        <div class="flex flex-col gap-12">
          <div class="" id="title">
            <label for="" class="font-bold">Title</label><br />
            <input
              type="text"
              name="title"
              v-model="title"
              class="h-[2.5rem] bg-gray-200 p-1 focus:outline-none focus:border-4 focus:border-b-green-300 border-2 w-full border-b-gray-400"
              id=""
            />
          </div>
          <div class="" id="mainImage">
            <label for="article image" class="font-bold">Main Image</label>
            <figure class="w-full relative" id="article-image">
              <div
                class="before:border-dashed before:border-4 before:border-gray-500 rounded-xl before:rounded-xl before:content-[url(@/assets/icons/admin/remix-icons/Vector.png)] before:flex before:justify-center before:items-center before:w-full before:h-[12rem] before:backdrop-brightness-[.6] before:absolute z-50"
              >
                <img
                  v-if="file"
                  :src="image"
                  alt=""
                  class="object-cover h-[12rem] w-full rounded-xl"
                />
                <div v-else class="w-full h-[12rem] orunded-xl"></div>
              </div>
              <input
                v-if="user.profileImage"
                type="file"
                @change="Changeimage"
                required
                :style="`background:url(${file}) no-repeat`"
                class="w-full absolute opacity-0 top-0 h-full bg-center bg-contain border-black bg-gray-200 item-center justify-center"
                name="article image"
                accept="image/*"
              />
              <img v-else src="@/assets/icons/Ellipse.png" alt="" />
            </figure>
            <i class="font-[500] text-blue-400 text-xs"
              >recommended: images should be 1280px x 860px for best
              resolution</i
            >
          </div>
          <div class="" id="body">
            <label for="article image" class="font-bold">Body</label>
            <div class="-z-50">
              <ckeditor
                required
                id="editor"
                :editor="editor"
                v-model="editorData"
                :config="editorConfig"
              />
            </div>
          </div>
          <div class="" id="keyNotes">
            <label for="summary" class="font-bold">Key Notes</label>
            <textarea
              name="summary"
              id=""
              cols="30"
              rows="4"
              class="bg-gray-200 p-1 focus:outline-none focus:border-4 focus:border-b-green-300 border-2 w-full border-b-gray-400"
              v-model="summary"
            ></textarea>
          </div>
          <div class="grid grid-rows-2 lg:gap-12 gap-6" id="metadata">
            <div class="border border-gray-400 rounded-lg capitalize">
              <p class="p-3 font-bold">Add to a Category</p>
              <hr class="w-full border-gray-400" />
              <div class="lg:p-8 p-2 lg:text-md text-sm">
                <div
                  class="my-4"
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
            <div class="border border-gray-400 rounded-lg h-min">
              <div class="p-3">
                <p class="font-[500]">Get featured on the Home screen</p>
                <p class="lg:text-md text-sm">
                  Tag this post as <i>Editor's Pick</i> to get featured on the
                  home screen
                </p>
              </div>
              <hr class="border-gray-400 mt-5" />
              <div class="lg:p-8 p-4 flex gap-3">
                <label class="toggler-wrapper style-3">
                  <input type="checkbox" name="editor" v-model="editorpost" />
                  <div class="toggler-slider">
                    <div class="toggler-knob"></div>
                  </div>
                </label>
                <p class="font-bold">Feature on Home Screen</p>
              </div>
            </div>
          </div>
          <div class="w-full flex flex-col gap-4" id="buttons">
            <div class="w-full flex justify-center">
              <button
                class="bg-black text-white p-3 uppercase w-full rounded-lg mx-auto"
                @click="publishPost()"
              >
                Upload
              </button>
            </div>
            <div class="w-full flex justify-center mb-12">
              <button
                class="bg-white text-black border-2 border border-black rounded-lg p-3 uppercase w-full mx-auto"
                @click="savePost()"
              >
                Add To Draft
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import BlogCardList from "../components/BlogCardList.vue";
import { getAPI } from "../axios";
import SavedModal from "../components/Modal.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";
import { mapGetters } from "vuex";
import BaseIcon from "../components/BaseIcon.vue";
import BaseButton from "../components/BaseButton.vue";

export default {
  components: {
    BlogCardList,
    SavedModal,
    BaseIcon,
    ckeditor: CKEditor.component,
    BaseButton,
  },
  data() {
    return {
      bc: false,
      et: false,
      ec: false,
      pages: 2,
      showModal: false,
      ge: false,
      showAddPost: false,
      title: "",
      isMenuOpen: false,
      summary: "",
      image: "",
      drafts: [],
      posts: [],
      file: "",
      proFile: "",
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
      word: "",
      results: null,
    };
  },
  computed: mapGetters({
    user: "getUserState",
  }),
  created() {
    this.showPost("et");
    getAPI
      .get("/categories")
      .then((response) => {
        console.log(response);
        this.categorySel.autocompleteItems = response.data;
      })
      .catch((err) => {});
  },
  methods: {
    logout() {
      this.$store
        .dispatch("userModule/logout")
        .then(this.$router.push("/admin"));
    },
    async searchMini(e) {
      await getAPI
        .get(`/posts?name=${e}&?author=${this.user.slug}`)
        .then((response) => {
          this.results = response.data;
        });
    },
    publishPost() {
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
    savePost() {
      let data = new FormData();
      data.append("title", this.title);
      data.append("author", this.user.slug);
      data.append("categories", this.categorySel.selected);
      data.append("picked", this.editorpost);
      data.append("summary", this.summary);
      data.append("body", this.editorData);
      data.append("mainImage", this.file);
      data.append("slug", this.title.split(" ").join("").toLowerCase());

      let post = {
        formData: data,
        slug: this.user.slug,
      };
      this.drafts = post;
      console.log(this.drafts);

      // this.$router.go();
    },
    UpdateProfile() {
      let data = new FormData();
      data.append("image", this.proFile);
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
    Changeimage(e) {
      let file = e.target.files[0];
      let imageSRC = URL.createObjectURL(file);
      this.file = file;
      this.image = imageSRC;
    },
    changeProfileImage(e) {
      let file = e.target.files[0];
      let imageSRC = URL.createObjectURL(file);
      this.proFile = imageSRC;
      this.image = imageSRC;
    },
    showblog() {
      this.showBlog = true;
      this.drafts = false;
      this.showAddPost = false;
    },
    showDrafts() {
      this.showBlog = false;
      this.showAddPost = false;
      this.drafts = true;
    },
    async showPost(e) {
      switch (e) {
        case "et":
          this.ge = false;
          this.bc = false;
          this.ec = false;
          this.et = true;
          break;
        case "bc":
          this.ge = false;
          this.et = false;
          this.ec = false;
          this.bc = true;
          break;
        case "ge":
          this.et = false;
          this.bc = false;
          this.ec = false;
          this.ge = true;
          break;
        case "ec":
          this.ge = false;
          this.et = false;
          this.bc = false;
          this.ec = true;
          break;

        default:
          break;
      }
      let res = await this.$store.dispatch("userModule/loadPostsByGenre", {
        slug: this.user.slug,
        category: e,
      });
      console.log(res);
      this.posts = res;
      console.log(this.posts);
      // blog;
      this.showBlog = false;
      this.drafts = false;
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
