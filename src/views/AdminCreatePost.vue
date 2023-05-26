<template>
  <section class="px-5" id="createPosts">
    <p class="text-2xl md:text-3xl font-semibold md:font-bold py-5">
      Create article
    </p>
    <form class="flex flex-col gap-12">
      <div class="" id="title">
        <label for="title">Title*</label><br />
        <input
          type="text"
          name="title"
          v-model="title"
          class="h-[2.5rem] bg-gray-100 p-1 focus:outline-none focus:border-b-green-300 border-b w-full border-b-black dark:border-b-white"
          id="title"
        />
      </div>
      <div class="" id="subtitle">
        <label for="subtitle">Sub Topic</label><br />
        <input
          type="text"
          name="title"
          v-model="subtitle"
          class="h-[2.5rem] bg-gray-100 p-1 focus:outline-none focus:border-b-green-300 border-b w-full border-b-black dark:border-b-white"
          id="subtitle"
        />
      </div>
      <div class="" id="mainImage">
        <label for="article image">Main Image*</label>
        <figure
          class="w-full relative h-[12rem] overflow-hidden rounded-xl"
          id="article-image"
        >
          <div
            after="Drag and drop images here or select from your device"
            class="before:border-dashed before:border-2 before:border-gray-500 rounded-xl before:rounded-xl before:content-[url(@/assets/icons/svgs/admin/remix-icons/Vector.png)] after:content-[attr(after)] before:flex before:justify-center before:items-center before:w-full before:h-[12rem] before:backdrop-brightness-[.6] before:absolute z-50"
          >
            <img v-if="file" :src="image" alt="" class="object-cover w-full" />
            <div v-else class="w-full h-[12rem] orunded-xl"></div>
          </div>
          <input
            type="file"
            @change="Changeimage"
            required
            :style="`background:url(${file}) no-repeat`"
            class="w-full absolute opacity-0 top-0 h-full bg-center bg-contain bg-gray-100 item-center justify-center cursor-pointer"
            name="article image"
            accept="image/*"
          />
        </figure>
        <i class="font-[500] text-blue-400 text-xs"
          >recommended: images should be 1280px x 860px for best resolution</i
        >
      </div>
      <div class="" id="body">
        <label for="article image">Body*</label>
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
        <label for="summary">Key Notes*</label>
        <textarea
          name="summary"
          id=""
          cols="30"
          rows="4"
          class="bg-gray-100 dark:bg-transparent p-1 focus:outline-none focus:border-b-green-300 border-b w-full border-b-black dark:border-b-white"
          v-model="summary"
        ></textarea>
      </div>
      <div class="grid grid-rows-2 lg:gap-12 gap-6" id="metadata">
        <div class="border border-gray-400 rounded-lg capitalize">
          <p class="p-3 font-bold">Add to a Category*</p>
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
                :id="`category-${choice.slug}`"
                v-model="categorySel.selected"
              />
              <label :for="`category-${choice.slug}`" class="lg:px-4 pl-2">{{
                choice.cat_title
              }}</label>
            </div>
          </div>
        </div>
        <div class="border border-gray-400 rounded-lg h-min">
          <div class="p-3">
            <p class="font-semibold">Get featured on the Home screen</p>
            <p class="lg:text-md text-sm">
              Tag this post as <i>Editor's Pick</i> to get featured on the home
              screen
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
      <div
        class="w-full md:flex-row items-center flex flex-col gap-4 mb-6"
        id="buttons"
      >
        <div class="w-full md:w-auto flex justify-center">
          <button
            class="bg-white text-black border border-black rounded-lg md:rounded-sm p-3 w-full mx-auto"
            @click="savePost"
          >
            Add To Draft
          </button>
        </div>
        <div class="w-full md:w-auto flex justify-center">
          <button
            type="submit"
            class="bg-black dark:bg-white/60 text-white dark:text-black p-3 w-full rounded-lg md:rounded-sm mx-auto"
            @click="publishPost"
          >
            Upload
          </button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import { useToast } from "vue-toastification";
import { mapGetters } from "vuex";
import { getAPI } from "../axios";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

