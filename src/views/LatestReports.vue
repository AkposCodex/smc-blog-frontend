<script>
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
import BlogCard from "../components/BlogCard.vue";
import { getAPI } from "../axios";

export default {
  name: "LatestReports",
  data() {
    return {
      blogPosts: [],
      fall: false,
      loading: true,
      isMobile: false,
    };
  },
  components: {
    AppHeader,
    AppFooter,
    BlogCard,
  },
  async created() {
    await getAPI
      .get("/post/review?state=Approved")
      .then((response) => {
        console.log(response.data.results.length);
        if (response.data.results.length === 0) this.loading = false;
        response.data.results.forEach(async (e) => {
          console.log(e);
          await getAPI.get(`posts/${e.post}`).then(async (e) => {
            let repo = e.data;
            console.log(repo.author, repo);
            if (repo.author === "sir-mapy") {
              await getAPI.get(`/users/${repo.author}`).then((response) => {
                // console.log(email, response.data[0].name);
                this.blogPosts.push({
                  title: repo.title,
                  slug: repo.slug,
                  picked: repo.picked,
                  publishedAt: repo.publishedAt,
                  summary: repo.summary,
                  body: repo.body,
                  mainImage: repo.mainImage,
                  categories: repo.categories,
                  author: response.data[0].name,
                });
                // console.log(this.blogPosts);
                this.loading = true;
              });
            } else {
              await getAPI.get(`/users/${repo.author}`).then((response) => {
                // console.log(email, response.data[0].name);
                console.log(response);
                this.blogPosts.push({
                  title: repo.title,
                  slug: repo.slug,
                  picked: repo.picked,
                  publishedAt: repo.publishedAt,
                  summary: repo.summary,
                  body: repo.body,
                  mainImage: repo.mainImage,
                  categories: repo.categories,
                  author: response.data.name,
                });
                this.loading = false;
                console.log(response);
                console.log(this.blogPosts);
              });
            }
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<template>
  <AppHeader></AppHeader>
  <main class="pb-6 mb-20 font-baseFamily mx-auto">
    <section class="p-4 w-full mb-12">
      <p class="pb-8 text-2xl font-bold text-center">Latest Updates</p>
      <div
        class="font-baseFamily text-center font-bold text-4xl mt-32 mb-32"
        v-if="!blogPosts || !blogPosts.length"
      >
        <h1>No New Posts Here</h1>
      </div>
      <template v-else>
        <div
          class="grid mx-auto w-full grid-cols-1 gap-6 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
        >
          <BlogCard :post="post" v-for="post in blogPosts" :key="post.slug" />
          <BlogCard :post="post" v-for="post in blogPosts" :key="post.slug" />
          <BlogCard :post="post" v-for="post in blogPosts" :key="post.slug" />
        </div>
      </template>
    </section>
  </main>
  <AppFooter />
</template>
