import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import allComs from "@/components";
import "./styles/index.scss";

//svg插件引入使用
import "virtual:svg-icons-register";

// Vuetify
import "vuetify/styles";
import vuetify from "@/plugins/vuetify.js";

import pinia from "@/store/index";
const app = createApp(App);

app.use(pinia);
app.use(allComs);
app.use(router);
app.use(vuetify);
app.mount("#app");
