/**
 * 전체 메뉴, 세미나 및 포트폴리오 모달
 */
// ==========================================
// 전체메뉴 (Full Menu) 로직
// ==========================================
window.openFullMenu = function() {
    const menu = document.getElementById('full-menu');
    const bg = document.getElementById('full-menu-bg');
    const header = document.getElementById('full-menu-header');
    const content = document.getElementById('full-menu-content');

    menu.classList.add('is-open');
    document.body.classList.add('modal-open');
    if(lenis) lenis.stop();

    requestAnimationFrame(() => {
        bg.classList.add('is-active');
        header.classList.add('is-active');
        content.classList.add('is-active');
    });
};

window.closeFullMenu = function() {
    const menu = document.getElementById('full-menu');
    const bg = document.getElementById('full-menu-bg');
    const header = document.getElementById('full-menu-header');
    const content = document.getElementById('full-menu-content');

    bg.classList.remove('is-active');
    header.classList.remove('is-active');
    content.classList.remove('is-active');

    setTimeout(() => {
        menu.classList.remove('is-open');

        if (!document.getElementById('course-modal').classList.contains('is-open') &&
            !document.getElementById('seminar-modal').classList.contains('is-open') &&
            !document.getElementById('portfolio-modal').classList.contains('is-open')) {
            document.body.classList.remove('modal-open');
            if(lenis) lenis.start();
        }
    }, 500);
};

window.closeFullMenuAndScroll = function(element) {
    const targetId = element.getAttribute('href');
    closeFullMenu();
    setTimeout(() => {
        if(targetId && targetId !== '#') {
            if(lenis) lenis.scrollTo(targetId, { offset: -80 });
        }
    }, 500);
}

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