ClassicEditor.create(document.querySelector("#snippet-classic-editor"), {
  plugins: [
    // SimpleUploadAdapter
  ],
  toolbar: {},
  simpleUpload: {
    uploadUrl: `${import.meta.env.VITE_API_URL}/ckeditor/upload/`,
    withCredentials: false,
    error: {
      message:
        "The image upload failed because the image was too big (max 1.5MB).",
    },
  },
  // cloudServices: {
  //   // All predefined builds include the Easy Image feature.
  //   // Provide correct configuration values to use it.
  //   // Read more about Easy Image - https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/easy-image.html.
  //   // For other image upload methods see the guide - https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/image-upload.html.
  // },
})
  .then((editor) => {
    window.editor = editor;
  })
  .catch((err) => {});

export default {
  setup(props) {
    const toast = useToast();
    return { toast };
  },
  components: {
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      title: "",
      subtitle: "",
      editorpost: false,
      editorData: "",
      editor: ClassicEditor,

      editorConfig: {
        // toolbar: ["bold", "italic", "|", "link"],
        ckfinder: {
          uploadUrl: `${import.meta.env.VITE_API_URL}/ckeditor/upload/`,
          withCredentials: false,
        },
        // image: {
        //   toolbar: ["toggleImageCaption", "imageTextAlternative"],
        // },
      },
      image: "",
      summary: "",
      file: "",
      categorySel: {
        selected: [],
        autocompleteItems: this.categoriesItem,
      },
    };
  },
  computed: mapGetters({
    user: "getUserState",
  }),
  methods: {
    Changeimage(e) {
      let file = e.target.files[0];
      let imageSRC = URL.createObjectURL(file);
      this.file = file;
      this.image = imageSRC;
      console.log(this.file, this.image);
    },
    async publishPost(e) {
      e.preventDefault();
      let data = new FormData();
      //   Remove special characters from postSlug
      let postSlug = this.title
        .replaceAll(" ", "-")
        .replace(/[^a-zA-Z0-9-]/g, "")
        .toLowerCase();
      data.append("title", this.title);
      data.append("author", this.user.slug);
      data.append("categories", this.categorySel.selected);
      data.append("picked", this.editorpost);
      data.append("summary", this.summary);
      data.append("body", this.editorData);
      data.append("mainImage", this.file);
      data.append("slug", postSlug);
      data.append("sub_topic", this.subtitle);
      console.log(
        postSlug,
        data,
        this.title.replaceAll(" ", "-").toLowerCase()
      );

      try {
        this.toast.info("Creating Post...", {
          timeout: false,
          id: "login",
        });
        await this.$store
          .dispatch("userModule/createPost", {
            formData: data,
            slug: this.user.slug,
            postSlug: this.title.replaceAll(" ", "-").toLowerCase(),
            auth: this.user.token,
          })
          .then((e) => {
            this.toast.dismiss("login");
            this.toast.success("Post Successful!", {
              timeout: 2000,
              id: "success",
            });
            this.$router.go();
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {
        this.$emit("hasError", true, error.response.status);
        console.log(error);
        this.toast.dismiss("login");
        setTimeout(() => {
          this.$emit("hasError", false);
        }, 4000);
      }
    },
    async savePost(e) {
      e.preventDefault();
      let data = new FormData();
      data.append("title", this.title);
      data.append("author", this.user.slug);
      data.append("categories", this.categorySel.selected);
      data.append("picked", this.editorpost);
      data.append("summary", this.summary);
      data.append("body", this.editorData);
      data.append("mainImage", this.file);
      data.append("slug", this.title.split(" ").join("").toLowerCase());

      let draft = {
        title: this.title,
        author: this.user.slug,
        categories: this.categorySel.selected,
        picked: this.editorpost,
        summary: this.summary,
        body: this.editorData,
        mainImage: this.image,
        slug: this.title.split(" ").join("").toLowerCase(),
      };

      let post = {
        formData: data,
        slug: this.user.slug,
        postSlug: this.title.replaceAll(" ", "-").toLowerCase(),
      };
      this.drafts.push(post);
      this.$store.dispatch("userModule/reviewPost", post);
      // console.log(this.drafts);
    },
  },
  created() {
    getAPI
      .get("/categories")
      .then((response) => {
        // console.log(response);
        this.categorySel.autocompleteItems = response.data;
      })
      .catch((err) => {
        console.log("Error fetching categories", err);
      });
  },
};
</script>

<style scoped></style>
