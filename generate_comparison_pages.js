const fs = require('fs');
const path = require('path');

const srcFile = path.join(__dirname, 'public', 'index.html');
const baseHtml = fs.readFileSync(srcFile, 'utf8');

// Common Comparison Bar CSS and HTML
const compareBarCss = `
  /* ==================== COMPARISON SWITCHER BAR ==================== */
  .comparison-bar {
    position: fixed;
    top: 96px;
    right: 24px;
    z-index: 99999;
    pointer-events: auto;
    animation: fadeInDown 0.6s ease-out;
  }
  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .comparison-pill {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(13, 27, 42, 0.92);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(0, 229, 255, 0.35);
    box-shadow: 0 14px 40px rgba(0, 0, 0, 0.45), 0 0 25px rgba(0, 229, 255, 0.15);
    padding: 8px 16px;
    border-radius: 999px;
    font-size: 0.82rem;
    font-weight: 600;
    color: #FFFFFF;
  }
  .comparison-pill .comp-badge {
    background: linear-gradient(135deg, #00E5FF, #0066FF);
    color: #FFFFFF;
    padding: 4px 10px;
    border-radius: 999px;
    letter-spacing: 0.3px;
    font-size: 0.74rem;
    font-weight: 700;
    text-transform: uppercase;
  }
  .comparison-pill .comp-link {
    color: #E2E8F0;
    text-decoration: none;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
  }
  .comparison-pill .comp-link:hover {
    color: #00E5FF;
    background: rgba(0, 229, 255, 0.15);
    transform: translateY(-1px);
  }
  .comparison-pill .comp-link.comp-orig {
    color: #94A3B8;
    background: transparent;
  }
  .comparison-pill .comp-link.comp-orig:hover {
    color: #FFFFFF;
  }
  @media (max-width: 768px) {
    .comparison-bar {
      top: auto;
      bottom: 20px;
      right: 50%;
      transform: translateX(50%);
      width: max-content;
      max-width: 95vw;
    }
  }
`;

// ==========================================
// 1. GENERATE index_video_vision.html (OPTION 3)
// ==========================================
const visionVideoCss = `
    /* ==================== OPTION 3: OUR VISION WITH VIDEO BACKGROUND ==================== */
    .vision {
      position: relative;
      overflow: hidden;
      padding: 7rem 0;
      isolation: isolate;
      background: #FFFFFF;
    }

    .vision-video-wrap {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      overflow: hidden;
      pointer-events: none;
    }

    .vision-bg-video {
      position: absolute;
      top: 50%;
      left: 50%;
      min-width: 100%;
      min-height: 100%;
      width: auto;
      height: auto;
      transform: translate(-50%, -50%);
      object-fit: cover;
      opacity: 0.88;
      filter: saturate(1.25) contrast(1.08) brightness(1.02);
    }

    .vision-video-overlay {
      position: absolute;
      inset: 0;
      background: 
        linear-gradient(180deg, 
          #FFFFFF 0%, 
          rgba(255, 255, 255, 0.65) 6%, 
          rgba(255, 255, 255, 0.18) 25%, 
          rgba(240, 247, 255, 0.12) 50%, 
          rgba(255, 255, 255, 0.18) 75%, 
          rgba(255, 255, 255, 0.65) 94%, 
          #FFFFFF 100%
        ),
        radial-gradient(circle at 20% 30%, rgba(0, 229, 255, 0.16), transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(123, 47, 190, 0.14), transparent 50%);
      z-index: 1;
    }

    .vision-container {
      position: relative;
      z-index: 2;
    }

    .vision-live-tag {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      margin-top: 2rem;
      padding: 0.45rem 1.2rem;
      background: rgba(0, 102, 255, 0.06);
      border: 1px solid rgba(0, 102, 255, 0.2);
      border-radius: 999px;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: #0066FF;
    }

    .live-pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #00E5FF;
      box-shadow: 0 0 10px #00E5FF;
      animation: pulseLiveDot 2s infinite ease-in-out;
    }

    @keyframes pulseLiveDot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.75); }
    }
` + compareBarCss;

