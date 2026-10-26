const fs = require('fs');
const path = require('path');

// Read current public/index.html as the solid base
const baseHtml = fs.readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8');

// Modern, hospital-grade blended clinical lab hero CSS (Option A: True Editorial Blend)
const blendedHeroCss = `
  /* ==================== OPTION A: TRUE EDITORIAL BLENDED LAB HERO ==================== */
  .blended-hero {
    position: relative;
    min-height: 94vh;
    display: flex;
    align-items: center;
    background: #FFFFFF;
    overflow: hidden;
    padding: 7rem 0 3.5rem;
    isolation: isolate;
  }

  /* Ambient clinical background gradients */
  .blended-hero-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background: 
      radial-gradient(circle at 10% 25%, rgba(0, 102, 255, 0.05), transparent 45%),
      radial-gradient(circle at 85% 85%, rgba(0, 229, 255, 0.04), transparent 45%),
      linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%);
  }

  /* Wide Photographic Stage across Hero Background with Feathered Mask */
  .blended-lab-stage {
    position: absolute;
    top: 0;
    right: 0;
    width: 74vw;
    max-width: 1400px;
    height: 100%;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
  }

  .blended-lab-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 70% center;
    filter: saturate(1.08) contrast(1.05) brightness(1.02);
    /* Dual multi-stop gradient mask: seamless feather on left, top-left and bottom */
    -webkit-mask-image: 
      linear-gradient(to right, 
        transparent 0%, 
        rgba(0,0,0,0.03) 12%, 
        rgba(0,0,0,0.25) 24%, 
        rgba(0,0,0,0.72) 40%, 
        black 58%, 
        black 88%,
        rgba(0,0,0,0.92) 100%
      ),
      linear-gradient(to bottom, 
        rgba(0,0,0,0.95) 0%, 
        black 15%, 
        black 84%, 
        rgba(0,0,0,0.3) 96%, 
        transparent 100%
      );
    mask-image: 
      linear-gradient(to right, 
        transparent 0%, 
        rgba(0,0,0,0.03) 12%, 
        rgba(0,0,0,0.25) 24%, 
        rgba(0,0,0,0.72) 40%, 
        black 58%, 
        black 88%,
        rgba(0,0,0,0.92) 100%
      ),
      linear-gradient(to bottom, 
        rgba(0,0,0,0.95) 0%, 
        black 15%, 
        black 84%, 
        rgba(0,0,0,0.3) 96%, 
        transparent 100%
      );
    -webkit-mask-composite: source-in;
    mask-composite: intersect;
  }

  /* Soft hospital-white light gradient overlay guaranteeing 100% text readability */
  .blended-lab-overlay {
    position: absolute;
    inset: 0;
    background: 
      linear-gradient(90deg, 
        #FFFFFF 0%, 
        rgba(255, 255, 255, 0.98) 18%, 
        rgba(255, 255, 255, 0.70) 38%, 
        rgba(255, 255, 255, 0.15) 62%, 
        transparent 80%
      ),
      linear-gradient(180deg,
        rgba(255, 255, 255, 0.35) 0%,
        transparent 15%,
        transparent 82%,
        rgba(255, 255, 255, 0.85) 96%,
        #FFFFFF 100%
      );
    pointer-events: none;
  }

  /* Grid Layout: Left Content & Right Floating Editorial Overlays */
  .blended-hero-container {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 4%;
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.95fr);
    align-items: center;
    min-height: 80vh;
    gap: 2.5rem;
  }

  /* Left Column: Full Landing Page Core Content */
  .blended-hero-content {
    position: relative;
    z-index: 3;
    max-width: 620px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .blended-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.45rem 1.25rem;
    background: rgba(0, 102, 255, 0.06);
    border: 1px solid rgba(0, 102, 255, 0.22);
    border-radius: 999px;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: #0066FF;
    margin-bottom: 1.6rem;
    backdrop-filter: blur(8px);
  }

  .blended-badge .badge-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #00E5FF;
    box-shadow: 0 0 10px #00E5FF;
    animation: pulseDot 2s infinite ease-in-out;
  }

  @keyframes pulseDot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.45; transform: scale(0.8); }
  }

  .blended-title {
    font-family: var(--font-heading, 'Plus Jakarta Sans', sans-serif);
    font-size: clamp(2.8rem, 4.4vw, 4.2rem);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -0.03em;
    color: #0F172A;
    margin-bottom: 1.4rem;
  }

  .blended-title .text-gradient {
    background: linear-gradient(135deg, #0052CC 0%, #0088FF 45%, #00C8FF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .blended-desc {
    font-size: 1.1rem;
    line-height: 1.72;
    color: #475569;
    margin-bottom: 2.2rem;
    font-weight: 400;
    max-width: 540px;
  }

  .blended-cta-group {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.15rem;
    margin-bottom: 2.5rem;
  }

  .blended-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.95rem 2.2rem;
    background: linear-gradient(135deg, #0052CC 0%, #0088FF 100%);
    color: #FFFFFF !important;
    font-size: 0.98rem;
    font-weight: 700;
    border-radius: 12px;
    text-decoration: none;
    box-shadow: 0 12px 28px rgba(0, 102, 255, 0.28);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .blended-btn-primary:hover {
    background: linear-gradient(135deg, #0041A8 0%, #0077EE 100%);
    transform: translateY(-2px);
    box-shadow: 0 16px 36px rgba(0, 102, 255, 0.38);
    color: #FFFFFF !important;
  }

  .blended-btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.95rem 2rem;
    background: #FFFFFF;
    color: #0F172A !important;
    font-size: 0.98rem;
    font-weight: 700;
    border-radius: 12px;
    border: 1px solid rgba(203, 213, 225, 0.95);
    text-decoration: none;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
    transition: all 0.3s ease;
  }

  .blended-btn-secondary:hover {
    background: #F8FAFC;
    border-color: #94A3B8;
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.08);
  }

  /* Clean Hospital Trust Matrix */
  .blended-trust-matrix {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding-top: 1.6rem;
    border-top: 1px solid rgba(226, 232, 240, 0.9);
  }

  .b-trust-item {
    display: flex;
    flex-direction: column;
  }

  .b-trust-val {
    font-size: 1.5rem;
    font-weight: 800;
    color: #0F172A;
    line-height: 1.1;
    font-feature-settings: 'tnum' on, 'lnum' on;
  }

  .b-trust-val .accent {
    color: #0077EE;
  }

  .b-trust-lbl {
    font-size: 0.78rem;
    font-weight: 600;
    color: #64748B;
    margin-top: 0.3rem;
    display: flex;
    flex-direction: column;
  }

  .b-trust-lbl em {
    font-style: normal;
    font-size: 0.7rem;
    color: #94A3B8;
    font-weight: 500;
  }

  .b-trust-divider {
    width: 1px;
    height: 40px;
    background: rgba(226, 232, 240, 0.9);
  }

  /* Accreditation Badge Strip directly beneath trust stats */
  .blended-accreditations {
    display: flex;
    align-items: center;
    gap: 1.4rem;
    margin-top: 1.3rem;
    font-size: 0.75rem;
    font-weight: 700;
    color: #64748B;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .b-accred-item {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
  }

  .b-accred-item i {
    color: #0066FF;
    font-size: 0.95rem;
  }

  /* ==================== OPTION A: SLEEK CONTEXTUAL HUD OVERLAYS ==================== */
  .blended-hero-visual {
    position: relative;
    z-index: 3;
    width: 100%;
    min-height: 520px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    pointer-events: none;
  }

  .blended-hero-visual > * {
    pointer-events: auto;
  }

  /* Callout 1: Sleek Top-Right Telemetry Pill */
  .editorial-top-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.85rem;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 0.65rem 1.25rem;
    border-radius: 999px;
    border: 1px solid rgba(226, 232, 240, 0.95);
    box-shadow: 0 10px 28px -6px rgba(15, 23, 42, 0.09);
    transition: transform 0.3s ease;
  }

  .editorial-top-pill:hover {
    transform: translateY(-2px);
  }

  .pulse-beacon-cyan {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #00E5FF;
    box-shadow: 0 0 10px #00E5FF;
    animation: pulseDot 2s infinite ease-in-out;
  }

  .pill-info {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .pill-info strong {
    font-size: 0.8rem;
    font-weight: 800;
    color: #0F172A;
    line-height: 1.15;
  }

  .pill-info span {
    font-size: 0.68rem;
    font-weight: 600;
    color: #64748B;
  }

  .pill-live-tag {
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #10B981;
    font-size: 0.68rem;
    font-weight: 800;
    padding: 0.2rem 0.55rem;
    border-radius: 999px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  /* Callout 2: Bottom-Right Anchored Clinical Workflow & Actionability Dock */
  /* Anchored over lower analyzer chassis, leaving scientist, screen, and hands 100% visible */
  .editorial-pipeline-dock {
    width: 100%;
    max-width: 480px;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-radius: 18px;
    padding: 1.25rem 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.95);
    box-shadow: 
      0 20px 50px -10px rgba(15, 23, 42, 0.14),
      0 0 0 1px rgba(226, 232, 240, 0.88),
      0 8px 20px rgba(0, 102, 255, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .editorial-pipeline-dock:hover {
    transform: translateY(-3px);
    box-shadow: 
      0 26px 60px -10px rgba(15, 23, 42, 0.18),
      0 0 0 1px rgba(0, 102, 255, 0.3);
  }

  .dock-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }

  .dock-header-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.72rem;
    font-weight: 800;
    color: #0066FF;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .dock-concordance {
    font-size: 0.74rem;
    font-weight: 700;
    color: #64748B;
  }

  .dock-concordance strong {
    color: #10B981;
    font-weight: 800;
  }

  /* Interactive Pipeline Stepper Row */
  .dock-stepper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.35rem;
    margin-bottom: 0.85rem;
  }

  .dock-step-btn {
    border: none;
    outline: none;
    background: #F8FAFC;
    color: #475569;
    border: 1px solid rgba(226, 232, 240, 0.95);
    border-radius: 8px;
    padding: 0.42rem 0.3rem;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
  }

  .dock-step-btn .step-idx {
    font-size: 0.6rem;
    font-weight: 800;
    color: #64748B;
    background: rgba(0, 102, 255, 0.08);
    padding: 0.08rem 0.3rem;
    border-radius: 4px;
    line-height: 1;
  }

  .dock-step-btn.active {
    background: #0066FF;
    border-color: #0066FF;
    color: #FFFFFF;
    box-shadow: 0 4px 12px rgba(0, 102, 255, 0.28);
  }

  .dock-step-btn.active .step-idx {
    background: rgba(255, 255, 255, 0.25);
    color: #FFFFFF;
  }

  .dock-step-btn:hover:not(.active) {
    background: #FFFFFF;
    border-color: #94A3B8;
    color: #0F172A;
  }

  /* Dynamic Contextual Text Ribbon */
  .dock-desc-ribbon {
    background: #F1F5F9;
    border-radius: 8px;
    padding: 0.5rem 0.75rem;
    font-size: 0.72rem;
    line-height: 1.45;
    color: #334155;
    margin-bottom: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.45rem;
  }

  .dock-desc-ribbon i {
    color: #0066FF;
    font-size: 0.85rem;
    flex-shrink: 0;
  }

  /* Biomarker Actionable Chips */
  .dock-chips-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 0.85rem;
  }

  .dock-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.25rem 0.6rem;
    border-radius: 6px;
    font-size: 0.7rem;
    font-weight: 600;
    background: #F8FAFC;
    color: #334155;
    border: 1px solid rgba(226, 232, 240, 0.9);
  }

  .dock-chip.highlight {
    background: rgba(0, 102, 255, 0.08);
    color: #0066FF;
    border-color: rgba(0, 102, 255, 0.22);
    font-weight: 700;
  }

  /* Dock Footer */
  .dock-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.75rem;
    border-top: 1px solid rgba(226, 232, 240, 0.85);
    font-size: 0.7rem;
    font-weight: 700;
    color: #64748B;
  }

  .dock-footer a {
    color: #0066FF;
    text-decoration: none;
    font-weight: 800;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    transition: all 0.2s ease;
  }

  .dock-footer a:hover {
    color: #0044BB;
    transform: translateX(2px);
  }

  /* Comparison Banner */
  .index3d-banner {
    position: fixed;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99999;
    background: rgba(15, 23, 42, 0.94);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(0, 180, 216, 0.4);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
    padding: 8px 18px;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 600;
    color: #FFFFFF;
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }
  .index3d-banner .badge {
    background: #0066FF;
    color: #FFFFFF;
    padding: 3px 9px;
    border-radius: 999px;
    font-size: 0.72rem;
    text-transform: uppercase;
  }
  .index3d-banner a {
    color: #CBD5E1;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .index3d-banner a:hover {
    color: #00E5FF;
  }

  /* Responsive Rules */
  @media (max-width: 1280px) {
    .blended-hero-container {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
    .blended-lab-stage {
      width: 78vw;
    }
  }

  @media (max-width: 1024px) {
    .blended-hero {
      padding: 6.5rem 0 3.5rem;
      min-height: auto;
    }
    .blended-hero-container {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
    .blended-lab-stage {
      position: relative;
      width: 100%;
      height: 420px;
      margin-bottom: -60px;
    }
    .blended-lab-img {
      -webkit-mask-image: linear-gradient(to bottom, black 65%, transparent 100%);
      mask-image: linear-gradient(to bottom, black 65%, transparent 100%);
    }
    .blended-hero-content {
      max-width: 100%;
      text-align: center;
      align-items: center;
    }
    .blended-desc {
      max-width: 600px;
    }
    .blended-cta-group {
      justify-content: center;
    }
    .blended-trust-matrix {
      justify-content: center;
    }
    .blended-accreditations {
      justify-content: center;
    }
    .blended-hero-visual {
      min-height: auto;
      align-items: center;
      gap: 1.5rem;
    }
  }

  @media (max-width: 640px) {
    .blended-trust-matrix {
      flex-direction: column;
      gap: 1rem;
      align-items: center;
    }
    .b-trust-divider {
      display: none;
    }
    .editorial-pipeline-dock {
      padding: 1.1rem 1rem;
    }
    .dock-stepper {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

// HTML for the blended clinical lab hero (Option A)
const blendedHeroHtml = `
  <!-- ==================== BLENDED CLINICAL LAB HERO SECTION ==================== -->
  <section class="blended-hero">
    <div class="blended-hero-bg"></div>

    <!-- Wide Photographic Stage across Hero Background with Feathered Hospital-White Mask -->
    <div class="blended-lab-stage">
      <img src="assets/images/clinical_lab_hero.jpg" alt="Clinical Laboratory Specialist operating Automated Next-Generation Sequencing Diagnostic Workstation" class="blended-lab-img" />
      <div class="blended-lab-overlay"></div>
    </div>

    <div class="container blended-hero-container">

      <!-- Hero Left: Complete Landing Page Value Proposition -->
      <div class="blended-hero-content reveal-on-scroll reveal-slide-left">
        <div class="blended-badge">
          <span class="badge-dot"></span>
          <span>Next-Generation Precision Oncology</span>
        </div>

        <h1 class="blended-title">
          Precision in <br>
          <span class="text-gradient">every allele.</span>
        </h1>

        <p class="blended-desc">
          High-resolution next-generation sequencing and liquid biopsy diagnostics turning complex genomic signals into actionable, personalized cancer care.
        </p>

        <div class="blended-cta-group">
          <a href="#solutions" class="blended-btn-primary">
            <span>Explore Genomic Panels</span>
            <i class="ph ph-arrow-up-right"></i>
          </a>
          <a href="#contact" class="blended-btn-secondary">
            <span>Clinical Consultation</span>
          </a>
        </div>

        <!-- Clean Hospital Trust Matrix -->
        <div class="blended-trust-matrix">
          <div class="b-trust-item">
            <span class="b-trust-val">94<span class="accent">+</span></span>
            <span class="b-trust-lbl">Genomic Panels<em>Solid Tumor &amp; ctDNA</em></span>
          </div>
          <div class="b-trust-divider"></div>
          <div class="b-trust-item">
            <span class="b-trust-val">&lt; 0.5<span class="accent">%</span></span>
            <span class="b-trust-lbl">VAF Sensitivity<em>Deep NGS Coverage</em></span>
          </div>
          <div class="b-trust-divider"></div>
          <div class="b-trust-item">
            <span class="b-trust-val">4<span class="accent">-Day</span></span>
            <span class="b-trust-lbl">Rapid TAT<em>Sample to Action</em></span>
          </div>
        </div>

        <!-- Direct Accreditation Strip -->
        <div class="blended-accreditations">
          <div class="b-accred-item">
            <i class="ph ph-shield-check"></i>
            <span>NABL &amp; CAP Accredited</span>
          </div>
          <div class="b-accred-item">
            <i class="ph ph-certificate"></i>
            <span>NCCN / ESMO Aligned</span>
          </div>
        </div>
      </div>

      <!-- Hero Right: Non-Obstructive Contextual Overlays Framing the Specialist -->
      <div class="blended-hero-visual reveal-on-scroll reveal-scale">

        <!-- Callout 1: Sleek Top-Right Telemetry Pill -->
        <div class="editorial-top-pill">
          <span class="pulse-beacon-cyan"></span>
          <div class="pill-info">
            <strong>Illumina NextSeq 550Dx</strong>
            <span>Active Clinical Run &bull; 1,500&times;&ndash;20,000&times; Depth</span>
          </div>
          <span class="pill-live-tag">LIVE RUN</span>
        </div>

        <!-- Callout 2: Bottom-Right Anchored Clinical Workflow & Actionability Dock -->
        <div class="editorial-pipeline-dock">
          <div class="dock-header">
            <span class="dock-header-tag">
              <i class="ph ph-git-commit"></i> Clinical NGS Workflow
            </span>
            <span class="dock-concordance">
              Concordance: <strong>99.8%</strong>
            </span>
          </div>

          <!-- 4 Interactive Steps -->
          <div class="dock-stepper" id="dock-stepper-tabs" role="tablist">
            <button type="button" class="dock-step-btn active" data-step="1">
              <span class="step-idx">01</span>
              <span>DETECT</span>
            </button>
            <button type="button" class="dock-step-btn" data-step="2">
              <span class="step-idx">02</span>
              <span>SEQUENCE</span>
            </button>
            <button type="button" class="dock-step-btn" data-step="3">
              <span class="step-idx">03</span>
              <span>ANALYZE</span>
            </button>
            <button type="button" class="dock-step-btn" data-step="4">
              <span class="step-idx">04</span>
              <span>MATCH</span>
            </button>
          </div>

          <!-- Dynamic Contextual Text Ribbon -->
          <div class="dock-desc-ribbon">
            <i class="ph ph-info"></i>
            <span id="dock-step-desc">Liquid biopsy ctDNA detection identifying circulating tumor alleles before radiological imaging.</span>
          </div>

          <!-- Actionable Target Chips -->
          <div class="dock-chips-row">
            <span class="dock-chip highlight"><i class="ph ph-check-circle"></i> ctDNA Liquid Biopsy</span>
            <span class="dock-chip">BRCA1/2 &bull; HRD</span>
            <span class="dock-chip">EGFR &bull; KRAS</span>
            <span class="dock-chip highlight">TMB / MSI-H</span>
          </div>

          <!-- Dock Footer -->
          <div class="dock-footer">
            <span>NCCN Tier I/II Standards</span>
            <a href="#solutions">Explore Protocols <i class="ph ph-arrow-up-right"></i></a>
          </div>
        </div>

      </div>

    </div>
  </section>
