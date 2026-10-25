const fs = require('fs');
const path = require('path');

const srcFile = path.join(__dirname, 'public', 'index.html');
let html = fs.readFileSync(srcFile, 'utf8');

// ========================================================
// 1. VISION SECTION CSS (Option 3 with microscope video)
// ========================================================
const visionVideoCss = `
    /* ==================== OUR VISION: VIDEO BACKGROUND (MICROSCOPY) ==================== */
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
`;

// Replace old Vision CSS
const visionCssRegex = /\/\* ==================== OUR VISION: WHITE THEME GRADIENT OVERLAY ==================== \*\/[\s\S]*?\.vision::before \{[\s\S]*?\}/;
html = html.replace(visionCssRegex, visionVideoCss);

// ========================================================
// 2. VISION SECTION HTML MARKUP (Option 3)
// ========================================================
const visionVideoHtml = `  <!-- ==================== OUR VISION (MICROSCOPY VIDEO BACKGROUND) ==================== -->
  <section class="vision section-padding" id="about">
    <div class="vision-video-wrap">
      <video class="vision-bg-video" autoplay muted loop playsinline preload="auto">
        <source src="assets/videos/vision_microscope_bg.mp4" type="video/mp4">
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

const visionHtmlRegex = /<!-- ==================== OUR VISION ==================== -->[\s\S]*?<\/section>/;
html = html.replace(visionHtmlRegex, visionVideoHtml);


// ========================================================
// 3. BIOINFORMATICS SECTION CSS (Amrita Option 2 Design)
// ========================================================
const bioSectionCss = `
    /* ==================== BIOINFORMATICS & CLINICAL DECISION SUPPORT (OPTION 2 DESIGN) ==================== */
    .bioinformatics {
      position: relative;
      background: #06090F;
      overflow: hidden;
      padding: 7.5rem 0 !important;
      isolation: isolate;
      color: #FFFFFF;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .bio-video-wrap {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      overflow: hidden;
      pointer-events: none;
    }

    .bio-bg-video {
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

    .bio-video-overlay {
      position: absolute;
      inset: 0;
      background: 
        radial-gradient(ellipse at 85% 30%, rgba(0, 229, 255, 0.28), transparent 55%),
        radial-gradient(ellipse at 15% 70%, rgba(123, 47, 190, 0.24), transparent 55%),
        linear-gradient(135deg, rgba(6, 9, 15, 0.65) 0%, rgba(11, 17, 30, 0.42) 50%, rgba(6, 9, 15, 0.70) 100%);
      pointer-events: none;
    }

    .bio-light-streak {
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

    .bio-container {
      position: relative;
      z-index: 2;
      max-width: 1320px;
      margin: 0 auto;
      padding: 0 4%;
    }

    .bio-layout {
      display: grid;
      grid-template-columns: minmax(0, 1.05fr) minmax(0, 1.3fr);
      gap: 4.5rem;
      align-items: center;
    }

    .bio-content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      max-width: 100%;
    }

    .bio-tag {
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

    .bio-title {
      font-size: clamp(2.3rem, 3.6vw, 3.2rem) !important;
      font-weight: 800 !important;
      line-height: 1.18 !important;
      color: #FFFFFF !important;
      letter-spacing: -0.025em;
      margin-bottom: 1.35rem !important;
    }

    .bio-gradient {
      background: linear-gradient(135deg, #00E5FF 0%, #38BDF8 40%, #A855F7 85%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .bio-desc {
      font-size: 1.05rem !important;
      line-height: 1.72 !important;
      color: #CBD5E1 !important;
      margin-bottom: 2.2rem !important;
      font-weight: 400;
      max-width: 540px;
    }

    .bio-action-btn {
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

    .bio-action-btn:hover {
      background: linear-gradient(135deg, #00E5FF, #0066FF);
      border-color: #00E5FF;
      color: #FFFFFF;
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(0, 102, 255, 0.35);
    }

    .bio-action-btn i {
      font-size: 1.05rem;
      transition: transform 0.3s ease;
    }

    .bio-action-btn:hover i {
      transform: translate(2px, -2px);
    }

    /* 2x2 Grid for Bioinformatics Boxes */
    .bio-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.35rem;
    }

    .bio-card {
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

    .bio-card.glass-dark {
      background: rgba(15, 23, 42, 0.65);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.08);
    }

    .bio-card.glass-dark:hover {
      transform: translateY(-5px);
      border-color: rgba(0, 229, 255, 0.45);
      box-shadow: 0 26px 55px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 229, 255, 0.2);
    }

    .bio-card.card-solid-white {
      background: #FFFFFF;
      border: 1px solid rgba(255, 255, 255, 0.95);
      box-shadow: 0 24px 50px rgba(0, 0, 0, 0.5), 0 0 35px rgba(255, 255, 255, 0.25);
    }

    .bio-card.card-solid-white:hover {
      transform: translateY(-5px);
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), 0 0 45px rgba(0, 229, 255, 0.45);
    }

    .bio-card-text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      z-index: 1;
      max-width: 65%;
    }

    .bio-number {
      font-size: clamp(2.3rem, 3.2vw, 2.9rem);
      font-weight: 800;
      line-height: 1;
      color: #FFFFFF;
      letter-spacing: -0.03em;
      font-feature-settings: 'tnum' on, 'lnum' on;
    }

    .bio-number.bio-badge-num {
      font-size: clamp(1.7rem, 2.3vw, 2.1rem);
      letter-spacing: 0.02em;
      color: #00E5FF;
    }

    .bio-number .plus {
      color: #00E5FF;
      font-weight: 700;
      margin-left: 2px;
    }

    .bio-card-label {
      font-size: 0.92rem;
      font-weight: 500;
      color: #94A3B8;
      margin-top: 0.65rem;
      line-height: 1.35;
    }

    .bio-card.card-solid-white .bio-feature-title {
      font-size: 1.08rem;
      font-weight: 800;
      color: #0A0F1D;
      line-height: 1.25;
      letter-spacing: -0.015em;
    }

    .bio-card.card-solid-white .bio-feature-sub {
      font-size: 0.78rem;
      font-weight: 600;
      color: #64748B;
      margin-top: 0.45rem;
      line-height: 1.35;
    }

    .bio-visual-container {
      width: 96px;
      height: 96px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .bio-3d-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 16px;
      filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.4));
      transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .bio-card:hover .bio-3d-img {
      transform: scale(1.1) rotate(4deg);
    }

    @media (max-width: 1280px) {
      .bio-layout {
        gap: 3rem;
      }
      .bio-card {
        padding: 1.7rem 1.4rem;
        min-height: 155px;
      }
      .bio-visual-container {
        width: 82px;
        height: 82px;
      }
    }

    @media (max-width: 992px) {
      .bio-layout {
        grid-template-columns: 1fr;
        gap: 3.5rem;
      }
      .bio-content {
        text-align: center;
        align-items: center;
      }
      .bio-desc {
        max-width: 680px;
      }
    }

    @media (max-width: 640px) {
      .bio-grid {
        grid-template-columns: 1fr;
      }
      .bio-card {
        min-height: 140px;
      }
    }
