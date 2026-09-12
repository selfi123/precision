/**
 * Precision Allele.Dx — main.js
 *
 * Stack:
 *   - Lenis          : smooth native scroll
 *   - GSAP           : animation engine
 *   - ScrollTrigger  : scroll-driven sequencing (scrub mode)
 *   - Three.js r128  : 3D DNA helix scene
 *
 * Hero scroll experience (300vh pinned):
 *   Phase 0  (0  – 33%): Entry content visible; helix assembles upright
 *   Phase 1  (33 – 66%): Stats overlay; camera orbits, helix tilts
 *   Phase 2  (66 – 100%): Exit; helix explodes outward; camera pulls back
 */

'use strict';

/* =========================================================
   UTILITY — WebGL detection
   ========================================================= */
function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext('webgl') || c.getContext('experimental-webgl'))
    );
  } catch (_) {
    return false;
  }
}

/* =========================================================
   1. LENIS SMOOTH SCROLL
   ========================================================= */
let lenis;

function initLenis() {
  if (typeof Lenis === 'undefined') return;

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
  });

  // Sync Lenis with GSAP ticker so ScrollTrigger stays accurate
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Also register Lenis scroll events with ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
}

/* =========================================================
   2. THREE.JS SCENE SETUP
   ========================================================= */
let renderer, scene, camera;
let helixGroup, particleSystem;
let clock;

/* Camera animation targets (driven by GSAP) */
const camAnim = {
  posZ:  22,     // default pull-back distance
  posX:   0,
  posY:   0,
  rotX:   0,
  rotY:   0,
};

/* Scene color animatable object */
const sceneAnim = {
  helixScaleX: 1,
  helixScaleY: 1,
  helixScaleZ: 1,
  helixRotY:   0,
  helixRotZ:   0,
  helixPosX:   0,
  particleSpread: 1,
  particleOpacity: 0.55,
  bgFogDensity: 0.0,
  morphProgress: 0.0,
  entryOffsetX: 25, // Separated from helixPosX to prevent GSAP conflicts
};

function initThreeScene() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  /* ---- Renderer ---- */
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  /* ---- Scene ---- */
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0xF8FAFC, 0.0); // Light theme fog (Slate 50)

  /* ---- Camera ---- */
  camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, camAnim.posZ);

  /* ---- Build Diagnostic Sphere ---- */
  helixGroup = buildDiagnosticSphere(); // Keeping variable name helixGroup for GSAP compatibility, but it's a sphere now
  scene.add(helixGroup);

  /* ---- Floating Particles ---- */
  particleSystem = buildParticleSystem();
  scene.add(particleSystem);

  /* ---- Ambient light for future use ---- */
  scene.add(new THREE.AmbientLight(0xffffff, 0.3));

  /* ---- Clock ---- */
  clock = new THREE.Clock();

  /* ---- Initial Entry Animation (From right side) ---- */
  sceneAnim.helixPosX = 5; // Base resting position
  if (typeof gsap !== 'undefined') {
    gsap.to(sceneAnim, {
      entryOffsetX: 0, // Animates from 25 to 0
      duration: 2.0,
      ease: "power3.out",
    });
  }

  /* ---- Resize ---- */
  window.addEventListener('resize', onResize);
}

