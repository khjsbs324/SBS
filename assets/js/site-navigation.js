/** 일반 페이지와 과정 상세페이지의 공통 모바일 메뉴. */
(() => {
    const items = window.SBSSiteData?.navigation;
    const scriptUrl = document.currentScript?.src;
    if (!Array.isArray(items) || !scriptUrl) return;
    const siteRoot = new URL('../../', scriptUrl);
    const currentPath = location.pathname;

    document.querySelectorAll('[data-site-navigation]').forEach((container) => {
        const fragment = document.createDocumentFragment();
        items.forEach((item) => {
            let url;
            try { url = new URL(item.url, siteRoot); } catch { return; }
            if (!['http:', 'https:'].includes(url.protocol) || url.origin !== location.origin) return;
            const link = document.createElement('a');
            link.className = 'menu-lnk';
            link.href = url.href;
            link.textContent = item.label;
            const exact = currentPath === url.pathname;
            const courseDetail = item.url === 'curriculum.html'
                && currentPath.startsWith(new URL('courses/', siteRoot).pathname);
            if (exact || courseDetail) {
                link.classList.add('is-current');
                link.setAttribute('aria-current', exact ? 'page' : 'true');
            }
            link.addEventListener('click', () => {
                window.closeFullMenu?.({ restoreFocus: false });
            });
            fragment.append(link);
        });
        container.replaceChildren(fragment);
    });
})();