const visionVideoHtml = `  <!-- ==================== OUR VISION (OPTION 3: VIDEO BACKGROUND) ==================== -->
  <section class="vision section-padding" id="about">
    <div class="vision-video-wrap">
      <video class="vision-bg-video" autoplay muted loop playsinline preload="auto">
        <source src="assets/videos/vision_mixed_bg.mp4" type="video/mp4">
      </video>
      <div class="vision-video-overlay"></div>
    </div>

    <div class="container vision-container">
      <div class="vision-box reveal-on-scroll reveal-scale">
        <div class="vision-badge"><i class="ph ph-compass"></i> OUR GUIDING PURPOSE</div>
        <h2 class="section-title text-center">Our Vision</h2>
        <p class="text-center lead">
          Transforming precision oncology through accessible, high-resolution genomic diagnostics. We aim to empower
          oncologists and clinicians worldwide with actionable, comprehensive molecular insights that guide
          individualized patient care and improve clinical outcomes across all tumor types.
        </p>
        <div class="vision-live-tag">
          <span class="live-pulse-dot"></span>
          <span>HIGH-THROUGHPUT NGS PLATFORM &bull; AUTOMATED CLINICAL GENOMICS</span>
        </div>
      </div>
    </div>
  </section>`;

const compareBarOption3 = `
  <!-- Floating Comparison Bar -->
  <div class="comparison-bar" id="compare-bar">
    <div class="comparison-pill">
      <span class="comp-badge">Option 3: Video in Vision</span>
      <a href="index_video_section.html" class="comp-link">View Option 2 (Amrita Layout) <i class="ph ph-arrow-right"></i></a>
      <a href="index.html" class="comp-link comp-orig">Static</a>
    </div>
  </div>
`;

// Replace vision CSS in option 3
let opt3Html = baseHtml;
const visionCssRegex = /\/\* ==================== OUR VISION: WHITE THEME GRADIENT OVERLAY ==================== \*\/[\s\S]*?\.vision::before \{[\s\S]*?\}/;
opt3Html = opt3Html.replace(visionCssRegex, visionVideoCss);

// Replace vision section HTML in option 3
const visionHtmlRegex = /<!-- ==================== OUR VISION ==================== -->[\s\S]*?<\/section>/;
opt3Html = opt3Html.replace(visionHtmlRegex, visionVideoHtml);

// Insert compare bar right before closing body
opt3Html = opt3Html.replace('</body>', compareBarOption3 + '\n</body>');

// Title update
opt3Html = opt3Html.replace('<title>', '<title>[Option 3 - Video in Vision] ');

fs.writeFileSync(path.join(__dirname, 'public', 'index_video_vision.html'), opt3Html, 'utf8');
console.log('Successfully wrote index_video_vision.html');


