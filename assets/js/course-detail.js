/**
 * 교육과정 상세페이지 공통 인터랙션
 */
(() => {
    const header = document.querySelector('.cd-hdr');
    const menuButton = document.querySelector('.cd-menu-btn');
    const mobileNavigation = document.getElementById('mobile-navigation');
    const sectionLinks = [...document.querySelectorAll('.cd-nav a[href^="#"], .cd-mnav a[href^="#"]')];
    const sections = sectionLinks
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    function closeMobileMenu() {
        if (!menuButton || !mobileNavigation) return;
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.querySelector('.sr-only').textContent = '메뉴 열기';
        mobileNavigation.hidden = true;
        document.body.classList.remove('cd-menu-open');
    }

    menuButton?.addEventListener('click', () => {
        const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
        menuButton.setAttribute('aria-expanded', String(willOpen));
        menuButton.querySelector('.sr-only').textContent = willOpen ? '메뉴 닫기' : '메뉴 열기';
        mobileNavigation.hidden = !willOpen;
        document.body.classList.toggle('cd-menu-open', willOpen);
    });

    mobileNavigation?.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMobileMenu();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 820) closeMobileMenu();
    });

    function updateHeader() {
        header?.classList.toggle('is-scrolled', window.scrollY > 20);
    }

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.14, rootMargin: '0px 0px -30px' });

        document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                sectionLinks.forEach((link) => {
                    link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
                });
            });
        }, { rootMargin: '-35% 0px -55%', threshold: 0 });

        sections.forEach((section) => sectionObserver.observe(section));
    } else {
        document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
    }
})();
