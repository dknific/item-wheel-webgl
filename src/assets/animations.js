import TWEEN from '@tweenjs/tween.js';
import { MESHES } from './meshes';

const {
  group,
  meshCircle01,
  meshCircle02,
  meshCircle03,
  meshCircle04
} = MESHES;

const ANIMATION_SPEED = 600;
const EASING_MODE = TWEEN.Easing.Cubic.Out;

function handleTotemRotation(currentRotationVal, directionString) {
  if (directionString.toUpperCase() === 'LEFT') {
    new TWEEN.Tween(group.rotation)
      .to({ y: currentRotationVal + 1.57 }, ANIMATION_SPEED)
      .easing(EASING_MODE)
      .start();
  } else if (directionString.toUpperCase() === 'RIGHT') {
    new TWEEN.Tween(group.rotation)
      .to({ y: currentRotationVal - 1.57 }, ANIMATION_SPEED)
      .easing(EASING_MODE)
      .start();
  }
}

function createFlipTween(mesh, directionString) {
  let newRotationValue = mesh.rotation.y;
  if (directionString === 'LEFT') {
    newRotationValue -= 1.57;
  } else if (directionString === 'RIGHT') {
    newRotationValue += 1.57;
  }
  return new TWEEN.Tween(mesh.rotation)
    .to({ y: newRotationValue }, ANIMATION_SPEED)
    .easing(EASING_MODE);
}

function createTopConeTweens(currentRotationVal, directionString) {
  if (directionString === 'RIGHT') {
    return new TWEEN.Tween(MESHES.topCone.rotation)
      .to({ y: currentRotationVal + 1 }, ANIMATION_SPEED)
      .easing(EASING_MODE);
  } else if (directionString === 'LEFT') {
    return new TWEEN.Tween(MESHES.topCone.rotation)
      .to({ y: currentRotationVal - 1 }, ANIMATION_SPEED)
      .easing(EASING_MODE);
  }
}

function createBottomConeTweens(currentRotationVal, directionString) {
  if (directionString === 'RIGHT') {
    return new TWEEN.Tween(MESHES.bottomCone.rotation)
      .to({ y: currentRotationVal - 1 }, ANIMATION_SPEED)
      .easing(EASING_MODE);
  } else if (directionString === "LEFT") {
    return new TWEEN.Tween(MESHES.bottomCone.rotation)
      .to({ y: currentRotationVal + 1 }, ANIMATION_SPEED)
      .easing(EASING_MODE);
  }
}

export function startAnimation(clickedMesh) {
  if (clickedMesh.point.x < 0) {
    handleTotemRotation(group.rotation.y, 'LEFT');
    createFlipTween(meshCircle01, 'LEFT').start();
    createFlipTween(meshCircle02, 'LEFT').start();
    createFlipTween(meshCircle03, 'LEFT').start();
    createFlipTween(meshCircle04, 'LEFT').start();
    createTopConeTweens(MESHES.topCone.rotation.y, 'LEFT').start();
    createBottomConeTweens(MESHES.bottomCone.rotation.y, 'LEFT').start();
  } else {
    handleTotemRotation(group.rotation.y, 'RIGHT');
    createFlipTween(meshCircle01, 'RIGHT').start();
    createFlipTween(meshCircle02, 'RIGHT').start();
    createFlipTween(meshCircle03, 'RIGHT').start();
    createFlipTween(meshCircle04, 'RIGHT').start();
    createTopConeTweens(MESHES.topCone.rotation.y, 'RIGHT').start();
    createBottomConeTweens(MESHES.bottomCone.rotation.y, 'RIGHT').start();
  }
}