/* --- Build Morphing Sticks (Sphere to Grid) --- */
function buildDiagnosticSphere() { // keeping name for backward compatibility in init function
  const group = new THREE.Group();
  
  // 1. Geometry: Perfectly straight line (cylinder)
  const geometry = new THREE.CylinderGeometry(0.02, 0.02, 1.5, 8);
  // Orient geometry along Z-axis so it points outward easily
  geometry.rotateX(Math.PI / 2);
  // Shift origin to the base so it scales from the sphere surface outward
  geometry.translate(0, 0, 0.75);

  const count = 3000;
  
  const posSphere = new Float32Array(count * 3);
  const rotSphere = new Float32Array(count * 4);
  const posGrid = new Float32Array(count * 3);
  const rotGrid = new Float32Array(count * 4);
  const colors = new Float32Array(count * 3);
  
  const palette = [
    new THREE.Color(0x00E5FF),
    new THREE.Color(0xD62BC7),
    new THREE.Color(0x1E2F7A)
  ];
  
  const dummy = new THREE.Object3D();
  
  const gridCols = 30;
  const gridRows = 10;
  const gridDepth = 10;
  const spacingX = 1.5;
  const spacingY = 1.5;
  const spacingZ = 1.5;
  
  for(let i = 0; i < count; i++) {
    // ---- SPHERE LAYOUT (Fibonacci sphere) ----
    const phi = Math.acos(1 - 2 * (i + 0.5) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = 4.0; // Perfect uniform radius for the base of the sticks
    
    const sx = r * Math.sin(phi) * Math.cos(theta);
    const sy = r * Math.sin(phi) * Math.sin(theta);
    const sz = r * Math.cos(phi);
    
    dummy.position.set(sx, sy, sz);
    // Look OUTWARD from the center
    dummy.lookAt(sx * 2, sy * 2, sz * 2);
    
    posSphere[i*3] = dummy.position.x;
    posSphere[i*3+1] = dummy.position.y;
    posSphere[i*3+2] = dummy.position.z;
    
    rotSphere[i*4] = dummy.quaternion.x;
    rotSphere[i*4+1] = dummy.quaternion.y;
    rotSphere[i*4+2] = dummy.quaternion.z;
    rotSphere[i*4+3] = dummy.quaternion.w;
    
    // ---- 3-PANEL GRID LAYOUT ----
    const sticksPerCard = 1000;
    const cardCols = 25;
    const cardRows = 40;
    // Much wider spacing to make it sparse and clean
    const cardSpacingX = 1.2;
    const cardSpacingY = 0.9;
    
    const cardIndex = Math.floor(i / sticksPerCard); // 0, 1, or 2
    const stickInCard = i % sticksPerCard;
    
    const col = stickInCard % cardCols;
    const row = Math.floor(stickInCard / cardCols);
    
    // Local center of the card
    const localX = (col - cardCols/2) * cardSpacingX;
    const localY = (row - cardRows/2) * cardSpacingY;
    
    // Global position of the 3 cards (Spread out heavily)
    const gap = 28; 
    const globalX = (cardIndex - 1) * gap;
    
    // Push them down and back so they sit behind the text as a clean backdrop
    dummy.position.set(globalX + localX, localY - 8, -10);
    
    // Form a perfectly straight structural grid (Tic-Tac-Toe / Circuit style)
    if (stickInCard % 2 === 0) {
      dummy.rotation.set(0, Math.PI/2, 0); // Horizontal along X
    } else {
      dummy.rotation.set(Math.PI/2, 0, 0); // Vertical along Y
    }
    
    posGrid[i*3] = dummy.position.x;
    posGrid[i*3+1] = dummy.position.y;
    posGrid[i*3+2] = dummy.position.z;
    
    rotGrid[i*4] = dummy.quaternion.x;
    rotGrid[i*4+1] = dummy.quaternion.y;
    rotGrid[i*4+2] = dummy.quaternion.z;
    rotGrid[i*4+3] = dummy.quaternion.w;
    
    // ---- COLORS ----
    const c = palette[Math.floor(Math.random() * palette.length)];
    colors[i*3] = c.r;
    colors[i*3+1] = c.g;
    colors[i*3+2] = c.b;
  }
  
  geometry.setAttribute('aPosSphere', new THREE.InstancedBufferAttribute(posSphere, 3));
  geometry.setAttribute('aRotSphere', new THREE.InstancedBufferAttribute(rotSphere, 4));
  geometry.setAttribute('aPosGrid', new THREE.InstancedBufferAttribute(posGrid, 3));
  geometry.setAttribute('aRotGrid', new THREE.InstancedBufferAttribute(rotGrid, 4));
  geometry.setAttribute('aColor', new THREE.InstancedBufferAttribute(colors, 3));
  
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      uMorphProgress: { value: 0 }
    },
    vertexShader: `
      uniform float time;
      uniform float uMorphProgress;
      
      attribute vec3 aPosSphere;
      attribute vec4 aRotSphere;
      attribute vec3 aPosGrid;
      attribute vec4 aRotGrid;
      attribute vec3 aColor;
      
      varying vec3 vColor;
      varying vec3 vNormal;
      
      vec3 applyQuaternionToVector(vec4 q, vec3 v) {
        return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
      }
      
      vec4 slerp(vec4 q1, vec4 q2, float t) {
        float cosHalfTheta = dot(q1, q2);
        if (cosHalfTheta < 0.0) {
          q2 = -q2;
          cosHalfTheta = -cosHalfTheta;
        }
        if (abs(cosHalfTheta) >= 1.0) {
          return q1;
        }
        float halfTheta = acos(cosHalfTheta);
        float sinHalfTheta = sqrt(1.0 - cosHalfTheta * cosHalfTheta);
        if (abs(sinHalfTheta) < 0.001) {
          return vec4(q1 * 0.5 + q2 * 0.5);
        }
        float ratioA = sin((1.0 - t) * halfTheta) / sinHalfTheta;
        float ratioB = sin(t * halfTheta) / sinHalfTheta;
        return q1 * ratioA + q2 * ratioB;
      }

      void main() {
        vColor = aColor;
        vNormal = normal;
        
        vec3 spherePos = aPosSphere;
        vec3 gridPos = aPosGrid;
        
        // --- CONTINUOUS SPHERE ROTATION ---
        // Spin the sphere on the Y axis over time. 
        // We do this in the shader so the Grid state remains perfectly static and forward-facing!
        float angle = time * 0.15;
        float cosA = cos(angle);
        float sinA = sin(angle);
        mat2 rotMat = mat2(cosA, -sinA, sinA, cosA);
        spherePos.xz = rotMat * spherePos.xz;
        
        // Also rotate the sphere quaternions so the sticks point correctly after spinning
        // A rotation quaternion around Y axis is (0, sin(angle/2), 0, cos(angle/2))
        float halfAngle = angle * 0.5;
        vec4 rotYQuat = vec4(0.0, sin(halfAngle), 0.0, cos(halfAngle));
        // Multiply quaternions: rotYQuat * aRotSphere
        vec4 spunRotSphere = vec4(
          rotYQuat.w * aRotSphere.x + rotYQuat.x * aRotSphere.w + rotYQuat.y * aRotSphere.z - rotYQuat.z * aRotSphere.y,
          rotYQuat.w * aRotSphere.y - rotYQuat.x * aRotSphere.z + rotYQuat.y * aRotSphere.w + rotYQuat.z * aRotSphere.x,
          rotYQuat.w * aRotSphere.z + rotYQuat.x * aRotSphere.y - rotYQuat.y * aRotSphere.x + rotYQuat.z * aRotSphere.w,
          rotYQuat.w * aRotSphere.w - rotYQuat.x * aRotSphere.x - rotYQuat.y * aRotSphere.y - rotYQuat.z * aRotSphere.z
        );
        
        vec3 finalInstPos = mix(spherePos, gridPos, uMorphProgress);
        vec4 finalInstRot = slerp(spunRotSphere, aRotGrid, uMorphProgress);
        
        // --- WAVE MOVEMENT FOR SPHERE ---
        // Create a 3D noise/wave based on the un-spun instance position so the waves travel
        // Slower "snail" movement using lower time multipliers
        float wave = sin(aPosSphere.x * 1.5 + time * 0.5) * cos(aPosSphere.y * 1.5 + time * 0.3);
        
        // Scale the stick length (Z-axis) based on the wave. 
        // This makes the sphere "breathe" with moving waves.
        // As it morphs to the grid, this wave flattens out to 1.0 (perfectly rigid grid).
        float stretch = 1.0 + wave * 0.6 * (1.0 - uMorphProgress);
        
        vec3 localPos = position;
        localPos.z *= stretch;
        
        vec3 rotatedLocalPos = applyQuaternionToVector(finalInstRot, localPos);
        vec3 finalPos = finalInstPos + rotatedLocalPos;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying vec3 vNormal;
      void main() {
        float intensity = max(dot(normalize(vNormal), vec3(0.5, 1.0, 1.0)), 0.3);
        gl_FragColor = vec4(vColor * intensity, 1.0);
      }
    `,
    side: THREE.DoubleSide
  });

  const instancedMesh = new THREE.InstancedMesh(geometry, material, count);
  group.add(instancedMesh);
  
  group.userData.mat = material;
  
  return group;
}

