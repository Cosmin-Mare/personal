import "./style.css"

import * as THREE from 'three';

import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff, 250);
pointLight.position.set(20, 20, 20);  

scene.add(pointLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

const starArray = Array(200).fill().map((value) => addRandomGeometry());

function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;

  starArray.forEach((star) => {
    star.rotation.x += 0.03;
    star.rotation.y += 0.08;
  });

  controls.update();
  renderer.render(scene, camera);
}

animate();

function addRandomGeometry(){
  const geometry = new THREE.OctahedronGeometry(1);
  const material = new THREE.MeshStandardMaterial({ color: 0xFF6347});
  const torus = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  torus.position.set(x, y, z);
  scene.add(torus);
  return torus
}


const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);