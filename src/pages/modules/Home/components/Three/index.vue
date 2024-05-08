<script setup lang="ts">
import * as THREE from "three";
import * as TWEEN from "three/examples/jsm/libs/tween.module.js";
import { onMounted, ref } from "vue";
import { throttle } from "@/utils/utils";
import useInitTHree from "@/hook/useInitThree";
import useCreateFont from "./hook/useCreateFont";
import useCreateImageToSPhereGeometry from "./hook/useCreateImageToSPhereGeometry";
import useCreateGalaxy from "./hook/useCreateGalaxy";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { MoveDown } from "lucide-vue-next";
import * as CANNON from "cannon-es";
import router from "@/router";

interface Iemits {
  (e: "goMotivational"): void;
}
const emits = defineEmits<Iemits>();
// gui工具
// import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
// const gui = new GUI();

// 创建一个新的 Cannon.js 世界
const world = new CANNON.World();
// 设置世界的重力，这里的重力是沿着 y 轴向下的，数值为 -9.82
world.gravity.set(0, -9.82, 0);
const defaultMaterial = new CANNON.Material("default");
let objectsToUpdate: Array<{
  mesh: THREE.Mesh;
  body: CANNON.Body;
}> = [];
const cannonSphereStatus = ref(false);
const threeContainer_ref = ref();
let clock = new THREE.Clock();
let scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer & any,
  controls: any,
  GalaxtMaterial: any,
  GalaxyMesh: any,
  figureModel: any,
  sphereBody: any, // 人物模型
  sphere: any, //球形logo
  ball: any;

let group = new THREE.Group();
let group1 = new THREE.Group();
const raycaster = new THREE.Raycaster(); // 创建射线
const mouse = new THREE.Vector2(); // 创建鼠标向量

const textureLoader = new THREE.TextureLoader(); //材质加载器
const TextLogoTexture = textureLoader.load(
  "/src/assets/textures/rock_boulder_dry_diff_4k.jpg"
);
/**
 * 移动到星球中心
 */
const MoveMainAnimation = throttle(() => {
  const tween = new TWEEN.Tween(camera.position);
  tween
    .easing(TWEEN.Easing.Quadratic.InOut)
    .to({ x: 0, y: 5, z: 10 }, 3000)
    .onStart(() => {
      const ImgLogo = group.children.find(
        (item) => item.uuid == "imgLogo"
      ) as THREE.Mesh;
      new TWEEN.Tween(ImgLogo.scale)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .to({ x: 0, y: 0, z: 0 }, 2500)
        .start();
      new TWEEN.Tween(ImgLogo.scale)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .to({ opacity: 0 }, 2500)
        .start();

      const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
      const boxGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
      const material = new THREE.MeshNormalMaterial();
      group.add(group1);
      for (let i = 0; i < 20; i += 1) {
        let mesh;
        if (i % 10 <= 2) {
          mesh = new THREE.Mesh(boxGeometry, material);
        } else {
          mesh = new THREE.Mesh(donutGeometry, material);
        }
        mesh.material.opacity = 0;
        mesh.position.set(0, 50, 0);
        new TWEEN.Tween(mesh.position)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .to(
            {
              x: (Math.random() - 0.5) * 10,
              y: (Math.random() - 0.5) * 10,
              z: (Math.random() - 0.5) * 10,
            },
            (Math.random() * (10 - 3) + 3) * 1000
          )
          .delay((Math.random() * (15 - 10) + 10) * 50)
          .start();

        new TWEEN.Tween(mesh.material)
          .delay((Math.random() * (15 - 10) + 10) * 50)
          .to({ opacity: 1 }, 1000)
          .start();

        mesh.setRotationFromEuler(
          new THREE.Euler(
            Math.PI * Math.random(),
            Math.PI * Math.random(),
            Math.PI * Math.random()
          )
        );
        const radomeScale = Math.random() * 0.5 + 0.5;
        mesh.scale.set(radomeScale, radomeScale, radomeScale);
        group1.add(mesh);
      }
    });
  tween.onComplete(() => {
    useCreateFont(group, TextLogoTexture);
    cannonSphereStatus.value = true;
    createGround();
    const ImgLogo = group.children.find(
      (item) => item.uuid == "imgLogo"
    ) as THREE.Mesh;
    if (ImgLogo) {
      new TWEEN.Tween(ImgLogo.material).onComplete(() => {
        group.remove(ImgLogo);
      });
      // createFont();
    }
  });
  tween.start();
}, 1000);

/**
 * 移动到技术栏
 */
