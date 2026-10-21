/** 교재 구매 목록: 상품은 한 번만 저장하고 학과별 탭에서 재사용합니다. */
(() => {
    const data = window.SBSBooksData;
    const grid = document.getElementById('bk-grid');
    if (!data || !grid) return;

    const filters = document.getElementById('bk-filters');
    const form = document.getElementById('bk-search');
    const input = document.getElementById('bk-query');
    const count = document.getElementById('bk-count');
    const empty = document.getElementById('bk-empty');
    const pagination = document.getElementById('bk-pagination');
    const cart = document.getElementById('bk-cart');
    const store = document.getElementById('bk-store');
    const featuredTrack = document.getElementById('bk-featured-track');
    const featuredPrev = document.getElementById('bk-featured-prev');
    const featuredNext = document.getElementById('bk-featured-next');
    const booksById = new Map(data.books.map((book) => [book.id, book]));
    const params = new URLSearchParams(location.search);
    const pageSize = 12;
    let category = data.categories.some((item) => item.id === params.get('category')) ? params.get('category') : 'all';
    let query = (params.get('q') || '').trim().slice(0, 100);
    let pageNumber = Math.max(1, Number.parseInt(params.get('page'), 10) || 1);
    input.value = query;

    function safeUrl(value) {
        try {
            const url = new URL(value);
            return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
        } catch { return ''; }
    }

    cart.href = safeUrl(data.cartUrl);
    store.href = safeUrl(data.storeUrl);

    function urlFor(nextPage = 1, nextCategory = category) {
        const url = new URL(location.href);
        if (nextCategory === 'all') url.searchParams.delete('category');
        else url.searchParams.set('category', nextCategory);
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
        data.categories.forEach((item) => {
            const link = document.createElement('a');
            link.href = urlFor(1, item.id).href;
            link.textContent = item.label;
            if (category === item.id) link.setAttribute('aria-current', 'page');
            link.addEventListener('click', (event) => {
                if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                category = item.id;
                pageNumber = 1;
                updateUrl();
                render();
                filters.querySelector('[aria-current]')?.focus({ preventScroll: true });
            });
            filters.append(link);
        });
    }

    function renderCard(book, featured = false) {
        const card = document.createElement('a');
        card.className = featured ? 'pf-card bk-card bk-featured-card' : 'pf-card bk-card';
        card.href = `https://kedustore.com/books/detail.asp?pdt_seq=${book.id}`;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
        card.setAttribute('aria-label', `${book.title}, 정가 ${book.price.toLocaleString('ko-KR')}원, 교재몰 상세 새 탭에서 보기`);

        const media = document.createElement('div');
        media.className = 'pf-media bk-media';
        const image = document.createElement('img');
        image.src = safeUrl(book.image);
        image.alt = `${book.title} 표지`;
        image.loading = 'lazy';
        image.width = 600;
        image.height = 750;
        image.addEventListener('error', () => {
            image.hidden = true;
            media.textContent = '표지를 불러올 수 없습니다';
        }, { once: true });
        media.append(image);

        const info = document.createElement('div');
        info.className = 'bk-card-info';
        const title = document.createElement('h2');
        title.textContent = book.title;
        const price = document.createElement('p');
        price.className = 'bk-price';
        const priceLabel = document.createElement('span');
        priceLabel.textContent = '정가';
        const priceValue = document.createElement('strong');
        priceValue.textContent = `${book.price.toLocaleString('ko-KR')}원`;
        price.append(priceLabel, priceValue);
        info.append(title, price);
        card.append(media, info);
        return card;
    }

    function updateFeaturedControls() {
        const end = featuredTrack.scrollWidth - featuredTrack.clientWidth;
        featuredPrev.disabled = featuredTrack.scrollLeft <= 2;
        featuredNext.disabled = featuredTrack.scrollLeft >= end - 2;
    }

    function slideFeatured(direction) {
        const card = featuredTrack.querySelector('.bk-featured-card');
        if (!card) return;
        const gap = Number.parseFloat(getComputedStyle(featuredTrack).columnGap) || 0;
        const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
        featuredTrack.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: reducedMotion ? 'auto' : 'smooth' });
    }

    featuredTrack.replaceChildren(...data.featuredIds.map((id) => renderCard(booksById.get(id), true)));
    featuredPrev.addEventListener('click', () => slideFeatured(-1));
    featuredNext.addEventListener('click', () => slideFeatured(1));
    featuredTrack.addEventListener('scroll', updateFeaturedControls, { passive: true });
    window.addEventListener('resize', updateFeaturedControls);
    requestAnimationFrame(updateFeaturedControls);

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
                document.getElementById('books-content').scrollIntoView({ block: 'start' });
            });
            pagination.append(link);
            previous = number;
        });
    }

    function render() {
        renderFilters();
        const selected = data.categories.find((item) => item.id === category);
        const ordered = category === 'all' ? data.books : selected.bookIds.map((id) => booksById.get(id)).filter(Boolean);
        const term = query.toLocaleLowerCase();
        const items = ordered.filter((book) => book.title.toLocaleLowerCase().includes(term));
        const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
        if (pageNumber > totalPages) {
            pageNumber = totalPages;
            updateUrl();
        }
        count.textContent = `총 ${items.length}권`;
        grid.replaceChildren(...items.slice((pageNumber - 1) * pageSize, pageNumber * pageSize).map((book) => renderCard(book)));
        empty.hidden = items.length > 0;
        empty.textContent = query ? '검색 결과가 없습니다. 다른 교재명으로 검색해 주세요.' : '표시할 교재가 없습니다.';
        renderPagination(totalPages);
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        query = input.value.trim().slice(0, 100);
        pageNumber = 1;
        updateUrl();
        render();
    });

    render();
})();
