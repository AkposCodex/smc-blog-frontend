import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PageNotFound from "../views/PageNotFound.vue";
import store from "../store/index";

function guardMyroute(to, from, next) {
  var isAuthenticated = false;
  if (store.getters.isLoggedIn) isAuthenticated = true;
  else isAuthenticated = false;
  if (isAuthenticated) {
    next();
  } else {
    router.push({ name: "admin" });
  }
}
function openMyroute(to, from, next) {
  var isAuthenticated = false;
  if (store.getters.isLoggedIn) isAuthenticated = true;
  else isAuthenticated = false;
  if (isAuthenticated) {
    router.push({ name: "adminProfile" });
  } else {
    next();
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
      path: "/admin",
      name: "admin",
      component: () => import("../views/LoginView.vue"),
      beforeEnter: openMyroute,
      meta: {
        title: "SMC Report | LOGIN",
      },
    },
    {
      path: "/profile",
      name: "adminProfile",
      component: () => import("../views/AdminProfile.vue"),
      props: true,
      beforeEnter: guardMyroute,
      meta: {
        title: "SMC Report | Admin Profile",
      },
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
      // meta: {
      //   title: `SMC Report | ${to}`,
      // },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: PageNotFound,
      meta: { title: "Page Not Found" },
    },
  ],
});

router.beforeEach((to) => {
  document.title = to.meta.title;
});

export default router;
