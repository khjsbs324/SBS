/**
 * 교육과정 상세페이지 공통 인터랙션
 */
(() => {
    const header = document.querySelector('.cd-hdr');
    const menuButton = document.querySelector('.cd-menu-btn');
    const mobileNavigation = document.getElementById('mobile-navigation');

    function renderCourseCards() {
        const courseList = document.getElementById('course-card-list');
        if (!courseList) return;

        const menuId = courseList.dataset.courseMenuId;
        const menuData = window.SBSSiteData?.courseMenu?.find((menu) => menu.id === menuId);

        if (!menuData?.items?.length) {
            const errorItem = document.createElement('li');
            errorItem.className = 'cd-course-error';
            errorItem.textContent = '교육과정 정보를 불러오지 못했습니다.';
            courseList.append(errorItem);
            return;
        }

        const fragment = document.createDocumentFragment();

        menuData.items.forEach((item, index) => {
            const card = document.createElement('li');
            const number = document.createElement('span');
            const copy = document.createElement('div');
            const group = document.createElement('p');
            const title = document.createElement('h3');
            const note = document.createElement('p');

            card.className = 'cd-course-card reveal';
            number.className = 'cd-course-no';
            copy.className = 'cd-course-copy';
            group.className = 'cd-course-group';
            note.className = 'cd-course-note';

            number.textContent = String(index + 1).padStart(2, '0');
            group.textContent = item.group ?? menuData.title;
            title.textContent = item.label;
            note.textContent = '과정별 세부 구성과 수강 일정은 상담 시 안내합니다.';

            copy.append(group, title, note);
            card.append(number, copy);
            fragment.append(card);
        });

        courseList.append(fragment);
    }

    renderCourseCards();

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
