/**
 * 데스크톱 교육과정 2차 메뉴
 */
(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const root = document.getElementById('course-menu-root');
        const trigger = document.getElementById('course-menu-trigger');
        const menu = document.getElementById('course-submenu');
        const grid = document.getElementById('course-submenu-grid');
        const closeButton = document.getElementById('course-menu-close');
        const backdrop = menu?.querySelector('.m2-bg');
        const panel = menu?.querySelector('.m2-pan');
        const groups = window.SBSSiteData?.courseMenu || [];
        const desktop = window.matchMedia('(min-width: 1280px)');

        if (!root || !trigger || !menu || !grid || groups.length === 0) return;

        let closeTimer;
        let isRestoringFocus = false;

        function renderMenu() {
            const fragment = document.createDocumentFragment();

            groups.forEach((group, groupIndex) => {
                const section = document.createElement('section');
                const heading = document.createElement('div');
                const number = document.createElement('span');
                const title = document.createElement('button');
                const list = document.createElement('ul');

                section.className = 'm2-col';
                heading.className = 'm2-hd';
                number.className = 'm2-num';
                title.className = 'm2-tit';
                list.className = 'm2-lst';

                number.textContent = String(groupIndex + 1).padStart(2, '0');
                title.type = 'button';
                title.textContent = group.title;
                title.dataset.target = group.target;
                title.setAttribute('aria-label', `${group.title} 교육과정 보기`);

                group.items.forEach((item) => {
                    const listItem = document.createElement('li');
                    const button = document.createElement('button');

                    button.className = 'm2-lnk';
                    button.type = 'button';
                    button.textContent = item.label;
                    button.dataset.target = item.target;
                    listItem.appendChild(button);
                    list.appendChild(listItem);
                });

                heading.append(number, title);
                section.append(heading, list);
                fragment.appendChild(section);
            });

            grid.replaceChildren(fragment);
        }

        function cancelClose() {
            if (closeTimer) {
                window.clearTimeout(closeTimer);
                closeTimer = undefined;
            }
        }

        function openMenu() {
            if (!desktop.matches) return;
            cancelClose();
            menu.classList.add('is-open');
            menu.setAttribute('aria-hidden', 'false');
            trigger.setAttribute('aria-expanded', 'true');
        }

        function closeMenu({ restoreFocus = false } = {}) {
            cancelClose();
            menu.classList.remove('is-open');
            menu.setAttribute('aria-hidden', 'true');
            trigger.setAttribute('aria-expanded', 'false');
            if (restoreFocus && desktop.matches) {
                isRestoringFocus = true;
                trigger.focus({ preventScroll: true });
                window.requestAnimationFrame(() => {
                    isRestoringFocus = false;
                });
            }
        }

        function scheduleClose() {
            cancelClose();
            closeTimer = window.setTimeout(() => closeMenu(), 180);
        }

        function moveToCurriculum(target) {
            closeMenu();
            if (typeof window.selectCurriculumCategory === 'function') {
                window.selectCurriculumCategory(target);
            } else if (typeof window.goToCurriculum === 'function') {
                window.goToCurriculum(target);
            }
        }

        renderMenu();

        trigger.addEventListener('mouseenter', openMenu);
        trigger.addEventListener('focus', () => {
            if (!isRestoringFocus) openMenu();
        });
        trigger.addEventListener('click', () => {
            if (menu.classList.contains('is-open')) closeMenu();
            else openMenu();
        });

        panel?.addEventListener('mouseenter', cancelClose);
        panel?.addEventListener('mouseleave', scheduleClose);
        backdrop?.addEventListener('mouseenter', scheduleClose);
        backdrop?.addEventListener('click', () => closeMenu());
        closeButton?.addEventListener('click', () => closeMenu({ restoreFocus: true }));

        grid.addEventListener('click', (event) => {
            const button = event.target.closest('[data-target]');
            if (button) moveToCurriculum(button.dataset.target);
        });

        root.addEventListener('focusout', () => {
            window.setTimeout(() => {
                if (!root.contains(document.activeElement)) closeMenu();
            }, 0);
        });

        document.querySelectorAll('.hdr-nav > .hdr-lnk').forEach((link) => {
            link.addEventListener('mouseenter', () => closeMenu());
            link.addEventListener('focus', () => closeMenu());
        });

        document.querySelectorAll('.hdr-btn, .hdr-btn2').forEach((button) => {
            button.addEventListener('click', () => closeMenu());
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menu.classList.contains('is-open')) {
                closeMenu({ restoreFocus: true });
            }
        });

        desktop.addEventListener('change', () => closeMenu());
    });
})();
