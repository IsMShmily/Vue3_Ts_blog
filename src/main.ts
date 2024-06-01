import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import allComs from "@/components";
import "./styles/index.scss";

/** highlight 高亮相关 */
import "highlight.js/styles/atom-one-dark.css";
import hljs from "highlight.js/lib/core";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import "highlight.js/lib/common";

/** kangc markdown */
import VMdEditor from "@kangc/v-md-editor";
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";

import "animate.css";

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});
VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

//svg插件引入使用
import "virtual:svg-icons-register";

// Vuetify
import "vuetify/styles";
import vuetify from "@/plugins/vuetify.js";

import "driver.js/dist/driver.css";

import pinia from "@/store/index";

// 引入自定义插件
import registerPlugins from "./plugins";

const app = createApp(App);

/** 注册自定义指令 */
app.directive("highlight", function (el) {
  let highlight = el.querySelectorAll("pre code");
  highlight.forEach((block: any) => {
    hljs.highlightElement(block);
  });
});

registerPlugins(app);
app.use(VMdEditor);
app.use(VMdPreview);
app.use(hljsVuePlugin);
app.use(pinia);
app.use(allComs);
app.use(router);
app.use(vuetify);
app.mount("#app");
