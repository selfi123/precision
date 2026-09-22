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

  // Diagnostic Panels Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const tableRows = document.querySelectorAll('#panel-table-body tr');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      tableRows.forEach(row => {
        if (filter === 'all' || row.getAttribute('data-category') === filter) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

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