// ==========================================
// 2. GENERATE index_video_section.html (OPTION 2)
// ==========================================
const impactSectionCss = `
  /* ==================== OPTION 2: AMRITA-STYLE DEDICATED RESEARCH & IMPACT SECTION ==================== */
  .research-impact {
    position: relative;
    background: #06090F;
    overflow: hidden;
    padding: 7.5rem 0;
    isolation: isolate;
    color: #FFFFFF;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .impact-video-wrap {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .impact-bg-video {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    transform: translate(-50%, -50%);
    object-fit: cover;
    opacity: 0.80;
    filter: saturate(1.25) contrast(1.1) brightness(1.02);
  }

  .impact-video-overlay {
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse at 85% 30%, rgba(0, 229, 255, 0.28), transparent 55%),
      radial-gradient(ellipse at 15% 70%, rgba(123, 47, 190, 0.24), transparent 55%),
      linear-gradient(135deg, rgba(6, 9, 15, 0.65) 0%, rgba(11, 17, 30, 0.42) 50%, rgba(6, 9, 15, 0.70) 100%);
    pointer-events: none;
  }

  /* Vibrant diagonal light beam streak matching Amrita screenshot */
  .impact-light-streak {
    position: absolute;
    top: -20%;
    right: 15%;
    width: 65%;
    height: 140%;
    background: linear-gradient(125deg, transparent 35%, rgba(0, 229, 255, 0.12) 48%, rgba(168, 85, 247, 0.14) 52%, rgba(245, 158, 11, 0.08) 56%, transparent 68%);
    filter: blur(40px);
    pointer-events: none;
    transform: rotate(-12deg);
  }

  .impact-container {
    position: relative;
    z-index: 2;
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 4%;
  }

  .impact-layout {
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 1.3fr);
    gap: 4.5rem;
    align-items: center;
  }

  /* Left column: Content */
  .impact-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .impact-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.42rem 1.15rem;
    background: rgba(0, 229, 255, 0.10);
    border: 1px solid rgba(0, 229, 255, 0.35);
    border-radius: 999px;
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.09em;
    color: #00E5FF;
    margin-bottom: 1.5rem;
    box-shadow: 0 0 20px rgba(0, 229, 255, 0.2);
  }

  .impact-headline {
    font-size: clamp(2.3rem, 3.8vw, 3.4rem);
    font-weight: 800;
    line-height: 1.15;
    color: #FFFFFF;
    letter-spacing: -0.025em;
    margin-bottom: 1.35rem;
  }

  .impact-gradient {
    background: linear-gradient(135deg, #00E5FF 0%, #38BDF8 40%, #A855F7 85%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .impact-description {
    font-size: 1.02rem;
    line-height: 1.72;
    color: #94A3B8;
    margin-bottom: 2.2rem;
    font-weight: 400;
  }

  .impact-link {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    color: #FFFFFF;
    font-size: 0.95rem;
    font-weight: 700;
    text-decoration: none;
    padding: 0.75rem 1.65rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(12px);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .impact-link:hover {
    background: linear-gradient(135deg, #00E5FF, #0066FF);
    border-color: #00E5FF;
    color: #FFFFFF;
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(0, 102, 255, 0.35);
  }

  .impact-link i {
    font-size: 1.05rem;
    transition: transform 0.3s ease;
  }

  .impact-link:hover i {
    transform: translate(2px, -2px);
  }

  /* Right column: 2x2 Metric Cards Grid */
  .impact-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.35rem;
  }

  .impact-card {
    border-radius: 24px;
    padding: 2.1rem 1.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    overflow: hidden;
    min-height: 172px;
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* Glass Dark Cards (Top-Left, Top-Right, Bottom-Left) */
  .impact-card.glass-dark {
    background: rgba(15, 23, 42, 0.65);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }

  .impact-card.glass-dark:hover {
    transform: translateY(-5px);
    border-color: rgba(0, 229, 255, 0.45);
    box-shadow: 0 26px 55px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 229, 255, 0.2);
  }

  /* Solid White Highlight Card (Bottom-Right, matching Amrita screenshot) */
  .impact-card.card-solid-white {
    background: #FFFFFF;
    border: 1px solid rgba(255, 255, 255, 0.95);
    box-shadow: 0 24px 50px rgba(0, 0, 0, 0.5), 0 0 35px rgba(255, 255, 255, 0.25);
  }

  .impact-card.card-solid-white:hover {
    transform: translateY(-5px);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), 0 0 45px rgba(0, 229, 255, 0.45);
  }

  .impact-card-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 1;
    max-width: 65%;
  }

  .impact-number {
    font-size: clamp(2.4rem, 3.4vw, 3.1rem);
    font-weight: 800;
    line-height: 1;
    color: #FFFFFF;
    letter-spacing: -0.03em;
    font-feature-settings: 'tnum' on, 'lnum' on;
  }

  .impact-number .plus {
    color: #00E5FF;
    font-weight: 700;
    margin-left: 2px;
  }

  .impact-card-label {
    font-size: 0.92rem;
    font-weight: 500;
    color: #94A3B8;
    margin-top: 0.65rem;
    line-height: 1.35;
  }

  /* Specific styling for White Card Text */
  .impact-card.card-solid-white .impact-feature-title {
    font-size: 1.12rem;
    font-weight: 800;
    color: #0A0F1D;
    line-height: 1.25;
    letter-spacing: -0.015em;
  }

  .impact-card.card-solid-white .impact-feature-sub {
    font-size: 0.78rem;
    font-weight: 600;
    color: #64748B;
    margin-top: 0.45rem;
    line-height: 1.35;
  }

  /* 3D Visual Icons matching the screenshot */
  .impact-visual-container {
    width: 96px;
    height: 96px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .impact-3d-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 16px;
    filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.4));
    transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .impact-card:hover .impact-3d-img {
    transform: scale(1.1) rotate(4deg);
  }

  /* Responsive Rules for Research & Impact Section */
  @media (max-width: 1280px) {
    .impact-layout {
      gap: 3rem;
    }
    .impact-card {
      padding: 1.7rem 1.4rem;
      min-height: 155px;
    }
    .impact-visual-container {
      width: 82px;
      height: 82px;
    }
  }

  @media (max-width: 992px) {
    .impact-layout {
      grid-template-columns: 1fr;
      gap: 3.5rem;
    }
    .impact-content {
      text-align: center;
      align-items: center;
    }
    .impact-description {
      max-width: 680px;
    }
  }

  @media (max-width: 640px) {
    .impact-grid {
      grid-template-columns: 1fr;
    }
    .impact-card {
      min-height: 140px;
    }
  }
` + compareBarCss;

