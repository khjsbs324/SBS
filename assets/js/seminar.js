/** 대전지점 세미나 목록: 관리 시트의 공개 항목만 표시합니다. */
(() => {
    const source = window.SBSSeminarSource;
    const grid = document.getElementById('sm-grid');
    if (!source || !grid) return;

    const filters = document.getElementById('sm-filters');
    const form = document.getElementById('sm-search');
    const input = document.getElementById('sm-query');
    const count = document.getElementById('sm-count');
    const status = document.getElementById('sm-status');
    const empty = document.getElementById('sm-empty');
    const pagination = document.getElementById('sm-pagination');
    const pageSize = 12;
    const labels = [{ id: 'all', text: '전체' }, { id: 'ongoing', text: '진행 중' }, { id: 'ended', text: '종료' }];
    const params = new URLSearchParams(location.search);
    let selected = labels.some((item) => item.id === params.get('status')) ? params.get('status') : 'all';
    let query = (params.get('q') || '').trim().slice(0, 100);
    let pageNumber = Math.max(1, Number.parseInt(params.get('page'), 10) || 1);
    let state = source.getState();
    input.value = query;

    function safeUrl(value) {
        try {
            const url = new URL(value);
            return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
        } catch { return ''; }
    }

    function urlFor(nextPage = 1, nextStatus = selected) {
        const url = new URL(location.href);
        url.searchParams.set('status', nextStatus);
        if (query) url.searchParams.set('q', query);
        else url.searchParams.delete('q');
        if (nextPage > 1) url.searchParams.set('page', String(nextPage));
        else url.searchParams.delete('page');
        return url;
    }

    function updateUrl() {
        history.replaceState(null, '', urlFor(pageNumber));
    }

    function renderFilters() {
        filters.replaceChildren();
        labels.forEach((item) => {
            const link = document.createElement('a');
            link.href = urlFor(1, item.id).href;
            link.textContent = item.text;
            if (selected === item.id) link.setAttribute('aria-current', 'page');
            link.addEventListener('click', (event) => {
                if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                selected = item.id;
                pageNumber = 1;
                updateUrl();
                render();
                filters.querySelector('[aria-current]')?.focus({ preventScroll: true });
            });
            filters.append(link);
        });
    }

    function renderCard(item) {
        const card = document.createElement('a');
        card.className = 'pf-card sm-card';
        card.href = safeUrl(item.detailUrl) || safeUrl(item.image);
        card.setAttribute('aria-label', `${item.title} 원본 세미나 상세 보기`);

        const media = document.createElement('div');
        media.className = 'pf-media sm-media';
        const image = document.createElement('img');
        image.src = safeUrl(item.image);
        image.alt = item.title;
        image.loading = 'lazy';
        image.width = 600;
        image.height = 750;
        image.addEventListener('error', () => {
            image.hidden = true;
            media.textContent = '이미지를 불러올 수 없습니다';
        }, { once: true });
        media.append(image);

        const meta = document.createElement('span');
        meta.className = 'pf-category sm-card-meta';
        meta.textContent = item.status === 'ongoing' ? '진행 중' : item.status === 'ended' ? '종료' : '일정 확인 필요';
        const title = document.createElement('h2');
        title.textContent = item.title;
        const date = document.createElement('p');
        date.className = 'sm-card-date';
        date.textContent = item.postedAt ? `게시일 ${item.postedAt.replaceAll('-', '.')}` : '';
        card.append(media, meta, title, date);
        return card;
    }

    function renderPagination(totalPages) {
        pagination.replaceChildren();
        if (totalPages <= 1) return;
        const first = Math.max(1, Math.min(pageNumber - 2, totalPages - 4));
        const last = Math.min(totalPages, first + 4);
        const numbers = [...new Set([1, ...Array.from({ length: last - first + 1 }, (_, i) => first + i), totalPages])];
        let previous = 0;
        numbers.forEach((number) => {
            if (number - previous > 1) {
                const dots = document.createElement('span');
                dots.textContent = '…';
                dots.setAttribute('aria-hidden', 'true');
                pagination.append(dots);
            }
            const link = document.createElement('a');
            link.href = urlFor(number).href;
            link.textContent = String(number);
            link.setAttribute('aria-label', `${number}페이지`);
            if (number === pageNumber) link.setAttribute('aria-current', 'page');
            link.addEventListener('click', (event) => {
                if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                pageNumber = number;
                updateUrl();
                render();
                document.getElementById('seminar-content').scrollIntoView({ block: 'start' });
            });
            pagination.append(link);
            previous = number;
        });
    }

    function render() {
        renderFilters();
        const term = query.toLocaleLowerCase();
        const items = state.items.filter((item) => (selected === 'all' || item.status === selected)
            && item.title.toLocaleLowerCase().includes(term));
        const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
        if (pageNumber > totalPages) {
            pageNumber = totalPages;
            updateUrl();
        }
        count.textContent = `총 ${items.length}건`;
        status.textContent = state.status === 'loading' ? '세미나를 불러오는 중입니다.'
            : state.status === 'error' ? '세미나를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
            : state.status === 'stale' ? '최근 확인된 세미나를 표시합니다.' : '';
        status.hidden = !status.textContent;
        grid.setAttribute('aria-busy', String(state.status === 'loading'));
        grid.replaceChildren(...items.slice((pageNumber - 1) * pageSize, pageNumber * pageSize).map(renderCard));
        empty.hidden = items.length > 0 || state.status === 'loading' || state.status === 'error';
        empty.textContent = query ? '검색 결과가 없습니다. 다른 제목으로 검색해 주세요.' : '표시할 세미나가 없습니다.';
        renderPagination(totalPages);
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        query = input.value.trim();
        pageNumber = 1;
        updateUrl();
        render();
    });
    source.subscribe((next) => { state = next; render(); });
})();
