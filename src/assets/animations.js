import TWEEN from '@tweenjs/tween.js';
import { MESHES, materialBlack, materialWhite } from './meshes';
const {
  group,
  meshCircle01,
  meshCircle02,
  meshCircle03,
  meshCircle04
} = MESHES;

const ANIMATION_SPEED = 600;
const EASING_MODE = TWEEN.Easing.Cubic.Out;

function animateEntireGroupRotation(currentRotationVal, directionClicked) {
  if (directionClicked.toUpperCase() === 'LEFT') {
    new TWEEN.Tween(group.rotation)
      .to({ y: currentRotationVal + 1.57 }, ANIMATION_SPEED)
      .easing(EASING_MODE)
      .start();
  } else if (directionClicked.toUpperCase() === 'RIGHT') {
    new TWEEN.Tween(group.rotation)
      .to({ y: currentRotationVal - 1.57 }, ANIMATION_SPEED)
      .easing(EASING_MODE)
      .start();
  }
}

function createYaxisRotationTween(mesh, directionClicked) {
  let newRotationValue = mesh.rotation.y;
  if (directionClicked === 'LEFT') {
    newRotationValue -= 1.57;
  } else if (directionClicked === 'RIGHT') {
    newRotationValue += 1.57;
  }
  return new TWEEN.Tween(mesh.rotation)
    .to({ y: newRotationValue }, ANIMATION_SPEED)
    .easing(EASING_MODE);
}

function createTweensForTopConeRotation(currentRotationVal, directionClicked) {
  if (directionClicked === 'RIGHT') {
    return new TWEEN.Tween(MESHES.topCone.rotation)
      .to({ y: currentRotationVal + 1 }, ANIMATION_SPEED)
      .easing(EASING_MODE);
  } else if (directionClicked === 'LEFT') {
    return new TWEEN.Tween(MESHES.topCone.rotation)
      .to({ y: currentRotationVal - 1 }, ANIMATION_SPEED)
      .easing(EASING_MODE);
  }
}

function createTweensForBottomConeRotation(
  currentRotationVal,
  directionClicked,
) {
  if (directionClicked === 'RIGHT') {
    return new TWEEN.Tween(MESHES.bottomCone.rotation)
      .to({ y: currentRotationVal - 1 }, ANIMATION_SPEED)
      .easing(EASING_MODE);
  } else if (directionClicked === "LEFT") {
    return new TWEEN.Tween(MESHES.bottomCone.rotation)
      .to({ y: currentRotationVal + 1 }, ANIMATION_SPEED)
      .easing(EASING_MODE);
  }
}

function handleTextColorChange(nameOfCircleGroup) {
  switch(nameOfCircleGroup) {
    case 'meshCircle01':
      MESHES.meshCircle01.children[1].material = materialBlack;
      MESHES.meshCircle02.children[1].material = materialWhite;
      MESHES.meshCircle03.children[1].material = materialWhite;
      MESHES.meshCircle04.children[1].material = materialWhite;
      break;
    case 'meshCircle02':
      MESHES.meshCircle01.children[1].material = materialWhite;
      MESHES.meshCircle02.children[1].material = materialBlack;
      MESHES.meshCircle03.children[1].material = materialWhite;
      MESHES.meshCircle04.children[1].material = materialWhite;
      break;
    case 'meshCircle03':
      MESHES.meshCircle01.children[1].material = materialWhite;
      MESHES.meshCircle02.children[1].material = materialWhite;
      MESHES.meshCircle03.children[1].material = materialBlack;
      MESHES.meshCircle04.children[1].material = materialWhite;
      break;
    case 'meshCircle04':
      MESHES.meshCircle01.children[1].material = materialWhite;
      MESHES.meshCircle02.children[1].material = materialWhite;
      MESHES.meshCircle03.children[1].material = materialWhite;
      MESHES.meshCircle04.children[1].material = materialBlack;
      break;
  }
}

export function animateItemWheelRotation(clickedMesh) {
  const directionClicked = (clickedMesh.point.x < 0) ? 'LEFT' : 'RIGHT';
  handleTextColorChange(clickedMesh.object.class)

  animateEntireGroupRotation(group.rotation.y, directionClicked);
  createYaxisRotationTween(meshCircle01, directionClicked).start();
  createYaxisRotationTween(meshCircle02, directionClicked).start();
  createYaxisRotationTween(meshCircle03, directionClicked).start();
  createYaxisRotationTween(meshCircle04, directionClicked).start();

  createTweensForTopConeRotation(
    MESHES.topCone.rotation.y,
    directionClicked,
  ).start();
  createTweensForBottomConeRotation(
    MESHES.bottomCone.rotation.y,
    directionClicked,
  ).start();
}
