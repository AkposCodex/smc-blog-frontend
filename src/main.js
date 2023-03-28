import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "./assets/main.css";
import Shimmer from 'vue3-shimmer';

const app = createApp(App);

app.use(router);
app.use(Shimmer);
app.use(store);
app.use(Toast);
app.mount("#app");
