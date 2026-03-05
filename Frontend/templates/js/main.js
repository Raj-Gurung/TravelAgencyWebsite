document.addEventListener('DOMContentLoaded', () => {

  // ──────────────────────────────────────────────
  // Mobile menu toggle (index.html)
  // ──────────────────────────────────────────────
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // ──────────────────────────────────────────────
  // Search form on homepage → redirect to services.html
  // ──────────────────────────────────────────────
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');

  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = 'services.html?search=' + encodeURIComponent(query);
      }
    });
  }

  // ──────────────────────────────────────────────
  // Search filter on services.html
  // ──────────────────────────────────────────────
  const cards = document.querySelectorAll('.service-card');
  const noResults = document.getElementById('no-results');
  const searchBanner = document.getElementById('search-banner');
  const searchQueryDisplay = document.getElementById('search-query-display');

  if (cards.length > 0) {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('search');

    if (query && query.trim() !== '') {
      const queryLower = query.trim().toLowerCase();

      // Show the search banner
      if (searchBanner && searchQueryDisplay) {
        searchBanner.classList.remove('hidden');
        searchQueryDisplay.textContent = '"' + query + '"';
      }

      let matchCount = 0;
      let firstMatch = null;

      cards.forEach((card) => {
        const keywords = card.getAttribute('data-service') || '';
        const isMatch = keywords.toLowerCase().includes(queryLower);

        if (isMatch) {
          card.style.display = '';
          // Highlight matching card with a ring
          card.classList.add('ring-4', 'ring-blue-500', 'ring-offset-2');
          matchCount++;
          if (!firstMatch) firstMatch = card;
        } else {
          card.style.display = 'none';
        }
      });

      // Show no-results if nothing matched
      if (noResults) {
        if (matchCount === 0) {
          noResults.classList.remove('hidden');
        } else {
          noResults.classList.add('hidden');
        }
      }

      // Scroll smoothly to the first matching card
      if (firstMatch) {
        setTimeout(() => {
          firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200);
      }
    }
  }

});
