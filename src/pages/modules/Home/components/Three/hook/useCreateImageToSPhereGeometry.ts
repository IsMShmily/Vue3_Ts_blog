import * as THREE from "three";

const textureLoader = new THREE.TextureLoader(); //材质加载器

/**
 * @description: 接受图片转换为球体几何体
 * @param {string} imageUrl
 * @param {THREE.Vector3} position
 * @return {*}
 */
const useCreateImageToSPhereGeometry = (
  imageUrl: string,
  position: THREE.Vector3,
  group: THREE.Group,
  scene: THREE.Scene
) => {
  textureLoader.load(
    imageUrl,
    (texture) => {
      // 创建几何体
      const geometry = new THREE.SphereGeometry(3, 32, 32);

      // 创建材质
      const material = new THREE.MeshBasicMaterial({
        map: texture,
      });
      // 创建网格对象
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.set(0, -1.5, 0);
      // 设置位置
      mesh.position.copy(position);
      // 将网格对象添加到场景中
      mesh.uuid = "imgLogo";
      group.add(mesh);
      scene.add(group);
    },
    undefined,
    (error) => {
      console.error("An error occurred loading the texture:", error);
    }
  );
};

export default useCreateImageToSPhereGeometry;