/* --- Build floating particle system --- */
function buildParticleSystem() {
  const COUNT = 400; // Fewer particles for a cleaner look
  const geo   = new THREE.BufferGeometry();
  const pos   = new Float32Array(COUNT * 3);
  const col   = new Float32Array(COUNT * 3);
  const sizes = new Float32Array(COUNT);
  /* Store original positions for animation */
  const origPos = new Float32Array(COUNT * 3);

  const palette = [
    new THREE.Color(0x00C8BE),  // teal
    new THREE.Color(0x1E2F7A),  // indigo
    new THREE.Color(0x94A3B8),  // slate-400 (light gray for clinical look)
  ];

  for (let i = 0; i < COUNT; i++) {
    const r   = 15 + Math.random() * 20;
    const phi = Math.acos(2 * Math.random() - 1);
    const th  = Math.random() * Math.PI * 2;
    const x   = r * Math.sin(phi) * Math.cos(th);
    const y   = r * Math.sin(phi) * Math.sin(th);
    const z   = r * Math.cos(phi);
    pos[i * 3]     = origPos[i * 3]     = x;
    pos[i * 3 + 1] = origPos[i * 3 + 1] = y;
    pos[i * 3 + 2] = origPos[i * 3 + 2] = z;

    const c = palette[Math.floor(Math.random() * palette.length)];
    col[i * 3]     = c.r;
    col[i * 3 + 1] = c.g;
    col[i * 3 + 2] = c.b;

    sizes[i] = Math.random() * 0.08 + 0.03;
  }

  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
  geo.userData.origPos = origPos;

  const mat = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.4,
    sizeAttenuation: true,
  });

  return new THREE.Points(geo, mat);
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/* =========================================================
   3. THREE.JS ANIMATION LOOP
   ========================================================= */
