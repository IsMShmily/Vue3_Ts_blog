import SvgIcon from "./SvgIcon.vue";
import MyCom from "./MyCom/index.vue";

//创建全局组件对象
const allComs: { [key: string]: any } = { SvgIcon, MyCom };

export default {
  install(app: any) {
    Object.keys(allComs).forEach((key) => {
      app.component(key, allComs[key]);
    });
  },
};
