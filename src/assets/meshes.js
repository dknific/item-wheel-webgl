import { FontLoader } from 'three/addons/loaders/FontLoader';
import { TextGeometry } from 'three/addons/geometries/TextGeometry';
import {
  CircleGeometry,
  ConeGeometry,
  DoubleSide,
  Group,
  Mesh,
  MeshPhongMaterial,
} from 'three';

const materialBlue = new MeshPhongMaterial({ color: '#94a6ff', side: DoubleSide });
const materialRed = new MeshPhongMaterial({ color: '#ff6363', side: DoubleSide });
const materialOrange = new MeshPhongMaterial({ color: '#ff8400', side: DoubleSide });
const materialGreen = new MeshPhongMaterial({ color: '#8cff8a', side: DoubleSide });
const materialPink = new MeshPhongMaterial({ color: '#78c4de', side: DoubleSide });
const materialWhiteOpaque = new MeshPhongMaterial({ color: '#ededed', side: DoubleSide });
const materialWhite = new MeshPhongMaterial({
  color: '#ededed',
  side: DoubleSide,
  transparent: true,
  opacity: 0.75,
});

const geometryCircle = new CircleGeometry(0.75, 56);
const geometryCircleSmall = new CircleGeometry(0.6, 56);
const geometryCone = new ConeGeometry(0.7, 1.5, 4);

const meshCircle01 = new Mesh(geometryCircle, materialBlue);
const meshCircle02 = new Mesh(geometryCircle, materialRed);
const meshCircle03 = new Mesh(geometryCircle, materialOrange);
const meshCircle04 = new Mesh(geometryCircle, materialGreen);
const meshCone01 = new Mesh(geometryCone, materialPink);
const meshCone02 = new Mesh(geometryCone, materialPink);

const meshWhiteCircleOverlay01 = new Mesh(geometryCircleSmall, materialWhite);
const meshWhiteCircleOverlay02 = new Mesh(geometryCircleSmall, materialWhite);
const meshWhiteCircleOverlay03 = new Mesh(geometryCircleSmall, materialWhite);
const meshWhiteCircleOverlay04 = new Mesh(geometryCircleSmall, materialWhite);

meshCircle01.info = { role: 'COLOR_CIRCLE', name: 'meshCircle01' };
meshCircle02.info = { role: 'COLOR_CIRCLE', name: 'meshCircle02' };
meshCircle03.info = { role: 'COLOR_CIRCLE', name: 'meshCircle03' };
meshCircle04.info = { role: 'COLOR_CIRCLE', name: 'meshCircle04' };

meshCircle01.add(meshWhiteCircleOverlay01);
meshCircle02.add(meshWhiteCircleOverlay02);
meshCircle03.add(meshWhiteCircleOverlay03);
meshCircle04.add(meshWhiteCircleOverlay04);
meshWhiteCircleOverlay01.position.z = 0.001;
meshWhiteCircleOverlay02.position.z = 0.001;
meshWhiteCircleOverlay03.position.z = 0.001;
meshWhiteCircleOverlay04.position.z = 0.001;

const group = new Group();
group.add(meshCircle01, meshCircle02, meshCircle03, meshCircle04);

meshCircle01.position.set(0, 0, 1.5);
meshCircle02.position.set(1.5, 0, 0);
meshCircle03.position.set(0, 0, -1.5);
meshCircle04.position.set(-1.5, 0, 0);

meshCone01.rotation.x = 3.14;
meshCone01.position.y = 1.2;
meshCone02.position.y = -1.2;

function loadTextGeometry(textString, fontName) {
  return new TextGeometry(textString, {
    size: 0.25,
    height: 0.15,
    font: fontName,
  });
}

let textOne, textTwo, textThree, textFour;

const fontLoader = new FontLoader();
fontLoader.load('src/assets/Arial_Regular.json',
  arialFont => {
    const textGeometryOne = loadTextGeometry('ONE', arialFont);
    const textGeometryTwo = loadTextGeometry('TWO', arialFont);
    const textGeometryThree = loadTextGeometry('THREE', arialFont);
    const textGeometryFour = loadTextGeometry('FOUR', arialFont);

    textOne = new Mesh(textGeometryOne, materialWhiteOpaque);
    textTwo = new Mesh(textGeometryTwo, materialWhiteOpaque);
    textThree = new Mesh(textGeometryThree, materialWhiteOpaque);
    textFour = new Mesh(textGeometryFour, materialWhiteOpaque);
    meshCircle01.add(textOne);
    meshCircle02.add(textTwo);
    meshCircle03.add(textThree);
    meshCircle04.add(textFour);

    textOne.position.set(-0.375, -0.1, 0);
    textTwo.position.set(-0.385, -0.1, 0);
    textThree.position.set(-0.58, -0.1, 0);
    textFour.position.set(-0.5, -0.1, 0);
  }
);

export const MESHES = {
  group,
  meshCircle01,
  meshCircle02,
  meshCircle03,
  meshCircle04,
  topCone: meshCone01,
  bottomCone: meshCone02
};
