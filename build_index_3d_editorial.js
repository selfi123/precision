const fs = require('fs');
const path = require('path');

// Read the latest public/index.html (which has Vision video and Bioinformatics video)
const indexHtml = fs.readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8');

// The CSS for the Gen_IO style light editorial layout
const editorialHeroCss = `
  /* ==================== GEN_IO STYLE LIGHT EDITORIAL HERO ==================== */
  .editorial-hero {
    position: relative;
    min-height: 94vh;
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 45%, #E9EFF6 100%);
    overflow: hidden;
    padding: 7rem 0 4rem;
  }

  .editorial-hero-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: 
      radial-gradient(circle at 72% 40%, rgba(215, 224, 226, 0.55), transparent 65%),
      radial-gradient(circle at 18% 75%, rgba(0, 180, 216, 0.08), transparent 50%);
  }

  .editorial-hero-container {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 4%;
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 1.25fr);
    align-items: center;
    min-height: 75vh;
    gap: 3rem;
  }

  /* Left Editorial Content */
  .editorial-left {
    position: relative;
    z-index: 3;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .editorial-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.42rem 1.15rem;
    background: rgba(15, 23, 42, 0.05);
    border: 1px solid rgba(15, 23, 42, 0.1);
    border-radius: 999px;
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #0F172A;
    margin-bottom: 1.6rem;
  }

  .editorial-badge .badge-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #00B4D8;
    box-shadow: 0 0 8px rgba(0, 180, 216, 0.6);
  }

  .editorial-title {
    font-family: var(--font-heading, 'Plus Jakarta Sans', sans-serif);
    font-size: clamp(2.6rem, 4.3vw, 4rem);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -0.03em;
    color: #0F172A;
    margin-bottom: 1.6rem;
  }

  .editorial-title .highlight-bold {
    color: #0B132B;
    position: relative;
  }

  .editorial-title .highlight-accent {
    color: #0077B6;
    font-weight: 800;
  }

  .editorial-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.9rem 2rem;
    background: #00B4D8;
    color: #FFFFFF !important;
    font-size: 0.98rem;
    font-weight: 700;
    border-radius: 12px;
    text-decoration: none;
    box-shadow: 0 10px 25px rgba(0, 180, 216, 0.28);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    margin-bottom: 2.2rem;
  }

  .editorial-cta-btn:hover {
    background: #0096C7;
    transform: translateY(-2px);
    box-shadow: 0 15px 35px rgba(0, 180, 216, 0.38);
    color: #FFFFFF !important;
  }

  .editorial-cta-btn i {
    font-size: 1.1rem;
    transition: transform 0.3s ease;
  }

  .editorial-cta-btn:hover i {
    transform: translate(2px, -2px);
  }

  .editorial-desc {
    font-size: 1.05rem;
    line-height: 1.68;
    color: #475569;
    max-width: 500px;
    margin-bottom: 2.2rem;
    font-weight: 400;
  }

  .editorial-trust-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(15, 23, 42, 0.08);
  }

  .editorial-trust-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.82rem;
    font-weight: 600;
    color: #64748B;
  }

  .editorial-trust-item i {
    color: #00B4D8;
    font-size: 1.05rem;
  }

  /* Right Stage with Floating Hospital Card */
  .editorial-right {
    position: relative;
    z-index: 4;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  /* The 3D Botanical DNA Canvas spanning ~80% across the hero page */
  .editorial-dna-stage {
    position: absolute;
    top: 48%;
    right: 3%;
    width: 78vw;
    max-width: 1180px;
    transform: translateY(-50%);
    z-index: 1;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.96;
  }

  .editorial-dna-img {
    width: 100%;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 25px 60px rgba(15, 23, 42, 0.12));
    animation: gentleFloatDNA 8s ease-in-out infinite;
  }

  @keyframes gentleFloatDNA {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-12px) rotate(1deg);
    }
  }

  /* Gen_IO Style Clean White Hospital Floating Card */
  .editorial-floating-card {
    position: relative;
    z-index: 4;
    width: 100%;
    max-width: 440px;
    background: rgba(255, 255, 255, 0.94);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 2.2rem 2rem;
    border: 1px solid rgba(226, 232, 240, 0.9);
    box-shadow: 0 25px 60px -15px rgba(15, 23, 42, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.9);
    transition: transform 0.4s ease, box-shadow 0.4s ease;
  }

  .editorial-floating-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 32px 70px -15px rgba(15, 23, 42, 0.2), 0 0 0 1px rgba(0, 180, 216, 0.3);
  }

  .card-top-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #0077B6;
    margin-bottom: 0.85rem;
  }

  .floating-card-title {
    font-size: 1.35rem;
    font-weight: 800;
    line-height: 1.25;
    color: #0F172A;
    margin-bottom: 0.75rem;
    letter-spacing: -0.015em;
  }

  .floating-card-title .highlight {
    color: #00B4D8;
  }

  .floating-card-sub {
    font-size: 0.88rem;
    line-height: 1.55;
    color: #64748B;
    margin-bottom: 1.6rem;
  }

  .floating-card-metrics {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    padding: 1rem 0;
    border-top: 1px solid rgba(226, 232, 240, 0.8);
    border-bottom: 1px solid rgba(226, 232, 240, 0.8);
    margin-bottom: 1.6rem;
  }

  .f-metric {
    display: flex;
    flex-direction: column;
  }

  .f-metric strong {
    font-size: 1.35rem;
    font-weight: 800;
    color: #0F172A;
    line-height: 1.1;
  }

  .f-metric strong .accent {
    color: #00B4D8;
    font-size: 0.95em;
  }

  .f-metric span {
    font-size: 0.68rem;
    font-weight: 600;
    color: #94A3B8;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-top: 0.3rem;
  }

  .floating-card-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.85rem 1.4rem;
    background: #0F172A;
    color: #FFFFFF !important;
    font-size: 0.9rem;
    font-weight: 700;
    border-radius: 10px;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .floating-card-btn:hover {
    background: #1E293B;
    transform: translateY(-1px);
    box-shadow: 0 10px 25px rgba(15, 23, 42, 0.25);
    color: #FFFFFF !important;
  }

  /* Comparison Banner for index_3d.html */
  .preview-pill-banner {
    position: fixed;
    top: 96px;
    right: 24px;
    z-index: 99999;
    background: rgba(15, 23, 42, 0.92);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(0, 180, 216, 0.4);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
    padding: 8px 16px;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 600;
    color: #FFFFFF;
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }
  .preview-pill-banner .badge {
    background: #00B4D8;
    color: #FFFFFF;
    padding: 3px 9px;
    border-radius: 999px;
    font-size: 0.72rem;
    text-transform: uppercase;
  }
  .preview-pill-banner a {
    color: #CBD5E1;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .preview-pill-banner a:hover {
    color: #00E5FF;
  }
  @media (max-width: 768px) {
    .preview-pill-banner {
      top: auto;
      bottom: 20px;
      right: 50%;
      transform: translateX(50%);
      width: max-content;
      max-width: 95vw;
    }
  }

  /* Responsive Rules */
  @media (max-width: 1200px) {
    .editorial-hero-container {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
    .editorial-dna-wrapper {
      left: -30%;
      width: 145%;
    }
  }

  @media (max-width: 992px) {
    .editorial-hero-container {
      grid-template-columns: 1fr;
      padding-top: 3rem;
      gap: 3.5rem;
    }
    .editorial-left {
      max-width: 100%;
      text-align: center;
      align-items: center;
    }
    .editorial-desc {
      max-width: 600px;
    }
    .editorial-right {
      min-height: 480px;
    }
    .editorial-dna-wrapper {
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      max-width: 650px;
    }
    .editorial-floating-card {
      margin: 0 auto;
    }
  }
`;

