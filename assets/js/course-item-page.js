/**
 * 개별 교육과정 상세페이지 공통 마크업 렌더러
 */
(() => {
    const root = document.getElementById('course-item-root');
    const pageKey = document.body.dataset.courseDetail;
    const page = window.SBSCourseDetailData?.[pageKey];
    const site = window.SBSSiteData;

    if (!root || !page || !site) {
        if (root) root.textContent = '교육과정 정보를 불러오지 못했습니다.';
        return;
    }

    const escapeHtml = (value) => String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');

    const safeHref = (value) => {
        const href = String(value || '');

        if (href.startsWith('/') || href.startsWith('./') || href.startsWith('../') || href.startsWith('#') || href.startsWith('tel:')) {
            return escapeHtml(href);
        }

        try {
            const url = new URL(href);
            return url.protocol === 'http:' || url.protocol === 'https:' ? escapeHtml(href) : '#';
        } catch {
            return '#';
        }
    };

    const lines = (items) => items.map(escapeHtml).join('<br>');
    const logoUrl = safeHref(site.brand.logoUrl);
    const phone = escapeHtml(site.location.phone);
    const phoneHref = `tel:${site.location.phone.replaceAll('-', '')}`;
    const address = escapeHtml(site.location.addressLines.join(' '));

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
                <svg viewBox="0 0 24 24">
                    ${[
                        '<path d="M6 5h12v14H6zM9 9h6M9 13h4"></path>',
                        '<path d="M4 12h5l3-7 3 14 2-7h3"></path>',
                        '<path d="M5 7h6v6H5zM13 11h6v6h-6zM8 16h3"></path>',
                        '<path d="M5 6h14v12H5zM8 10h8M8 14h5"></path>'
                    ][index]}
                </svg>
            </div>
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(description)}</p>
        </article>
    `).join('');

    const curriculumItems = page.curriculum.map((item) => `
        <li class="cd-item-module reveal">
            <div class="cd-item-module-head">
                <span>${escapeHtml(item.step)}</span>
                <small>${escapeHtml(item.label)}</small>
            </div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description)}</p>
            <ul>
                ${item.topics.map((topic) => `<li>${escapeHtml(topic)}</li>`).join('')}
            </ul>
        </li>
    `).join('');

    const outcomeItems = page.outcomes.map((item) => `
        <article class="cd-item-outcome reveal">
            <span>${escapeHtml(item.number)}</span>
            <div>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.description)}</p>
            </div>
        </article>
    `).join('');

    const targetItems = page.targets.map(([title, description], index) => `
        <article class="reveal">
            <span>${String(index + 1).padStart(2, '0')}</span>
            <div>
                <h3>${escapeHtml(title)}</h3>
                <p>${escapeHtml(description)}</p>
            </div>
        </article>
    `).join('');

    const faqItems = page.faq.map(([question, answer], index) => `
        <article class="cd-item-faq">
            <h3>
                <button type="button" aria-expanded="${index === 0}" aria-controls="faq-answer-${index}">
                    <span>${escapeHtml(question)}</span>
                    <i aria-hidden="true"></i>
                </button>
            </h3>
            <div id="faq-answer-${index}" class="cd-item-faq-answer" ${index === 0 ? '' : 'hidden'}>
                <p>${escapeHtml(answer)}</p>
            </div>
        </article>
    `).join('');

    const relatedItems = page.related.map((item) => `
        <a class="cd-item-related-card reveal" href="${safeHref(item.url)}">
            <span>AI MASTER</span>
            <h3>${escapeHtml(item.label)}</h3>
            <p>${escapeHtml(item.description)}</p>
            <strong>과정 확인 <i aria-hidden="true">→</i></strong>
        </a>
    `).join('');

    root.innerHTML = `
        <a class="skip-link" href="#main-content">본문 바로가기</a>

        <header class="cd-hdr">
            <div class="cd-wrap cd-hdr-in">
                <a class="cd-logo" href="../index.html" aria-label="SBS아카데미AIX 메인으로 이동">
                    <img src="${logoUrl}" alt="SBS아카데미AIX">
                </a>

                <nav class="cd-nav" aria-label="${escapeHtml(page.name)} 상세페이지 메뉴">
                    <a href="#overview">과정 소개</a>
                    <a href="#curriculum">커리큘럼</a>
                    <a href="#outcomes">결과물</a>
                    <a href="#faq">FAQ</a>
                </nav>

                <a class="cd-hdr-cta" href="${phoneHref}">
                    <span>상담 문의</span>
                    <strong>${phone}</strong>
                </a>

                <button class="cd-menu-btn" type="button" aria-expanded="false" aria-controls="mobile-navigation">
                    <span></span><span></span><span></span>
                    <span class="sr-only">메뉴 열기</span>
                </button>
            </div>

            <nav id="mobile-navigation" class="cd-mnav" aria-label="모바일 상세페이지 메뉴" hidden>
                <a href="#overview">과정 소개</a>
                <a href="#curriculum">커리큘럼</a>
                <a href="#outcomes">결과물</a>
                <a href="#faq">FAQ</a>
                <a href="${phoneHref}">상담 문의 ${phone}</a>
            </nav>
        </header>

        <main id="main-content">
            <section class="cd-hero cd-item-hero">
                <div class="cd-orb cd-orb-a" aria-hidden="true"></div>
                <div class="cd-orb cd-orb-b" aria-hidden="true"></div>

                <div class="cd-wrap cd-hero-grid">
                    <div class="cd-hero-copy">
                        <div class="cd-breadcrumb" aria-label="현재 위치">
                            <a href="../index.html">Home</a>
                            <span aria-hidden="true">/</span>
                            <a href="${safeHref(page.categoryUrl)}">${escapeHtml(page.categoryName)}</a>
                            <span aria-hidden="true">/</span>
                            <span>${escapeHtml(page.name)}</span>
                        </div>

                        <p class="cd-eyebrow">${escapeHtml(page.eyebrow)}</p>
                        <h1>${escapeHtml(page.heroTitle[0])}<br><em>${escapeHtml(page.heroTitle[1])}</em></h1>
                        <p class="cd-hero-desc">${escapeHtml(page.description)}</p>

                        <div class="cd-hero-actions">
                            <a class="cd-btn cd-btn-primary" href="#curriculum">
                                커리큘럼 확인
                                <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m7 10 5 5 5-5"></path></svg>
                            </a>
                            <a class="cd-btn cd-btn-secondary" href="${phoneHref}">수강 상담</a>
                        </div>

                        <ul class="cd-chip-list" aria-label="과정 핵심 도구와 분야">
                            ${page.chips.map((chip) => `<li>${escapeHtml(chip)}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="cd-hero-art cd-agent-art" aria-label="AI 에이전트 업무 자동화 흐름 시각화">
                        <div class="cd-art-grid" aria-hidden="true"></div>
                        <div class="cd-agent-node cd-agent-input">
                            <span>INPUT</span>
                            <strong>업무 목표<br>참고 자료</strong>
                        </div>
                        <div class="cd-agent-node cd-agent-core">
                            <span class="cd-spark">✦</span>
                            <small>AI AGENT</small>
                            <strong>Claude</strong>
                            <p>맥락 이해 · 실행 · 검토</p>
                        </div>
                        <div class="cd-agent-node cd-agent-output">
                            <span>OUTPUT</span>
                            <strong>정리된 문서<br>자동화 결과</strong>
                        </div>
                        <svg class="cd-agent-flow" aria-hidden="true" viewBox="0 0 500 500">
                            <path d="M148 154C220 108 260 112 310 165"></path>
                            <path d="M340 292C292 370 224 388 150 333"></path>
                        </svg>
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

            <section id="curriculum" class="cd-sec cd-curriculum cd-item-curriculum">
                <div class="cd-wrap">
                    <div class="cd-sec-head cd-sec-head-light reveal">
                        <div>
                            <p class="cd-kicker">CURRICULUM</p>
                            <h2>${lines(page.curriculumTitle)}</h2>
                        </div>
                        <div>
                            <p>${escapeHtml(page.curriculumDescription)}</p>
                            <small class="cd-item-curriculum-note">${escapeHtml(page.curriculumNote)}</small>
                        </div>
                    </div>
                    <ol class="cd-item-module-grid">${curriculumItems}</ol>
                </div>
            </section>

            <section id="outcomes" class="cd-sec cd-item-outcomes">
                <div class="cd-wrap">
                    <div class="cd-sec-head reveal">
                        <div>
                            <p class="cd-kicker">PROJECT OUTCOMES</p>
                            <h2>${lines(page.outcomesTitle)}</h2>
                        </div>
                        <p>${escapeHtml(page.outcomesDescription)}</p>
                    </div>
                    <div class="cd-item-outcome-grid">${outcomeItems}</div>
                </div>
            </section>

            <section id="target" class="cd-sec cd-target">
                <div class="cd-wrap cd-target-grid">
                    <div class="cd-target-copy reveal">
                        <p class="cd-kicker">RECOMMENDED FOR</p>
                        <h2>${lines(page.targetTitle)}</h2>
                        <p>AI 기능을 단편적으로 사용하는 단계를 넘어 자신의 업무에 맞는 실행 흐름을 만들고 싶은 분을 위한 과정입니다.</p>
                    </div>
                    <div class="cd-target-list">${targetItems}</div>
                </div>
            </section>

            <section id="faq" class="cd-sec cd-item-faq-section">
                <div class="cd-wrap cd-item-faq-grid">
                    <div class="cd-item-faq-copy reveal">
                        <p class="cd-kicker">FREQUENTLY ASKED QUESTIONS</p>
                        <h2>수강 전<br>자주 묻는 질문</h2>
                        <p>개강 일정과 세부 구성은 대전점 상담을 통해 가장 정확하게 확인할 수 있습니다.</p>
                        <a class="cd-text-link" href="${phoneHref}">전화로 문의하기 <span aria-hidden="true">→</span></a>
                    </div>
                    <div class="cd-item-faq-list">${faqItems}</div>
                </div>
            </section>

            <section class="cd-sec cd-item-related">
                <div class="cd-wrap">
                    <div class="cd-sec-head reveal">
                        <div>
                            <p class="cd-kicker">RELATED PROGRAMS</p>
                            <h2>함께 살펴볼<br>AI Master 과정</h2>
                        </div>
                        <p>학습 목표에 따라 프롬프트, 자동화, 제작과 자격 과정으로 학습 범위를 확장할 수 있습니다.</p>
                    </div>
                    <div class="cd-item-related-grid">${relatedItems}</div>
                </div>
            </section>

            <section class="cd-cta">
                <div class="cd-wrap cd-cta-in reveal">
                    <div>
                        <p>BUILD YOUR AI WORKFLOW</p>
                        <h2>내 업무에 맞는 AI 에이전트,<br>상담부터 시작해 보세요.</h2>
                    </div>
                    <div class="cd-cta-actions">
                        <a href="${phoneHref}">
                            <span>전화 상담</span>
                            <strong>${phone}</strong>
                        </a>
                        <a href="${safeHref(page.categoryUrl)}">
                            <span>다른 교육과정</span>
                            <strong>AI Master 보기 <i aria-hidden="true">→</i></strong>
                        </a>
                    </div>
                </div>
            </section>
        </main>

        <footer class="cd-footer">
            <div class="cd-wrap cd-footer-in">
                <a class="cd-logo cd-logo-footer" href="../index.html">
                    <img src="${logoUrl}" alt="SBS아카데미AIX">
                </a>
                <p>${escapeHtml(site.location.academyName)}</p>
                <address>${address}</address>
                <a href="${phoneHref}">${phone}</a>
            </div>
        </footer>
    `;

    root.querySelectorAll('.cd-item-faq button').forEach((button) => {
        button.addEventListener('click', () => {
            const answer = document.getElementById(button.getAttribute('aria-controls'));
            const willOpen = button.getAttribute('aria-expanded') !== 'true';

            root.querySelectorAll('.cd-item-faq button').forEach((item) => {
                item.setAttribute('aria-expanded', 'false');
                document.getElementById(item.getAttribute('aria-controls')).hidden = true;
            });

            button.setAttribute('aria-expanded', String(willOpen));
            answer.hidden = !willOpen;
        });
    });
})();