`;

// Interactive Script for Pipeline Dock Stepper Tabs
const interactiveConsoleJs = `
  <script>
    (function() {
      const descriptions = {
        '1': 'Liquid biopsy ctDNA detection identifying circulating tumor alleles before radiological imaging.',
        '2': 'Comprehensive 500+ cancer gene profiling with 1,500×–20,000× deep coverage across all variant classes.',
        '3': 'Automated clinical AI classification mapped to NCCN, ESMO & AMP/ASCO/CAP Tier I/II guidelines.',
        '4': 'Evidence-matched therapy recommendations tailored to individual patient genomic biomarkers.'
      };

      const tabs = document.querySelectorAll('#dock-stepper-tabs .dock-step-btn');
      const textEl = document.getElementById('dock-step-desc');

      if (tabs.length && textEl) {
        tabs.forEach(tab => {
          tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const step = this.getAttribute('data-step');
            if (descriptions[step]) {
              textEl.innerHTML = descriptions[step];
            }
          });
        });
      }
    })();
  </script>
`;

const bannerHtml = `
  <!-- Comparison Banner -->
  <div class="index3d-banner" id="index3d-bar">
    <span class="badge">index_3d.html</span>
    <span>Option A: True Editorial Blend</span>
    <span>&bull;</span>
    <a href="index.html">View Main index.html &rarr;</a>
  </div>
