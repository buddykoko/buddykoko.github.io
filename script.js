(() => {
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setupNavIndicator = () => {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    const links = Array.from(nav.querySelectorAll('a'));
    const normalLinks = links.filter((link) => !link.classList.contains('nav-button'));
    const reserveButton = nav.querySelector('.nav-button');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    let indicator = nav.querySelector('.nav-indicator');
    if (!indicator) {
      indicator = document.createElement('span');
      indicator.className = 'nav-indicator';
      indicator.setAttribute('aria-hidden', 'true');
      nav.appendChild(indicator);
    }

    const isIndexPage = currentPage === 'index.html' || currentPage === '';
    const samePageLinks = normalLinks.filter((link) => {
      const href = link.getAttribute('href') || '';
      return href.startsWith('#') || (isIndexPage && href.startsWith('index.html#'));
    });

    const sectionPairs = samePageLinks
      .map((link) => {
        const rawHref = link.getAttribute('href') || '';
        const hash = rawHref.includes('#') ? rawHref.slice(rawHref.indexOf('#') + 1) : '';
        const section = hash ? document.getElementById(decodeURIComponent(hash)) : null;
        return section ? { link, section } : null;
      })
      .filter(Boolean);

    let activeLink = null;
    let lastX = 0;
    let lastY = 0;
    let lastWidth = 0;
    let resizeTimer = null;

    const clearActive = () => {
      links.forEach((item) => {
        item.classList.remove('active');
        item.removeAttribute('aria-current');
      });
    };

    const paintIndicator = (link, instant = false) => {
      if (!link || !nav.contains(link)) return;

      const navRect = nav.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      const width = Math.max(28, Math.round(linkRect.width));
      const x = Math.round(linkRect.left - navRect.left);
      const y = Math.round(linkRect.bottom - navRect.top - 6);

      clearActive();
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');

      if (link.classList.contains('nav-button')) {
        indicator.classList.remove('is-visible');
        activeLink = link;
        return;
      }

      if (instant || reduceMotion) {
        indicator.classList.add('no-transition');
      }

      indicator.style.setProperty('--nav-x', `${x}px`);
      indicator.style.setProperty('--nav-y', `${y}px`);
      indicator.style.setProperty('--nav-w', `${width}px`);
      indicator.classList.add('is-visible');
      indicator.classList.toggle('is-moving', Math.abs(x - lastX) > 2 || Math.abs(width - lastWidth) > 2 || Math.abs(y - lastY) > 2);

      window.requestAnimationFrame(() => {
        indicator.classList.remove('no-transition');
        window.setTimeout(() => indicator.classList.remove('is-moving'), reduceMotion ? 0 : 430);
      });

      lastX = x;
      lastY = y;
      lastWidth = width;
      activeLink = link;
    };

    const pickActiveLink = () => {
      if (!sectionPairs.length) return reserveButton || normalLinks[0] || null;
      const triggerLine = Math.min(210, window.innerHeight * 0.26);
      let active = sectionPairs[0];

      sectionPairs.forEach((pair) => {
        const rect = pair.section.getBoundingClientRect();
        if (rect.top <= triggerLine) active = pair;
      });

      return active.link;
    };

    const updateFromScroll = () => {
      if (!isIndexPage || !sectionPairs.length) return;
      const nextLink = pickActiveLink();
      if (nextLink && nextLink !== activeLink) {
        paintIndicator(nextLink);
      }
    };

    const normalizeHashLink = (link) => {
      const href = link.getAttribute('href') || '';
      if (href.startsWith('#')) return href;
      if (href.startsWith('index.html#')) return href.slice('index.html'.length);
      return '';
    };

    samePageLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        const hash = normalizeHashLink(link);
        const target = hash ? document.querySelector(hash) : null;

        paintIndicator(link);

        if (isIndexPage && target && !reduceMotion) {
          event.preventDefault();
          const header = document.querySelector('.site-header');
          const offset = (header ? header.offsetHeight : 90) + 24;
          const destination = target.getBoundingClientRect().top + window.scrollY - offset;

          window.history.pushState(null, '', hash);
          window.scrollTo({ top: destination, behavior: 'smooth' });
        }
      });
    });

    if (reserveButton) {
      reserveButton.addEventListener('click', () => paintIndicator(reserveButton));
    }

    window.addEventListener('scroll', () => window.requestAnimationFrame(updateFromScroll), { passive: true });
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => paintIndicator(activeLink || pickActiveLink(), true), 80);
    });

    window.addEventListener('load', () => {
      const hash = window.location.hash;
      const hashedLink = hash ? samePageLinks.find((link) => normalizeHashLink(link) === hash) : null;
      paintIndicator(isIndexPage ? (hashedLink || pickActiveLink()) : (reserveButton || normalLinks[0]), true);
    });

    paintIndicator(isIndexPage ? (pickActiveLink()) : (reserveButton || normalLinks[0]), true);
  };

  setupNavIndicator();

  if (reduceMotion) return;

  const revealSelectors = [
    '.trust-strip article',
    '.section-heading',
    '.card',
    '.story-card',
    '.founder-note',
    '.preorder-copy',
    '.preorder-tracker',
    '.mini-tracker',
    '.step-card',
    '.list-card',
    '.price-copy',
    '.price-card',
    '.inquiry-card',
    '.inquiry-side',
    '.check-list li'
  ];

  const items = Array.from(document.querySelectorAll(revealSelectors.join(',')));
  items.forEach((item, index) => {
    item.classList.add('reveal');
    item.style.setProperty('--reveal-delay', `${Math.min((index % 5) * 55, 220)}ms`);
  });

  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

  items.forEach((item) => observer.observe(item));
})();
