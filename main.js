import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x000526);
document.body.appendChild( renderer.domElement );

// ---------- Personaje estilo Among Us ----------
const bodyColor = 0xfab4f2; // rojo
const bodyMat = new THREE.MeshStandardMaterial({ color: bodyColor, roughness: 0.5 });

const crewmate = new THREE.Group();

// Torso
const torso = new THREE.Mesh(
  new THREE.CylinderGeometry(0.9, 0.9, 1.4, 32),
  bodyMat
);
torso.position.y = 0.9;
crewmate.add(torso);

// Parte de arriba (redondeada)
const topSphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.9, 32, 32),
  bodyMat
);
topSphere.position.y = 1.6;
topSphere.scale.set(1, 0.8, 1);
crewmate.add(topSphere);

// Parte de abajo (redondeada)
const bottomSphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.9, 32, 32),
  bodyMat
);
bottomSphere.position.y = 0.2;
bottomSphere.scale.set(1, 0.5, 1);
crewmate.add(bottomSphere);

// Visor
const visorGlass = new THREE.Mesh(
  new THREE.SphereGeometry(0.55, 32, 32),
  new THREE.MeshStandardMaterial({
    color: 0x9fd8e8,
    roughness: 0.15,
    metalness: 0.1,
    emissive: 0x1a3f4a,
    emissiveIntensity: 0.15
  })
);
visorGlass.scale.set(0.5, 0.85, 1.3);
visorGlass.position.set(0.75, 1.75, 0);
crewmate.add(visorGlass);

const shine = new THREE.Mesh(
  new THREE.SphereGeometry(0.15, 16, 16),
  new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 })
);
shine.position.set(0.85, 1.9, 0.2);
shine.scale.set(0.4, 0.6, 1.2);
crewmate.add(shine);

// Mochila
const backpack = new THREE.Mesh(
  new THREE.CapsuleGeometry(0.58, 0.6, 3, 16),
  new THREE.MeshStandardMaterial({ color: 0xd69acf, roughness: 0.6 })
);
backpack.position.set(-0.85, 1.0, 0);
crewmate.add(backpack);

// Piernas
const legMat = new THREE.MeshStandardMaterial({ color: bodyColor, roughness: 0.5 });
function makeLeg(z) {
  const leg = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.28, 0.35, 4, 16),
    legMat
  );
  leg.position.set(0.1, -0.15, z);
  return leg;
}
crewmate.add(makeLeg(-0.35));
crewmate.add(makeLeg(0.35));

// Centrar el grupo para que rote sobre su propio eje central
crewmate.position.set(0, -0.9, 0);
scene.add(crewmate);

// ---------- Luz ----------
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

// ---------- Rotación sobre su propio eje ----------
let rotationSpeed = 1; // radianes por segundo

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    let delta = clock.getDelta();

    crewmate.rotation.y += rotationSpeed * delta;

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});