`;

let resHtml = baseHtml;

// 1. Add blended hero CSS right before </style>
resHtml = resHtml.replace('</style>', blendedHeroCss + '\n  </style>');

// 2. Replace the old hero section with the blendedHeroHtml
const heroRegex = /<!-- ==================== HERO SECTION: ARCHITECTURAL REDESIGN ==================== -->[\s\S]*?<\/section>/;
resHtml = resHtml.replace(heroRegex, blendedHeroHtml);

// 3. Add interactive JS and comparison banner before </body>
resHtml = resHtml.replace('</body>', interactiveConsoleJs + '\n' + bannerHtml + '\n</body>');

// 4. Update title
resHtml = resHtml.replace('<title>', '<title>[Editorial Lab Hero] ');

// Save to public/index_3d.html in precision_al_light
fs.writeFileSync(path.join(__dirname, 'public', 'index_3d.html'), resHtml, 'utf8');
console.log('Successfully generated public/index_3d.html with Option A: True Editorial Blend!');

// Also sync to precision_al/public/index_3d.html
const precisionAlPublic = path.join(__dirname, '..', 'precision_al', 'public');
if (fs.existsSync(precisionAlPublic)) {
  fs.writeFileSync(path.join(precisionAlPublic, 'index_3d.html'), resHtml, 'utf8');
  console.log('Successfully synchronized to precision_al/public/index_3d.html!');
}
