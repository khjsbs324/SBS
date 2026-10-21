/**
 * 반응형 교육과정 2차 메뉴
 */
(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const resources = window.SBSSiteData?.resourcesPage;
        if (resources) {
            const resourcesUrl = new URL(resources.url, location.href);
            if (['http:', 'https:'].includes(resourcesUrl.protocol) && resourcesUrl.origin === location.origin) {
                const mobileGroup = document.querySelector('.menu-nav .menu-box6');
                if (mobileGroup && !mobileGroup.querySelector('[data-resources-link]')) {
                    const link = document.createElement('a');
                    link.className = 'menu-lnk';
                    link.setAttribute('data-resources-link', '');
                    mobileGroup.append(link);
                }
                document.querySelectorAll('[data-resources-link]').forEach((link) => {
                    link.href = resourcesUrl.href;
                    link.textContent = resources.label;
                    if (location.pathname === resourcesUrl.pathname) link.setAttribute('aria-current', 'page');
                });
            }
        }

        const root = document.getElementById('course-menu-root');
        const trigger = document.getElementById('course-menu-trigger');
        const menu = document.getElementById('course-submenu');
        const grid = document.getElementById('course-submenu-grid');
        const panel = menu?.querySelector('.m2-pan');
        const groups = window.SBSSiteData?.courseMenu || [];
        const desktop = window.matchMedia('(min-width: 1280px)');

        if (!root || !trigger || !menu || !grid || groups.length === 0) return;

        let closeTimer;
        let isRestoringFocus = false;
        let isPinned = false;

        function renderMenu() {
            const fragment = document.createDocumentFragment();

            groups.forEach((group, groupIndex) => {
                const section = document.createElement('section');
                const heading = document.createElement('div');
                const number = document.createElement('span');
                const title = document.createElement('button');
                const titleText = document.createElement('span');
                const count = document.createElement('span');
                const chevron = document.createElement('span');
                const list = document.createElement('ul');

                section.className = 'm2-col';
                heading.className = 'm2-hd';
                number.className = 'm2-num';
                title.className = 'm2-tit';
                titleText.className = 'm2-txt';
                count.className = 'm2-cnt';
                chevron.className = 'm2-chev';
                list.className = 'm2-lst';

                number.textContent = String(groupIndex + 1).padStart(2, '0');
                title.type = 'button';
                titleText.textContent = group.title;
                count.textContent = `${group.items.length}개 과정`;
                chevron.setAttribute('aria-hidden', 'true');
                title.dataset.target = group.target;
                title.dataset.group = group.id;
                title.setAttribute('aria-label', `${group.title} 교육과정 보기`);
                title.setAttribute('aria-expanded', groupIndex === 0 ? 'true' : 'false');
                title.setAttribute('aria-controls', `course-group-${group.id}`);
                title.append(titleText, count, chevron);

                list.id = `course-group-${group.id}`;

                group.items.forEach((item) => {
                    const listItem = document.createElement('li');
                    const control = document.createElement(item.detailUrl ? 'a' : 'button');

                    control.className = 'm2-lnk';
                    control.textContent = item.label;

                    if (item.detailUrl) {
                        control.href = item.detailUrl;
                        control.setAttribute('aria-label', `${item.label} 상세페이지로 이동`);
                    } else {
                        control.type = 'button';
                        control.dataset.target = item.target;
                    }

                    listItem.appendChild(control);
                    list.appendChild(listItem);
                });

                heading.append(number, title);
                section.append(heading, list);
                fragment.appendChild(section);
            });

            grid.replaceChildren(fragment);
        }

        function syncResponsiveGroups() {
            const headings = [...grid.querySelectorAll('.m2-tit')];

            if (desktop.matches) {
                headings.forEach((heading) => {
                    heading.setAttribute('aria-expanded', 'true');
                    document.getElementById(heading.getAttribute('aria-controls')).hidden = false;
                });
                return;
            }

            if (!headings.some((heading) => heading.getAttribute('aria-expanded') === 'true')) {
                headings[0]?.setAttribute('aria-expanded', 'true');
            }

            headings.forEach((heading) => {
                const list = document.getElementById(heading.getAttribute('aria-controls'));
                list.hidden = heading.getAttribute('aria-expanded') !== 'true';
            });
        }

        function cancelClose() {
            if (closeTimer) {
                window.clearTimeout(closeTimer);
                closeTimer = undefined;
            }
        }

        function openMenu({ pin = false } = {}) {
            cancelClose();
            if (pin) isPinned = true;
            menu.classList.add('is-open');
            menu.setAttribute('aria-hidden', 'false');
            trigger.setAttribute('aria-expanded', 'true');
            if (!desktop.matches) document.body.classList.add('course-menu-open');
        }

        function closeMenu({ restoreFocus = false } = {}) {
            cancelClose();
            isPinned = false;
            menu.classList.remove('is-open');
            menu.setAttribute('aria-hidden', 'true');
            trigger.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('course-menu-open');
            if (restoreFocus) {
                isRestoringFocus = true;
                trigger.focus({ preventScroll: true });
                window.requestAnimationFrame(() => {
                    isRestoringFocus = false;
                });
            }
        }

        function scheduleClose() {
            cancelClose();
            if (isPinned) return;
            closeTimer = window.setTimeout(() => closeMenu(), 180);
        }

        function moveToCurriculum(target) {
            closeMenu();
            const departments = {
                design_basic: 'artwork', artwork: 'artwork', webtoon: 'webtoon',
                ai_agent_basic: 'ai-skillup', ai_agent_advanced: 'ai-skillup',
                ai_sw: 'ai-sw', archi: 'interior', motion: 'motion', cg_vfx: 'cg-vfx',
                youtube: 'youtube', cert_oa: 'office', uiux: 'uiux', visual: 'visual',
                product_cert: 'mechanical', senior: 'senior', cert_field: 'field-cert',
                national: 'all'
            };
            const department = departments[target] || 'artwork';
            window.location.href = `./curriculum.html?department=${encodeURIComponent(department)}`;
        }

        renderMenu();
        syncResponsiveGroups();

        const header = document.getElementById('header');
        if (header) {
            let lastHeaderScrollY = window.scrollY;
            const showHeader = () => {
                header.classList.remove('is-hidden');
                document.body.classList.remove('is-header-hidden');
                lastHeaderScrollY = window.scrollY;
            };

            window.addEventListener('scroll', () => {
                const currentScrollY = Math.max(0, window.scrollY);
                if (currentScrollY <= 8) {
                    showHeader();
                    return;
                }
                const movement = currentScrollY - lastHeaderScrollY;
                if (Math.abs(movement) < 6) return;
                lastHeaderScrollY = currentScrollY;
                const hide = movement > 0 && currentScrollY > header.offsetHeight;
                if (hide) closeMenu();
                header.classList.toggle('is-hidden', hide);
                document.body.classList.toggle('is-header-hidden', hide);
            }, { passive: true });
            header.addEventListener('focusin', showHeader);
        }

        function isInsideCourseMenu(target) {
            return root.contains(target) || menu.contains(target);
        }

        trigger.addEventListener('mouseenter', () => {
            if (desktop.matches) openMenu();
        });
        trigger.addEventListener('focus', () => {
            if (desktop.matches && !isRestoringFocus) openMenu();
        });
        trigger.addEventListener('click', () => {
            window.location.href = './curriculum.html';
        });

        root.addEventListener('mouseenter', cancelClose);
        root.addEventListener('mouseleave', () => {
            if (desktop.matches) scheduleClose();
        });
        panel?.addEventListener('mouseenter', cancelClose);
        menu.addEventListener('mouseleave', () => {
            if (desktop.matches) scheduleClose();
        });

        grid.addEventListener('click', (event) => {
            const heading = event.target.closest('.m2-tit');
            if (heading && !desktop.matches) {
                const expanded = heading.getAttribute('aria-expanded') === 'true';
                grid.querySelectorAll('.m2-tit').forEach((item) => {
                    if (item !== heading) item.setAttribute('aria-expanded', 'false');
                });
                heading.setAttribute('aria-expanded', String(!expanded));
                syncResponsiveGroups();
                return;
            }

            const button = event.target.closest('[data-target]');
            if (button) moveToCurriculum(button.dataset.target);
        });

        root.addEventListener('focusout', () => {
            window.setTimeout(() => {
                if (!isInsideCourseMenu(document.activeElement)) closeMenu();
            }, 0);
        });

        menu.addEventListener('focusout', () => {
            window.setTimeout(() => {
                if (!isInsideCourseMenu(document.activeElement)) closeMenu();
            }, 0);
        });

        document.querySelectorAll('.hdr-nav > .hdr-lnk').forEach((link) => {
            link.addEventListener('mouseenter', () => closeMenu());
            link.addEventListener('focus', () => closeMenu());
        });

        document.querySelectorAll('[aria-controls="full-menu"]').forEach((button) => {
            button.addEventListener('click', () => closeMenu());
        });

        document.addEventListener('fullmenu:opened', () => closeMenu());

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menu.classList.contains('is-open')) {
                closeMenu({ restoreFocus: true });
            }
        });

        document.addEventListener('pointerdown', (event) => {
            if (menu.classList.contains('is-open') && !isInsideCourseMenu(event.target)) closeMenu();
        });

        desktop.addEventListener('change', () => {
            closeMenu();
            syncResponsiveGroups();
        });
    });
})();
