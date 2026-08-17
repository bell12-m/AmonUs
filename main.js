import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x000526);
document.body.appendChild( renderer.domElement );

const colorAmongUs = 0xfc92d0; 
const materialAmongUs = new THREE.MeshStandardMaterial({ color: colorAmongUs, roughness: 0.5 });
const amongsito = new THREE.Group();

const cuerpo = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 1.4, 32), materialAmongUs);
cuerpo.position.y = 0.9;
amongsito.add(cuerpo);

const cabezota = new THREE.Mesh(new THREE.SphereGeometry(0.9, 32, 32),materialAmongUs);
cabezota.position.y = 1.6;
cabezota.scale.set(1, 0.8, 1);
amongsito.add(cabezota);

const parteIngerior = new THREE.Mesh(new THREE.SphereGeometry(0.9, 32, 32), materialAmongUs);
parteIngerior.position.y = 0.2;
parteIngerior.scale.set(1, 0.5, 1);
amongsito.add(parteIngerior);

const gafitas = new THREE.Mesh(new THREE.SphereGeometry(0.55, 32, 32),
  new THREE.MeshStandardMaterial({
    color: 0xb6f5fc,
    roughness: 0.15,
    metalness: 0.1,
    emissive: 0x1a3f4a,
    emissiveIntensity: 0.15
  })
);
gafitas.scale.set(0.5, 0.85, 1.3);
gafitas.position.set(0.75, 1.75, 0);
amongsito.add(gafitas);

const brillitoGafa = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 }));
brillitoGafa.position.set(0.85, 1.9, 0.2);
brillitoGafa.scale.set(0.4, 0.6, 1.2);
amongsito.add(brillitoGafa);

const maletita = new THREE.Mesh(new THREE.CapsuleGeometry(0.58, 0.6, 3, 16),
  new THREE.MeshStandardMaterial({ color: 0xcf65a3, roughness: 0.6 }));
maletita.position.set(-0.85, 1.0, 0);
amongsito.add(maletita);

const patitas = new THREE.MeshStandardMaterial({ color: colorAmongUs, roughness: 0.5 });
function pataSola(z) {
  const pataSola = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.35, 4, 16), patitas);
  pataSola.position.set(0.1, -0.15, z);
  return pataSola;}
amongsito.add(pataSola(-0.35));
amongsito.add(pataSola(0.35));

amongsito.position.set(0, -0.9, 0);
scene.add(amongsito);

const luzDireccional = new THREE.DirectionalLight(0xffffff, 1);
luzDireccional.position.set(5, 5, 5);
scene.add(luzDireccional);

const luzAmbiente = new THREE.AmbientLight(0xe8dcc1, 0.4);
scene.add(luzAmbiente);

let velicidaRotacion = 1; // radianes por segundo

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    let delta = clock.getDelta();
    amongsito.rotation.y += velicidaRotacion * delta;
    renderer.render(scene, camera);
}
animate();