const moveTechnologyAnimation = throttle(() => {
  controls.enabled = false;
  let target = controls.target;
  let position = camera.position;
  new TWEEN.Tween({
    x1: target.x,
    y1: target.y,
    z1: target.z,
    x2: position.x,
    y2: position.y,
    z2: position.z,
  })
    .easing(TWEEN.Easing.Quadratic.InOut)
    .to({ x1: -30, y1: 2, z1: -2, x2: -40, y2: 15, z2: 7 }, 3000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate((object) => {
      let { x1, y1, z1, x2, y2, z2 } = object;
      controls.target.set(x1, y1, z1); // 控制器的焦点
      camera.position.set(x2, y2, z2); // 相机位置
      controls.update();
    })
    .onComplete(() => {
      controls.enabled = true;
      // 创建简单场景和小球
      createSimpleScene();
      createBall();
    })
    .start();
  return;
}, 1000);
console.log(moveTechnologyAnimation);
// 创建技术平面
const createSimpleScene = () => {
  const planeGeometry = new THREE.BoxGeometry(20, 0.2, 20);
  const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 1,
    map: TextLogoTexture,
  });
  const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
  planeMesh.receiveShadow = true;
  planeMesh.position.set(-31, 0, 0);
  planeMesh.rotation.x = -Math.PI;
  planeMesh.uuid = "t-card";
  // gui.add(planeMesh.position, "x", -10, 10, 0.1).name("planeMeshposition---x");
  // gui.add(planeMesh.position, "y", -10, 10, 0.1).name("planeMeshposition---y");
  // gui.add(planeMesh.position, "z", -10, 10, 0.1).name("planeMeshposition---z");
  group.add(planeMesh);
};
// 创建物理小球
const createBall = async () => {
  const texture = await textureLoader.loadAsync("/logo.png");
  const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const sphereMaterial = new THREE.MeshPhysicalMaterial({
    transparent: true,
    opacity: 1,
    map: texture,
    roughness: 0.5, //粗糙度 形成漫反射
    metalness: 0.5, //金属度
    clearcoat: 1, // 清漆度
    clearcoatRoughness: 0, //光滑度
  });
  ball = new THREE.Mesh(sphereGeometry, sphereMaterial);
  ball.castShadow = true;
  ball.uuid = "ball";
  ball.position.set(-30, 0.5, -2);
  group.add(ball);

  // 创建刚体
  const shape = new CANNON.Sphere(0.5);
  const body = new CANNON.Body({
    mass: 1,
    shape,
    material: defaultMaterial,
  });
  // @ts-ignore
  body.position.copy(-30, 0.5, -2);
  world.addBody(body);
  objectsToUpdate.push({
    mesh: ball,
    body,
  });
};
const guiObj1 = {
  createSphere() {
    createBall();
  },
};
console.log(guiObj1);
// gui.add(guiObj1, "createSphere");

// --------------------------------------

/**
 * 创建glb模型
 */
// const gltfLoader = new GLTFLoader();
// let fbxLoader = new FBXLoader();
// let mixer: any;
// const createGlbModel = async () => {
//   // 创建灯光
//   const light = new THREE.AmbientLight(0xffffff, 3);
//   scene.add(light);

//   // 加载glb模型
//   const glb = await gltfLoader.loadAsync("/src/assets/glb/my.glb");
//   figureModel = glb.scene;
//   figureModel.scale.set(2, 2, 2);
//   figureModel.position.set(10, 3, -15);
//   figureModel.rotation.set(0, 0.7, 0);
//   group.add(figureModel);

//   const Walking = await fbxLoader.loadAsync("/src/assets/glb/Walking.fbx");
//   console.log(
//     "%c  fbx - object ：加载fbx成功object*****************************",
//     "color: green;",
//     Walking
//   );
//   mixer = new THREE.AnimationMixer(figureModel);
//   console.log(Walking.animations[0]);
//   const action = mixer.clipAction(Walking.animations[0]);
//   console.log(action);
//   action.enabled = true;
//   action.setEffectiveTimeScale(1);
//   action.setEffectiveWeight(1);
//   action.play();
// };
/**
 * 移动到关于我
 */
