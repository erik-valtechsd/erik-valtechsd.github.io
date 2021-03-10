import * as THREE from "three";

const scene = new THREE.Scene();
let width = window.innerWidth;
let height = window.innerheight;
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// CAMERA
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

var lineX;
var lineY;
var lineZ;
var lines = [];

var MAX_POINTS = 50000;
var drawCount = 0;
var drawStart = 0;
var splineArrayX = [];
var splineArrayY = [];
var splineArrayZ = [];

let xView = -2;
let pos = xView;

let accX,
  accY,
  accZ = 0;

addLines();
animate();

function addLine(lineColor) {
  console.log("add line");

  var geometry = new THREE.BufferGeometry();
  var positions = new Float32Array(MAX_POINTS * 3); // 3 vertices per point
  var material = new THREE.LineBasicMaterial({ color: lineColor, linewidth: 6 });

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  let line = new THREE.Line(geometry, material);
  lines.push(line);
  scene.add(lines[lines.length - 1]);
}

function addLines() {
  lines = [];
  //add  lines for accelerometer x y z
  let color;
  for (let i = 0; i < 3; i++) {
    if (i == 0) {
      color = new THREE.Color(0x00ff00);
      addLine(color);
    } else if (i == 1) {
      color = new THREE.Color(0x0000ff);
      addLine(color);
    } else if (i == 2) {
      let color = new THREE.Color(0xff0000);
      addLine(color);
    }
  }
  console.log("lines added");
}

function animate() {
  requestAnimationFrame(animate);
  drawCount++;
  lines.forEach((element) => {
    element.geometry.setDrawRange(drawStart, drawCount);
  });

  updatePositions();

  lines.forEach((element) => {
    element.geometry.attributes.position.needsUpdate = true; // required after the first render
  });

  renderer.render(scene, camera);
}

function updatePositions() {
  let index = 0;
  lines.forEach((element) => {
    pos = pos + 0.005;

    if (index == 0) {
      setLine(element, splineArrayX, -4, accX);
    } else if (index == 1) {
      setLine(element, splineArrayY, 0, accY);
    } else {
      setLine(element, splineArrayZ, 4, accZ);
    }
    index++;
  });

  if (pos > 2) {
    pos = xView;
    drawStart = splineArrayX.length;
    drawCount = 0;
    // resetLine();
    // addLines();
  }
}

function setLine(line, splineArray, offset, acc) {
  splineArray.push(new THREE.Vector3(pos, acc.map(-10, 10, -1, 1) + offset, 0));
  // if (pos > 2) {
  //   splineArray = [];
  // }

  var positions = line.geometry.attributes.position.array;

  var index = 0;

  for (var i = 0; i < splineArray.length; i++) {
    positions[index++] = splineArray[i].x;
    positions[index++] = splineArray[i].y;
    positions[index++] = splineArray[i].z;
  }
}

function resetLine() {
  lines.forEach((element) => {
    console.log(scene.children);
    element.geometry.dispose();
    element.material.dispose();
    scene.remove(element);
    element = null;
  });
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
