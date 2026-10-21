/**
 * 메인 상단 학과 로드맵 및 국비지원 과정 슬라이드 렌더링
 */
(() => {
    const data = window.SBSHomeBannerData;
    if (!data) return;

    const escapeHtml = (value) => String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');

    const safeUrl = (value) => {
        if (!value) return '';
        try {
            const url = new URL(value, window.location.href);
            return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
        } catch {
            return '';
        }
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const rail = document.querySelector('.hero-rail');
    if (rail && data.sidebar) {
        const sidebar = data.sidebar;
        const phone = String(sidebar.phone).replace(/[^0-9+]/g, '');
        rail.innerHTML = `
            <a class="hero-rail-phone" href="tel:${phone}">${escapeHtml(sidebar.phone)}</a>
            <div class="hero-rail-hours">${sidebar.hours.map((line) => `<p>${escapeHtml(line)}</p>`).join('')}</div>
            <nav class="hero-rail-links" aria-label="학원 바로가기">
                ${sidebar.links.map((link) => `<a href="${escapeHtml(safeUrl(link.href))}"${link.newTab ? ' target="_blank" rel="noopener noreferrer"' : ''}><img src="${escapeHtml(safeUrl(link.icon))}" width="32" height="32" alt=""><span>${escapeHtml(link.label)}</span></a>`).join('')}
            </nav>
        `;
    }
    let measureSupport = () => {};

    const createCarousel = ({ root, dots, count, render, initialIndex = 0, interval = 6000 }) => {
        if (!root || !dots || count < 1) return;

        let currentIndex = initialIndex;
        let autoplayTimer;
        let touchStartX = 0;
        let isPaused = false;

        const stopAutoplay = () => {
            window.clearInterval(autoplayTimer);
            autoplayTimer = undefined;
        };

        const show = (nextIndex, animate = true) => {
            currentIndex = (nextIndex + count) % count;
            root.classList.remove('is-entering');
            render(currentIndex);
            if (!animate || reduceMotion.matches) return;
            void root.offsetWidth;
            root.classList.add('is-entering');
        };

        const startAutoplay = () => {
            stopAutoplay();
            if (isPaused || reduceMotion.matches || document.hidden || count < 2) return;
            autoplayTimer = window.setInterval(() => show(currentIndex + 1), interval);
        };

        dots.addEventListener('click', (event) => {
            const button = event.target.closest('button[data-slide-index]');
            if (!button) return;
            show(Number(button.dataset.slideIndex));
            startAutoplay();
        });

        root.addEventListener('pointerenter', () => {
            isPaused = true;
            stopAutoplay();
        });

        root.addEventListener('pointerleave', () => {
            isPaused = false;
            startAutoplay();
        });

        root.addEventListener('focusin', () => {
            isPaused = true;
            stopAutoplay();
        });

        root.addEventListener('focusout', (event) => {
            if (root.contains(event.relatedTarget)) return;
            isPaused = false;
            startAutoplay();
        });

        root.addEventListener('touchstart', (event) => {
            touchStartX = event.changedTouches[0].clientX;
        }, { passive: true });

        root.addEventListener('touchend', (event) => {
            const distance = event.changedTouches[0].clientX - touchStartX;
            if (Math.abs(distance) < 45) return;
            show(currentIndex + (distance < 0 ? 1 : -1));
            startAutoplay();
        }, { passive: true });

        document.addEventListener('visibilitychange', startAutoplay);
        reduceMotion.addEventListener('change', startAutoplay);
        show(currentIndex, false);
        startAutoplay();

        return {
            getIndex: () => currentIndex,
            update: (nextCount, nextIndex = 0) => {
                count = nextCount;
                show(nextIndex, false);
                startAutoplay();
            }
        };
    };

    const roadmap = document.getElementById('home-roadmap-content');
    const roadmapSlide = document.getElementById('home-roadmap-slide');
    const roadmapDots = document.getElementById('home-roadmap-dots');
    const roadmapStatus = document.getElementById('home-roadmap-status');
    const roadmapSourcePages = data.roadmap?.pages ?? [];
    const departmentByNumber = {
        '01': 'artwork', '02': 'webtoon', '03': 'ai-skillup', '04': 'uiux',
        '05': 'ai-sw', '06': 'visual', '07': 'interior', '08': 'motion',
        '09': 'cg-vfx', '10': 'youtube', '11': 'mechanical', '12': 'senior',
        '13': 'office', '14': 'field-cert'
    };

    if (roadmap && roadmapSlide && roadmapDots && roadmapSourcePages.length) {
        const departments = roadmapSourcePages.flatMap((page) => page.departments ?? []);
        let roadmapPages = [];
        let rebuildRoadmap;
        let roadmapCarousel;

        const renderDepartment = (department) => {
            const courses = Array.isArray(department.courses) ? department.courses : [];
            return `
                <article class="hero-department${department.wide ? ' is-wide' : ''}">
                    <header class="hero-department-head">
                        <strong>${escapeHtml(department.number)}</strong>
                        <h2><a href="./curriculum.html?department=${departmentByNumber[department.number]}">${escapeHtml(department.title)}</a></h2>
                        ${department.offset ? '<small>계속</small>' : ''}
                    </header>
                    <ol class="hero-course-list">
                        ${courses.map((course, index) => `
                            <li class="hero-course${index + (department.offset || 0) === (department.total || courses.length) - 1 ? ' is-final' : ''}">
                                <span class="hero-course-index">${String(index + 1 + (department.offset || 0)).padStart(2, '0')}</span>
                                <a class="hero-course-name" href="./curriculum.html?department=${departmentByNumber[department.number]}&amp;course=${index + 1 + (department.offset || 0)}">${escapeHtml(course)}</a>
                            </li>
                        `).join('')}
                    </ol>
                </article>
            `;
        };

        const renderRoadmapDots = () => {
            roadmapDots.innerHTML = roadmapPages.map((page, index) => `
                <button type="button" aria-label="${escapeHtml(page.label)} 보기" data-slide-index="${index}"></button>
            `).join('');
        };

        const renderRoadmap = (index) => {
            const page = roadmapPages[index];
            roadmapSlide.innerHTML = `
                <div class="hero-roadmap-page" data-roadmap-page="${index + 1}">
                    ${page.departments.map(renderDepartment).join('')}
                </div>
            `;

            roadmapDots.querySelectorAll('button').forEach((dot, dotIndex) => {
                const isActive = dotIndex === index;
                dot.classList.toggle('is-active', isActive);
                dot.setAttribute('aria-current', isActive ? 'true' : 'false');
            });

            if (roadmapStatus) roadmapStatus.textContent = page.label;
        };

        roadmapPages = roadmapSourcePages;
        renderRoadmapDots();

        roadmapCarousel = createCarousel({
            root: roadmap,
            dots: roadmapDots,
            count: roadmapPages.length,
            render: renderRoadmap,
            interval: 7000
        });

        const hero = roadmap.closest('.hero-sec');
        const probe = document.createElement('div');
        probe.className = 'hero-roadmap-page hero-measure';
        probe.setAttribute('aria-hidden', 'true');
        probe.inert = true;
        roadmap.appendChild(probe);
        const viewportProbe = document.createElement('div');
        viewportProbe.style.cssText = 'position:fixed;height:100svh;width:0;visibility:hidden;pointer-events:none';
        document.body.appendChild(viewportProbe);

        rebuildRoadmap = () => {
            measureSupport();
            const support = document.querySelector('.sup-sec');
            if (!support) return;
            const anchor = roadmapPages[roadmapCarousel.getIndex()]?.departments[0];
            const style = getComputedStyle(hero);
            const available = Math.floor(viewportProbe.getBoundingClientRect().height
                - Math.max(parseFloat(style.marginTop), document.querySelector('#header').getBoundingClientRect().height)
                - support.getBoundingClientRect().height
                - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom)
                - document.querySelector('.hero-roadmap-toolbar').getBoundingClientRect().height - 2);
            const wide = window.innerWidth >= 1200 && available >= 392;
            hero.classList.toggle('is-compact', !wide);
            const measure = (items) => {
                probe.innerHTML = items.map(renderDepartment).join('');
                return Math.ceil(probe.getBoundingClientRect().height);
            };
            // At least one course and its heading must remain fully readable.
            const minimum = Math.max(...departments.flatMap((department) => department.courses.map((course, offset) =>
                measure([{ ...department, wide: false, courses: [course], offset, total: department.courses.length }]))));
            const railStyle = rail ? getComputedStyle(rail) : null;
            const railMinimum = railStyle && railStyle.display !== 'none'
                ? Math.ceil([...rail.children].reduce((height, child) => height + child.getBoundingClientRect().height, 0)
                    + parseFloat(railStyle.paddingTop) + parseFloat(railStyle.paddingBottom)
                    + parseFloat(railStyle.rowGap) * (rail.children.length - 1) + 2)
                : 0;
            const budget = Math.max(available, minimum, railMinimum);
            const pages = [];
            let current = [];
            const flush = () => {
                if (!current.length) return;
                pages.push({ label: `학과 로드맵 ${current[0].number}–${current[current.length - 1].number}`, departments: current });
                current = [];
            };
            for (const source of departments) {
                const department = { ...source, wide: wide && source.wide, total: source.courses.length };
                if (measure([...current, department]) <= budget) {
                    current.push(department);
                    continue;
                }
                flush();
                if (measure([department]) <= budget) {
                    current.push(department);
                    continue;
                }
                let offset = 0;
                while (offset < department.total) {
                    let count = 1;
                    while (offset + count < department.total && measure([{ ...department, offset, courses: department.courses.slice(offset, offset + count + 1) }]) <= budget) count++;
                    current.push({ ...department, offset, courses: department.courses.slice(offset, offset + count) });
                    offset += count;
                    if (offset < department.total) flush();
                }
            }
            flush();
            roadmapPages = pages;
            hero.style.setProperty('--roadmap-height', `${Math.max(railMinimum, ...pages.map((page) => measure(page.departments)))}px`);
            hero.dataset.viewportFallback = String(available < Math.max(minimum, railMinimum));
            probe.replaceChildren();
            renderRoadmapDots();
            const index = pages.findIndex((page) => page.departments.some((department) =>
                department.number === anchor?.number && (department.offset || 0) <= (anchor.offset || 0)
                && (department.offset || 0) + department.courses.length > (anchor.offset || 0)));
            roadmapCarousel.update(pages.length, Math.max(0, index));
        };
        let timer;
        const schedule = () => {
            window.clearTimeout(timer);
            timer = window.setTimeout(rebuildRoadmap, 150);
        };
        window.addEventListener('resize', schedule);
        document.fonts.ready.then(schedule);
        document.fonts.addEventListener('loadingdone', schedule);
        new ResizeObserver(schedule).observe(document.querySelector('.sup-sec'));
        schedule();
    }

    const supportContent = document.getElementById('support-banner-content');
    const supportSlide = document.getElementById('support-course-slide');
    const supportDots = document.getElementById('support-course-dots');
    const supportStatus = document.getElementById('support-course-status');
    const supportSlider = document.getElementById('support-course-slider');
    const supportSlides = data.slides ?? [];

    if (!supportContent || !supportSlide || !supportDots || !supportSlider || !supportSlides.length) return;

    supportContent.innerHTML = `
        <div class="sup-copy">
            <p class="sup-description">${escapeHtml(data.support.description)}</p>
            <strong class="sup-title">${escapeHtml(data.support.title)}</strong>
            <div class="sup-contacts">
                <span>학원 문의 <b>${escapeHtml(data.support.academyPhone)}</b></span>
                <span aria-hidden="true">|</span>
                <span>고용노동부 문의 <b>${escapeHtml(data.support.ministryPhone)}</b></span>
            </div>
        </div>
    `;

    const renderType = (type, slideIndex, typeIndex) => {
        const isCourseEvaluation = type === '과정평가형';
        const tooltipId = `course-evaluation-${slideIndex}-${typeIndex}`;
        return `
            <span class="sup-type">
                ${escapeHtml(type)}
                ${isCourseEvaluation ? `
                    <button class="sup-info" type="button" aria-label="과정평가형 안내" aria-describedby="${tooltipId}">!</button>
                    <span id="${tooltipId}" class="sup-tooltip" role="tooltip">${escapeHtml(data.notices.courseEvaluation)}</span>
                ` : ''}
            </span>
        `;
    };

    supportDots.innerHTML = supportSlides.map((slide, index) => `
        <button type="button" aria-label="${index + 1}번 과정 보기: ${escapeHtml(slide.title)}" data-slide-index="${index}"></button>
    `).join('');

    const renderSupport = (index) => {
        const slide = supportSlides[index];
        const link = safeUrl(slide.url);
        const copaymentTooltipId = `copayment-notice-${index}`;

        supportSlide.innerHTML = `
            <article class="sup-course-card" data-course-id="${escapeHtml(slide.id)}">
                <div class="sup-course-head">
                    <div class="sup-type-list">
                        ${slide.types.map((type, typeIndex) => renderType(type, index, typeIndex)).join('')}
                    </div>
                    ${link ? `<a class="sup-work24-link" href="${link}" target="_blank" rel="noopener noreferrer">고용24에서 확인 <span aria-hidden="true">↗</span></a>` : ''}
                </div>
                <h2 class="sup-course-title">${escapeHtml(slide.title)}</h2>
                <dl class="sup-course-meta">
                    <div>
                        <dt>훈련비</dt>
                        <dd>${escapeHtml(slide.tuition)}</dd>
                    </div>
                    <div>
                        <dt>자비부담</dt>
                        <dd>
                            ${escapeHtml(slide.copayment)}
                            <button class="sup-info" type="button" aria-label="본인부담금 안내" aria-describedby="${copaymentTooltipId}">!</button>
                            <span id="${copaymentTooltipId}" class="sup-tooltip" role="tooltip">${escapeHtml(data.notices.copayment)}</span>
                        </dd>
                    </div>
                    <div>
                        <dt>교육기간</dt>
                        <dd>${escapeHtml(slide.period)}</dd>
                    </div>
                    <div>
                        <dt>교육시간</dt>
                        <dd>${escapeHtml(slide.duration)}</dd>
                    </div>
                </dl>
            </article>
        `;

        supportDots.querySelectorAll('button').forEach((dot, dotIndex) => {
            const isActive = dotIndex === index;
            dot.classList.toggle('is-active', isActive);
            dot.setAttribute('aria-current', isActive ? 'true' : 'false');
        });

        if (supportStatus) supportStatus.textContent = `${index + 1}번째 과정: ${slide.title}`;
    };

    const supportCarousel = createCarousel({
        root: supportSlider,
        dots: supportDots,
        count: supportSlides.length,
        render: renderSupport,
        initialIndex: Math.min(2, supportSlides.length - 1)
    });
    measureSupport = () => {
        const current = supportCarousel.getIndex();
        supportSlide.style.minHeight = '';
        let height = 0;
        supportSlides.forEach((slide, index) => {
            renderSupport(index);
            height = Math.max(height, supportSlide.getBoundingClientRect().height);
        });
        renderSupport(current);
        supportSlide.style.minHeight = `${Math.ceil(height)}px`;
    };
})();
