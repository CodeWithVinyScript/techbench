// ================= GLOBAL VARIABLES =================

let stage, decorations = [], lights = [];

// ================= INIT =================
function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0f172a);

  camera = new THREE.PerspectiveCamera(
    75,
    (window.innerWidth - 300) / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth - 300, window.innerHeight);

  document.getElementById("canvas-container")
    .appendChild(renderer.domElement);

  // ORBIT CONTROLS
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  // LIGHTING
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 10, 7);
  scene.add(directionalLight);

  // FLOOR
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshStandardMaterial({ color: 0x111827 })
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  // STAGE
  createStage();

  camera.position.set(0, 6, 10);

  animate();
}

// ================= CREATE STAGE =================
function createStage() {
  const geometry = new THREE.BoxGeometry(6, 0.5, 6);
  const material = new THREE.MeshStandardMaterial({ color: 0xff69b4 });

  stage = new THREE.Mesh(geometry, material);
  scene.add(stage);
}

// ================= ANIMATION LOOP =================
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// ================= CHANGE STAGE COLOR =================
function changeStageColor() {
  stage.material.color.set(Math.random() * 0xffffff);
}

// ================= ADD LIGHT =================
function addLight() {
  const light = new THREE.PointLight(0xffffff, 1, 50);

  light.position.set(
    (Math.random() - 0.5) * 10,
    5,
    (Math.random() - 0.5) * 10
  );

  lights.push(light);
  scene.add(light);
}

// ================= ADD DECORATION (BALLOON) =================
function addDecoration() {
  const geometry = new THREE.SphereGeometry(0.4, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: Math.random() * 0xffffff,
  });

  const balloon = new THREE.Mesh(geometry, material);

  balloon.position.set(
    (Math.random() - 0.5) * 5,
    2 + Math.random() * 2,
    (Math.random() - 0.5) * 5
  );

  decorations.push(balloon);
  scene.add(balloon);
}

// ================= EVENT TYPE THEMES =================
function changeEventTheme() {
  const type = document.getElementById("eventType").value;

  if (type === "wedding") {
    stage.material.color.set(0xffc0cb); // pink
  } else if (type === "birthday") {
    stage.material.color.set(0x00ffcc); // cyan
  } else if (type === "corporate") {
    stage.material.color.set(0x3b82f6); // blue
  }
}

// ================= RESET SCENE =================
function resetScene() {
  // Remove decorations
  decorations.forEach(obj => scene.remove(obj));
  decorations = [];

  // Remove lights
  lights.forEach(light => scene.remove(light));
  lights = [];

  // Reset stage color
  stage.material.color.set(0xff69b4);
}

// ================= SAVE DESIGN =================
function saveDesign() {
  const design = {
    stageColor: stage.material.color.getHex(),
    decorationsCount: decorations.length,
    lightsCount: lights.length,
    eventType: document.getElementById("eventType").value
  };

  console.log("Saved Design:", design);

  // Send to backend (optional)
  fetch("http://localhost:5000/save-design", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(design),
  })
  .then(res => res.json())
  .then(data => alert("Design Saved!"))
  .catch(err => console.log(err));
}

// ================= RESPONSIVE =================
window.addEventListener("resize", () => {
  camera.aspect = (window.innerWidth - 300) / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth - 300, window.innerHeight);
});

// ================= INIT CALL =================
init();
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152/build/three.module.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("threeCanvas") });
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x00ffcc });

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();
function changeColor(color) {
  cube.material.color.set(color);
}