const impactSectionHtml = `
  <!-- ==================== RESEARCH & CLINICAL EXCELLENCE (OPTION 2: DEDICATED SECTION) ==================== -->
  <section class="research-impact" id="research">
    <!-- Ambient Mixed Video Background Layer -->
    <div class="impact-video-wrap">
      <video class="impact-bg-video" autoplay muted loop playsinline preload="auto">
        <source src="assets/videos/vision_mixed_bg.mp4" type="video/mp4">
      </video>
      <div class="impact-video-overlay"></div>
    </div>
    <div class="impact-light-streak"></div>

    <div class="container impact-container">
      <div class="impact-layout">

        <!-- Left Column: Vision & Translational Narrative -->
        <div class="impact-content reveal-on-scroll reveal-slide-up">
          <div class="impact-badge">
            <i class="ph ph-sparkle"></i> RESEARCH &amp; CLINICAL EXCELLENCE
          </div>
          <h2 class="impact-headline">
            Be Transformative.<br>
            <span class="impact-gradient">Discover Precision.</span>
          </h2>
          <p class="impact-description">
            Precision Allele is a multi-disciplinary, research-intensive precision oncology enterprise, empowering oncologists and medical centers with high-depth Next-Generation Sequencing (NGS) and automated clinical bioinformatics. Accredited with world-class quality benchmarks, we offer over 94+ specialized genomic panels across Solid Tumors, Liquid Biopsies, and Hereditary Syndromes—translating molecular variants into actionable, life-extending targeted therapies.
          </p>
          <a href="#solutions" class="impact-link">
            <span>Explore Clinical Capabilities</span>
            <i class="ph ph-arrow-up-right"></i>
          </a>
        </div>

        <!-- Right Column: 2x2 High-Tech Metric Cards Grid (Amrita Style) -->
        <div class="impact-grid reveal-on-scroll reveal-scale">

          <!-- Card 1: 500+ Cancer Biomarkers (with 3D Glass Ribbon) -->
          <div class="impact-card glass-dark">
            <div class="impact-card-text">
              <div class="impact-number">500<span class="plus">+</span></div>
              <div class="impact-card-label">Actionable Cancer Panels &amp; Biomarkers</div>
            </div>
            <div class="impact-visual-container">
              <img src="assets/images/impact_icon_ribbon.jpg" alt="3D Glass Ribbon Biomarker Visual" class="impact-3d-img" />
            </div>
          </div>

          <!-- Card 2: 10,000+ Genomes Sequenced (with 3D Gold Rings) -->
          <div class="impact-card glass-dark">
            <div class="impact-card-text">
              <div class="impact-number">10,000<span class="plus">+</span></div>
              <div class="impact-card-label">Genomic Profiles &amp; NGS Datasets</div>
            </div>
            <div class="impact-visual-container">
              <img src="assets/images/impact_icon_ring.jpg" alt="3D Gold Rings Genomics Visual" class="impact-3d-img" />
            </div>
          </div>

          <!-- Card 3: 99.8% Analytical Concordance (with 3D Crystal Prism) -->
          <div class="impact-card glass-dark">
            <div class="impact-card-text">
              <div class="impact-number">99.8<span class="plus">%</span></div>
              <div class="impact-card-label">Diagnostic Analytical Concordance</div>
            </div>
            <div class="impact-visual-container">
              <img src="assets/images/impact_icon_prism.jpg" alt="3D Crystal Prism Concordance Visual" class="impact-3d-img" />
            </div>
          </div>

          <!-- Card 4: Signature White Highlight Card (with 3D Iridescent Sphere Knot) -->
          <div class="impact-card card-solid-white">
            <div class="impact-card-text">
              <div class="impact-feature-title">WORLD-RECOGNIZED RESEARCH &amp; CLINICAL INNOVATION</div>
              <div class="impact-feature-sub">NABL &amp; CAP Compliant NGS Platform &bull; Automated Decision Intelligence</div>
            </div>
            <div class="impact-visual-container">
              <img src="assets/images/impact_icon_sphere.jpg" alt="3D Iridescent Sphere Knot Emblem" class="impact-3d-img" />
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>
`;