/* Mouse parallax */
const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
document.addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
  mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
});

function animateThree() {
  requestAnimationFrame(animateThree);
  if (!renderer || !scene || !camera) return;

  const elapsed = clock.getElapsedTime();

  /* Apply camAnim values driven by GSAP / mouse */
  mouse.tx += (mouse.x - mouse.tx) * 0.04;
  mouse.ty += (mouse.y - mouse.ty) * 0.04;

  camera.position.x = camAnim.posX + mouse.tx * 1.2;
  camera.position.y = camAnim.posY - mouse.ty * 0.8;
  camera.position.z = camAnim.posZ;
  camera.rotation.x = camAnim.rotX;
  camera.rotation.y = camAnim.rotY;
  camera.lookAt(camAnim.posX, camAnim.posY, 0);

  /* Apply sceneAnim values driven by GSAP */
  if (helixGroup) {
    helixGroup.scale.set(
      sceneAnim.helixScaleX,
      sceneAnim.helixScaleY,
      sceneAnim.helixScaleZ
    );
    helixGroup.rotation.y = sceneAnim.helixRotY; // GSAP controls base rotation only
    helixGroup.rotation.z = sceneAnim.helixRotZ;
    helixGroup.position.x = sceneAnim.helixPosX + sceneAnim.entryOffsetX; // Combine ScrollTrigger + Entry offset
    
    // Update Shader Time & Morph
    if (helixGroup.userData.mat) {
      helixGroup.userData.mat.uniforms.time.value = elapsed;
      helixGroup.userData.mat.uniforms.uMorphProgress.value = sceneAnim.morphProgress;
    }
  }

  /* Particle drift + spread controlled by sceneAnim.particleSpread */
  if (particleSystem) {
    particleSystem.rotation.y = elapsed * 0.04;
    particleSystem.rotation.x = elapsed * 0.02;
    particleSystem.material.opacity = sceneAnim.particleOpacity;

    /* Spread effect: scale particle positions by spread factor */
    const posAttr = particleSystem.geometry.attributes.position;
    const orig    = particleSystem.geometry.userData.origPos;
    const spread  = sceneAnim.particleSpread;
    for (let i = 0; i < posAttr.count; i++) {
      posAttr.setXYZ(
        i,
        orig[i * 3]     * spread,
        orig[i * 3 + 1] * spread,
        orig[i * 3 + 2] * spread
      );
    }
    posAttr.needsUpdate = true;
  }

  /* Fog density */
  if (scene.fog) scene.fog.density = sceneAnim.bgFogDensity;

  renderer.render(scene, camera);
}

/* =========================================================
   4. GSAP SCROLL-TRIGGER HERO ANIMATION
   ========================================================= */
