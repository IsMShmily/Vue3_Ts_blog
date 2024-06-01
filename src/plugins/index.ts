import { App } from "vue";
import toastPlugin from "./toast";

const registerPlugins = (app: App): void => {
  app.use(toastPlugin);
};

export default registerPlugins;