const compareBarOption2 = `
  <!-- Floating Comparison Bar -->
  <div class="comparison-bar" id="compare-bar">
    <div class="comparison-pill">
      <span class="comp-badge">Option 2: Dedicated Section</span>
      <a href="index_video_vision.html" class="comp-link">View Option 3 (Video in Vision) <i class="ph ph-arrow-right"></i></a>
      <a href="index.html" class="comp-link comp-orig">Static</a>
    </div>
  </div>
`;

let opt2Html = baseHtml;

// Add impact section CSS right before closing </style>
opt2Html = opt2Html.replace('</style>', impactSectionCss + '\n  </style>');

// Add impact section HTML right after vision section
const visionSectionEndRegex = /(<\/section>[\s\n]*<!-- ==================== SOLUTIONS \/ CAPABILITIES ==================== -->)/;
opt2Html = opt2Html.replace(visionSectionEndRegex, `</section>\n${impactSectionHtml}\n  <!-- ==================== SOLUTIONS / CAPABILITIES ==================== -->`);

// Update navbar in opt2Html to include "Research"
opt2Html = opt2Html.replace('<li><a href="#about">About</a></li>', '<li><a href="#about">About</a></li>\n          <li><a href="#research">Research</a></li>');
opt2Html = opt2Html.replace('<li><a href="#about" class="mobile-link">About</a></li>', '<li><a href="#about" class="mobile-link">About</a></li>\n          <li><a href="#research" class="mobile-link">Research</a></li>');

// Insert compare bar right before closing body
opt2Html = opt2Html.replace('</body>', compareBarOption2 + '\n</body>');

// Title update
opt2Html = opt2Html.replace('<title>', '<title>[Option 2 - Dedicated Impact Section] ');

fs.writeFileSync(path.join(__dirname, 'public', 'index_video_section.html'), opt2Html, 'utf8');
console.log('Successfully wrote index_video_section.html');

// Also copy both files to precision_al/public for full workspace synchronization
const precisionAlPublic = path.join(__dirname, '..', 'precision_al', 'public');
if (fs.existsSync(precisionAlPublic)) {
  fs.writeFileSync(path.join(precisionAlPublic, 'index_video_vision.html'), opt3Html, 'utf8');
  fs.writeFileSync(path.join(precisionAlPublic, 'index_video_section.html'), opt2Html, 'utf8');
  console.log('Successfully synchronized both comparison files to precision_al/public');
}
