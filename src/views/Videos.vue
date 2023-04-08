<template>
  <AppHeader></AppHeader>
  <main>
    <section>
      <p class="pb-8 text-2xl font-bold text-center">Video Headlines</p>
    </section>
  </main>
  <AppFooter />
</template>
<script>
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";

export default {
  name: "Posts",
  data() {
    return {};
  },

  components: {
    AppHeader,
    AppFooter,
  },
};
</script>
