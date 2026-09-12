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
  // Removed particle system as requested

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
    
    // ---- COLORS ----
    const c = palette[Math.floor(Math.random() * palette.length)];
    colors[i*3] = c.r;
    colors[i*3+1] = c.g;
    colors[i*3+2] = c.b;
  }
  
  geometry.setAttribute('aPosSphere', new THREE.InstancedBufferAttribute(posSphere, 3));
  geometry.setAttribute('aRotSphere', new THREE.InstancedBufferAttribute(rotSphere, 4));
  geometry.setAttribute('aColor', new THREE.InstancedBufferAttribute(colors, 3));
  
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 }
    },
    vertexShader: `
      uniform float time;
      
      attribute vec3 aPosSphere;
      attribute vec4 aRotSphere;
      attribute vec3 aColor;
      
      varying vec3 vColor;
      varying vec3 vNormal;
      
      vec3 applyQuaternionToVector(vec4 q, vec3 v) {
        return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
      }
      
      void main() {
        vColor = aColor;
        vNormal = normal;
        
        vec3 spherePos = aPosSphere;
        
        // --- CONTINUOUS SPHERE ROTATION ---
        float angle = time * 0.15;
        float cosA = cos(angle);
        float sinA = sin(angle);
        mat2 rotMat = mat2(cosA, -sinA, sinA, cosA);
        spherePos.xz = rotMat * spherePos.xz;
        
        float halfAngle = angle * 0.5;
        vec4 rotYQuat = vec4(0.0, sin(halfAngle), 0.0, cos(halfAngle));
        vec4 spunRotSphere = vec4(
          rotYQuat.w * aRotSphere.x + rotYQuat.x * aRotSphere.w + rotYQuat.y * aRotSphere.z - rotYQuat.z * aRotSphere.y,
          rotYQuat.w * aRotSphere.y - rotYQuat.x * aRotSphere.z + rotYQuat.y * aRotSphere.w + rotYQuat.z * aRotSphere.x,
          rotYQuat.w * aRotSphere.z + rotYQuat.x * aRotSphere.y - rotYQuat.y * aRotSphere.x + rotYQuat.z * aRotSphere.w,
          rotYQuat.w * aRotSphere.w - rotYQuat.x * aRotSphere.x - rotYQuat.y * aRotSphere.y - rotYQuat.z * aRotSphere.z
        );
        
        // --- WAVE MOVEMENT FOR SPHERE ---
        float wave = sin(aPosSphere.x * 1.5 + time * 0.5) * cos(aPosSphere.y * 1.5 + time * 0.3);
        float stretch = 1.0 + wave * 0.6;
        
        vec3 localPos = position;
        localPos.z *= stretch;
        
        vec3 rotatedLocalPos = applyQuaternionToVector(spunRotSphere, localPos);
        vec3 finalPos = spherePos + rotatedLocalPos;
        
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

/* Build floating particle system removed */

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
    
    // Update Shader Time
    if (helixGroup.userData.mat) {
      helixGroup.userData.mat.uniforms.time.value = elapsed;
    }
  }

  /* Fog density */
  if (scene.fog) scene.fog.density = sceneAnim.bgFogDensity;

  renderer.render(scene, camera);
}

/* =========================================================
   4. HERO ENTRY ANIMATION (No Scroll Pinning)
   ========================================================= */
function initHeroEntryAnimation() {
  if (typeof gsap === 'undefined') return;

  // Trigger stat counters immediately or via intersection observer, 
  // since they are no longer part of a pinned scroll timeline.
  setTimeout(() => { triggerStatCounters(); }, 1000);

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
  initLenis();

  /* Check WebGL */
  if (!hasWebGL()) {
    const canvas = document.getElementById('hero-canvas');
    if (canvas) canvas.style.display = 'none';

    /* Still show the hero content without 3D */
    const phase0 = document.getElementById('phase-0');
    if (phase0) phase0.style.opacity = '1';
  } else {
    initThreeScene();
    initHeroEntryAnimation();
    animateThree();
  }

  initNavbar();
  initMobileMenu();
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
