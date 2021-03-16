import * as THREE from "three";
import { DeviceOrientationControls } from "three/examples/jsm/controls/DeviceOrientationControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GeometryUtils } from "three/examples/jsm/utils/GeometryUtils.js";

let camera, scene, renderer, controls;
let mesh;
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", function () {
  init();
  animate();
});

function init() {
  const overlay = document.getElementById("overlay");
  overlay.remove();

  var slide = document.getElementById("ui-slide-text");
  var element = document.getElementById("ui-display");
  element.style.display = "flex";
  addNewSlide("welcome to Future Studio experiments");

  addNewSlide("soccer kick simulator", 4000);
  addNewSlide("to play, place phone in your front pocket", 8000);
  addNewSlide("wait for the whistle and then kick!", 12000);

  window.setTimeout(function () {
    element.remove();
  }, 16000);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  controls = new DeviceOrientationControls(camera);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.z = -5;

  scene.add(cube);
  const gridHelper = new THREE.GridHelper(100, 100);
  gridHelper.position.y = -1;
  scene.add(gridHelper);
  // renderer = new THREE.WebGLRenderer({ antialias: true });
  // renderer.setPixelRatio(window.devicePixelRatio);
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);

  // window.addEventListener("resize", onWindowResize);
}

// function init() {
//   const overlay = document.getElementById("overlay");
//   overlay.remove();
//   camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight);

//   controls = new DeviceOrientationControls(camera);

//   scene = new THREE.Scene();
//   scene.background = new THREE.Color(0x3e4959);
//   const geometry = new THREE.BoxGeometry(200, 200, 200);
//   var material = new THREE.MeshNormalMaterial();
//   mesh = new THREE.Mesh(geometry, material);
//   scene.add(mesh);

//   renderer = new THREE.WebGLRenderer({ antialias: true });
//   renderer.setPixelRatio(window.devicePixelRatio);
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   document.body.appendChild(renderer.domElement);

//   window.addEventListener("resize", onWindowResize);
// }
function animate() {
  window.requestAnimationFrame(animate);
  let time = performance.now() * 0.001;
  controls.update();
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function addNewSlide(text, delayTime) {
  window.setTimeout(function () {
    var slide = document.createElement("div");
    slide.id = "ui-slide-text";
    var ui = document.getElementById("ui-slide");
    slide.innerText = text;
    ui.appendChild(slide);

    window.setTimeout(function () {
      removeElement(slide);
    }, 4000);
  }, delayTime);
}
function removeElement(element) {
  element.remove();
}
