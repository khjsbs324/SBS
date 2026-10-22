/** 대전점 인터뷰: 사진과 글이 함께 전환되는 수동 슬라이드. */
(() => {
    const carousel = document.getElementById('reviews-content');
    const items = window.SBSSiteData?.reviews?.items;
    if (!carousel || !items?.length) return;

    const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[char]);
    const safeUrl = (value) => {
        try {
            const url = new URL(value, window.location.href);
            return /^https?:$/.test(url.protocol) ? escapeHtml(url.href) : '#';
        } catch {
            return '#';
        }
    };
    const formatNumber = (value) => String(value).padStart(2, '0');
    const heading = document.getElementById('reviews-title');
    if (heading) heading.textContent = items[0].type;

    carousel.setAttribute('role', 'region');
    carousel.setAttribute('aria-roledescription', '슬라이드');
    carousel.setAttribute('aria-labelledby', 'reviews-title');
    carousel.innerHTML = `
        <div class="rev-stage">
          <div id="review-slides" class="rev-slides">
            ${items.map((item, index) => `
                <article class="rev-slide${index === 0 ? ' is-active' : ''}" role="group"
                    aria-roledescription="슬라이드" aria-label="${index + 1} / ${items.length} · ${escapeHtml(item.name)}"
                    aria-hidden="${index !== 0}"${index !== 0 ? ' inert' : ''}>
                    <div class="rev-portrait">
                        <img class="rev-photo" src="${safeUrl(item.image)}" alt="${escapeHtml(item.imageAlt)}"
                            width="500" height="500" loading="lazy" decoding="async">
                    </div>
                    <div class="rev-copy">
                        <div class="rev-profile">
                            <h3 class="rev-name">${escapeHtml(item.name)}</h3>
                            <p class="rev-course">${escapeHtml(item.course)}</p>
                        </div>
                        <blockquote class="rev-quote">${escapeHtml(item.quote)}</blockquote>
                        <p class="rev-description">${escapeHtml(item.description)}</p>
                        <div class="rev-action">
                            <a class="rev-detail" href="${safeUrl(item.url)}" target="_blank" rel="noopener noreferrer"
                                aria-label="${escapeHtml(item.name)} 인터뷰 자세히 보기 (새 창)">
                                인터뷰 자세히 보기 <span aria-hidden="true">↗</span>
                            </a>
                        </div>
                    </div>
                </article>
            `).join('')}
          </div>
          <div class="rev-navigation"${items.length === 1 ? ' hidden' : ''}>
            <button class="rev-arrow" type="button" data-review-step="-1" aria-label="이전 인터뷰" aria-controls="review-slides">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m11 5-7 7 7 7M4 12h16" /></svg>
            </button>
            <button class="rev-arrow" type="button" data-review-step="1" aria-label="다음 인터뷰" aria-controls="review-slides">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m13 5 7 7-7 7M20 12H4" /></svg>
            </button>
          </div>
        </div>
        <div class="rev-controls"${items.length === 1 ? ' hidden' : ''}>
            <p class="rev-count" aria-hidden="true"><span class="rev-current">01</span><span class="rev-divider">/</span>${formatNumber(items.length)}</p>
        </div>
        <p class="rev-status" role="status" aria-live="polite" aria-atomic="true"></p>
    `;

    const slides = [...carousel.querySelectorAll('.rev-slide')];
    const viewport = carousel.querySelector('.rev-slides');
    const current = carousel.querySelector('.rev-current');
    const status = carousel.querySelector('.rev-status');
    const nextButton = carousel.querySelector('[data-review-step="1"]');
    let activeIndex = 0;

    const step = (direction) => {
        if (items.length < 2) return;
        // Move keyboard focus out before making the previous slide inert.
        if (slides[activeIndex].contains(document.activeElement)) {
            nextButton.focus({ preventScroll: true });
        }
        activeIndex = (activeIndex + direction + items.length) % items.length;
        slides.forEach((slide, index) => {
            const active = index === activeIndex;
            slide.classList.toggle('is-active', active);
            slide.inert = !active;
            slide.setAttribute('aria-hidden', String(!active));
        });
        current.textContent = formatNumber(activeIndex + 1);
        if (heading) heading.textContent = items[activeIndex].type;
        status.textContent = `${items.length}개 중 ${activeIndex + 1}번째, ${items[activeIndex].name} ${items[activeIndex].type}`;
    };

    carousel.querySelectorAll('[data-review-step]').forEach((button) => {
        button.addEventListener('click', () => step(Number(button.dataset.reviewStep)));
    });
    carousel.addEventListener('keydown', (event) => {
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        step(event.key === 'ArrowRight' ? 1 : -1);
    });

    let touchStart = null;
    viewport.addEventListener('touchstart', (event) => {
        const touch = event.touches[0];
        touchStart = event.touches.length === 1 && !event.target.closest('a, button')
            ? { x: touch.clientX, y: touch.clientY } : null;
    }, { passive: true });
    viewport.addEventListener('touchend', (event) => {
        if (!touchStart) return;
        const touch = event.changedTouches[0];
        const dx = touch.clientX - touchStart.x;
        const dy = touch.clientY - touchStart.y;
        touchStart = null;
        if (Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
            step(dx < 0 ? 1 : -1);
        }
    }, { passive: true });
    viewport.addEventListener('touchcancel', () => { touchStart = null; }, { passive: true });
})();
