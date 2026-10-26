const fs = require('fs');
const path = require('path');

// Read public/index.html as base
const indexPath = path.join(__dirname, 'public', 'index.html');
const baseHtml = fs.readFileSync(indexPath, 'utf8');

// The CSS styles for 4 complete redesign concepts that blend seamlessly with the rest of the site
const distinctThemesCss = `
  /* ==========================================================================
     GLOBAL THEME CONTROLLER & ADAPTIVE STYLING
     ========================================================================== */
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap');

  /* Floating Bottom Switcher Pill */
  .theme-switcher-bar {
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999999;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 7px 12px;
    background: rgba(13, 27, 42, 0.94);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 999px;
    box-shadow: 0 16px 36px -6px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 102, 255, 0.2);
    user-select: none;
    transition: all 0.3s ease;
    max-width: 95vw;
    overflow-x: auto;
  }

  .t-switcher-label {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    color: #94A3B8;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    padding-left: 0.5rem;
    padding-right: 0.2rem;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .t-switcher-btn {
    border: none;
    outline: none;
    background: transparent;
    color: #CBD5E1;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    padding: 0.45rem 1rem;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.22s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    white-space: nowrap;
  }

  .t-switcher-btn:hover {
    color: #FFFFFF;
    background: rgba(255, 255, 255, 0.1);
  }

  .t-switcher-btn.active {
    background: #0066FF;
    color: #FFFFFF;
    box-shadow: 0 4px 14px rgba(0, 102, 255, 0.4);
  }

  .theme-wrapper {
    display: none;
    width: 100%;
    animation: fadeInTheme 0.35s ease forwards;
  }

  .theme-wrapper.active {
    display: block;
  }

  @keyframes fadeInTheme {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Global Brand Text Gradient */
  .brand-gradient {
    background: linear-gradient(135deg, #0066FF 0%, #00E5FF 55%, #7B2FBE 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* ==========================================================================
     SHARED CLEAN HERO TYPOGRAPHY & BUTTON STYLING
     ========================================================================== */
  .c-hero {
    position: relative;
    overflow: hidden;
    min-height: 90vh;
    padding: 5.5rem 0 5rem;
    display: flex;
    align-items: center;
    background: #FFFFFF;
  }

  .c-container {
    width: 100%;
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 4%;
    position: relative;
    z-index: 3;
  }

  .c-kicker {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    font-size: 0.78rem;
    font-weight: 700;
    color: #0066FF;
    background: rgba(0, 102, 255, 0.06);
    border: 1px solid rgba(0, 102, 255, 0.2);
    padding: 0.35rem 0.95rem;
    border-radius: 999px;
    margin-bottom: 1.2rem;
    letter-spacing: 0.02em;
  }

  .c-kicker .k-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #00E5FF;
    box-shadow: 0 0 8px #00E5FF;
  }

  .c-title {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: clamp(2.8rem, 4.4vw, 4.2rem);
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -0.035em;
    color: #0D1B2A;
    margin-bottom: 1.1rem;
  }

  .c-desc {
    font-size: 1.08rem;
    line-height: 1.62;
    color: #475569;
    margin-bottom: 1.8rem;
    font-weight: 400;
  }

  .c-cta-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2.2rem;
  }

  .c-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.85rem 2.1rem;
    background: linear-gradient(135deg, #0066FF 0%, #0052CC 100%);
    color: #FFFFFF !important;
    font-size: 0.94rem;
    font-weight: 700;
    border-radius: 999px;
    text-decoration: none;
    box-shadow: 0 6px 20px rgba(0, 102, 255, 0.3);
    transition: all 0.22s ease;
  }

  .c-btn-primary:hover {
    background: linear-gradient(135deg, #0052CC 0%, #003D99 100%);
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(0, 102, 255, 0.4);
  }

  .c-btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.85rem 1.9rem;
    background: #FFFFFF;
    color: #0D1B2A !important;
    font-size: 0.94rem;
    font-weight: 600;
    border-radius: 999px;
    border: 1px solid #CBD5E1;
    text-decoration: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    transition: all 0.22s ease;
  }

  .c-btn-secondary:hover {
    background: #F8FAFC;
    border-color: #94A3B8;
    transform: translateY(-2px);
  }

  /* 3 Clean Minimalist Text Pillars */
  .c-pillars {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    padding-top: 1.4rem;
    border-top: 1px solid rgba(226, 232, 240, 0.9);
    margin-bottom: 1.2rem;
  }

  .c-pillar strong {
    display: block;
    font-size: 0.96rem;
    font-weight: 800;
    color: #0D1B2A;
    margin-bottom: 0.25rem;
  }

  .c-pillar span {
    display: block;
    font-size: 0.82rem;
    line-height: 1.4;
    color: #64748B;
  }

  /* 4 Value Pills */
  .c-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }

  .c-chip {
    font-size: 0.76rem;
    padding: 0.32rem 0.85rem;
    border-radius: 999px;
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    color: #334155;
    font-weight: 500;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02);
  }

  .c-chip strong {
    color: #0066FF;
    font-weight: 700;
  }

  /* ==========================================================================
     CONCEPT 1: "CLINICAL AUTHORITY (ONCOLOGISTS BLEND)"
     Seamless half-right photo blend of oncologists reviewing sequencing data.
     100% harmonious with the site's Vision and Solutions sections.
     ========================================================================== */
  .c1-hero {
    background: #FFFFFF;
  }

  .c1-blended-visual {
    position: absolute;
    top: 0;
    right: 0;
    width: 58%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
  }

  .c1-blended-visual img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center right;
    mask-image: linear-gradient(to left, rgba(0,0,0,1) 45%, rgba(0,0,0,0.6) 70%, transparent 100%), linear-gradient(to top, transparent 0%, rgba(0,0,0,1) 12%);
    mask-composite: intersect;
    -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,1) 45%, rgba(0,0,0,0.6) 70%, transparent 100%), linear-gradient(to top, transparent 0%, rgba(0,0,0,1) 12%);
    -webkit-mask-composite: source-in;
    filter: saturate(1.08) contrast(1.02);
  }

  .c1-content-wrap {
    max-width: 660px;
    background: linear-gradient(to right, #FFFFFF 65%, rgba(255, 255, 255, 0.9) 82%, transparent 100%);
    padding: 1.5rem 2.5rem 1.5rem 0;
  }

  /* ==========================================================================
     CONCEPT 2: "LUMINOUS DNA LAB HORIZON"
     Sunlit sequencing laboratory with luminous cyan DNA helix blended half-right.
     Pure, optimistic, and scientific.
     ========================================================================== */
  .c2-hero {
    background: #F8FAFC;
  }

  .c2-blended-visual {
    position: absolute;
    top: 0;
    right: 0;
    width: 58%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
  }

  .c2-blended-visual img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    mask-image: linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0.55) 70%, transparent 100%), linear-gradient(to top, transparent 0%, rgba(0,0,0,1) 12%);
    mask-composite: intersect;
    -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0.55) 70%, transparent 100%), linear-gradient(to top, transparent 0%, rgba(0,0,0,1) 12%);
    -webkit-mask-composite: source-in;
    filter: saturate(1.1) brightness(1.02);
  }

  .c2-content-wrap {
    max-width: 660px;
    background: linear-gradient(to right, #F8FAFC 65%, rgba(248, 250, 252, 0.9) 82%, transparent 100%);
    padding: 1.5rem 2.5rem 1.5rem 0;
  }

  /* ==========================================================================
     CONCEPT 3: "SIMPLIFIED 3D DNA DISCOVERY" (Decluttered & Cleaned Up)
     Clean 3D DNA helix in center with 2 prominent glass intelligence pills.
     Directly addresses the user's laptop layout, removing clutter.
     ========================================================================== */
  .c3-hero {
    background: #FFFFFF;
  }

  .c3-grid {
    display: grid;
    grid-template-columns: 1.08fr 0.92fr;
    gap: 3.5rem;
    align-items: center;
  }

  .c3-content-wrap {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .c3-visual-stage {
    position: relative;
    height: 480px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .c3-halo {
    position: absolute;
    width: 360px;
    height: 360px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 102, 255, 0.12) 0%, rgba(0, 229, 255, 0.06) 50%, transparent 70%);
    filter: blur(24px);
    pointer-events: none;
  }

  .c3-helix-img {
    height: 360px;
    width: auto;
    object-fit: contain;
    position: relative;
    z-index: 2;
    border-radius: 20px;
    box-shadow: 0 12px 36px rgba(0, 102, 255, 0.15);
    filter: drop-shadow(0 14px 28px rgba(0, 102, 255, 0.18));
    animation: c3Float 6s ease-in-out infinite alternate;
  }

  @keyframes c3Float {
    0% { transform: translateY(-5px); }
    100% { transform: translateY(5px); }
  }

  /* 2 Clean Floating Glass Intelligence Pills (Top & Bottom) */
  .c3-float-pill-top {
    position: absolute;
    top: 15px;
    left: 10px;
    right: 10px;
    z-index: 3;
    background: rgba(255, 255, 255, 0.94);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(0, 102, 255, 0.2);
    border-radius: 14px;
    padding: 0.8rem 1.2rem;
    box-shadow: 0 8px 24px rgba(0, 102, 255, 0.08);
    display: flex;
    align-items: center;
    gap: 0.85rem;
  }

  .c3-float-pill-bottom {
    position: absolute;
    bottom: 15px;
    left: 10px;
    right: 10px;
    z-index: 3;
    background: rgba(255, 255, 255, 0.94);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(0, 229, 255, 0.3);
    border-radius: 14px;
    padding: 0.8rem 1.2rem;
    box-shadow: 0 8px 24px rgba(0, 229, 255, 0.08);
    display: flex;
    align-items: center;
    gap: 0.85rem;
  }

  .c3-pill-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  .c3-pill-icon.blue {
    background: rgba(0, 102, 255, 0.1);
    color: #0066FF;
  }

  .c3-pill-icon.cyan {
    background: rgba(0, 229, 255, 0.12);
    color: #00B4D8;
  }

  .c3-pill-text strong {
    display: block;
    font-size: 0.86rem;
    font-weight: 800;
    color: #0D1B2A;
  }

  .c3-pill-text span {
    display: block;
    font-size: 0.76rem;
    color: #64748B;
  }

  /* ==========================================================================
     CONCEPT 4: "DIAGNOSTIC SHOWCASE (CINEMATIC MEDTECH)"
     Full clinical lab photo framed with soft ambient depth & clinical badge.
     Clean, spacious, high-impact enterprise diagnostic lab.
     ========================================================================== */
  .c4-hero {
    background: #FFFFFF;
  }

  .c4-grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 3.5rem;
    align-items: center;
  }

  .c4-visual-wrap {
    position: relative;
    width: 100%;
    height: 480px;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 20px 48px -12px rgba(13, 27, 42, 0.14);
    border: 1px solid rgba(226, 232, 240, 0.9);
  }

  .c4-visual-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  .c4-visual-badge {
    position: absolute;
    bottom: 16px;
    left: 16px;
    right: 16px;
    background: rgba(255, 255, 255, 0.94);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 14px;
    padding: 0.75rem 1.1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  }

  .c4-b-item {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.78rem;
    font-weight: 700;
    color: #0D1B2A;
  }

  .c4-b-item i {
    color: #0066FF;
    font-size: 1.05rem;
  }

  /* Responsive Rules */
  @media (max-width: 1024px) {
    .c1-blended-visual,
    .c2-blended-visual {
      width: 100%;
      opacity: 0.3;
    }
    .c1-content-wrap,
    .c2-content-wrap {
      max-width: 100%;
      background: transparent;
    }
    .c3-grid,
    .c4-grid {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
    .c3-visual-stage,
    .c4-visual-wrap {
      height: 380px;
    }
  }

  @media (max-width: 768px) {
    .theme-switcher-bar {
      bottom: 14px;
      padding: 6px 8px;
    }
    .t-switcher-label {
      display: none;
    }
    .c-pillars {
      grid-template-columns: 1fr;
      gap: 0.8rem;
    }
  }
`;