function initHeroScrollAnimation() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  const heroOuter  = document.getElementById('hero');
  const phase0     = document.getElementById('phase-0');
  const phase1     = document.getElementById('phase-1');
  const phase2     = document.getElementById('phase-2');
  const scrollHint = document.getElementById('scroll-hint');
  const progressBar = document.getElementById('scroll-progress');

  if (!heroOuter) return;

  /* Tell ScrollTrigger to use Lenis for scroll position */
  if (lenis) {
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) { lenis.scrollTo(value, { immediate: true }); }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });
  }

  /* ---- Master timeline pinned to hero-outer ---- */
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: heroOuter,
      start: 'top top',
      end:   'bottom bottom',   // 300vh => 2 viewports of scroll
      scrub: 1.2,               // smooth scrubbing
      pin:   false,             // sticky CSS handles the pin
      onUpdate: (self) => {
        /* Scroll progress bar */
        if (progressBar) progressBar.style.width = (self.progress * 100) + '%';
      },
    },
  });

  /* ============================================
     PHASE 0 → PHASE 1  (progress 0 → 0.45)
     Scene: helix tilts left, camera pushes in
     Text:  phase-0 fades out, phase-1 fades in
     ============================================ */
  tl
    /* 0 – 0.1: fade out the scroll hint */
    .to(scrollHint, { opacity: 0, duration: 0.1 }, 0)

    /* 0 – 0.3: helix tilts and shifts left (camera stays) */
    .to(sceneAnim, {
      helixRotZ: -0.6,
      helixPosX: -2,
      duration: 0.3,
    }, 0)

    /* 0.1 – 0.35: camera closes in */
    .to(camAnim, {
      posZ: 14,
      posX: -1,
      duration: 0.25,
    }, 0.1)

    /* 0.3 – 0.42: phase-0 fades out */
    .fromTo(phase0,
      { autoAlpha: 1, y: 0 },
      { autoAlpha: 0, y: -30, duration: 0.12 },
      0.3
    )

    /* 0.38 – 0.55: phase-1 fades in (stats) */
    .fromTo(phase1,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.17, onStart: () => triggerStatCounters() },
      0.38
    )

    /* ============================================
       PHASE 1 → PHASE 2 (MORPH INTO GRID)
       ============================================ */
    /* 0.55 – 0.8: Sphere morphs into the flat background grid panels */
    .to(sceneAnim, {
      morphProgress: 1.0,
      helixRotY: 0, 
      helixRotZ: 0,
      helixPosX: 0, // Reset to center for the grid
      duration: 0.25,
      ease: "power2.inOut"
    }, 0.55)

    .to(camAnim, {
      posZ: 45, // pull back further to see the massive spaced out panels
      posY: 5,  // look slightly down at them
      posX: 0,
      duration: 0.25,
      ease: "power2.inOut"
    }, 0.55)

    /* 0.65 – 0.73: phase-1 fades out */
    .to(phase1, {
      autoAlpha: 0,
      duration: 0.08,
    }, 0.65)

    /* 0.72 – 0.84: phase-2 fades in */
    .fromTo(phase2,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.12 },
      0.72
    )
    
    /* Pad the timeline to 1.0 so scroll mapping remains consistent with the original design */
    .to({}, { duration: 0.16 }, 0.84);

  /* ---- Entry animation (plays immediately on load, not scroll-driven) ---- */
  const entryTl = gsap.timeline({ delay: 0.3 });
  entryTl
    .from('#title-word-1',      { opacity: 0, y: 40, duration: 0.7, ease: 'power3.out' })
    .from('#title-word-2',      { opacity: 0, y: 40, duration: 0.7, ease: 'power3.out' }, '-=0.4')
    .from('#hero-tagline-text', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    .from('#hero-desc-text',    { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    .from('#hero-cta-group',    { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' }, '-=0.3')
    .from('.hero-badge',        { opacity: 0, scale: 0.85, duration: 0.4, ease: 'back.out(2)' }, 0.2)
    .from('.scroll-progress-bar', { opacity: 0, duration: 0.4 }, 1.2);
}

/* =========================================================
   5. ANIMATED STAT COUNTERS (triggered by scroll phase)
   ========================================================= */
let countersRan = false;

function triggerStatCounters() {
  if (countersRan) return;
  countersRan = true;

  document.querySelectorAll('.stat-number[data-count]').forEach((el) => {
    const target   = parseInt(el.dataset.count, 10);
    const duration = 1800;
    const start    = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  });
}

/* =========================================================
   6. SCROLL-REVEAL ANIMATIONS (sections below hero)
   ========================================================= */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      /* Stagger siblings */
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const idx      = siblings.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), idx * 100);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  els.forEach((el) => obs.observe(el));
}

/* =========================================================
   7. STICKY NAVBAR
   ========================================================= */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;
  let ticking    = false;

  navbar.style.transition =
    'transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.35s ease, padding 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease';

  function handleScroll() {
    const scrollY = lenis ? lenis.scroll : window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 60);

    if (scrollY > 300) {
      if (scrollY > lastScroll + 10) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
        lastScroll = scrollY;
      } else if (scrollY < lastScroll - 10) {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        lastScroll = scrollY;
      }
    } else {
      navbar.style.transform = 'translateY(0)';
      lastScroll = scrollY;
    }

    ticking = false;
  }

  /* Use Lenis scroll event if available, else native */
  if (lenis) {
    lenis.on('scroll', () => {
      if (!ticking) { requestAnimationFrame(handleScroll); ticking = true; }
    });
  } else {
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(handleScroll); ticking = true; }
    });
  }
}

