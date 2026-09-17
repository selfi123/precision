document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('dna-canvas-container');
  if (!container) return;

  const scene = new THREE.Scene();
  
  const camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 65;
  camera.position.y = 0;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  const dnaGroup = new THREE.Group();
  scene.add(dnaGroup);

  // Detailed DNA Parameters
  const numBasePairs = 120; // Number of rungs
  const radius = 6;
  const heightSpacing = 0.6;
  const rotationPerStep = (Math.PI * 2) / 10.5; // ~10.5 base pairs per turn (B-DNA)

  // Colors for Nucleobases (A-T, C-G)
  const colorA = 0xFF3366; // Red/Pink (Adenine)
  const colorT = 0x00E5FF; // Cyan (Thymine)
  const colorC = 0x7B2FBE; // Purple (Cytosine)
  const colorG = 0xFFD700; // Gold (Guanine)

  const baseMatProps = { shininess: 80, transparent: true, opacity: 0.9 };
  const matA = new THREE.MeshPhongMaterial({ color: colorA, emissive: 0x330011, ...baseMatProps });
  const matT = new THREE.MeshPhongMaterial({ color: colorT, emissive: 0x002233, ...baseMatProps });
  const matC = new THREE.MeshPhongMaterial({ color: colorC, emissive: 0x220033, ...baseMatProps });
  const matG = new THREE.MeshPhongMaterial({ color: colorG, emissive: 0x332200, ...baseMatProps });
  
  // High-tech glassy backbone
  const matBackbone = new THREE.MeshPhysicalMaterial({ 
    color: 0xffffff, 
    metalness: 0.2,
    roughness: 0.1,
    transmission: 0.8,
    thickness: 1.0,
    transparent: true,
    opacity: 0.9
  });

  const points1 = [];
  const points2 = [];

  // Generate perfect helix points
  for (let i = 0; i <= numBasePairs; i++) {
    const y = (i - numBasePairs / 2) * heightSpacing;
    const angle = i * rotationPerStep; 

    points1.push(new THREE.Vector3(Math.cos(angle) * radius, y, -Math.sin(angle) * radius));
    points2.push(new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, -Math.sin(angle + Math.PI) * radius));
  }

  // Create smooth curved tubes for the backbone
  const curve1 = new THREE.CatmullRomCurve3(points1);
  const curve2 = new THREE.CatmullRomCurve3(points2);

  const tubeGeo1 = new THREE.TubeGeometry(curve1, numBasePairs * 4, 0.5, 12, false);
  const tubeGeo2 = new THREE.TubeGeometry(curve2, numBasePairs * 4, 0.5, 12, false);

  const backbone1 = new THREE.Mesh(tubeGeo1, matBackbone);
  const backbone2 = new THREE.Mesh(tubeGeo2, matBackbone);
  dnaGroup.add(backbone1, backbone2);

  // Create perfectly aligned base pairs (rungs)
  for (let i = 0; i < numBasePairs; i++) {
    const p1 = points1[i];
    const p2 = points2[i];
    
    // Center point between p1 and p2
    const center = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);

    // Determine Base Pair (A-T or C-G)
    const isAT = Math.random() > 0.5;
    const isFlipped = Math.random() > 0.5;
    let mLeft = isAT ? matA : matC;
    let mRight = isAT ? matT : matG;
    if (isFlipped) {
      const temp = mLeft; mLeft = mRight; mRight = temp;
    }

    // Left base (from p1 to center)
    const distanceL = p1.distanceTo(center);
    const bondLGeo = new THREE.CylinderGeometry(0.2, 0.2, distanceL, 8);
    // Cylinder is along Y. We need it to point from p1 to center.
    bondLGeo.rotateX(Math.PI / 2); // Now cylinder points along Z.
    
    const midL = new THREE.Vector3().addVectors(p1, center).multiplyScalar(0.5);
    const bondL = new THREE.Mesh(bondLGeo, mLeft);
    bondL.position.copy(midL);
    bondL.lookAt(center); // Aligns local Z to target
    dnaGroup.add(bondL);

    // Right base (from p2 to center)
    const distanceR = p2.distanceTo(center);
    const bondRGeo = new THREE.CylinderGeometry(0.2, 0.2, distanceR, 8);
    bondRGeo.rotateX(Math.PI / 2);
    
    const midR = new THREE.Vector3().addVectors(p2, center).multiplyScalar(0.5);
    const bondR = new THREE.Mesh(bondRGeo, mRight);
    bondR.position.copy(midR);
    bondR.lookAt(center);
    dnaGroup.add(bondR);
  }

  // Floating ambient particles
  const particlesGeo = new THREE.BufferGeometry();
  const particleCount = 200;
  const posArray = new Float32Array(particleCount * 3);
  for(let i=0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 60;
  }
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particleMat = new THREE.PointsMaterial({
    size: 0.2,
    color: 0x00E5FF,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });
  const particlesMesh = new THREE.Points(particlesGeo, particleMat);
  scene.add(particlesMesh);

  // Lighting Setup
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 20, 30);
  scene.add(directionalLight);

  // Colored Point Lights for the glowing vibe
  const pLight1 = new THREE.PointLight(0x00E5FF, 2, 60);
  pLight1.position.set(0, 15, 15);
  scene.add(pLight1);

  const pLight2 = new THREE.PointLight(0x7B2FBE, 2, 60);
  pLight2.position.set(0, -15, 15);
  scene.add(pLight2);

  // Handle Resize
  window.addEventListener('resize', () => {
    if(container.clientWidth > 0) {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
  });

  // Animation Loop
  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    
    // Extremely slow time progression
    time += 0.002; 
    
    // Snail pace rotation
    dnaGroup.rotation.y -= 0.001; 
    
    // Subtle float effect
    dnaGroup.position.y = Math.sin(time) * 1.5;
    
    // Slowly rotate particles
    particlesMesh.rotation.y += 0.0005;
    particlesMesh.rotation.x += 0.0002;

    renderer.render(scene, camera);
  }

  animate();
});