const moveAboutAnimation = throttle(() => {
  controls.enabled = false;
  let target = controls.target;
  let position = camera.position;
  new TWEEN.Tween({
    xt1: target.x,
    yt1: target.y,
    zt1: target.z,
    x2: position.x,
    y2: position.y,
    z2: position.z,
  })
    .easing(TWEEN.Easing.Quadratic.InOut)
    .to({ xt1: 13, yt1: 5, zt1: -15, x2: 25, y2: 7, z2: 0 }, 3000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate((object) => {
      let { xt1, yt1, zt1, x2, y2, z2 } = object;
      controls.target.set(xt1, yt1, zt1); // 控制器的焦点
      camera.position.set(x2, y2, z2); // 相机位置
      controls.update();
    })
    .onComplete(() => {
      controls.enabled = true;
    })
    .start();
  return;
}, 1000);
console.log(moveAboutAnimation);
/**
 * 创建地面
 */
const createGround = async () => {
  const planeGeometry = new THREE.BoxGeometry(2, 0.2, 2);
  const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 1,
    map: TextLogoTexture,
  });
  // 创建地面
  const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
  planeMesh.receiveShadow = true;
  planeMesh.position.set(-3.8, -0.4, 0.6);
  planeMesh.rotation.x = -Math.PI;
  planeMesh.uuid = "card";
  // 创建球体
  const textureLoader = new THREE.TextureLoader(); //材质加载器
  const texture = await textureLoader.loadAsync("/logo.png");
  const material = new THREE.MeshPhysicalMaterial({
    transparent: true,
    opacity: 1,
    map: texture,
    roughness: 0.5, //粗糙度 形成漫反射
    metalness: 0.5, //金属度
    clearcoat: 1, // 清漆度
    clearcoatRoughness: 0, //光滑度
  });
  sphere = new THREE.Mesh(new THREE.SphereGeometry(0.4, 32, 32), material);

  sphere.uuid = "sphere";
  sphere.castShadow = true;
  sphere.position.set(-3.7, 0.4, 0.8);
  sphere.rotation.set(0, -1.2, 0);
  // gui.add(sphere.position, "x", -10, 10, 0.1).name("position---x");
  // gui.add(sphere.position, "y", -10, 10, 0.1).name("position---y");
  // gui.add(sphere.position, "z", -10, 10, 0.1).name("position---z");

  group.add(sphere);

  /**
   *  物理引擎-----------------------------------------------------------------------
   */
  // 创建一个默认材质，用于给物体设置材质

  // 创建一个碰撞材质，表示两个默认材质之间的碰撞情况
  const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
      // 设置摩擦系数
      friction: 0.1,
      // 设置恢复系数，即碰撞后的反弹程度
      restitution: 0.7,
    }
  );
  // 将碰撞材质添加到世界中
  world.addContactMaterial(defaultContactMaterial);

  // 创建一个球体形状，参数为球体的半径
  const sphereShape = new CANNON.Sphere(0.5);

  sphereBody = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(-3.7, 5, 0.8),
    shape: sphereShape,
    material: defaultMaterial,
  });
  // sphereBody.applyForce(new CANNON.Vec3(100, 0, 0), new CANNON.Vec3(0, 0, 0));

  world.addBody(sphereBody);

  const guiObj = {
    drop() {
      sphereBody.position = new CANNON.Vec3(-3.6, 5, 1.4);
    },
  };
  // gui.add(guiObj, "drop");
  console.log(guiObj);

  // 创建地板形状，这里是一个无限大的平面，用于模拟地板
  const floorShape = new CANNON.Plane();
  // 创建地板刚体
  const floorBody = new CANNON.Body();
  // 设置地板刚体的质量为 0，表示地板是静止的
  floorBody.mass = 0;
  // 将地板形状添加到地板刚体中
  floorBody.material = defaultMaterial;
  floorBody.addShape(floorShape);
  // 将地板刚体添加到世界中
  world.addBody(floorBody);
  // 将地板刚体旋转，使其与地面对齐
  floorBody.position.set(-3.8, -0.4, 0.6);
  floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);

  /**
   *  物理引擎------------------------------------------------------------------------
   */

  // 创建灯光
  const directionLight = new THREE.DirectionalLight();
  directionLight.castShadow = true;
  directionLight.position.set(4, 5, 0);

  const ambientLight = new THREE.AmbientLight(new THREE.Color("#ffffff"), 0.4);
  const directionLightHelper = new THREE.DirectionalLightHelper(
    directionLight,
    2
  );
  directionLightHelper.visible = false;
  group.add(directionLightHelper);
  group.add(directionLight, ambientLight);

  group.add(planeMesh);
  scene.add(group);
};
/**
 * 渲染函数
 */
const render = () => {
  renderer.render(scene, camera);
  controls.update();
  TWEEN.update();
  let time = clock.getElapsedTime();
  // 获取自上一帧之后经过的时间，用于混频器更新
  // const mixerUpdateDelta = clock.getDelta();
  // 更新动画混合器、统计面板并渲染此帧
  // if (mixer) {
  //   mixer.update(mixerUpdateDelta);
  // }

  // 物理引擎---------------------
  if (cannonSphereStatus.value) {
    world.fixedStep();
    const sphere = group.children.find(
      (item) => item.uuid == "sphere"
    ) as THREE.Mesh;
    if (sphere) {
      sphere.position.copy(sphereBody.position);
    }
  }

  // 物理引擎------------------------
  GalaxyMesh.rotation.y = time * 0.02;
  GalaxtMaterial.uniforms.uTime.value = time;
  objMove();
  requestAnimationFrame(render);
};

