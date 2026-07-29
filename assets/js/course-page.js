/**
 * 교육과정 카테고리 상세페이지 공통 마크업 렌더러
 */
(() => {
    const root = document.getElementById('course-page-root');
    const pageKey = document.body.dataset.coursePage;
    const page = window.SBSCoursePageData?.[pageKey];
    const menu = window.SBSSiteData?.courseMenu?.find((item) => item.id === pageKey);

    if (!root || !page || !menu) {
        if (root) root.textContent = '교육과정 정보를 불러오지 못했습니다.';
        return;
    }

    const escapeHtml = (value) => String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');

    const lines = (items) => items.map(escapeHtml).join('<br>');
    const logoUrl = escapeHtml(window.SBSSiteData.brand.logoUrl);
    const valueIcons = [
        '<path d="M4 5h16v14H4zM8 9h8M8 13h5"></path>',
        '<path d="M4 7h7v10H4zM14 4h6v6h-6zM14 13h6v7h-6z"></path>',
        '<path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5zM18 16l.8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8z"></path>',
        '<path d="M6 3h12v18H6zM9 7h6M9 11h6M9 15h4"></path>'
    ];

    const quickItems = page.quick.map(([label, value]) => `
        <div>
            <span>${escapeHtml(label)}</span>
            <strong>${escapeHtml(value)}</strong>
        </div>
    `).join('');

    const valueCards = page.values.map(([title, description], index) => `
        <article class="cd-value-card reveal">
            <span class="cd-card-no">${String(index + 1).padStart(2, '0')}</span>
            <div class="cd-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24">${valueIcons[index]}</svg>
            </div>
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(description)}</p>
        </article>
    `).join('');

    const reasons = page.reasons.map(([title, description], index) => `
        <article class="reveal">
            <span>${String(index + 1).padStart(2, '0')}</span>
            <div>
                <h3>${escapeHtml(title)}</h3>
                <p>${escapeHtml(description)}</p>
            </div>
        </article>
    `).join('');

    root.innerHTML = `
        <a class="skip-link" href="#main-content">본문 바로가기</a>

        <header class="cd-hdr">
            <div class="cd-wrap cd-hdr-in">
                <a class="cd-logo" href="../index.html" aria-label="SBS아카데미 메인으로 이동">
                    <img src="${logoUrl}" alt="SBS아카데미">
                </a>

                <nav class="cd-nav" aria-label="${escapeHtml(page.name)} 상세페이지 메뉴">
                    <a href="#overview">과정 소개</a>
                    <a href="#curriculum">전체 교육과정</a>
                    <a href="#target">선택 이유</a>
                </nav>

                <a class="cd-hdr-cta" href="tel:0427198383">
                    <span>상담 문의</span>
                    <strong>042-719-8383</strong>
                </a>

                <button class="cd-menu-btn" type="button" aria-expanded="false" aria-controls="mobile-navigation">
                    <span></span><span></span><span></span>
                    <span class="sr-only">메뉴 열기</span>
                </button>
            </div>

            <nav id="mobile-navigation" class="cd-mnav" aria-label="모바일 상세페이지 메뉴" hidden>
                <a href="#overview">과정 소개</a>
                <a href="#curriculum">전체 교육과정</a>
                <a href="#target">선택 이유</a>
                <a href="tel:0427198383">상담 문의 042-719-8383</a>
            </nav>
        </header>

        <main id="main-content">
            <section class="cd-hero">
                <div class="cd-orb cd-orb-a" aria-hidden="true"></div>
                <div class="cd-orb cd-orb-b" aria-hidden="true"></div>

                <div class="cd-wrap cd-hero-grid">
                    <div class="cd-hero-copy">
                        <div class="cd-breadcrumb" aria-label="현재 위치">
                            <a href="../index.html">Home</a>
                            <span aria-hidden="true">/</span>
                            <span>${escapeHtml(page.name)}</span>
                        </div>

                        <p class="cd-eyebrow">${escapeHtml(page.eyebrow)}</p>
                        <h1>${escapeHtml(page.heroTitle[0])}<br><em>${escapeHtml(page.heroTitle[1])}</em></h1>
                        <p class="cd-hero-desc">${escapeHtml(page.description)}</p>

                        <div class="cd-hero-actions">
                            <a class="cd-btn cd-btn-primary" href="#curriculum">
                                전체 교육과정 확인
                                <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m7 10 5 5 5-5"></path></svg>
                            </a>
                            <a class="cd-btn cd-btn-secondary" href="tel:0427198383">수강 상담</a>
                        </div>

                        <ul class="cd-chip-list" aria-label="과정 핵심 분야">
                            ${page.chips.map((chip) => `<li>${escapeHtml(chip)}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="cd-hero-art" aria-label="${escapeHtml(page.name)} 학습 구조 시각화">
                        <div class="cd-art-grid" aria-hidden="true"></div>
                        <div class="cd-art-card cd-art-main">
                            <span class="cd-art-num">01</span>
                            <p>${lines(page.artTitle)}</p>
                            <span class="cd-art-line"></span>
                            <small>${escapeHtml(page.artLabel)}</small>
                        </div>
                        <div class="cd-art-card cd-art-ui">
                            <span>${escapeHtml(page.chips[0])}</span>
                            <div class="cd-wire"><i></i><i></i><i></i><i></i></div>
                        </div>
                        <div class="cd-art-card cd-art-ai">
                            <span class="cd-spark">✦</span>
                            <strong>${escapeHtml(page.artBadge)}</strong>
                            <small>WORKFLOW</small>
                        </div>
                        <div class="cd-art-dot cd-art-dot-a"></div>
                        <div class="cd-art-dot cd-art-dot-b"></div>
                    </div>
                </div>

                <div class="cd-wrap cd-quick">${quickItems}</div>
            </section>

            <section id="overview" class="cd-sec cd-overview">
                <div class="cd-wrap">
                    <div class="cd-sec-head reveal">
                        <div>
                            <p class="cd-kicker">PROGRAM OVERVIEW</p>
                            <h2>${lines(page.overviewTitle)}</h2>
                        </div>
                        <p>${escapeHtml(page.overviewDescription)}</p>
                    </div>
                    <div class="cd-value-grid">${valueCards}</div>
                </div>
            </section>

            <section id="curriculum" class="cd-sec cd-curriculum">
                <div class="cd-wrap">
                    <div class="cd-sec-head cd-sec-head-light reveal">
                        <div>
                            <p class="cd-kicker">ALL PROGRAMS</p>
                            <h2>${lines(page.curriculumTitle)}</h2>
                        </div>
                        <p>${escapeHtml(page.curriculumDescription)}</p>
                    </div>
                    <ol id="course-card-list" class="cd-course-grid" data-course-menu-id="${escapeHtml(pageKey)}"
                        aria-label="${escapeHtml(page.name)} 전체 교육과정 ${menu.items.length}개"></ol>
                    <noscript>
                        <p class="cd-course-error">전체 교육과정 목록을 보려면 브라우저에서 JavaScript를 활성화해 주세요.</p>
                    </noscript>
                </div>
            </section>

            <section id="target" class="cd-sec cd-target">
                <div class="cd-wrap cd-target-grid">
                    <div class="cd-target-copy reveal">
                        <p class="cd-kicker">${escapeHtml(page.whyEyebrow)}</p>
                        <h2>${lines(page.whyTitle)}</h2>
                        <p>${escapeHtml(page.whyDescription)}</p>
                    </div>
                    <div class="cd-target-list">${reasons}</div>
                </div>
            </section>

            <section class="cd-cta">
                <div class="cd-wrap cd-cta-in reveal">
                    <div>
                        <p>START YOUR CAREER</p>
                        <h2>어떤 과목부터 시작해야 할지<br>상담을 통해 확인해 보세요.</h2>
                    </div>
                    <div class="cd-cta-actions">
                        <a href="tel:0427198383">
                            <span>전화 상담</span>
                            <strong>042-719-8383</strong>
                        </a>
                        <a href="../index.html#curriculum-shortcuts">
                            <span>다른 교육과정</span>
                            <strong>전체 과정 보기 <i aria-hidden="true">→</i></strong>
                        </a>
                    </div>
                </div>
            </section>
        </main>

        <footer class="cd-footer">
            <div class="cd-wrap cd-footer-in">
                <a class="cd-logo cd-logo-footer" href="../index.html">
                    <img src="${logoUrl}" alt="SBS아카데미">
                </a>
                <p>SBS아카데미컴퓨터아트학원 대전점</p>
                <address>대전광역시 서구 대덕대로 179 굿모닝어학원빌딩 9층</address>
                <a href="tel:0427198383">042-719-8383</a>
            </div>
        </footer>
    `;
})();
