/** 14개 학과 공용 교육과정 페이지. 메인 모달과 독립적인 인라인 이미지 뷰어입니다. */
(() => {
    const config = window.SBSDepartmentPageData;
    const roadmap = window.SBSHomeBannerData?.roadmap?.pages?.flatMap((page) => page.departments) || [];
    const imagesBySubject = window.SBSCurriculumData?.subjectImages || {};
    const booksById = new Map((window.SBSBooksData?.books || []).map((book) => [book.id, book]));
    const list = document.getElementById('department-list');
    if (!config || !list) return;

    const departments = config.departments.map((item) => ({
        ...item,
        courses: roadmap.find((entry) => entry.number === item.roadmapNumber)?.courses || []
    }));
    const byId = new Map(departments.map((item) => [item.id, item]));
    const params = new URLSearchParams(location.search);
    const requested = params.get('department');
    let departmentId = requested === 'all' || byId.has(requested) ? requested : config.defaultDepartment;
    let activeCourse = null;
    let imageIndex = 0;
    let portfolioState = { items: [], status: 'loading' };
    let touchStartX = 0;
    let zoomTouchStartX = 0;
    let inlineSwiped = false;
    let zoomSwiped = false;
    let returnFocus = null;
    let previousOverflow = '';
    let previousPaddingRight = '';
    const artworkPreloads = new Map();

    const roadmapTitle = document.getElementById('department-roadmap-title');
    const courseList = document.getElementById('department-courses');
    const roadmapSection = document.getElementById('department-roadmap');
    const sidebarStack = document.querySelector('.dp-sidebar-stack');
    const curriculumSection = document.getElementById('department-curriculum');
    const imageBox = document.getElementById('department-image');
    const viewer = document.getElementById('image-viewer-container');
    const pagination = document.getElementById('department-pagination');
    const prev = document.getElementById('department-prev');
    const next = document.getElementById('department-next');
    const zoom = document.getElementById('department-zoom');
    const zoomStage = document.getElementById('department-zoom-stage');
    const zoomImage = document.getElementById('department-zoom-image');
    const zoomTitle = document.getElementById('department-zoom-title');
    const zoomPagination = document.getElementById('department-zoom-pagination');
    const zoomPrev = document.getElementById('department-zoom-prev');
    const zoomNext = document.getElementById('department-zoom-next');
    const zoomClose = document.getElementById('department-zoom-close');
    const portfolioGrid = document.getElementById('department-portfolio-grid');
    const portfolioStatus = document.getElementById('department-portfolio-status');
    const portfolioMore = document.getElementById('department-portfolio-more');
    const bookGrid = document.getElementById('department-book-grid');
    const courseTooltip = document.createElement('div');
    courseTooltip.className = 'dp-course-tooltip';
    courseTooltip.textContent = '이미지 준비중';
    courseTooltip.setAttribute('role', 'tooltip');
    courseTooltip.hidden = true;
    document.body.append(courseTooltip);

    function safeUrl(value) {
        try {
            const url = new URL(value, location.href);
            return ['https:', 'http:'].includes(url.protocol) ? url.href : '';
        } catch { return ''; }
    }

    function numbered(value) {
        return String(value).padStart(2, '0');
    }

    const materials = document.getElementById('department-materials');
    if (materials) {
        const fragment = document.createDocumentFragment();
        (config.materials || []).forEach((item) => {
            const url = safeUrl(item.url);
            if (!url) return;
            const entry = document.createElement('li');
            const link = document.createElement('a');
            link.href = url;
            link.textContent = item.label;
            entry.append(link);
            fragment.append(entry);
        });
        materials.replaceChildren(fragment);
    }

    function courseAt(id, index = 0) {
        const department = byId.get(id);
        if (!department || !Number.isInteger(index) || !department.courses[index]) return null;
        const course = { departmentId: id, index, name: department.courses[index] };
        return courseImages(course).length ? course : null;
    }

    function firstAvailableCourse(id) {
        const department = byId.get(id);
        if (!department) return null;
        for (let index = 0; index < department.courses.length; index++) {
            const course = courseAt(id, index);
            if (course) return course;
        }
        return null;
    }

    function showCourseTooltip(item) {
        const rect = item.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
            hideCourseTooltip();
            return;
        }
        courseTooltip.hidden = false;
        const halfWidth = courseTooltip.offsetWidth / 2;
        const left = Math.min(Math.max(rect.left + rect.width / 2, halfWidth + 8), window.innerWidth - halfWidth - 8);
        courseTooltip.style.left = `${left}px`;
        courseTooltip.style.top = `${Math.max(8, rect.top - courseTooltip.offsetHeight - 10)}px`;
    }

    function hideCourseTooltip() {
        courseTooltip.hidden = true;
    }

    function syncCourseTooltip() {
        const focused = document.activeElement?.closest?.('.dp-course-unavailable');
        if (focused && courseList.contains(focused)) showCourseTooltip(focused);
        else hideCourseTooltip();
    }

    function courseImages(course) {
        const key = config.imageAliases[course.name] || course.name;
        const keys = Array.isArray(key) ? key : [key];
        return keys.flatMap((item) => imagesBySubject[item] || []).map(safeUrl).filter(Boolean);
    }

    function preloadArtworkNeighbors(images, index) {
        const neighbors = new Set();
        if (images.length > 1) {
            neighbors.add(images[(index + 1) % images.length]);
            neighbors.add(images[(index - 1 + images.length) % images.length]);
        }
        for (const url of artworkPreloads.keys()) {
            if (!neighbors.has(url)) artworkPreloads.delete(url);
        }
        for (const url of neighbors) {
            if (artworkPreloads.has(url)) continue;
            const image = new Image();
            image.decoding = 'async';
            image.src = url;
            artworkPreloads.set(url, image);
        }
    }

    function updateUrl(replace = false) {
        const url = new URL(location.href);
        url.searchParams.set('department', departmentId);
        if (activeCourse) url.searchParams.set('course', String(activeCourse.index + 1));
        else url.searchParams.delete('course');
        if (replace) history.replaceState(null, '', url);
        else history.pushState(null, '', url);
    }

    function renderDepartments() {
        const fragment = document.createDocumentFragment();
        [{ id: 'all', label: 'ALL' }, ...departments].forEach((department, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'dp-department';
            button.dataset.department = department.id;
            button.setAttribute('aria-pressed', String(department.id === departmentId));
            if (department.id === departmentId) button.classList.add('is-active');
            const number = document.createElement('span');
            number.className = 'dp-department-number';
            number.textContent = numbered(index);
            const label = document.createElement('span');
            label.textContent = department.label;
            button.append(number, label);
            fragment.append(button);
        });
        list.replaceChildren(fragment);
    }

    function renderCourses() {
        hideCourseTooltip();
        const visible = departmentId === 'all' ? departments : [byId.get(departmentId)];
        const fragment = document.createDocumentFragment();
        visible.forEach((department) => {
            const group = document.createElement('div');
            group.className = 'dp-course-group';
            if (departmentId === 'all') {
                const heading = document.createElement('h3');
                heading.className = 'dp-course-group-title';
                heading.textContent = `${numbered(departments.indexOf(department) + 1)} ${department.label}`;
                group.append(heading);
            }
            const steps = document.createElement('div');
            steps.className = 'dp-course-steps';
            department.courses.forEach((name, index) => {
                const available = Boolean(courseAt(department.id, index));
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'dp-course';
                button.dataset.department = department.id;
                button.dataset.course = String(index);
                button.disabled = !available;
                const isActive = available && activeCourse?.departmentId === department.id && activeCourse.index === index;
                button.classList.toggle('is-active', isActive);
                if (available) button.setAttribute('aria-pressed', String(isActive));
                const number = document.createElement('span');
                number.className = 'dp-course-number';
                number.textContent = numbered(index + 1);
                const label = document.createElement('span');
                label.className = 'dp-course-name';
                label.textContent = name;
                button.append(number, label);
                if (available) {
                    steps.append(button);
                } else {
                    const item = document.createElement('span');
                    item.className = 'dp-course-unavailable';
                    item.tabIndex = 0;
                    item.setAttribute('role', 'group');
                    item.setAttribute('aria-label', `${name}, 이미지 준비중`);
                    item.append(button);
                    steps.append(item);
                }
            });
            group.append(steps);
            fragment.append(group);
        });
        courseList.replaceChildren(fragment);
    }

    function renderViewer() {
        const images = activeCourse ? courseImages(activeCourse) : [];
        const total = images.length;
        const isArtwork = activeCourse?.departmentId === 'artwork';
        viewer.classList.toggle('is-artwork', isArtwork);
        imageBox.replaceChildren();
        imageIndex = Math.min(imageIndex, Math.max(0, total - 1));
        if (!isArtwork || !total) artworkPreloads.clear();
        if (total) {
            const openButton = document.createElement('button');
            openButton.type = 'button';
            openButton.className = 'dp-image-open';
            openButton.setAttribute('aria-label', `${activeCourse.name} 이미지 크게 보기`);
            const image = document.createElement('img');
            image.loading = isArtwork ? 'eager' : 'lazy';
            if (isArtwork) image.decoding = 'async';
            image.src = images[imageIndex];
            image.alt = `${activeCourse.name} 비주얼 커리큘럼 ${imageIndex + 1} / ${total}`;
            image.addEventListener('error', () => {
                imageBox.textContent = '이미지를 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.';
            }, { once: true });
            openButton.addEventListener('click', () => {
                if (!inlineSwiped) openZoom(openButton);
            });
            openButton.append(image);
            imageBox.append(openButton);
            if (isArtwork) preloadArtworkNeighbors(images, imageIndex);
        } else {
            const message = document.createElement('p');
            message.textContent = departmentId === 'all'
                ? '학과와 과목을 선택하면 비주얼 커리큘럼을 볼 수 있습니다.'
                : '이 학과의 비주얼 커리큘럼 이미지를 준비 중입니다.';
            imageBox.append(message);
        }
        pagination.textContent = total ? `${imageIndex + 1} / ${total}` : '0 / 0';
        prev.disabled = total < 2;
        next.disabled = total < 2;
        curriculumSection.setAttribute('aria-label', activeCourse ? `${activeCourse.name} 비주얼 커리큘럼` : '비주얼 커리큘럼');
        if (zoom.open) renderZoom();
    }

    function renderZoom() {
        const images = activeCourse ? courseImages(activeCourse) : [];
        const total = images.length;
        if (!total) {
            zoom.close();
            return;
        }
        const isArtwork = activeCourse.departmentId === 'artwork';
        zoom.classList.toggle('is-artwork', isArtwork);
        zoomImage.tabIndex = isArtwork ? 0 : -1;
        zoomTitle.textContent = `${activeCourse.name} 비주얼 커리큘럼`;
        zoomPagination.textContent = `${imageIndex + 1} / ${total}`;
        zoomPrev.disabled = total < 2;
        zoomNext.disabled = total < 2;
        zoomImage.replaceChildren();
        const image = document.createElement('img');
        image.src = images[imageIndex];
        image.alt = `${activeCourse.name} 비주얼 커리큘럼 ${imageIndex + 1} / ${total}`;
        image.addEventListener('error', () => {
            zoomImage.textContent = '이미지를 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.';
        }, { once: true });
        zoomImage.append(image);
        zoomImage.scrollTop = 0;
    }

    function openZoom(trigger) {
        if (zoom.open || !activeCourse || !courseImages(activeCourse).length) return;
        returnFocus = trigger;
        previousOverflow = document.documentElement.style.overflow;
        previousPaddingRight = document.documentElement.style.paddingRight;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        if (scrollbarWidth > 0) document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
        document.documentElement.style.overflow = 'hidden';
        zoom.showModal();
        renderZoom();
        zoomClose.focus({ preventScroll: true });
    }

    function moveImage(direction) {
        const total = activeCourse ? courseImages(activeCourse).length : 0;
        if (total < 2) return;
        imageIndex = (imageIndex + direction + total) % total;
        renderViewer();
    }

    function renderPortfolio() {
        const department = byId.get(departmentId);
        const category = department?.portfolio;
        const items = category ? portfolioState.items.filter((item) => item.category === category).slice(0, 2) : [];
        portfolioGrid.replaceChildren();
        portfolioMore.href = category ? `./portfolio.html?selMater=${encodeURIComponent(category)}` : './portfolio.html';
        if (portfolioState.status === 'loading' && category) {
            portfolioStatus.textContent = '작품을 불러오는 중입니다.';
        } else if (portfolioState.status === 'error' && category) {
            portfolioStatus.textContent = '작품을 불러오지 못했습니다. 포트폴리오 페이지에서 확인해 주세요.';
        } else if (portfolioState.status === 'stale' && category) {
            portfolioStatus.textContent = '최근 확인한 작품을 표시합니다.';
        } else if (!items.length) {
            portfolioStatus.textContent = departmentId === 'all' ? '학과를 선택하면 관련 작품을 볼 수 있습니다.' : '연결된 작품을 준비 중입니다.';
        } else {
            portfolioStatus.textContent = '';
        }
        portfolioStatus.hidden = !portfolioStatus.textContent;
        items.forEach((item) => {
            const link = document.createElement('a');
            link.className = 'dp-portfolio-card';
            link.href = safeUrl(item.url);
            const image = document.createElement('img');
            image.src = safeUrl(item.thumbnail);
            image.alt = item.title;
            image.loading = 'lazy';
            image.width = 600;
            image.height = 450;
            const label = document.createElement('span');
            label.textContent = item.title;
            link.append(image, label);
            portfolioGrid.append(link);
        });
    }

    function renderBooks() {
        const department = byId.get(departmentId);
        const ids = department?.books || window.SBSBooksData?.featuredIds || [];
        bookGrid.replaceChildren();
        ids.slice(0, 4).forEach((id) => {
            const book = booksById.get(id);
            if (!book) return;
            const link = document.createElement('a');
            link.className = 'dp-book-card';
            link.href = `https://kedustore.com/books/detail.asp?pdt_seq=${encodeURIComponent(book.id)}`;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            const image = document.createElement('img');
            image.src = safeUrl(book.image);
            image.alt = `${book.title} 표지`;
            image.loading = 'lazy';
            image.width = 300;
            image.height = 375;
            const label = document.createElement('span');
            label.textContent = book.title;
            const price = document.createElement('strong');
            price.textContent = `정가 ${book.price.toLocaleString('ko-KR')}원`;
            link.append(image, label, price);
            bookGrid.append(link);
        });
        if (!bookGrid.childElementCount) bookGrid.textContent = '연결된 교재를 준비 중입니다.';
    }

    function syncNestedScroll() {
        [roadmapSection, sidebarStack].forEach((element) => {
            element.toggleAttribute('data-lenis-prevent', element.scrollHeight > element.clientHeight + 1);
        });
    }

    function render() {
        const department = byId.get(departmentId);
        roadmapTitle.textContent = department?.label || 'ALL';
        document.title = `${department?.label || '전체 교육과정'} | SBS아카데미AIX학원`;
        renderDepartments();
        renderCourses();
        renderViewer();
        renderPortfolio();
        renderBooks();
        requestAnimationFrame(syncNestedScroll);
    }

    function selectDepartment(id) {
        if (id !== 'all' && !byId.has(id)) return;
        departmentId = id;
        activeCourse = firstAvailableCourse(id);
        imageIndex = 0;
        updateUrl();
        render();
    }

    list.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-department]');
        if (button) selectDepartment(button.dataset.department);
    });
    courseList.addEventListener('pointerover', (event) => {
        const item = event.target.closest('.dp-course-unavailable');
        if (item && courseList.contains(item)) showCourseTooltip(item);
    });
    courseList.addEventListener('pointerout', (event) => {
        const item = event.target.closest('.dp-course-unavailable');
        if (item && !(event.relatedTarget instanceof Node && item.contains(event.relatedTarget))) hideCourseTooltip();
    });
    courseList.addEventListener('focusin', (event) => {
        const item = event.target.closest('.dp-course-unavailable');
        if (item) showCourseTooltip(item);
    });
    courseList.addEventListener('focusout', (event) => {
        const item = event.target.closest('.dp-course-unavailable');
        if (item && !(event.relatedTarget instanceof Node && item.contains(event.relatedTarget))) hideCourseTooltip();
    });
    window.addEventListener('scroll', syncCourseTooltip, true);
    window.addEventListener('resize', syncCourseTooltip);
    window.addEventListener('resize', syncNestedScroll);
    courseList.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-course]');
        if (!button || button.disabled) return;
        const owner = byId.get(button.dataset.department);
        const index = Number(button.dataset.course);
        const course = courseAt(owner?.id, index);
        if (!course) return;
        activeCourse = course;
        imageIndex = 0;
        if (departmentId === 'all') departmentId = course.departmentId;
        updateUrl();
        render();
        if (getComputedStyle(roadmapSection).position === 'sticky') {
            const stickyTop = parseFloat(getComputedStyle(roadmapSection).top) || 0;
            const scrollPadding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
            const scrollMargin = Math.max(0, stickyTop + roadmapSection.offsetHeight + 18 - scrollPadding);
            curriculumSection.style.scrollMarginTop = `${scrollMargin}px`;
        } else {
            curriculumSection.style.removeProperty('scroll-margin-top');
        }
        if (typeof lenis !== 'undefined' && lenis) {
            const scrollMargin = parseFloat(getComputedStyle(curriculumSection).scrollMarginTop) || 0;
            lenis.scrollTo(curriculumSection, { offset: -scrollMargin });
        } else {
            curriculumSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
    prev.addEventListener('click', () => moveImage(-1));
    next.addEventListener('click', () => moveImage(1));
    zoomPrev.addEventListener('click', () => moveImage(-1));
    zoomNext.addEventListener('click', () => moveImage(1));
    zoomClose.addEventListener('click', () => zoom.close());
    zoom.addEventListener('close', () => {
        document.documentElement.style.overflow = previousOverflow;
        document.documentElement.style.paddingRight = previousPaddingRight;
        const target = returnFocus?.isConnected ? returnFocus : imageBox.querySelector('.dp-image-open') || viewer;
        target.focus({ preventScroll: true });
        returnFocus = null;
    });
    zoom.addEventListener('click', (event) => {
        if (!zoomSwiped && [zoom, zoomStage, zoomImage].includes(event.target)) zoom.close();
    });
    zoom.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' && !zoomPrev.disabled) { event.preventDefault(); zoomPrev.click(); }
        if (event.key === 'ArrowRight' && !zoomNext.disabled) { event.preventDefault(); zoomNext.click(); }
    });
    zoomStage.addEventListener('touchstart', (event) => {
        zoomTouchStartX = event.changedTouches[0].clientX;
    }, { passive: true });
    zoomStage.addEventListener('touchend', (event) => {
        const difference = zoomTouchStartX - event.changedTouches[0].clientX;
        if (Math.abs(difference) < 50) return;
        zoomSwiped = true;
        window.setTimeout(() => { zoomSwiped = false; }, 350);
        if (difference > 0 && !zoomNext.disabled) zoomNext.click();
        if (difference < 0 && !zoomPrev.disabled) zoomPrev.click();
    }, { passive: true });
    viewer.tabIndex = 0;
    viewer.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' && !prev.disabled) { event.preventDefault(); prev.click(); }
        if (event.key === 'ArrowRight' && !next.disabled) { event.preventDefault(); next.click(); }
    });
    viewer.addEventListener('touchstart', (event) => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
    viewer.addEventListener('touchend', (event) => {
        const difference = touchStartX - event.changedTouches[0].clientX;
        if (Math.abs(difference) >= 50) {
            inlineSwiped = true;
            window.setTimeout(() => { inlineSwiped = false; }, 350);
        }
        if (difference > 50 && !next.disabled) next.click();
        if (difference < -50 && !prev.disabled) prev.click();
    }, { passive: true });
    window.addEventListener('popstate', () => {
        if (zoom.open) zoom.close();
        const nextParams = new URLSearchParams(location.search);
        const nextId = nextParams.get('department');
        departmentId = nextId === 'all' || byId.has(nextId) ? nextId : config.defaultDepartment;
        const index = Number(nextParams.get('course')) - 1;
        const requestedCourse = courseAt(departmentId, index);
        activeCourse = requestedCourse || firstAvailableCourse(departmentId);
        if (nextParams.has('course') && !requestedCourse) updateUrl(true);
        imageIndex = 0;
        render();
    });

    const index = Number(params.get('course')) - 1;
    const requestedCourse = courseAt(departmentId, index);
    activeCourse = requestedCourse || firstAvailableCourse(departmentId);
    if (params.has('course') && !requestedCourse) updateUrl(true);
    render();
    window.SBSPortfolioSource?.subscribe((state) => {
        portfolioState = state;
        renderPortfolio();
    });
})();
