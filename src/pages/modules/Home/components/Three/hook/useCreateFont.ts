import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import * as TWEEN from "three/examples/jsm/libs/tween.module.js";

const fontLoader = new FontLoader(); //文字加载器

/**
 * @description: 创建 文字Logo 字体
 * @param {THREE} group
 * @param {THREE} textTure
 * @return {*}
 */
const useCreateFont = (group: THREE.Group, textTure: THREE.Texture) => {
  fontLoader.load(
    // 传入json文件
    "/text.json",
    // onLoad回调
    (font: any) => {
      const textGeometry1 = new TextGeometry("Welcome to", {
        font,
        size: 0.5,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
      });
      const textGeometry2 = new TextGeometry("shmily_yy's blog", {
        font,
        size: 0.5,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
      });
      const textGeometry3 = new TextGeometry("Technology", {
        font,
        size: 0.5,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
      });
      const textGeometry4 = new TextGeometry("About me", {
        font,
        size: 0.5,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
      });

      const textMaterial = new THREE.MeshBasicMaterial({
        map: textTure,
        opacity: 1,
        transparent: true,
      });
      const text1 = new THREE.Mesh(textGeometry1, textMaterial);
      const text2 = new THREE.Mesh(textGeometry2, textMaterial);
      const text3 = new THREE.Mesh(textGeometry3, textMaterial);
      const text4 = new THREE.Mesh(textGeometry4, textMaterial);

      // const box1 = new THREE.BoxHelper(text3, 0xffff00);
      // group.add(box1);
      // const box2 = new THREE.BoxHelper(text4, 0xffff00);
      // group.add(box2);

      text1.position.set(-3, 1.5, -2.4);
      text1.rotation.set(-0.3, 0.4, 0);
      text1.material.opacity = 0;
      text2.material.opacity = 0;

      text3.position.set(-0.3, 1.7, -2.4);
      text4.position.set(-0.3, 2.5, -2.4);
      text3.uuid = "technology";
      text4.uuid = "about";
      new TWEEN.Tween(text1.material)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .to({ opacity: 1 }, 2500)
        .start();
      new TWEEN.Tween(text2.material)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .to({ opacity: 1 }, 2500)
        .start();
      // text2.position.set(-2.1, 0.7, -1.4);
      text2.rotation.set(-0.3, 6.6, 0);
      textGeometry1.center();
      textGeometry2.center();

      group.add(text1);
      group.add(text2);
      group.add(text3);
      group.add(text4);
    }
  );
};

export default useCreateFont;
