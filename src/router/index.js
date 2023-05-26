import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PageNotFound from "../views/PageNotFound.vue";
import store from "../store/index";

function guardMyroute(to, from, next) {
  var isAuthenticated = false;
  if (store.getters.isLoggedIn) isAuthenticated = true;
  else isAuthenticated = false;
  if (isAuthenticated || to.name === "login") {
    next();
  } else {
    router.push({ name: "login" });
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "SMC REPORT",
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: {
        title: "SMC Report | LOGIN",
      },
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/AdminView.vue"),
      beforeEnter: guardMyroute,
      meta: {
        title: "SMC Report | Admin",
      },
      children: [
        {
          path: "",
          alias: "profile",
          name: "adminProfile",
          component: () => import("../views/AdminProfile.vue"),
          props: true,
          meta: {
            title: "SMC Report | Admin Profile",
          },
        },
        {
          path: "create-article",
          name: "createPost",
          component: () => import("../views/AdminCreatePost.vue"),
          meta: {
            title: "SMC Report | Create Post",
          },
        },
        {
          path: "create-video-article",
          name: "createVideoPost",
          component: () => import("../views/AdminCreateVideoPost.vue"),
          meta: {
            title: "SMC Report | Create Video Post",
          },
        },
        {
          path: "drafts",
          name: "drafts",
          component: () => import("../views/AdminDrafts.vue"),
          meta: {
            title: "SMC Report | Drafts",
          },
        },
        {
          path: "articles",
          name: "articles",
          component: () => import("../views/AdminArticles.vue"),
          meta: {
            title: "SMC Report | Articles",
          },
        },
        {
          path: "reviews",
          name: "reviews",
          component: () => import("../views/AdminReviews.vue"),
          meta: {
            title: "SMC Report | Reviews",
          },
        },
      ],
    },
    {
      path: "/geo",
      name: "geoReport",
      component: () => import("../views/GeoReport.vue"),
      meta: {
        title: "SMC Report | Geopolitics Reports",
      },
    },
    {
      path: "/eco",
      name: "ecoReport",
      component: () => import("../views/EcoReport.vue"),
      meta: {
        title: "SMC Report | Economic Reports",
      },
    },
    {
      path: "/bc",
      name: "bcReport",
      component: () => import("../views/BcReport.vue"),
      meta: {
        title: "SMC Report | Blockchain Reports",
      },
    },
    {
      path: "/eq",
      name: "eqReport",
      component: () => import("../views/EqReport.vue"),
      meta: {
        title: "SMC Report | Equity Reports",
      },
    },
    {
      path: "/latest",
      name: "latestReports",
      component: () => import("../views/LatestReports.vue"),
      meta: {
        title: "SMC Report | Latest Reports",
      },
    },
    {
      path: "/videos",
      name: "video",
      component: () => import("../views/Videos.vue"),
      meta: {
        title: "SMC Report | Video Headlines",
      },
    },
    {
      path: "/post/:slug",
      name: "post",
      component: () => import("../components/BlogPost.vue"),
      props: true,
      meta: {
        title: `SMC Report | Blog Post`,
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: PageNotFound,
      meta: { title: "SMC Report |Page Not Found" },
    },
  ],
});

router.beforeEach((to) => {
  document.title = to.meta.title;
});

export default router;
