/** 시트의 공개 + 메인 노출 작품만 기존 메인 그리드에 표시합니다. */
(() => {
    const grid = document.getElementById('portfolio-grid');
    if (!grid || !window.SBSPortfolioSource) return;
    const status = document.createElement('p');
    status.className = 'port-txt';
    status.setAttribute('role', 'status');
    grid.before(status);
    let signature = null;
    window.SBSPortfolioSource.subscribe((state) => {
        const items = state.items.filter((item) => item.featured);
        grid.setAttribute('aria-busy', String(state.status === 'loading'));
        status.textContent = state.status === 'loading' ? '작품을 불러오는 중입니다.'
            : state.status === 'error' ? '작품을 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.'
            : state.status === 'stale' ? '갱신이 지연되어 최근 확인한 작품을 표시합니다.'
            : items.length ? '' : '메인에 표시할 작품을 준비 중입니다.';
        status.hidden = !status.textContent;
        const nextSignature = JSON.stringify(items);
        if (signature === nextSignature) return;
        signature = nextSignature;
        grid.replaceChildren(...items.map((item) => {
            const card = document.createElement('a');
            card.className = 'cnt-box2';
            card.href = item.url;
            card.setAttribute('aria-label', `${item.title} — 원본 상세 작품`);
            const image = document.createElement('img');
            image.className = 'cnt-img';
            image.src = item.thumbnail;
            image.alt = item.title;
            image.width = 600;
            image.height = 450;
            image.loading = 'lazy';
            image.addEventListener('error', () => {
                image.hidden = true;
                const label = document.createElement('p');
                label.className = 'port-txt';
                label.textContent = `${item.title} — 이미지를 불러올 수 없습니다.`;
                card.append(label);
            }, { once: true });
            card.append(image);
            let opening = false;
            card.addEventListener('click', async (event) => {
                if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || !window.openPortfolioModal) return;
                event.preventDefault();
                if (opening) return;
                opening = true;
                card.setAttribute('aria-busy', 'true');
                const detail = await window.SBSPortfolioSource.detailImage(item.id);
                opening = false;
                card.removeAttribute('aria-busy');
                if (!card.isConnected) return;
                if (detail) window.openPortfolioModal(detail);
                else window.location.assign(item.url);
            });
            return card;
        }));
    });
})();