// HTML for the Gen_IO style light editorial hero
const editorialHeroHtml = `
  <!-- ==================== LIGHT EDITORIAL HERO (GEN_IO REFERENCE) ==================== -->
  <section class="editorial-hero">
    <div class="editorial-hero-bg"></div>

    <!-- 3D Botanical DNA Helix spanning ~80% across the hero canvas -->
    <div class="editorial-dna-stage">
      <img src="assets/images/dna_botanical_helix_transparent.png" alt="Precision Allele 3D DNA Helix" class="editorial-dna-img" />
    </div>

    <div class="container editorial-hero-container">

      <!-- Hero Left: Editorial Content -->
      <div class="editorial-left reveal-on-scroll reveal-slide-left">
        <div class="editorial-badge">
          <span class="badge-dot"></span>
          <span>NEXT-GENERATION ONCOLOGY GENOMICS</span>
        </div>

        <h1 class="editorial-title">
          Decoding your <span class="highlight-bold">DNA</span> &ndash;<br>
          <span class="highlight-accent">unlocking</span> your future.
        </h1>

        <a href="#solutions" class="editorial-cta-btn">
          <span>Discover more</span>
          <i class="ph ph-arrow-up-right"></i>
        </a>

        <p class="editorial-desc">
          Combine cutting-edge next-generation sequencing with advanced clinical oncology research to personalize cancer diagnosis and targeted therapeutics like never before.
        </p>

        <div class="editorial-trust-bar">
          <div class="editorial-trust-item">
            <i class="ph ph-shield-check"></i>
            <span>NABL &amp; CAP Accredited</span>
          </div>
          <div class="editorial-trust-item">
            <i class="ph ph-dna"></i>
            <span>94+ Targeted Panels</span>
          </div>
          <div class="editorial-trust-item">
            <i class="ph ph-certificate"></i>
            <span>NCCN &amp; ESMO Aligned</span>
          </div>
        </div>
      </div>

      <!-- Hero Right: Floating Hospital Card overlaid on DNA -->
      <div class="editorial-right">

        <!-- Gen_IO Style Clean White Hospital Floating Card -->
        <div class="editorial-floating-card reveal-on-scroll reveal-scale">
          <div class="card-top-tag">
            <i class="ph ph-sparkle"></i> CLINICAL EXCELLENCE
          </div>
          <h3 class="floating-card-title">
            Empower your <span class="highlight">future</span> with Precision Allele solutions
          </h3>
          <p class="floating-card-sub">
            We provide deep molecular and genetic insights to guide individualized cancer treatment and clinical decision support.
          </p>

          <div class="floating-card-metrics">
            <div class="f-metric">
              <strong>94<span class="accent">+</span></strong>
              <span>Panels</span>
            </div>
            <div class="f-metric">
              <strong>&lt; 0.5<span class="accent">%</span></strong>
              <span>ctDNA VAF</span>
            </div>
            <div class="f-metric">
              <strong>4<span class="accent">-Day</span></strong>
              <span>Rapid TAT</span>
            </div>
          </div>

          <a href="#contact" class="floating-card-btn">
            <span>Contact us</span>
            <i class="ph ph-arrow-right"></i>
          </a>
        </div>

      </div>

    </div>
  </section>
`;

