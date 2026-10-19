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
    const shortcutDepartments = {
        'artwork-webtoon': 'artwork',
        'advertising-design': 'visual',
        'uiux-vibe-coding': 'uiux',
        motion: 'motion',
        'ai-skillup': 'ai-skillup',
        interior: 'interior',
        cg: 'cg-vfx',
        'youtube-creator': 'youtube',
        certificate: 'office',
        'ai-software': 'ai-sw'
    };
    shortcutsGrid.innerHTML = data.shortcuts.map((item, index) => {
        const description = item.description
            .map(escapeHtml)
            .join(', ');

        return `
            <a class="cnt-btn" href="./curriculum.html?department=${encodeURIComponent(shortcutDepartments[item.id] || 'artwork')}" aria-label="${escapeHtml(item.title)} 교육과정 보기">
                <div class="cnt-box">
                    <span class="cnt-tag2">${String(index + 1).padStart(2, '0')}</span>
                </div>
                <div>
                    <span class="cnt-tag3">${escapeHtml(item.label)}</span>
                    <h3 class="cnt-tit">${escapeHtml(item.title)}</h3>
                    <p class="cnt-txt">${description}</p>
                </div>
            </a>
        `;
    }).join('');

    // 수강생 작품은 home-portfolio.js에서 공용 시트 데이터로 렌더링합니다.

    const hero = data.reviews.hero;
    document.getElementById('reviews-content').innerHTML = `
        <div class="cnt-box3">
            <div class="cnt-box4 group">
                <div class="cnt-box5"></div>
                <div class="cnt-box6">
                    <span class="cnt-tag4">${escapeHtml(hero.type)}</span>
                    <h3 class="cnt-tit2">${escapeHtml(hero.title)}</h3>
                    <p class="cnt-txt2">${escapeHtml(hero.subtitle)}</p>
                    <div class="cnt-box7"><span class="cnt-tag5">${escapeHtml(hero.year)}</span> <span class="cnt-tag6">|</span> ${escapeHtml(hero.name)}</div>
                </div>
            </div>
        </div>
        <div class="cnt-box8">
            ${data.reviews.items.map((item) => `
                <div class="cnt-box9">
                    <div>
                        <div class="cnt-box10">${escapeHtml(item.type)}</div>
                        <p class="cnt-txt3">${escapeHtml(item.quote)}</p>
                    </div>
                    <p class="cnt-txt4"><span class="cnt-tag7">${escapeHtml(item.course)}</span> &nbsp;|&nbsp; ${escapeHtml(item.name)}</p>
                </div>
            `).join('')}
        </div>
    `;

    const location = data.location;
    document.getElementById('location-content').innerHTML = `
        <div class="cnt-box11">
            <img src="${safeUrl(location.mapImage)}" alt="${escapeHtml(location.mapAlt)}" class="cnt-img2" loading="lazy">
        </div>
        <div class="cnt-box12">
            <h3 class="cnt-tit3">${escapeHtml(location.academyName)}</h3>
            <div class="cnt-box13">
                <div><p class="cnt-txt5">주소</p><p class="cnt-txt6">${location.addressLines.map(escapeHtml).join('<br>')}</p></div>
                <div><p class="cnt-txt5">지하철</p><p class="cnt-txt6">${escapeHtml(location.subway)}</p></div>
                <div><p class="cnt-txt5">상담 문의</p><p class="cnt-txt7">${escapeHtml(location.phone)}</p></div>
            </div>
            <button class="cnt-btn2">주소 복사하기</button>
        </div>
    `;

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