/* =========================================================
   8. MOBILE HAMBURGER MENU
   ========================================================= */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
    /* Pause Lenis while menu is open */
    if (lenis) isOpen ? lenis.stop() : lenis.start();
  });

  navLinks.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }
  });
}

/* =========================================================
   9. CONTACT FORM UX
   ========================================================= */
function initContactForm() {
  const form      = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');
  if (!form || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name  = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();

    if (!name)                         { showFieldError(form.querySelector('#name'),  'Please enter your name.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showFieldError(form.querySelector('#email'), 'Please enter a valid email.'); return; }

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> Sending…`;

    setTimeout(() => {
      submitBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Message Sent!`;
      submitBtn.style.background = 'linear-gradient(135deg, #00c896, #00a07a)';
      const note = form.querySelector('.form-note');
      if (note) { note.textContent = '✓ Thank you! Our team will be in touch within 24 hours.'; note.style.color = '#00c896'; }

      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = `Send Inquiry <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>`;
        submitBtn.style.background = '';
        const note = form.querySelector('.form-note');
        if (note) { note.textContent = 'We respond to all partnership inquiries within 24 business hours.'; note.style.color = ''; }
      }, 5000);
    }, 1500);
  });

  function showFieldError(input, msg) {
    input.focus();
    input.style.borderColor = '#ff4d6d';
    input.style.boxShadow   = '0 0 0 3px rgba(255,77,109,0.15)';
    if (!input.parentElement.querySelector('.field-error')) {
      const err = document.createElement('span');
      err.className = 'field-error';
      err.textContent = msg;
      err.style.cssText = 'font-size:.78rem;color:#ff4d6d;margin-top:.25rem;display:block;';
      input.parentElement.appendChild(err);
    }
    input.addEventListener('input', () => {
      input.style.borderColor = '';
      input.style.boxShadow   = '';
      const e = input.parentElement.querySelector('.field-error');
      if (e) e.remove();
    }, { once: true });
  }
}

/* =========================================================
   10. ACTIVE NAV LINK HIGHLIGHTING
   ========================================================= */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  if (!sections.length || !links.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const id = e.target.id;
      links.forEach((l) => {
        const active = l.getAttribute('href') === `#${id}`;
        l.style.color = active ? 'var(--text-primary)' : '';
        l.classList.toggle('active', active);
      });
    });
  }, { threshold: 0.4 });

  sections.forEach((s) => obs.observe(s));
}

/* =========================================================
   11. CARD 3D TILT
   ========================================================= */
function initTilt() {
  document.querySelectorAll('.service-image-wrap, .about-card').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r  = el.getBoundingClientRect();
      const x  = (e.clientX - r.left) / r.width  - 0.5;
      const y  = (e.clientY - r.top)  / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) scale(1.02)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

/* =========================================================
   BOOTSTRAP
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  /* Check WebGL */
  if (!hasWebGL()) {
    const fallback = document.getElementById('hero-fallback');
    const canvas   = document.getElementById('hero-canvas');
    if (fallback) { fallback.classList.add('visible'); fallback.removeAttribute('aria-hidden'); }
    if (canvas)   { canvas.style.display = 'none'; }

    /* Still show the hero content without 3D */
    const phase0 = document.getElementById('phase-0');
    if (phase0) phase0.style.opacity = '1';
  } else {
    initThreeScene();
    animateThree();
  }

  initLenis();
  initNavbar();
  initMobileMenu();
  initHeroScrollAnimation();
  initReveal();
  initContactForm();
  initActiveNav();
  initTilt();

  // Force a ScrollTrigger refresh after all assets and fonts are fully loaded
  // This prevents scroll boundaries from being miscalculated and causing the scroll to get "stuck"
  window.addEventListener('load', () => {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  });
});

/* Dev console branding */
console.log('%cPrecision Allele.Dx', 'color:#00d4ff;font-size:20px;font-weight:900;font-family:monospace;letter-spacing:-0.04em;');
console.log('%cScroll-Driven 3D Hero  ·  Three.js + GSAP + Lenis', 'color:#7c3aed;font-size:11px;font-family:monospace;');
