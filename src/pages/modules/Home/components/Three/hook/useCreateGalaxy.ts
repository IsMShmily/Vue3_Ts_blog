import * as THREE from "three";
import { ref } from "vue";
import useGLSL from "@/hook/useGLSL";

const count1 = 50000;
const count2 = 100000;

let geometry: THREE.BufferGeometry;
let GalaxtMaterial: THREE.ShaderMaterial;
let GalaxyMesh: THREE.Points;
const shifts = ref<any[]>([]);
const sizes = ref<any[]>([]);
const positions = ref<any[]>([]);
const [vertexShader, fragmentShader] = useGLSL();

/**
 * @description: 创建星图
 * @param {THREE.Scene} scene
 * @return {*}
 */
const useCreateGalaxy = (
  scene: THREE.Scene
): Promise<[THREE.Points, THREE.ShaderMaterial]> => {
  return new Promise((resolve) => {
    geometry = new THREE.BufferGeometry();
    for (let i = 0; i < count1 + count2; i++) {
      let theta = Math.random() * Math.PI * 2;
      // let phi = Math.random() * Math.PI;
      let phi = Math.acos(Math.random() * 2 - 1);
      let angle = (Math.random() * 0.9 + 0.1) * Math.PI * 0.1;
      let strength = Math.random() * 0.9 + 0.1; // 0.1-1.0
      shifts.value.push(theta, phi, angle, strength);

      let size = Math.random() * 1.5 + 0.5; // 0.5-2.0
      sizes.value.push(size);

      if (i < count1) {
        // 中心球体粒子
        // let r = 10;
        let r = Math.random() * 0.5 + 9.5;
        // let x = r * Math.sin(phi) * Math.cos(theta);
        // let y = r * Math.sin(phi) * Math.sin(theta);
        // let z = r * Math.cos(phi);
        let { x, y, z } = new THREE.Vector3()
          .randomDirection()
          .multiplyScalar(r);
        positions.value.push(x, y, z);
      } else {
        // 外围圆盘粒子
        let r = 10;
        let R = 40;
        let rand = Math.pow(Math.random(), 1.5);
        let radius = Math.sqrt(R * R * rand + (1 - rand) * r * r); // 通过 rand=0-1 数值去线性插值 R^2 和 r^2 大概是按圆圈面积采样粒子分布更均匀
        let { x, y, z } = new THREE.Vector3().setFromCylindricalCoords(
          radius, // 半径
          Math.random() * 2 * Math.PI, // 角度
          (Math.random() - 0.5) * 2 // 高度y -1-1
        );
        positions.value.push(x, y, z);
      }
    }
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions.value, 3)
    );
    geometry.setAttribute(
      "aSize",
      new THREE.Float32BufferAttribute(sizes.value, 1)
    );
    geometry.setAttribute(
      "aShift",
      new THREE.Float32BufferAttribute(shifts.value, 4)
    );

    GalaxtMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
    });

    GalaxyMesh = new THREE.Points(geometry, GalaxtMaterial);
    GalaxyMesh.rotation.order = "ZYX";
    GalaxyMesh.rotation.z = 0.2;
    scene.add(GalaxyMesh);
    resolve([GalaxyMesh, GalaxtMaterial]);
  });
};

export default useCreateGalaxy;
