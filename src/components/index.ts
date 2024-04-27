import SIcon from "./SIcon.vue";
import MyCom from "./MyCom/index.vue";
import SvgIcon from './SvgIcon.vue'
const allComs: { [key: string]: any } = { SIcon, MyCom,SvgIcon };

export default {
  install(app: any) {
    Object.keys(allComs).forEach((key) => {
      app.component(key, allComs[key]);
    });
  },
};