const previewPillHtml = `
  <!-- Floating Comparison Preview Banner -->
  <div class="preview-pill-banner">
    <span class="badge">index_3d.html</span>
    <span>Light Editorial Layout + 3D Botanical DNA</span>
    <span>&bull;</span>
    <a href="index.html">View Main index.html &rarr;</a>
  </div>
`;

// Start with full index.html content
let resHtml = indexHtml;

// 1. Add editorial CSS right before </style>
resHtml = resHtml.replace('</style>', editorialHeroCss + '\n  </style>');

// 2. Replace the current hero section (<section class="hero"> ... </section>) with editorialHeroHtml
const heroRegex = /<!-- ==================== HERO SECTION: ARCHITECTURAL REDESIGN ==================== -->[\s\S]*?<\/section>/;
resHtml = resHtml.replace(heroRegex, editorialHeroHtml);

// 3. Add preview pill right before </body>
resHtml = resHtml.replace('</body>', previewPillHtml + '\n</body>');

// 4. Update title
resHtml = resHtml.replace('<title>', '<title>[Editorial 3D DNA] ');

// Write to public/index_3d.html
fs.writeFileSync(path.join(__dirname, 'public', 'index_3d.html'), resHtml, 'utf8');
console.log('Successfully generated public/index_3d.html!');

// Also sync to precision_al/public/index_3d.html
const precisionAlPublic = path.join(__dirname, '..', 'precision_al', 'public');
if (fs.existsSync(precisionAlPublic)) {
  fs.writeFileSync(path.join(precisionAlPublic, 'index_3d.html'), resHtml, 'utf8');
  console.log('Successfully synchronized to precision_al/public/index_3d.html!');
}