// HTML for the 4 complete redesign concepts + interactive floating switcher
const distinctThemesHtml = `
  <!-- ==================== FLOATING THEME CONTROLLER ==================== -->
  <div class="theme-switcher-bar" id="theme-switcher">
    <span class="t-switcher-label"><i class="ph ph-paint-roller"></i> COMPARE REDESIGNS:</span>
    <button type="button" class="t-switcher-btn active" data-theme="theme-1">
      <span>👨‍⚕️ 1. Clinical Authority</span>
    </button>
    <button type="button" class="t-switcher-btn" data-theme="theme-2">
      <span>🧬 2. Luminous DNA Lab</span>
    </button>
    <button type="button" class="t-switcher-btn" data-theme="theme-3">
      <span>🔬 3. Simplified 3D Helix</span>
    </button>
    <button type="button" class="t-switcher-btn" data-theme="theme-4">
      <span>🏥 4. Diagnostic Showcase</span>
    </button>
  </div>

  <!-- ==========================================================================
       CONCEPT 1: "CLINICAL AUTHORITY (ONCOLOGISTS BLEND)"
       Seamless half-right photo blend of oncologists reviewing sequencing data.
       100% harmonious with the site's Vision and Solutions sections.
       ========================================================================== -->
  <div class="theme-wrapper active" id="theme-1">
    <section class="c-hero c1-hero">
      
      <!-- Seamless Half-Right Blended Oncologists Image -->
      <div class="c1-blended-visual">
        <img src="assets/images/oncologist_clinical_review.jpg" alt="Clinical Oncologists Reviewing Genomic Sequencing Data" />
      </div>

      <div class="c-container">
        <div class="c1-content-wrap">
          
          <div class="c-kicker">
            <span class="k-dot"></span>
            <span>NABL &amp; CAP Accredited &bull; Next-Generation Precision Oncology</span>
          </div>

          <h1 class="c-title">
            Precision in <br>
            <span class="brand-gradient">every allele.</span>
          </h1>

          <p class="c-desc">
            High-end next-generation sequencing solutions designed to turn complex genomic signals into clear, actionable insights for cancer care.
          </p>

          <div class="c-cta-row">
            <a href="https://precision-allele.onrender.com/#solutions" class="c-btn-primary">
              <span>Explore our solutions</span>
              <i class="ph ph-arrow-up-right"></i>
            </a>
            <a href="https://precision-allele.onrender.com/#solutions" class="c-btn-secondary">
              <span>Discover our approach</span>
            </a>
          </div>

          <!-- 3 Feature Pillars -->
          <div class="c-pillars">
            <div class="c-pillar">
              <strong>High-End NGS</strong>
              <span>Deep coverage. Greater insight.</span>
            </div>
            <div class="c-pillar">
              <strong>Pan-Cancer Panels</strong>
              <span>Comprehensive molecular profiling.</span>
            </div>
            <div class="c-pillar">
              <strong>Rapid Turnaround</strong>
              <span>Actionable reports in record time.</span>
            </div>
          </div>

          <!-- 4 Value Chips -->
          <div class="c-chips">
            <span class="c-chip"><strong>Pan-Cancer</strong> Genomic Profiling</span>
            <span class="c-chip"><strong>Multiple</strong> Tumor Types</span>
            <span class="c-chip"><strong>NGS</strong> DNA &bull; RNA &bull; ctDNA</span>
            <span class="c-chip"><strong>Actionable</strong> Clinical Insights</span>
          </div>

        </div>
      </div>
    </section>
  </div>

  <!-- ==========================================================================
       CONCEPT 2: "LUMINOUS DNA LAB HORIZON"
       Sunlit sequencing laboratory with luminous cyan DNA helix blended half-right.
       Pure, optimistic, and scientific.
       ========================================================================== -->
  <div class="theme-wrapper" id="theme-2">
    <section class="c-hero c2-hero">
      
      <!-- Seamless Half-Right Blended DNA Lab Image -->
      <div class="c2-blended-visual">
        <img src="assets/images/clinical_dna_lab.jpg" alt="Luminous Next-Gen Sequencing Diagnostic Laboratory" />
      </div>

      <div class="c-container">
        <div class="c2-content-wrap">
          
          <div class="c-kicker">
            <span class="k-dot"></span>
            <span>High-Throughput NGS Genomic Discovery</span>
          </div>

          <h1 class="c-title">
            Precision in <br>
            <span style="color: #0066FF;">every allele.</span>
          </h1>

          <p class="c-desc">
            High-end next-generation sequencing solutions designed to turn complex genomic signals into clear, actionable insights for cancer care.
          </p>

          <div class="c-cta-row">
            <a href="https://precision-allele.onrender.com/#solutions" class="c-btn-primary">
              <span>Explore our solutions</span>
              <i class="ph ph-arrow-up-right"></i>
            </a>
            <a href="https://precision-allele.onrender.com/#solutions" class="c-btn-secondary">
              <span>Discover our approach</span>
            </a>
          </div>

          <!-- 3 Feature Pillars -->
          <div class="c-pillars">
            <div class="c-pillar">
              <strong>High-End NGS</strong>
              <span>Deep coverage. Greater insight.</span>
            </div>
            <div class="c-pillar">
              <strong>Pan-Cancer Panels</strong>
              <span>Comprehensive molecular profiling.</span>
            </div>
            <div class="c-pillar">
              <strong>Rapid Turnaround</strong>
              <span>Actionable reports in record time.</span>
            </div>
          </div>

          <!-- 4 Value Chips -->
          <div class="c-chips">
            <span class="c-chip"><strong>Pan-Cancer</strong> Genomic Profiling</span>
            <span class="c-chip"><strong>Multiple</strong> Tumor Types</span>
            <span class="c-chip"><strong>NGS</strong> DNA &bull; RNA &bull; ctDNA</span>
            <span class="c-chip"><strong>Actionable</strong> Clinical Insights</span>
          </div>

        </div>
      </div>
    </section>
  </div>

  <!-- ==========================================================================
       CONCEPT 3: "SIMPLIFIED 3D DNA DISCOVERY" (Decluttered & Cleaned Up)
       Clean 3D DNA helix in center with 2 prominent glass intelligence pills.
       Directly addresses the user's laptop layout, removing clutter.
       ========================================================================== -->
  <div class="theme-wrapper" id="theme-3">
    <section class="c-hero c3-hero">
      <div class="c-container">
        <div class="c3-grid">
          
          <!-- Left Column Content -->
          <div class="c3-content-wrap">
            <div class="c-kicker">
              <span class="k-dot"></span>
              <span>Next-Generation Precision Oncology</span>
            </div>

            <h1 class="c-title">
              Precision in <br>
              <span class="brand-gradient">every allele.</span>
            </h1>

            <p class="c-desc">
              High-end next-generation sequencing solutions designed to turn complex genomic signals into clear, actionable insights for cancer care.
            </p>

            <div class="c-cta-row">
              <a href="https://precision-allele.onrender.com/#solutions" class="c-btn-primary">
                <span>Explore our solutions</span>
                <i class="ph ph-arrow-up-right"></i>
              </a>
              <a href="https://precision-allele.onrender.com/#solutions" class="c-btn-secondary">
                <span>Discover our approach</span>
              </a>
            </div>

            <!-- 3 Feature Pillars -->
            <div class="c-pillars">
              <div class="c-pillar">
                <strong>High-End NGS</strong>
                <span>Deep coverage. Greater insight.</span>
              </div>
              <div class="c-pillar">
                <strong>Pan-Cancer Panels</strong>
                <span>Comprehensive molecular profiling.</span>
              </div>
              <div class="c-pillar">
                <strong>Rapid Turnaround</strong>
                <span>Actionable reports in record time.</span>
              </div>
            </div>

            <!-- 4 Value Chips -->
            <div class="c-chips">
              <span class="c-chip"><strong>Pan-Cancer</strong> Genomic Profiling</span>
              <span class="c-chip"><strong>Multiple</strong> Tumor Types</span>
              <span class="c-chip"><strong>NGS</strong> DNA &bull; RNA &bull; ctDNA</span>
              <span class="c-chip"><strong>Actionable</strong> Clinical Insights</span>
            </div>
          </div>

          <!-- Right Column 3D DNA Stage (Clean & Spacious) -->
          <div class="c3-visual-stage">
            <div class="c3-halo"></div>

            <!-- Top Intelligence Pill -->
            <div class="c3-float-pill-top">
              <div class="c3-pill-icon blue"><i class="ph ph-dna"></i></div>
              <div class="c3-pill-text">
                <strong>Comprehensive Genomic Profiling</strong>
                <span>500+ Cancer Genes &bull; SNV, CNV, Indels, Fusions, TMB &amp; HRD</span>
              </div>
            </div>

            <!-- 3D Helix Center -->
            <img src="assets/images/stunning_dna.jpg" alt="Precision Allele 3D DNA Helix" class="c3-helix-img" />

            <!-- Bottom Intelligence Pill -->
            <div class="c3-float-pill-bottom">
              <div class="c3-pill-icon cyan"><i class="ph ph-target"></i></div>
              <div class="c3-pill-text">
                <strong>Liquid Biopsy &amp; Deep ctDNA</strong>
                <span>&lt; 0.5% VAF Limit &bull; 4-Day Turnaround &bull; MRD Relapse Tracking</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>

  <!-- ==========================================================================
       CONCEPT 4: "DIAGNOSTIC SHOWCASE (CINEMATIC MEDTECH)"
       Full clinical lab photo framed with soft ambient depth & clinical badge.
       Clean, spacious, high-impact enterprise diagnostic lab.
       ========================================================================== -->
  <div class="theme-wrapper" id="theme-4">
    <section class="c-hero c4-hero">
      <div class="c-container">
        <div class="c4-grid">
          
          <!-- Left Column Content -->
          <div class="c4-content-wrap">
            <div class="c-kicker">
              <span class="k-dot"></span>
              <span>Comprehensive Cancer Genomics Laboratory</span>
            </div>

            <h1 class="c-title">
              Precision in <br>
              <span style="color: #0066FF;">every allele.</span>
            </h1>

            <p class="c-desc">
              High-end next-generation sequencing solutions designed to turn complex genomic signals into clear, actionable insights for cancer care.
            </p>

            <div class="c-cta-row">
              <a href="https://precision-allele.onrender.com/#solutions" class="c-btn-primary">
                <span>Explore our solutions</span>
                <i class="ph ph-arrow-up-right"></i>
              </a>
              <a href="https://precision-allele.onrender.com/#solutions" class="c-btn-secondary">
                <span>Discover our approach</span>
              </a>
            </div>

            <!-- 3 Feature Pillars -->
            <div class="c-pillars">
              <div class="c-pillar">
                <strong>High-End NGS</strong>
                <span>Deep coverage. Greater insight.</span>
              </div>
              <div class="c-pillar">
                <strong>Pan-Cancer Panels</strong>
                <span>Comprehensive molecular profiling.</span>
              </div>
              <div class="c-pillar">
                <strong>Rapid Turnaround</strong>
                <span>Actionable reports in record time.</span>
              </div>
            </div>

            <!-- 4 Value Chips -->
            <div class="c-chips">
              <span class="c-chip"><strong>Pan-Cancer</strong> Genomic Profiling</span>
              <span class="c-chip"><strong>Multiple</strong> Tumor Types</span>
              <span class="c-chip"><strong>NGS</strong> DNA &bull; RNA &bull; ctDNA</span>
              <span class="c-chip"><strong>Actionable</strong> Clinical Insights</span>
            </div>
          </div>

          <!-- Right Column Framed Specialist Lab Photo -->
          <div class="c4-visual-wrap">
            <img src="assets/images/clinical_lab_hero.jpg" alt="Precision Allele NGS Clinical Laboratory Specialist" />
            <div class="c4-visual-badge">
              <div class="c4-b-item">
                <i class="ph ph-seal-check"></i>
                <span>Verified NGS Protocol</span>
              </div>
              <div class="c4-b-item">
                <i class="ph ph-target"></i>
                <span>99.9% Analytical Specificity</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
`;

