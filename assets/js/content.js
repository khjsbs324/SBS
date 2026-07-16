/**
 * 운영 콘텐츠 렌더링
 *
 * data/site-data.js의 값을 기존 디자인 구조에 연결합니다.
 */
(() => {
    const data = window.SBSSiteData;

    const escapeHtml = (value) => String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');

    const safeUrl = (value) => {
        try {
            const url = new URL(value, window.location.href);
            return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
        } catch {
            return '';
        }
    };

    document.querySelectorAll('[data-site-logo]').forEach((image) => {
        image.src = safeUrl(data.brand.logoUrl);
    });

    const shortcutsGrid = document.getElementById('curriculum-shortcuts-grid');
    shortcutsGrid.innerHTML = data.shortcuts.map((item, index) => {
        const description = item.description.length > 1
            ? item.description.map((line) => `<span class="block">${escapeHtml(line)}</span>`).join('')
            : escapeHtml(item.description[0]);

        return `
            <button type="button" data-shortcut-target="${escapeHtml(item.target)}" aria-label="${escapeHtml(item.ariaLabel)}" class="w-full text-left bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-[0_20px_50px_rgba(13,130,255,0.08)] hover:-translate-y-2 transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[190px]">
                <div class="flex justify-between items-start mb-6">
                    <span class="w-10 h-10 rounded-full bg-gray-50 text-gray-500 font-bold flex items-center justify-center text-[14px] group-hover:bg-sbs-light group-hover:text-sbs-main transition-colors">${String(index + 1).padStart(2, '0')}</span>
                    <svg class="w-6 h-6 text-gray-300 group-hover:text-sbs-main transition-colors transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </div>
                <div>
                    <span class="text-sbs-main font-extrabold text-[13px] tracking-[0.08em] mb-3 block">${escapeHtml(item.label)}</span>
                    <h3 class="text-[20px] font-bold text-gray-900 group-hover:text-sbs-main transition-colors tracking-tight mb-2">${escapeHtml(item.title)}</h3>
                    <p class="text-gray-500 text-[15px] font-medium leading-[1.6]">${description}</p>
                </div>
            </button>
        `;
    }).join('');

    shortcutsGrid.querySelectorAll('[data-shortcut-target]').forEach((button) => {
        button.addEventListener('click', () => window.goToCurriculum(button.dataset.shortcutTarget));
    });

    const portfolioGrid = document.getElementById('portfolio-grid');
    portfolioGrid.innerHTML = data.portfolio.map((item, index) => `
        <div data-portfolio-index="${index}" class="w-full rounded-2xl break-inside-avoid shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300 overflow-hidden cursor-pointer">
            <img src="${safeUrl(item.thumbnail)}" alt="${escapeHtml(item.alt)}" class="w-full h-auto block">
        </div>
    `).join('');

    portfolioGrid.querySelectorAll('[data-portfolio-index]').forEach((card) => {
        card.addEventListener('click', () => {
            const item = data.portfolio[Number(card.dataset.portfolioIndex)];
            window.openPortfolioModal(item.detailImage);
        });
    });

    const hero = data.reviews.hero;
    document.getElementById('reviews-content').innerHTML = `
        <div class="lg:w-1/2 flex flex-col">
            <div class="bg-gray-900 rounded-[32px] h-[480px] relative overflow-hidden flex flex-col justify-end p-12 group cursor-pointer shadow-lg">
                <div class="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-[#0d82ff] rounded-full mix-blend-screen filter blur-[120px] opacity-40 z-0"></div>
                <div class="relative z-20">
                    <span class="inline-block px-4 py-2 bg-white/10 text-white rounded-lg text-[13px] font-bold mb-6 backdrop-blur-md tracking-wider border border-white/10">${escapeHtml(hero.type)}</span>
                    <h3 class="text-[36px] font-bold text-white leading-[1.3] mb-4 tracking-tight">${escapeHtml(hero.title)}</h3>
                    <p class="text-gray-400 mb-8 text-[16px] leading-relaxed">${escapeHtml(hero.subtitle)}</p>
                    <div class="flex items-center text-[15px] text-gray-400"><span class="font-bold text-white">${escapeHtml(hero.year)}</span> <span class="mx-3">|</span> ${escapeHtml(hero.name)}</div>
                </div>
            </div>
        </div>
        <div class="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            ${data.reviews.items.map((item) => `
                <div class="bg-white p-10 rounded-[32px] border border-gray-100 hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 flex flex-col justify-between">
                    <div>
                        <div class="text-sbs-main text-[14px] font-bold mb-4">${escapeHtml(item.type)}</div>
                        <p class="text-[18px] font-bold text-gray-900 leading-[1.6] mb-6 tracking-tight">${escapeHtml(item.quote)}</p>
                    </div>
                    <p class="text-[14px] text-gray-500 font-medium"><span class="text-gray-900">${escapeHtml(item.course)}</span> &nbsp;|&nbsp; ${escapeHtml(item.name)}</p>
                </div>
            `).join('')}
        </div>
    `;

    const location = data.location;
    document.getElementById('location-content').innerHTML = `
        <div class="lg:w-[55%] min-h-[300px] lg:min-h-full bg-gray-50 relative border-b lg:border-b-0 lg:border-r border-gray-100 overflow-hidden">
            <img src="${safeUrl(location.mapImage)}" alt="${escapeHtml(location.mapAlt)}" class="absolute inset-0 w-full h-full object-cover" loading="lazy">
        </div>
        <div class="lg:w-[45%] p-12 lg:p-16 flex flex-col justify-center">
            <h3 class="text-[32px] font-extrabold text-gray-900 mb-10 border-b border-gray-100 pb-6 tracking-tight">${escapeHtml(location.academyName)}</h3>
            <div class="space-y-10">
                <div><p class="font-bold text-sbs-main text-[14px] mb-3 uppercase tracking-widest">주소</p><p class="text-[16px] text-gray-700 leading-relaxed font-medium">${location.addressLines.map(escapeHtml).join('<br>')}</p></div>
                <div><p class="font-bold text-sbs-main text-[14px] mb-3 uppercase tracking-widest">지하철</p><p class="text-[16px] text-gray-700 leading-relaxed font-medium">${escapeHtml(location.subway)}</p></div>
                <div><p class="font-bold text-sbs-main text-[14px] mb-3 uppercase tracking-widest">상담 문의</p><p class="text-[28px] text-gray-900 font-extrabold tracking-tighter">${escapeHtml(location.phone)}</p></div>
            </div>
            <button class="mt-12 w-full py-5 bg-gray-900 hover:bg-sbs-main text-white font-bold rounded-2xl transition-colors text-[16px] shadow-md">주소 복사하기</button>
        </div>
    `;

    const seminarList = document.getElementById('seminar-list');
    seminarList.innerHTML = data.seminars.items.map((item, index) => {
        const titleHoverClass = index < 2 ? ' group-hover:text-sbs-main' : '';
        return `
            <div data-seminar-index="${index}" class="min-w-[360px] max-w-[360px] bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(13,130,255,0.08)] hover:-translate-y-2 transition-all duration-500 snap-start cursor-pointer group flex flex-col">
                <div class="w-full aspect-[1/1.41] bg-gray-100 relative flex items-center justify-center overflow-hidden shrink-0"><img src="${safeUrl(item.image)}" alt="${escapeHtml(item.title)}" class="w-full h-full object-cover"></div>
                <div class="p-8 flex-1 flex flex-col justify-between">
                    <div>
                        <span class="text-sbs-main text-[14px] font-extrabold mb-3 block tracking-tight">${escapeHtml(item.branch)}</span>
                        <h3 class="text-[20px] font-bold text-gray-900 mb-3 leading-snug${titleHoverClass} transition-colors tracking-tight line-clamp-2">${escapeHtml(item.title)}</h3>
                        <p class="text-gray-500 text-[14px] leading-relaxed line-clamp-2 mb-4">${escapeHtml(item.description)}</p>
                    </div>
                    <div class="bg-gray-50 rounded-xl p-4 text-[13px] text-gray-600 space-y-2 mt-4 border border-gray-100">
                        <div class="flex items-start gap-2"><span class="font-bold text-gray-800 shrink-0 w-14">일시</span><span>${escapeHtml(item.date)}</span></div>
                        <div class="flex items-start gap-2"><span class="font-bold text-gray-800 shrink-0 w-14">신청기간</span><span>${escapeHtml(item.applicationPeriod)}</span></div>
                        <div class="flex items-start gap-2"><span class="font-bold text-gray-800 shrink-0 w-14">신청방법</span><span class="leading-[1.6]">${escapeHtml(data.seminars.applicationMethod)}</span></div>
                    </div>
                </div>
            </div>
        `;
    }).join('') + `
        <div id="seminar-all-link" class="min-w-[360px] max-w-[360px] bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(13,130,255,0.08)] hover:-translate-y-2 transition-all duration-500 snap-start cursor-pointer flex flex-col justify-center items-center">
            <span class="text-gray-900 font-extrabold mb-4 text-[20px]">${escapeHtml(data.seminars.all.title)}</span>
            <span class="text-sbs-main text-[16px] font-bold">${escapeHtml(data.seminars.all.label)}</span>
        </div>
    `;

    seminarList.querySelectorAll('[data-seminar-index]').forEach((card) => {
        card.addEventListener('click', () => {
            const item = data.seminars.items[Number(card.dataset.seminarIndex)];
            window.openSeminarModal(item.title, item.backgroundClass, item.image);
        });
    });
    document.getElementById('seminar-all-link').addEventListener('click', () => window.open(safeUrl(data.seminars.all.url), '_blank'));

    const footerPhone = document.getElementById('footer-phone');
    const footerEmail = document.getElementById('footer-email');
    const footerBlog = document.getElementById('footer-blog-link');
    if (footerPhone) footerPhone.textContent = data.contact.phone;
    if (footerEmail) footerEmail.textContent = data.contact.email;
    if (footerBlog) {
        footerBlog.href = safeUrl(data.contact.blogUrl);
        footerBlog.textContent = data.contact.blogUrl;
    }
})();
