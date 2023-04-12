import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
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

function loadTitle(to, from, next) {
  document.title = to.meta.title;
  next();
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "SMC REPORT",
      },
      beforeEnter: loadTitle,
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/LoginView.vue"),
      beforeEnter: openMyroute,
      meta: {
        title: "SMC Report | LOGIN",
      },
      beforeEnter: loadTitle,
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
      beforeEnter: loadTitle,
    },
    {
      path: "/geo",
      name: "geoReport",
      component: () => import("../views/GeoReport.vue"),
      meta: {
        title: "SMC Report | Geopolitics Reports",
      },
      beforeEnter: loadTitle,
    },
    {
      path: "/eco",
      name: "ecoReport",
      component: () => import("../views/EcoReport.vue"),
      meta: {
        title: "SMC Report | Economic Reports",
      },
      beforeEnter: loadTitle,
    },
    {
      path: "/bc",
      name: "bcReport",
      component: () => import("../views/BcReport.vue"),
      meta: {
        title: "SMC Report | Blockchain Reports",
      },
      beforeEnter: loadTitle,
    },
    {
      path: "/eq",
      name: "eqReport",
      component: () => import("../views/EqReport.vue"),
      meta: {
        title: "SMC Report | Equity Reports",
      },
      beforeEnter: loadTitle,
    },
    {
      path: "/videos",
      name: "video",
      component: () => import("../views/Videos.vue"),
      meta: {
        title: "SMC Report | Video Headlines",
      },
      beforeEnter: loadTitle,
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
  ],
});

// router.beforeEach((to) => {
//   document.title = to.meta.title;
// });

export default router;