onMounted(async () => {
  [scene, camera, renderer, controls] = await useInitTHree(
    threeContainer_ref.value
  );
  [GalaxyMesh, GalaxtMaterial] = await useCreateGalaxy(scene);
  useCreateImageToSPhereGeometry(
    "/logo.png",
    new THREE.Vector3(0, 0, 0),
    group,
    scene
  );

  // createGlbModel();
  render();
});

//监听点击
window.addEventListener("click", (e) => {
  // 触摸
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  console.log(mouse);
  // 通过摄像机和鼠标位置更新射线
  raycaster.setFromCamera(mouse, camera);
  // 我们可以放场景中所有的模型，也可以放置指定模型数组
  const intersects = raycaster.intersectObjects(group.children);
  intersects.filter((item) => {
    if (item.object.uuid == "imgLogo") {
      MoveMainAnimation();
    }
    if (item.object.uuid == "technology") {
      console.log("点击了技术");
      // moveTechnologyAnimation();
    }
    if (item.object.uuid == "about") {
      // moveAboutAnimation();
      router.push("/chat");
    }
    if (item.object.uuid == "sphere") {
      sphereBody.position = new CANNON.Vec3(-3.7, 10, 0.8);
      const tween = new TWEEN.Tween(camera.position);
      tween
        .easing(TWEEN.Easing.Quadratic.InOut)
        .to({ x: 0, y: 5, z: 20 }, 3000)
        .start();
    }
  });
});

//监听触摸
window.addEventListener("touchstart", (e) => {
  // 触摸
  mouse.x = (e.changedTouches[0].clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.changedTouches[0].clientY / window.innerHeight) * 2 + 1;
  // 通过摄像机和鼠标位置更新射线
  raycaster.setFromCamera(mouse, camera);
  // 我们可以放场景中所有的模型，也可以放置指定模型数组
  const intersects = raycaster.intersectObjects(group.children);
  intersects.filter((item) => {
    if (item.object.uuid == "imgLogo") {
      MoveMainAnimation();
    }
    if (item.object.uuid == "technology") {
      // moveTechnologyAnimation();
    }
    if (item.object.uuid == "about") {
      router.push("/chat");
      // console.log("点击了关于");
      // moveAboutAnimation();
    }
  });
});

/**
 * 监听键盘点击事件
 */
let isUp = false,
  isDown = false,
  isLeft = false,
  isRight = false,
  isJump = false;
console.log(isJump);
window.addEventListener("keydown", (e) => {
  console.log(e.code);
  switch (e.code) {
    case "KeyW":
      console.log("前进");
      isUp = true;
      break;
    case "KeyS":
      console.log("后退");
      isDown = true;
      break;
    case "KeyA":
      console.log("左转");
      isLeft = true;
      break;
    case "KeyD":
      console.log("右转");
      isRight = true;
      break;
    case "Space":
      console.log("跳跃");
      figureModel.translateY(2);
      isJump = true;
      break;
  }
});

window.addEventListener("keyup", (e) => {
  console.log(e.code);
  switch (e.code) {
    case "KeyW":
      isUp = false;
      break;
    case "KeyS":
      isDown = false;
      break;
    case "KeyA":
      isLeft = false;
      break;
    case "KeyD":
      isRight = false;
      break;
    case "Space":
      isJump = false;

      // ball.position.set(0, 0.5, 0);
      // // cube.rotation.set(0, 0, 0)
      // ball.quaternion.set(0, 0, 0, 0);

      // ball.position.set(0, 0.5, 0);
      // // robotModel.rotation.set(0, 0, 0)
      // ball.quaternion.set(0, 0, 0, 0);

      // camera.position.set(0, 5, 10);
      // camera.lookAt(0, 0, 0);
      break;
  }
});

const objMove = () => {
  if (isUp) {
    // ball.translateZ(+0.1);
  }
  if (isDown) {
    // ball.translateZ(-0.1); //不用.position.z，无法模拟真实效果
  }
  if (isLeft) {
    // ball.rotateY(THREE.MathUtils.degToRad(1)); //不用.position.y，无法模拟真实效果
  }
  if (isRight) {
    // ball.rotateY(-THREE.MathUtils.degToRad(1));
  }
};
</script>

<template>
  <view class="container">
    <view class="container-three" ref="threeContainer_ref"> </view>
    <v-btn
      class="go"
      color="white"
      variant="text"
      width="10"
      @click="$emit('goMotivational')"
      ><MoveDown :size="15"
    /></v-btn>
  </view>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  .container-three {
    width: 100%;
    height: 100%;
  }
  .go {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 9;
    animation: identifier 2s infinite;
  }
  @keyframes identifier {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(10px);
    }
    100% {
      transform: translateY(0px);
    }
  }
}
</style>