// Switcher Interactive Logic
const switcherJs = `
  <script>
    (function() {
      const buttons = document.querySelectorAll('#theme-switcher .t-switcher-btn');
      const wrappers = document.querySelectorAll('.theme-wrapper');

      buttons.forEach(btn => {
        btn.addEventListener('click', function() {
          const targetTheme = this.getAttribute('data-theme');
          
          // Switch active button
          buttons.forEach(b => b.classList.remove('active'));
          this.classList.add('active');

          // Switch active design wrapper
          wrappers.forEach(w => {
            if (w.id === targetTheme) {
              w.classList.add('active');
            } else {
              w.classList.remove('active');
            }
          });

          // Scroll smoothly to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });
    })();
  </script>
`;

let resHtml = baseHtml;

// 1. Add designs CSS right before </style>
resHtml = resHtml.replace('</style>', distinctThemesCss + '\n  </style>');

// 2. Replace the old hero section with distinctThemesHtml
const heroRegex = /<!-- ==================== HERO SECTION: ARCHITECTURAL REDESIGN ==================== -->[\s\S]*?<\/section>/;
resHtml = resHtml.replace(heroRegex, distinctThemesHtml);

// 3. Add switcher script before </body>
resHtml = resHtml.replace('</body>', switcherJs + '\n</body>');

// 4. Update title
resHtml = resHtml.replace('<title>', '<title>[4 Complete Redesigns Suite] ');

// Save to public/index_3d.html in precision_al_light
fs.writeFileSync(path.join(__dirname, 'public', 'index_3d.html'), resHtml, 'utf8');
console.log('Successfully generated public/index_3d.html with 4 complete redesign concepts!');

// Also sync to precision_al/public/index_3d.html
const precisionAlPublic = path.join(__dirname, '..', 'precision_al', 'public');
if (fs.existsSync(precisionAlPublic)) {
  fs.writeFileSync(path.join(precisionAlPublic, 'index_3d.html'), resHtml, 'utf8');
  console.log('Successfully synchronized to precision_al/public/index_3d.html!');
}
