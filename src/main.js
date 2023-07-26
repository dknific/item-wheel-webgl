import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { animateItemWheelRotation } from './assets/animations';
import { MESHES } from './assets/meshes';

const scene = new THREE.Scene();
const raycaster = new THREE.Raycaster();
const mouseVector = new THREE.Vector2();
const pointLight = new THREE.PointLight('white', 1.3, 10, 0, 1);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

scene.background = new THREE.Color("white");
pointLight.position.set(-0.5, 0.2, 2.5);
renderer.setPixelRatio(window.devicePixelRatio);
camera.position.z = 5;

function handleClick(event) {
  mouseVector.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
  mouseVector.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;
  raycaster.setFromCamera(mouseVector, camera);

  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects[0]) {
    animateItemWheelRotation(intersects[0]);
  }
}

window.addEventListener('click', handleClick, false);
document.body.appendChild(renderer.domElement);
scene.add(MESHES.group, MESHES.topCone, MESHES.bottomCone, pointLight);

function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);

  camera.aspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  MESHES.topCone.rotation.y += 0.005;
  MESHES.bottomCone.rotation.y += 0.005;

  renderer.render(scene, camera);
}
animate();
