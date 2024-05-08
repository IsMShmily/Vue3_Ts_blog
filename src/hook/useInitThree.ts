import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer & any,
  controls: any;

let w = window.innerWidth;
let h = window.innerHeight-63;

/**
 * @description: 初始化 three 场景
 * @return {*}  [scene, camera, renderer,controls]
 */
const useInitTHree = (
  dom_ref: any
): Promise<
  [THREE.Scene, THREE.PerspectiveCamera, THREE.WebGLRenderer & any, any]
> => {
  return new Promise((resolve) => {
    /**
     * 初始化场景
     */
    const Initialization = () => {
      return new Promise(async (resolve) => {
        //创建场景
        scene = new THREE.Scene();
        //创建相机
        camera = new THREE.PerspectiveCamera(60, w / h, 0.001, 1000);
        camera.position.set(0, 1, 40);

        // -------------相机辅助---------------------
        // // 创建相机辅助对象
        // var helper = new THREE.CameraHelper(camera);
        // scene.add(helper); // 将相机辅助对象添加到场景中
        // // 设置相机辅助对象材质
        // var helperMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 }); // 设置线条颜色
        // helper.material = helperMaterial;
        // -------------相机辅助---------------------

        // 创建 XY 平面的 GridHelper----------------
        // var gridHelper = new THREE.GridHelper(100, 10); // 参数分别为：网格的大小和网格的间距
        // gridHelper.position.set(0, 0, 0); // 设置网格的位置
        // scene.add(gridHelper); // 将网格添加到场景中
        // 创建 XY 平面的 GridHelper----------------

        // 创建 X、Y、Z 轴线的辅助对象-----------
        // var material = new THREE.LineBasicMaterial({
        //   linewidth: 10,
        // });
        // // 创建 X、Y、Z 轴线的辅助对象，并设置材质为自定义的材质
        // var axesHelper = new THREE.AxesHelper(100);
        // axesHelper.material = material;
        // // 将轴线添加到场景中
        // scene.add(axesHelper);
        // 创建 X、Y、Z 轴线的辅助对象-----------

        // 创建渲染器并进行设置
        renderer = new THREE.WebGLRenderer({
          //   alpha: true,
          antialias: true, //抗锯齿
          logarithmicDepthBuffer: true, //深层抗锯齿
        });
        renderer.setSize(w, h);
        renderer.setClearColor(0x160016, 1);
        dom_ref.appendChild(renderer.domElement); // 把渲染器添加到canvas中
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        // @ts-ignore
        renderer.outputEncoding = THREE.LinearEncoding; //采用sRGBEncoding
        // renderer.toneMappingExposure = 1.1; //色调映射曝光度
        renderer.physicallyCorrectLights = true; //正确的物理灯光照射
        renderer.setPixelRatio(window.devicePixelRatio); // 优化清晰度,屏幕物理像素和px比率
        resolve(true);
      });
    };

    /**
     * 初始化控制器
     */
    const setOrbitControls = () => {
      return new Promise((resolve, _) => {
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enablePan = false; // 禁用移动
        controls.enableDamping = true; // 启用阻尼效果，使交互更平滑
        controls.dampingFactor = 0.06; // 阻尼系数
        controls.rotateSpeed = 0.5; // 旋转速度
        controls.zoomSpeed = 1.2; // 缩放速度
        // controls.minDistance = 20; //限制视线最近距离
        controls.maxDistance = 50; //限制视线多远距离
        resolve(true);
      });
    };
    // 监听视口变化
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight -63;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize);

    Initialization();
    setOrbitControls();
    resolve([scene, camera, renderer, controls] as [
      THREE.Scene,
      THREE.PerspectiveCamera,
      THREE.WebGLRenderer & any,
      any,
    ]);
  });
};

export default useInitTHree;
