/**
 * 스크롤, 노출 애니메이션, 헤더 및 플로팅 버튼
 */
let lenis;

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 스크롤 부드럽게 (Lenis 적용)
    // ==========================================
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // 부드러운 감속 효과
        smoothWheel: true,
        wheelMultiplier: 1,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GNB 등 링크 앵커 클릭 시 Lenis로 스크롤 이동
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId && targetId !== '#') {
                lenis.scrollTo(targetId, { offset: -80 });
            }
        });
    });

    // Scroll Animation Observer
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    });

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // Number Counter Animation (통계 숫자 증가 애니메이션)
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseFloat(target.getAttribute('data-target'));
                const decimals = parseInt(target.getAttribute('data-decimal')) || 0;
                const duration = 2000; // 애니메이션 지속 시간 (2초)
                let startTime = null;

                function updateCounter(currentTime) {
                    if (!startTime) startTime = currentTime;
                    const progress = Math.min((currentTime - startTime) / duration, 1);
                    // easeOutQuart 애니메이션 곡선 적용
                    const easeProgress = 1 - Math.pow(1 - progress, 4);
                    const currentValue = endValue * easeProgress;

                    target.textContent = currentValue.toFixed(decimals);

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.textContent = endValue.toFixed(decimals);
                    }
                }

                requestAnimationFrame(updateCounter);
                observer.unobserve(target); // 한 번만 실행되도록 관찰 해제
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Header Scroll Effect
    const header = document.getElementById('header');
    const scrollControls = document.getElementById('scroll-controls');
    const smartScrollIcon = document.getElementById('smart-scroll-icon');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

        if (currentScrollY > 20) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }

        // 스크롤 버튼 활성화 로직
        if (currentScrollY > 300) {
            scrollControls?.classList.add('is-visible');
        } else {
            scrollControls?.classList.remove('is-visible');
        }

        // 스크롤 방향에 따른 아이콘 및 동작 변경
        if (currentScrollY > lastScrollY && currentScrollY < maxScroll - 50) {
            // 아래로 스크롤 중
            window.scrollDirection = 'down';
            if(smartScrollIcon) {
                smartScrollIcon.classList.add('is-down');
            }
        } else if (currentScrollY < lastScrollY || currentScrollY >= maxScroll - 50) {
            // 위로 스크롤 중이거나 최하단에 도달했을 때 (최상단 이동 아이콘으로 변경)
            window.scrollDirection = 'up';
            if(smartScrollIcon) {
                smartScrollIcon.classList.remove('is-down');
            }
        }
        lastScrollY = currentScrollY;
    });

    // Floating CTA
    const floatingCta = document.getElementById('floating-cta');
    let scrollTimeout;

    if (floatingCta) {
        window.addEventListener('scroll', () => {
            floatingCta.classList.add('is-visible');

            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }

            scrollTimeout = setTimeout(() => {
                floatingCta.classList.remove('is-visible');
            }, 1500);
        });
    }

    // 스크롤 중 노출되는 우측 전체메뉴 버튼
    const sideMenuTrigger = document.getElementById('side-menu-trigger');
    const sideMenuDesktop = window.matchMedia('(min-width: 1024px)');
    const sideMenuPages = sideMenuTrigger?.querySelector('.side-menu-pages');
    const sideMenuPageSlots = [...(sideMenuPages?.querySelectorAll('.side-menu-page') || [])];
    const sideMenuSections = [...document.querySelectorAll('[data-page-number]')];
    const sideMenuSectionLinks = [...document.querySelectorAll('[data-section-link]')];
    const sideMenuPageNumbers = sideMenuSections.map((section) => (
        Number.parseInt(section.dataset.pageNumber, 10)
    ));
    let sideMenuHideTimer;
    let sideMenuHoverTimer;
    let sideMenuPageAnimationTimer;
    let sideMenuPageFrame;
    let isSideMenuHovered = false;
    let currentSideMenuIndex = 0;

    function normalizeSideMenuIndex(index) {
        return ((index % sideMenuPageNumbers.length) + sideMenuPageNumbers.length)
            % sideMenuPageNumbers.length;
    }

    function renderSideMenuPages(pageIndex, direction = 0) {
        if (!sideMenuTrigger || !sideMenuPages || sideMenuSections.length === 0) return;

        sideMenuPageSlots.forEach((slot) => {
            const pageEdge = slot.dataset.pageEdge;
            const offset = Number.parseInt(slot.dataset.pageOffset, 10) || 0;
            const displayPage = pageEdge === 'first'
                ? sideMenuPageNumbers[0]
                : pageEdge === 'last'
                    ? sideMenuPageNumbers[sideMenuPageNumbers.length - 1]
                    : sideMenuPageNumbers[normalizeSideMenuIndex(pageIndex + offset)];
            slot.textContent = String(displayPage).padStart(2, '0');
        });

        const pageNumber = sideMenuPageNumbers[pageIndex];
        const pageLabel = String(pageNumber).padStart(2, '0');
        sideMenuTrigger.dataset.currentPage = pageLabel;
        sideMenuTrigger.setAttribute('aria-label', `전체메뉴 열기, 현재 페이지 ${pageLabel}`);

        const currentSectionId = sideMenuSections[pageIndex]?.id;
        sideMenuSectionLinks.forEach((link) => {
            const isCurrent = link.dataset.sectionLink === currentSectionId;
            link.classList.toggle('is-current', isCurrent);
            if (isCurrent) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });

        if (direction === 0) return;

        window.clearTimeout(sideMenuPageAnimationTimer);
        sideMenuPages.classList.remove('is-page-next', 'is-page-prev');
        void sideMenuPages.offsetWidth;
        sideMenuPages.classList.add(direction > 0 ? 'is-page-next' : 'is-page-prev');
        sideMenuPageAnimationTimer = window.setTimeout(() => {
            sideMenuPages.classList.remove('is-page-next', 'is-page-prev');
        }, 240);
    }

    function updateSideMenuPage() {
        sideMenuPageFrame = undefined;
        if (sideMenuSections.length === 0) return;

        const viewportMarker = window.scrollY + (window.innerHeight * 0.5);
        const isAtBottom = window.scrollY + window.innerHeight
            >= document.documentElement.scrollHeight - 4;
        let nextPageIndex = 0;

        sideMenuSections.forEach((section, index) => {
            const sectionTop = section.getBoundingClientRect().top + window.scrollY;
            if (viewportMarker >= sectionTop) nextPageIndex = index;
        });

        if (isAtBottom) nextPageIndex = sideMenuSections.length - 1;
        if (nextPageIndex === currentSideMenuIndex) return;

        const direction = nextPageIndex > currentSideMenuIndex ? 1 : -1;
        currentSideMenuIndex = nextPageIndex;
        renderSideMenuPages(currentSideMenuIndex, direction);
    }

    function scheduleSideMenuPageUpdate() {
        if (sideMenuPageFrame) return;
        sideMenuPageFrame = window.requestAnimationFrame(updateSideMenuPage);
    }

    function isFullMenuOpen() {
        return document.getElementById('full-menu')?.classList.contains('is-open') === true;
    }

    function revealSideMenuTrigger() {
        if (!sideMenuTrigger || !sideMenuDesktop.matches) return;
        sideMenuTrigger.classList.add('is-visible');
        sideMenuTrigger.setAttribute('aria-hidden', 'false');
        sideMenuTrigger.tabIndex = 0;
    }

    function hideSideMenuTrigger({ force = false } = {}) {
        if (!sideMenuTrigger) return;
        if (!force && (
            isSideMenuHovered
            || sideMenuTrigger.matches(':focus')
            || isFullMenuOpen()
        )) return;

        sideMenuTrigger.classList.remove('is-visible');
        sideMenuTrigger.setAttribute('aria-hidden', 'true');
        sideMenuTrigger.tabIndex = -1;
    }

    function cancelSideMenuHide() {
        if (!sideMenuHideTimer) return;
        window.clearTimeout(sideMenuHideTimer);
        sideMenuHideTimer = undefined;
    }

    function scheduleSideMenuHide() {
        cancelSideMenuHide();
        sideMenuHideTimer = window.setTimeout(() => {
            hideSideMenuTrigger();
            sideMenuHideTimer = undefined;
        }, 1500);
    }

    if (sideMenuTrigger) {
        renderSideMenuPages(currentSideMenuIndex);
        scheduleSideMenuPageUpdate();

        window.addEventListener('scroll', () => {
            scheduleSideMenuPageUpdate();
            revealSideMenuTrigger();
            scheduleSideMenuHide();
        }, { passive: true });

        window.addEventListener('resize', scheduleSideMenuPageUpdate, { passive: true });
        window.addEventListener('hashchange', scheduleSideMenuPageUpdate);

        sideMenuTrigger.addEventListener('pointerenter', () => {
            isSideMenuHovered = true;
            revealSideMenuTrigger();
            cancelSideMenuHide();
            window.clearTimeout(sideMenuHoverTimer);
            sideMenuHoverTimer = window.setTimeout(() => {
                if (isSideMenuHovered && typeof window.openFullMenu === 'function') {
                    window.openFullMenu({ focusPanel: false, interaction: 'pointer' });
                }
            }, 160);
        });

        sideMenuTrigger.addEventListener('pointerleave', () => {
            isSideMenuHovered = false;
            window.clearTimeout(sideMenuHoverTimer);
            if (!isFullMenuOpen()) scheduleSideMenuHide();
        });

        sideMenuTrigger.addEventListener('focus', () => {
            revealSideMenuTrigger();
            cancelSideMenuHide();
        });

        sideMenuTrigger.addEventListener('blur', () => {
            if (!isFullMenuOpen()) scheduleSideMenuHide();
        });

        sideMenuDesktop.addEventListener('change', () => {
            cancelSideMenuHide();
            window.clearTimeout(sideMenuHoverTimer);
            isSideMenuHovered = false;
            hideSideMenuTrigger({ force: true });
        });

        document.addEventListener('fullmenu:opened', () => {
            window.clearTimeout(sideMenuHoverTimer);
            cancelSideMenuHide();
        });

        document.addEventListener('fullmenu:closed', () => {
            if (sideMenuDesktop.matches) scheduleSideMenuHide();
        });
    }


});

// ==========================================
// 스크롤 제어 함수 (플로팅 배너 등에서 사용)
// ==========================================
window.scrollToSection = function(id) {
    if(lenis) {
        lenis.scrollTo(id, { offset: -80 });
    }
}

window.scrollToTop = function() {
    if(lenis) lenis.scrollTo(0, { duration: 1.5 });
    else window.scrollTo({top: 0, behavior: 'smooth'});
};

window.scrollToBottom = function() {
    if(lenis) lenis.scrollTo('bottom', { duration: 1.5 });
    else window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
};

window.goToCurriculum = function(target) {
    if (typeof window.selectCurriculumCategory === 'function') {
        window.selectCurriculumCategory(target);
        return;
    }

    const tabButton = document.querySelector(`.tab-btn[data-target="${target}"]`);
    if (tabButton) tabButton.click();

    if (lenis) {
        lenis.scrollTo('#curriculum', { offset: -80 });
    } else {
        document.querySelector('#curriculum')?.scrollIntoView({ behavior: 'smooth' });
    }
};

window.scrollDirection = 'up';
window.handleSmartScroll = function() {
    if (window.scrollDirection === 'down') {
        scrollToBottom();
    } else {
        scrollToTop();
    }
};
