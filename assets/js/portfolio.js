/** 포트폴리오 목록: 메인과 동일한 시트 데이터를 사용합니다. */
(() => {
    const data = window.SBSPortfolioConfig;
    if (!data || !window.SBSPortfolioSource) return;
    let sourceState = { items: [], status: 'loading' };
    const filters = document.getElementById('pf-filters');
    const grid = document.getElementById('pf-grid');
    const more = document.getElementById('pf-more');
    const input = document.getElementById('pf-query');
    const empty = document.getElementById('pf-empty');
    const status = document.createElement('p');
    status.className = 'port-txt';
    status.setAttribute('role', 'status');
    grid.before(status);
    const params = new URLSearchParams(location.search);
    let category = data.categories.some((item) => item.id === params.get('selMater'))
        ? params.get('selMater') : 'all';
    let query = params.get('q') || '';
    let limit = 12;
    const safeUrl = (value) => {
        try {
            const url = new URL(value);
            return ['https:', 'http:'].includes(url.protocol) ? url.href : '';
        } catch {
            return '';
        }
    };
    document.getElementById('pf-title').textContent = data.title;
    document.getElementById('pf-description').textContent = data.description;
    input.value = query;

    function render() {
        filters.replaceChildren();
        data.categories.forEach((item) => {
            const link = document.createElement('a');
            link.href = '?selMater=' + encodeURIComponent(item.id);
            link.textContent = item.label;
            if (category === item.id) link.setAttribute('aria-current', 'true');
            link.addEventListener('click', (event) => {
                if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                category = item.id;
                limit = 12;
                updateUrl();
                render();
                [...filters.children].find((node) => node.getAttribute('aria-current'))?.focus({ preventScroll: true });
            });
            filters.append(link);
        });
        const items = sourceState.items.filter((item) => (category === 'all' || item.category === category)
            && item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
        grid.setAttribute('aria-busy', String(sourceState.status === 'loading'));
        status.textContent = sourceState.status === 'loading' ? '작품을 불러오는 중입니다.'
            : sourceState.status === 'error' ? '작품을 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.'
            : sourceState.status === 'stale' ? '갱신이 지연되어 최근 확인한 작품을 표시합니다.' : '';
        status.hidden = !status.textContent;
        document.getElementById('pf-count').textContent = `총 ${items.length}건`;
        grid.replaceChildren();
        items.slice(0, limit).forEach((item) => {
            const card = document.createElement('a');
            card.className = 'pf-card';
            card.href = safeUrl(item.url);
            card.setAttribute('aria-label', `${item.title} — 원본 상세 작품`);
            const media = document.createElement('div');
            media.className = 'pf-media';
            const image = document.createElement('img');
            image.src = safeUrl(item.thumbnail);
            image.alt = item.title;
            image.loading = 'lazy';
            image.width = 600;
            image.height = 450;
            image.addEventListener('error', () => {
                image.hidden = true;
                media.textContent = '이미지를 불러올 수 없습니다';
            }, { once: true });
            media.append(image);
            const label = document.createElement('span');
            label.className = 'pf-category';
            label.textContent = data.categories.find((entry) => entry.id === item.category)?.label || '';
            const title = document.createElement('h2');
            title.textContent = item.title;
            card.append(media, label, title);
            grid.append(card);
        });
        empty.hidden = items.length > 0 || ['loading', 'error'].includes(sourceState.status);
        empty.textContent = query ? '검색 결과가 없습니다. 다른 작품명으로 검색해 주세요.' : '등록된 작품이 없습니다.';
        more.hidden = limit >= items.length;
    }
    function updateUrl() {
        const url = new URL(location.href);
        url.searchParams.set('selMater', category);
        if (query) url.searchParams.set('q', query);
        else url.searchParams.delete('q');
        history.replaceState(null, '', url);
    }
    document.getElementById('pf-search').addEventListener('submit', (event) => {
        event.preventDefault();
        query = input.value.trim();
        limit = 12;
        updateUrl();
        render();
    });
    more.addEventListener('click', () => {
        const previousLimit = limit;
        limit += 12;
        render();
        grid.children[previousLimit]?.focus({ preventScroll: true });
    });
    window.SBSPortfolioSource.subscribe((state) => {
        const changed = JSON.stringify(sourceState.items) !== JSON.stringify(state.items)
            || sourceState.status !== state.status;
        sourceState = state;
        if (changed) render();
    });
    render();
})();
