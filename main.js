import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.154.0/examples/jsm/loaders/GLTFLoader.js';
const renderer = new THREE.WebGLRenderer(
  {
    "canvas" : document.getElementById('canvas')
  }
);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.001, 1000);
camera.position.set(0, 0, 0);
const light = new THREE.AmbientLight("white", 1);
scene.add(light);
const textureLoader = new THREE.TextureLoader();

//Floor
const floorTexture = textureLoader('https://img.magnific.com/free-vector/wood-planks-texture-background-parquet-flooring_1048-2145.jpg?semt=ais_hybrid&w=740&q=80');
const floor = new THREE.Mesh(
  new THREE.BoxGeometry(5000, 1, 5000),
  new THREE.MeshStandardMaterial({ map : floorTexture })
);
floor.position.set(0, -0.98, 0);
scene.add(floor);

let keys = {
  "w" : {
    "pressed" : false
  },
  "a" : {
    "pressed" : false
  },
  "s" : {
    "pressed" : false
  },
  "d" : {
    "pressed" : false
  }
};

//Check if buttons pressed and all.
window.addEventListener("keydown", function(e) {
  if (e.key === "w") {
    keys.w.pressed = true;
  }
  if (e.key === "a") {
    keys.a.pressed = true;
  }
  if (e.key === "s") {
    keys.s.pressed = true;
  }
  if (e.key === "d") {
    keys.d.pressed = true;
  }
});
window.addEventListener("keyup", function(e) {
  if (e.key === "w") {
    keys.w.pressed = false;
  }
  if (e.key === "a") {
    keys.a.pressed = false;
  }
  if (e.key === "s") {
    keys.s.pressed = false;
  }
  if (e.key === "d") {
    keys.d.pressed = false;
  }
});

//Rendering and all
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
function load() { // Keeps rendering so GLTF Loader loads.
  requestAnimationFrame(load);
  renderer.render(scene, camera);
}
load();

function move() {
  requestAnimationFrame(move);
  if (keys.w.pressed === true) {
    camera.translateZ(-0.01);
  }
  if (keys.a.pressed === true) {
    camera.rotateY(0.01);
  }
  if (keys.s.pressed === true) {
    camera.translateZ(0.01);
  }
  if (keys.d.pressed === true) {
    camera.rotateY(-0.01);
  }
  renderer.render(scene, camera);
}
move();