`;

// Replace old bioinformatics CSS in index.html
const oldBioCssRegex = /\/\* Refined Bioinformatics Banner \*\/[\s\S]*?\.bio-stats \.b-stat span \{[\s\S]*?\}/;
html = html.replace(oldBioCssRegex, bioSectionCss);

// ========================================================
// 4. BIOINFORMATICS SECTION HTML (Amrita Option 2 Design)
// ========================================================
const bioSectionHtml = `  <!-- ==================== BIOINFORMATICS & CLINICAL DECISION SUPPORT (OPTION 2 DESIGN) ==================== -->
  <section class="bioinformatics" id="bioinformatics">
    <!-- Ambient Sequencer Video Background -->
    <div class="bio-video-wrap">
      <video class="bio-bg-video" autoplay muted loop playsinline preload="auto">
        <source src="assets/videos/bioinformatics_sequencer_bg.mp4" type="video/mp4">
      </video>
      <div class="bio-video-overlay"></div>
    </div>
    <div class="bio-light-streak"></div>

    <div class="container bio-container">
      <div class="bio-layout">

        <!-- Left Column: Existing Title & Content -->
        <div class="bio-content reveal-on-scroll reveal-slide-left">
          <div class="bio-tag">
            <i class="ph ph-cpu"></i> NEXT-GENERATION SEQUENCING INTELLIGENCE
          </div>
          <h2 class="bio-title">
            Bioinformatics &amp;<br>
            <span class="bio-gradient">Clinical Decision Support</span>
          </h2>
          <p class="bio-desc">
            Our proprietary pipeline matches identified variants with key open clinical trials, FDA-approved targeted therapies, and guidelines to generate clear, actionable reports for oncologists and tumor boards.
          </p>
          <a href="#contact" class="bio-action-btn">
            <span>Request Sample Report</span>
            <i class="ph ph-arrow-up-right"></i>
          </a>
        </div>

        <!-- Right Column: 2x2 Grid of Existing Stats (Option 2 Design with 3D Visual Badges) -->
        <div class="bio-grid reveal-on-scroll reveal-scale">

          <!-- Box 1: < 0.5% Allele Frequency Sensitivity -->
          <div class="bio-card glass-dark">
            <div class="bio-card-text">
              <div class="bio-number">&lt; 0.5<span class="plus">%</span></div>
              <div class="bio-card-label">Allele Frequency Sensitivity</div>
            </div>
            <div class="bio-visual-container">
              <img src="assets/images/impact_icon_prism.jpg" alt="Allele Frequency Sensitivity 3D Visual" class="bio-3d-img" />
            </div>
          </div>

          <!-- Box 2: 4-21 Days Sample-to-Report TAT -->
          <div class="bio-card glass-dark">
            <div class="bio-card-text">
              <div class="bio-number">4-21<span class="plus"> Days</span></div>
              <div class="bio-card-label">Sample-to-Report Turnaround (TAT)</div>
            </div>
            <div class="bio-visual-container">
              <img src="assets/images/impact_icon_ring.jpg" alt="Turnaround Time 3D Visual" class="bio-3d-img" />
            </div>
          </div>

          <!-- Box 3: CAP / NABL Quality Accreditations -->
          <div class="bio-card glass-dark">
            <div class="bio-card-text">
              <div class="bio-number bio-badge-num">CAP / NABL</div>
              <div class="bio-card-label">Accredited Quality Standards</div>
            </div>
            <div class="bio-visual-container">
              <img src="assets/images/impact_icon_ribbon.jpg" alt="Quality Standards 3D Visual" class="bio-3d-img" />
            </div>
          </div>

          <!-- Box 4: Signature White Contrast Card (From Existing Content) -->
          <div class="bio-card card-solid-white">
            <div class="bio-card-text">
              <div class="bio-feature-title">CLINICAL DECISION INTELLIGENCE &amp; TUMOR BOARD REPORTS</div>
              <div class="bio-feature-sub">FDA-Approved Targeted Therapies &bull; Open Clinical Trial Matching</div>
            </div>
            <div class="bio-visual-container">
              <img src="assets/images/impact_icon_sphere.jpg" alt="Tumor Board Reports 3D Visual" class="bio-3d-img" />
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>`;

const oldBioHtmlRegex = /<!-- ==================== BIOINFORMATICS BANNER ==================== -->[\s\S]*?<\/section>/;
html = html.replace(oldBioHtmlRegex, bioSectionHtml);

// Save to public/index.html
fs.writeFileSync(path.join(__dirname, 'public', 'index.html'), html, 'utf8');
console.log('Successfully updated public/index.html with both sections!');

// Sync to precision_al/public/index.html
const precisionAlPublic = path.join(__dirname, '..', 'precision_al', 'public');
if (fs.existsSync(precisionAlPublic)) {
  fs.writeFileSync(path.join(precisionAlPublic, 'index.html'), html, 'utf8');
  console.log('Successfully synchronized public/index.html to precision_al/public!');
}
