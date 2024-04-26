import { createApp } from "vue";
import App from "./App.vue";
import allComs from '@/components'
import "./styles/index.scss";
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});
const app = createApp(App)
app.use(allComs)
app.use(vuetify).mount("#app");
