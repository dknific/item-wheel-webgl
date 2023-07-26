import { FontLoader } from 'three/addons/loaders/FontLoader';
import { TextGeometry } from 'three/addons/geometries/TextGeometry';
import {
  CircleGeometry,
  ConeGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
} from 'three';

const materialBlue = new MeshPhongMaterial({ color: '#94a6ff' });
const materialRed = new MeshPhongMaterial({ color: '#ff6363' });
const materialOrange = new MeshPhongMaterial({ color: '#ff8400' });
const materialGreen = new MeshPhongMaterial({ color: '#8cff8a' });
const materialPink = new MeshPhongMaterial({ color: '#78c4de' });
export const materialBlack = new MeshBasicMaterial({ color: 'black' });
export const materialWhite = new MeshPhongMaterial({
  color: "#ededed",
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
meshCircle01.class = 'meshCircle01';
meshCircle02.class = 'meshCircle02';
meshCircle03.class = 'meshCircle03';
meshCircle04.class = 'meshCircle04';
meshCircle01.position.set(0, 0, 1.5);
meshCircle02.position.set(1.5, 0, 0);
meshCircle03.position.set(0, 0, -1.5);
meshCircle04.position.set(-1.5, 0, 0);

const meshCone01 = new Mesh(geometryCone, materialPink);
const meshCone02 = new Mesh(geometryCone, materialPink);
meshCone01.rotation.x = 3.14;
meshCone01.position.y = 1.2;
meshCone02.position.y = -1.2;

const meshWhiteCircleOverlay01 = new Mesh(geometryCircleSmall, materialWhite);
const meshWhiteCircleOverlay02 = new Mesh(geometryCircleSmall, materialWhite);
const meshWhiteCircleOverlay03 = new Mesh(geometryCircleSmall, materialWhite);
const meshWhiteCircleOverlay04 = new Mesh(geometryCircleSmall, materialWhite);
meshWhiteCircleOverlay01.class = 'meshCircle01';
meshWhiteCircleOverlay02.class = 'meshCircle02';
meshWhiteCircleOverlay03.class = 'meshCircle03';
meshWhiteCircleOverlay04.class = 'meshCircle04';
meshWhiteCircleOverlay01.position.z = 0.001;
meshWhiteCircleOverlay02.position.z = 0.001;
meshWhiteCircleOverlay03.position.z = 0.001;
meshWhiteCircleOverlay04.position.z = 0.001;

function loadTextGeometry(textString, fontName) {
  return new TextGeometry(textString, {
    size: 0.3,
    height: 0,
    font: fontName,
  });
}

const fontLoader = new FontLoader();
fontLoader.load('src/assets/Futura_Bold.json',
  arialFont => {
    const textGeometryOne = loadTextGeometry('START', arialFont);
    const textGeometryTwo = loadTextGeometry('LOAD', arialFont);
    const textGeometryThree = loadTextGeometry('EXTRAS', arialFont);
    const textGeometryFour = loadTextGeometry('SETTINGS', arialFont);

    const textOne = new Mesh(textGeometryOne, materialBlack);
    const textTwo = new Mesh(textGeometryTwo, materialWhite);
    const textThree = new Mesh(textGeometryThree, materialWhite);
    const textFour = new Mesh(textGeometryFour, materialWhite);
    textOne.position.set(-0.57, -0.15, 0.1);
    textTwo.position.set(-0.5, -0.15, 0.1);
    textThree.position.set(-0.7, -0.15, 0.1);
    textFour.position.set(-0.85, -0.15, 0.1);

    textOne.class = 'meshCircle01';
    textTwo.class = 'meshCircle02';
    textThree.class = 'meshCircle03';
    textFour.class = 'meshCircle04';

    // - Make each circle a parent of its text mesh:
    meshCircle01.add(textOne);
    meshCircle02.add(textTwo);
    meshCircle03.add(textThree);
    meshCircle04.add(textFour);
  }
);

// - Make each circle a parent of its white inner circle:
meshCircle01.add(meshWhiteCircleOverlay01);
meshCircle02.add(meshWhiteCircleOverlay02);
meshCircle03.add(meshWhiteCircleOverlay03);
meshCircle04.add(meshWhiteCircleOverlay04);

// - Group the parents so we can rotate them as one whole:
const group = new Group();
group.add(meshCircle01, meshCircle02, meshCircle03, meshCircle04);

export const MESHES = {
  group,
  meshCircle01,
  meshCircle02,
  meshCircle03,
  meshCircle04,
  topCone: meshCone01,
  bottomCone: meshCone02
};
