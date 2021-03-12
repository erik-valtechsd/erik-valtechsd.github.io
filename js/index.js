import * as THREE from "three";

const scene = new THREE.Scene();
let width = window.innerWidth;
let height = window.innerheight;
var frustumHeight = 10;
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.OrthographicCamera((-frustumHeight * aspect) / 2, (frustumHeight * aspect) / 2, frustumHeight / 2, -frustumHeight / 2, 1, 2000);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 5;
scene.background = new THREE.Color(0x000000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

const btn = document.getElementById("request");
btn.addEventListener("touchend", permission);

function permission() {
  console.log("clicked");
  btn.style.display = "none";
  DeviceOrientationEvent.requestPermission()
    .then((response) => {
      if (response == "granted") {
        window.addEventListener("devicemotion", handleMotionEvent, true);
      }
    })
    .catch(console.error);
  console.log("draw curve...");
}
console.log("ok");

function handleMotionEvent(event) {
  var x = event.accelerationIncludingGravity.x;
  var y = event.accelerationIncludingGravity.y;
  var z = event.accelerationIncludingGravity.z;
  accX = x;
  accY = y;
  accZ = z;
}

Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  return ((this - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
