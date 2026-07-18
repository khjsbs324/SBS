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
            ? item.description.map((line) => `<span class="cnt-tag">${escapeHtml(line)}</span>`).join('')
            : escapeHtml(item.description[0]);

        return `
            <button type="button" data-shortcut-target="${escapeHtml(item.target)}" aria-label="${escapeHtml(item.ariaLabel)}" class="cnt-btn group">
                <div class="cnt-box">
                    <span class="cnt-tag2">${String(index + 1).padStart(2, '0')}</span>
                    <svg class="cnt-ico" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </div>
                <div>
                    <span class="cnt-tag3">${escapeHtml(item.label)}</span>
                    <h3 class="cnt-tit">${escapeHtml(item.title)}</h3>
                    <p class="cnt-txt">${description}</p>
                </div>
            </button>
        `;
    }).join('');

    shortcutsGrid.querySelectorAll('[data-shortcut-target]').forEach((button) => {
        button.addEventListener('click', () => window.goToCurriculum(button.dataset.shortcutTarget));
    });

    const portfolioGrid = document.getElementById('portfolio-grid');
    portfolioGrid.innerHTML = data.portfolio.map((item, index) => `
        <div data-portfolio-index="${index}" class="cnt-box2">
            <img src="${safeUrl(item.thumbnail)}" alt="${escapeHtml(item.alt)}" class="cnt-img">
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

    const seminarList = document.getElementById('seminar-list');
    seminarList.innerHTML = data.seminars.items.map((item, index) => {
        const titleStateClass = index < 2 ? ' is-highlighted' : '';
        return `
            <div data-seminar-index="${index}" class="cnt-box14 group">
                <div class="cnt-box15"><img src="${safeUrl(item.image)}" alt="${escapeHtml(item.title)}" class="cnt-img3"></div>
                <div class="cnt-box16">
                    <div>
                        <span class="cnt-tag8">${escapeHtml(item.branch)}</span>
                        <h3 class="cnt-tit5${titleStateClass}">${escapeHtml(item.title)}</h3>
                        <p class="cnt-txt8">${escapeHtml(item.description)}</p>
                    </div>
                    <div class="cnt-box17">
                        <div class="cnt-box18"><span class="cnt-tag9">일시</span><span>${escapeHtml(item.date)}</span></div>
                        <div class="cnt-box18"><span class="cnt-tag9">신청기간</span><span>${escapeHtml(item.applicationPeriod)}</span></div>
                        <div class="cnt-box18"><span class="cnt-tag9">신청방법</span><span class="cnt-tag10">${escapeHtml(data.seminars.applicationMethod)}</span></div>
                    </div>
                </div>
            </div>
        `;
    }).join('') + `
        <div id="seminar-all-link" class="cnt-box19">
            <span class="cnt-tag11">${escapeHtml(data.seminars.all.title)}</span>
            <span class="cnt-tag12">${escapeHtml(data.seminars.all.label)}</span>
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
