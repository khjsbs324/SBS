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

    menu.classList.remove('hidden');
    menu.classList.add('flex');
    document.body.classList.add('modal-open');
    if(lenis) lenis.stop();

    requestAnimationFrame(() => {
        bg.classList.remove('opacity-0');
        bg.classList.add('opacity-100');
        header.classList.remove('-translate-y-full');
        header.classList.add('translate-y-0');
        content.classList.remove('translate-y-10', 'opacity-0');
        content.classList.add('translate-y-0', 'opacity-100');
    });
};

window.closeFullMenu = function() {
    const menu = document.getElementById('full-menu');
    const bg = document.getElementById('full-menu-bg');
    const header = document.getElementById('full-menu-header');
    const content = document.getElementById('full-menu-content');

    bg.classList.remove('opacity-100');
    bg.classList.add('opacity-0');
    header.classList.remove('translate-y-0');
    header.classList.add('-translate-y-full');
    content.classList.remove('translate-y-0', 'opacity-100');
    content.classList.add('translate-y-10', 'opacity-0');

    setTimeout(() => {
        menu.classList.add('hidden');
        menu.classList.remove('flex');

        if (!document.getElementById('course-modal').classList.contains('flex') &&
            !document.getElementById('seminar-modal').classList.contains('flex') &&
            !document.getElementById('portfolio-modal').classList.contains('flex')) {
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
        imageArea.className = `w-full aspect-[1/1.41] bg-gray-900 rounded-2xl shadow-2xl overflow-hidden relative flex flex-col items-center justify-center pointer-events-none`;
        imageArea.innerHTML = `<img src="${imageUrl}" alt="${title}" class="w-full h-full object-contain">`;
    } else {
        imageArea.className = `w-full aspect-[1/1.41] rounded-2xl shadow-2xl overflow-hidden relative flex flex-col items-center justify-center pointer-events-none ${bgClass}`;
        imageArea.innerHTML = `<span id="seminar-modal-title" class="text-xl font-bold text-white text-center px-6 leading-snug"><span class="text-sm font-bold opacity-50 block mb-3 uppercase tracking-widest text-white">Seminar Poster</span><span class="text-white text-[24px] font-bold">${title}</span></span>`;
    }

    // Open Animation
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('modal-open');
    if(lenis) lenis.stop(); // 모달 켜졌을 때 백그라운드 스크롤 정지

    setTimeout(() => {
        container.classList.remove('scale-95', 'opacity-0');
        container.classList.add('scale-100', 'opacity-100');
    }, 10);
}

window.closeSeminarModal = function() {
    const modal = document.getElementById('seminar-modal');
    const container = document.getElementById('seminar-modal-container');

    container.classList.remove('scale-100', 'opacity-100');
    container.classList.add('scale-95', 'opacity-0');

    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
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
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('modal-open');
    if(lenis) lenis.stop();

    setTimeout(() => {
        container.classList.remove('scale-95', 'opacity-0');
        container.classList.add('scale-100', 'opacity-100');
    }, 10);
}

window.closePortfolioModal = function() {
    const modal = document.getElementById('portfolio-modal');
    const container = document.getElementById('portfolio-modal-container');

    container.classList.remove('scale-100', 'opacity-100');
    container.classList.add('scale-95', 'opacity-0');

    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.classList.remove('modal-open');
        if(lenis) lenis.start();
    }, 300);
}
