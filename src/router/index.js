import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/profile/:slug",
      name: "adminProfile",
      component: () => import("../components/AdminProfile.vue"),
      props: true,
    },
    {
      path: "/geo",
      name: "geoReport",
      component: () => import("../views/GeoReport.vue"),
    },
    {
      path: "/eco",
      name: "ecoReport",
      component: () => import("../views/EcoReport.vue"),
    },
    {
      path: "/bc",
      name: "bcReport",
      component: () => import("../views/BcReport.vue"),
    },
    {
      path: "/eq",
      name: "eqReport",
      component: () => import("../views/EqReport.vue"),
    },
    {
      path: "/post/:slug",
      name: "post",
      component: () => import("../components/BlogPost.vue"),
      props: true,
    },
  ],
});

export default router;
