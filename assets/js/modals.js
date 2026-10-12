/**
 * 전체 메뉴, 세미나 및 포트폴리오 모달
 */
// ==========================================
// 전체메뉴 (Full Menu) 로직
// ==========================================
const FULL_MENU_TRANSITION_MS = 350;
let fullMenuCloseTimer;
let fullMenuReturnFocus;
let fullMenuLeaveTimer;
let fullMenuKeyboardMode = false;

document.addEventListener('pointerdown', () => {
    fullMenuKeyboardMode = false;
}, true);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Tab' || event.key === 'Enter' || event.key === ' ') {
        fullMenuKeyboardMode = true;
    }
}, true);

function setFullMenuTriggerState(isExpanded) {
    document.querySelectorAll('[aria-controls="full-menu"]').forEach((trigger) => {
        trigger.setAttribute('aria-expanded', String(isExpanded));
    });
}

window.openFullMenu = function({ focusPanel = true, interaction = 'auto' } = {}) {
    const menu = document.getElementById('full-menu');
    const bg = document.getElementById('full-menu-bg');
    const panel = document.getElementById('full-menu-panel');

    if (!menu || !bg || !panel || menu.classList.contains('is-open')) return;
    if (fullMenuCloseTimer) window.clearTimeout(fullMenuCloseTimer);
    if (fullMenuLeaveTimer) window.clearTimeout(fullMenuLeaveTimer);
    if (interaction === 'pointer') fullMenuKeyboardMode = false;
    if (interaction === 'keyboard') fullMenuKeyboardMode = true;

    fullMenuReturnFocus = document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    setFullMenuTriggerState(true);
    document.dispatchEvent(new CustomEvent('fullmenu:opened'));

    requestAnimationFrame(() => {
        bg.classList.add('is-active');
        panel.classList.add('is-active');
        if (focusPanel) panel.querySelector('.menu-btn')?.focus({ preventScroll: true });
    });
};

window.closeFullMenu = function({ restoreFocus = true } = {}) {
    const menu = document.getElementById('full-menu');
    const bg = document.getElementById('full-menu-bg');
    const panel = document.getElementById('full-menu-panel');

    if (!menu || !bg || !panel || !menu.classList.contains('is-open')) return;
    if (fullMenuLeaveTimer) {
        window.clearTimeout(fullMenuLeaveTimer);
        fullMenuLeaveTimer = undefined;
    }

    bg.classList.remove('is-active');
    panel.classList.remove('is-active');
    setFullMenuTriggerState(false);

    fullMenuCloseTimer = window.setTimeout(() => {
        menu.classList.remove('is-open');
        menu.setAttribute('aria-hidden', 'true');

        if (restoreFocus && fullMenuReturnFocus?.isConnected) {
            fullMenuReturnFocus.focus({ preventScroll: true });
        }
        document.dispatchEvent(new CustomEvent('fullmenu:closed'));
        fullMenuCloseTimer = undefined;
    }, FULL_MENU_TRANSITION_MS);
};

const fullMenuPanel = document.getElementById('full-menu-panel');

fullMenuPanel?.addEventListener('pointerenter', () => {
    if (!fullMenuLeaveTimer) return;
    window.clearTimeout(fullMenuLeaveTimer);
    fullMenuLeaveTimer = undefined;
});

fullMenuPanel?.addEventListener('pointerleave', (event) => {
    if (event.pointerType && event.pointerType !== 'mouse') return;
    if (fullMenuKeyboardMode && fullMenuPanel.contains(document.activeElement)) return;

    fullMenuLeaveTimer = window.setTimeout(() => {
        closeFullMenu({ restoreFocus: false });
        fullMenuLeaveTimer = undefined;
    }, 150);
});

window.closeFullMenuAndScroll = function(element) {
    const targetId = element.getAttribute('href');
    closeFullMenu({ restoreFocus: false });
    if (!targetId?.startsWith('#')) return;
    window.setTimeout(() => {
        if (targetId && targetId !== '#') {
            const headerHeight = Number.parseFloat(
                getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
            ) || 80;
            if (typeof lenis !== 'undefined' && lenis) {
                lenis.scrollTo(targetId, { offset: -headerHeight });
            } else {
                document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, FULL_MENU_TRANSITION_MS);
};

document.addEventListener('keydown', (event) => {
    const menu = document.getElementById('full-menu');
    const panel = document.getElementById('full-menu-panel');

    if (!menu?.classList.contains('is-open') || !panel) return;

    if (event.key === 'Escape') {
        event.preventDefault();
        closeFullMenu();
        return;
    }

    if (event.key !== 'Tab') return;

    const focusable = [...panel.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )].filter((element) => !element.hidden && element.getClientRects().length > 0);

    if (focusable.length === 0) {
        event.preventDefault();
        panel.focus({ preventScroll: true });
        return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
});

// ==========================================
// 2. 세미나 상세 이미지 팝업 모달 스크립트
// ==========================================
window.openSeminarModal = function(title, bgClass, imageUrl) {
    const modal = document.getElementById('seminar-modal');
    const container = document.getElementById('seminar-modal-container');
    const imageArea = document.getElementById('seminar-modal-image');

    // Set placeholder background and title or display image
    if (imageUrl) {
        imageArea.className=`modc-box`;
        imageArea.innerHTML = `<img src="${imageUrl}" alt="${title}" class="modc-img">`;
    } else {
        imageArea.className = `modc-box is-placeholder ${bgClass}`;
        imageArea.innerHTML = `<span id="seminar-modal-title" class="modc-tag"><span class="modc-tag2">Seminar Poster</span><span class="modc-tag3">${title}</span></span>`;
    }

    // Open Animation
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
    if(lenis) lenis.stop(); // 모달 켜졌을 때 백그라운드 스크롤 정지

    setTimeout(() => {
        container.classList.add('is-active');
    }, 10);
}

window.closeSeminarModal = function() {
    const modal = document.getElementById('seminar-modal');
    const container = document.getElementById('seminar-modal-container');

    container.classList.remove('is-active');

    setTimeout(() => {
        modal.classList.remove('is-open');
        document.body.classList.remove('modal-open');
        if(lenis) lenis.start(); // 스크롤 복구
    }, 300);
}

// ==========================================
// 수강생 작품 팝업 모달 스크립트
// ==========================================
window.openPortfolioModal = function(imageUrl) {
    const modal = document.getElementById('portfolio-modal');
    const container = document.getElementById('portfolio-modal-container');
    const imageEl = document.getElementById('portfolio-modal-image');

    imageEl.src = imageUrl;

    // Open Animation
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
    if(lenis) lenis.stop();

    setTimeout(() => {
        container.classList.add('is-active');
    }, 10);
}

window.closePortfolioModal = function() {
    const modal = document.getElementById('portfolio-modal');
    const container = document.getElementById('portfolio-modal-container');

    container.classList.remove('is-active');

    setTimeout(() => {
        modal.classList.remove('is-open');
        document.body.classList.remove('modal-open');
        if(lenis) lenis.start();
    }, 300);
}
