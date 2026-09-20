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

  // Futuristic Modal Logic
  const modal = document.getElementById('panel-modal');
  const closeModalBtn = document.querySelector('.close-modal');
  const modalOverlay = document.querySelector('.modal-overlay');

  const mTitle = document.getElementById('modal-title');
  const mCover = document.getElementById('modal-cover');
  const mSample = document.getElementById('modal-sample');
  const mTat = document.getElementById('modal-tat');

  tableRows.forEach(row => {
    row.addEventListener('click', () => {
      const name = row.cells[1].innerText;
      const cover = row.cells[2].innerText;
      const sample = row.cells[3].innerText;
      const tat = row.cells[4].innerText;

      mTitle.innerText = name;
      mCover.innerText = cover;
      mSample.innerText = sample;
      mTat.innerText = tat;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
});
