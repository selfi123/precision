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
});
