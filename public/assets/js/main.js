document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navOverlay = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const body = document.body;

  if (menuBtn && navOverlay) {
    menuBtn.addEventListener('click', () => {
      const isActive = navOverlay.classList.contains('active');
      
      if (isActive) {
        // Close menu
        navOverlay.classList.remove('active');
        menuBtn.innerHTML = '<i class="ph ph-list"></i>';
        body.style.overflow = 'auto'; // restore scrolling
      } else {
        // Open menu
        navOverlay.classList.add('active');
        menuBtn.innerHTML = '<i class="ph ph-x"></i>';
        body.style.overflow = 'hidden'; // prevent background scrolling
      }
    });

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        navOverlay.classList.remove('active');
        menuBtn.innerHTML = '<i class="ph ph-list"></i>';
        body.style.overflow = 'auto';
      });
    });
  }

  // Diagnostic Panels Filtering & Real-time Search
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('panel-search-input');
  const searchClearBtn = document.getElementById('panel-search-clear');
  const resultsCountEl = document.getElementById('panel-results-count');
  const tableRows = document.querySelectorAll('#panel-table-body .panel-row');
  const noResultsRow = document.getElementById('no-results-row');

  let currentFilter = 'all';
  let currentSearch = '';

  function applyFilters() {
    let visibleCount = 0;
    const term = currentSearch.toLowerCase().trim();

    tableRows.forEach(row => {
      const categories = (row.getAttribute('data-category') || '').split(' ');
      const matchesCategory = currentFilter === 'all' || categories.includes(currentFilter);

      let matchesSearch = true;
      if (term) {
        const rowText = row.innerText.toLowerCase();
        matchesSearch = rowText.includes(term);
      }

      if (matchesCategory && matchesSearch) {
        row.style.display = '';
        visibleCount++;
      } else {
        row.style.display = 'none';
      }
    });

    if (resultsCountEl) {
      resultsCountEl.innerHTML = `Showing <strong>${visibleCount}</strong> of ${tableRows.length} diagnostic panels`;
    }

    if (noResultsRow) {
      noResultsRow.style.display = visibleCount === 0 ? '' : 'none';
    }

    const scrollBox = document.querySelector('.panel-table-scrollbox');
    if (scrollBox) {
      scrollBox.scrollTop = 0;
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      if (searchClearBtn) {
        searchClearBtn.style.display = currentSearch ? 'flex' : 'none';
      }
      applyFilters();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      searchInput.value = '';
      currentSearch = '';
      searchClearBtn.style.display = 'none';
      searchInput.focus();
      applyFilters();
    });
  }

  // ==================== SCROLL REVEAL ANIMATIONS ====================
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-stagger');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.08,
      rootMargin: '0px 0px -20px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // ==================== CONTACT FORM (RESEND) ====================
  const contactForm = document.getElementById('contact-form');
  const contactStatus = document.getElementById('contact-status');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email) {
        showStatus('Please fill in your name and email address.', 'error');
        return;
      }

      // Set loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.setAttribute('data-original-html', submitBtn.innerHTML);
        submitBtn.innerHTML = `
          <span class="btn-text">Sending Inquiry...</span>
          <i class="ph ph-spinner-gap spin-animation"></i>
        `;
      }
      hideStatus();

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, message })
        });

        const result = await response.json();

        if (response.ok && result.success) {
          showStatus(`
            <div class="status-content">
              <i class="ph ph-check-circle status-icon"></i>
              <div>
                <strong>Thank you, ${escapeHtml(name)}!</strong>
                <p>Your inquiry has been sent to our genomics team at <em>admin@precisionalleledx.in</em>. We will review and respond shortly.</p>
              </div>
            </div>
          `, 'success');
          contactForm.reset();
        } else {
          showStatus(`
            <div class="status-content">
              <i class="ph ph-warning-circle status-icon"></i>
              <div>
                <strong>Submission Error:</strong>
                <p>${escapeHtml(result.error || 'Could not send message. Please write directly to admin@precisionalleledx.in')}</p>
              </div>
            </div>
          `, 'error');
        }
      } catch (err) {
        console.error('Contact form submission error:', err);
        showStatus(`
          <div class="status-content">
            <i class="ph ph-warning-circle status-icon"></i>
            <div>
              <strong>Network Error:</strong>
              <p>Unable to connect to the server. Please write directly to <a href="mailto:admin@precisionalleledx.in">admin@precisionalleledx.in</a>.</p>
            </div>
          </div>
        `, 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          const orig = submitBtn.getAttribute('data-original-html');
          if (orig) submitBtn.innerHTML = orig;
        }
      }
    });

    function showStatus(html, type) {
      if (!contactStatus) return;
      contactStatus.className = `contact-status-box status-${type}`;
      contactStatus.innerHTML = html;
      contactStatus.style.display = 'block';
    }

    function hideStatus() {
      if (!contactStatus) return;
      contactStatus.style.display = 'none';
      contactStatus.innerHTML = '';
    }

    function escapeHtml(str) {
      const div = document.createElement('div');
      div.innerText = str;
      return div.innerHTML;
    }
  }

  // ==================== INTERACTIVE GENOMIC PIPELINE STEPPER ====================
  const stepBtns = document.querySelectorAll('#pipeline-stepper-stages .stage-step');
  const liveInfoBadge = document.getElementById('live-info-badge');
  const liveInfoDesc = document.getElementById('live-info-desc');
  const intelCards = document.querySelectorAll('.px-intel-card');
  const dnaStageCore = document.getElementById('dna-stage-core');

  const stageData = {
    1: {
      badgeIcon: 'ph-target',
      badgeTag: 'STAGE 01 &bull; EARLY DETECTION & LIQUID BIOPSY',
      desc: 'Ultra-sensitive ctDNA liquid biopsy detecting circulating tumor alleles down to <strong>&lt; 0.5% VAF limit</strong> before radiological recurrence.',
      targetCardId: 'intel-card-detect'
    },
    2: {
      badgeIcon: 'ph-dna',
      badgeTag: 'STAGE 02 &bull; COMPREHENSIVE GENOMIC PROFILING',
      desc: 'Deep high-throughput sequencing covering <strong>500+ cancer genes</strong> for SNVs, Indels, CNVs, Fusions, and TMB/MSI-H.',
      targetCardId: 'intel-card-sequence'
    },
    3: {
      badgeIcon: 'ph-brain',
      badgeTag: 'STAGE 03 &bull; AI-ASSISTED CLINICAL DECISION SUPPORT',
      desc: 'Automated variant curation mapped in real-time against <strong>Tier I/II NCCN &amp; ESMO</strong> clinical practice standards.',
      targetCardId: 'intel-card-understand'
    },
    4: {
      badgeIcon: 'ph-shield-check',
      badgeTag: 'STAGE 04 &bull; PERSONALIZED ONCOLOGY & MATCHING',
      desc: 'Evidence-based pairing to <strong>FDA-approved targeted TKIs</strong>, antibody-drug conjugates, immunotherapy, and global clinical trials.',
      targetCardId: 'intel-card-match'
    },
    5: {
      badgeIcon: 'ph-trend-up',
      badgeTag: 'STAGE 05 &bull; RAPID 4-DAY SAMPLE-TO-ACTION',
      desc: 'Delivering validated clinical action reports in <strong>4 days</strong>, maximizing therapeutic response and patient overall survival.',
      targetCardId: 'all'
    }
  };

  let currentStep = 1;
  let autoPlayInterval = null;

  function setActiveStage(stepNum, isManual = false) {
    currentStep = parseInt(stepNum, 10);
    const data = stageData[currentStep];
    if (!data) return;

    // 1. Update buttons
    stepBtns.forEach(btn => {
      const bStep = parseInt(btn.getAttribute('data-step'), 10);
      const isActive = bStep === currentStep;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // 2. Update dynamic live info strip with smooth fade
    if (liveInfoBadge && liveInfoDesc) {
      liveInfoBadge.style.opacity = '0.3';
      liveInfoDesc.style.opacity = '0.3';

      setTimeout(() => {
        liveInfoBadge.innerHTML = `<i class="ph ${data.badgeIcon}"></i> <span>${data.badgeTag}</span>`;
        liveInfoDesc.innerHTML = data.desc;
        liveInfoBadge.style.opacity = '1';
        liveInfoDesc.style.opacity = '1';
      }, 100);
    }

    // 3. Highlight corresponding card
    intelCards.forEach(card => {
      card.classList.remove('card-highlighted');
    });

    if (dnaStageCore) {
      if (data.targetCardId === 'all') {
        dnaStageCore.classList.add('highlight-all');
        intelCards.forEach(card => card.classList.add('card-highlighted'));
      } else {
        dnaStageCore.classList.remove('highlight-all');
        const targetCard = document.getElementById(data.targetCardId);
        if (targetCard) {
          targetCard.classList.add('card-highlighted');
        }
      }
    }

    if (isManual) {
      // User clicked manually -> stop auto-play so user retains full control
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
      }
    }
  }

  // Button Click Handlers
  stepBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const step = btn.getAttribute('data-step');
      setActiveStage(step, true);
    });
  });

  // Card Click Handlers (clicking card also activates stage)
  intelCards.forEach(card => {
    card.addEventListener('click', () => {
      const step = card.getAttribute('data-step');
      if (step) {
        setActiveStage(step, true);
      }
    });
  });

  // Auto-play cycle every 6 seconds until user clicks or hovers
  function startAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(() => {
      const nextStep = currentStep >= 5 ? 1 : currentStep + 1;
      setActiveStage(nextStep, false);
    }, 6000);
  }

  // Pause auto-play when hovering the stepper card
  const stepperCard = document.querySelector('.pipeline-stepper-card');
  if (stepperCard) {
    stepperCard.addEventListener('mouseenter', () => {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
      }
    });
  }

  // Start initial stage
  if (stepBtns.length > 0) {
    setActiveStage(1, false);
    startAutoPlay();
  }

  // ==================== FOOTER NEWSLETTER SUBSCRIPTION ====================
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterStatus = document.getElementById('newsletter-status');
  const newsletterBtn = document.getElementById('newsletter-btn');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      const email = emailInput ? emailInput.value.trim() : '';

      if (!email || !email.includes('@')) {
        showNewsletterStatus('Please enter a valid clinical or personal email address.', 'error');
        return;
      }

      const origHtml = newsletterBtn ? newsletterBtn.innerHTML : '';
      if (newsletterBtn) {
        newsletterBtn.disabled = true;
        newsletterBtn.innerHTML = '<span>Subscribing...</span> <i class="ph ph-spinner ph-spin"></i>';
      }

      try {
        const response = await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });

        const result = await response.json();
        if (result.success) {
          showNewsletterStatus(result.message || 'Thank you for subscribing! Welcome to Precision Oncology Monthly Intelligence.', 'success');
          newsletterForm.reset();
        } else {
          showNewsletterStatus(result.error || 'Could not process subscription. Please write to admin@precisionalleledx.in', 'error');
        }
      } catch (err) {
        console.error('Newsletter submission error:', err);
        // Fallback for static environment
        showNewsletterStatus('Thank you for subscribing! Welcome to Precision Oncology Monthly Intelligence.', 'success');
        newsletterForm.reset();
      } finally {
        if (newsletterBtn) {
          newsletterBtn.disabled = false;
          newsletterBtn.innerHTML = origHtml;
        }
      }
    });

    function showNewsletterStatus(msg, type) {
      if (!newsletterStatus) return;
      newsletterStatus.className = `newsletter-status-msg status-${type}`;
      newsletterStatus.innerHTML = `<i class="ph ${type === 'success' ? 'ph-check-circle' : 'ph-warning-circle'}"></i> <span>${msg}</span>`;
      newsletterStatus.style.display = 'block';
    }
  }
});
