/** 메인/서브페이지 공용 읽기 전용 Google Sheets 연결. 쓰기 권한/토큰 불필요. */
((root) => {
    const headers = ['작품 ID', '공개 여부', '학과', '작품명', '작성일', '썸네일 URL', '원본 상세 링크', '메인 노출', '노출 순서', '상세 이미지 URL'];
    function safeUrl(value) {
        try {
            const url = new URL(value);
            return ['https:', 'http:'].includes(url.protocol) ? url.href : '';
        } catch { return ''; }
    }
    function parse(text, expectedHeaders = headers) {
        const match = text.match(/^\s*(?:\/\*O_o\*\/\s*)?google\.visualization\.Query\.setResponse\(([\s\S]*)\);?\s*$/);
        if (!match) throw new Error('시트 응답 형식 오류');
        const data = JSON.parse(match[1]);
        if (data.status !== 'ok' || !Array.isArray(data.table?.cols) || !Array.isArray(data.table?.rows)) {
            throw new Error('시트 읽기 실패');
        }
        if (!expectedHeaders.every((name, i) => data.table.cols[i]?.label === name)) {
            throw new Error('작품 관리 헤더 또는 범위가 변경되었습니다.');
        }
        return data.table.rows.map((row) => expectedHeaders.map((_, i) => row.c?.[i]?.v ?? ''));
    }
    function normalize(rows, categories) {
        const ids = new Set();
        return rows.flatMap((row) => {
            const [rawId, visibility, label, title, date, thumbnail, url, featured, order, detailImage] = row;
            if (visibility !== '공개') return [];
            const id = String(rawId).trim();
            const category = categories.find((item) => item.id !== 'all' && item.label === String(label).trim());
            if (!/^[a-zA-Z0-9_-]+$/.test(id) || ids.has(id) || !category || !String(title).trim()
                || !safeUrl(thumbnail) || !safeUrl(url)) return [];
            ids.add(id);
            const parts = String(date).match(/^Date\((\d{4}),(\d{1,2}),(\d{1,2})(?:,.*)?\)$/);
            const normalizedDate = parts ? `${parts[1]}-${String(Number(parts[2]) + 1).padStart(2, '0')}-${parts[3].padStart(2, '0')}` : String(date);
            return [{ id, category: category.id, title: String(title).trim(), date: normalizedDate,
                thumbnail: safeUrl(thumbnail), url: safeUrl(url), detailImage: safeUrl(detailImage), featured: featured === '예',
                order: String(order).trim() && Number.isFinite(Number(order)) && Number(order) >= 0 ? Number(order) : Number.MAX_SAFE_INTEGER }];
        }).sort((a, b) => a.order - b.order || b.date.localeCompare(a.date) || b.id.localeCompare(a.id, undefined, { numeric: true }));
    }
    if (typeof module !== 'undefined' && module.exports) module.exports = { parse, normalize, safeUrl };
    if (!root?.SBSPortfolioConfig) return;
    const config = root.SBSPortfolioConfig;
    const cacheKey = `sbs-portfolio-v1:${config.spreadsheetId}:${config.sheetId}:${config.range}`;
    const listeners = new Set();
    let state = { items: [], status: 'loading', updatedAt: null };
    let lastGood = null;
    let pending = null;
    let lastAttempt = 0;
    function emit() {
        listeners.forEach((listener) => listener(state));
    }
    function readCache() {
        try {
            const cached = JSON.parse(localStorage.getItem(cacheKey));
            if (Array.isArray(cached?.rows) && Number.isFinite(cached.time) && cached.time <= Date.now()
                && Date.now() - cached.time <= config.cacheMaxAgeMs) return cached;
        } catch { /* 저장소 비활성화 시에도 실시간 조회 가능 */ }
        return null;
    }
    async function refresh() {
        if (pending) return pending;
        lastAttempt = Date.now();
        pending = (async () => {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 12000);
            try {
                const url = new URL(`https://docs.google.com/spreadsheets/d/${config.spreadsheetId}/gviz/tq`);
                url.search = new URLSearchParams({ gid: config.sheetId, range: config.range, headers: '1',
                    tqx: 'out:json', tq: "select A,F,D,E,B,I,L,G,C,J where F = '공개'", _: String(Date.now()) });
                const response = await fetch(url, { signal: controller.signal, credentials: 'omit', cache: 'no-store' });
                if (!response.ok) throw new Error('시트 연결 실패');
                const rows = parse(await response.text());
                const items = normalize(rows, config.categories);
                lastGood = { time: Date.now(), rows };
                state = { items, status: 'live', updatedAt: lastGood.time };
                try { localStorage.setItem(cacheKey, JSON.stringify(lastGood)); } catch { /* 용량 제한 */ }
            } catch (error) {
                const cached = lastGood || readCache();
                const usable = cached && Date.now() - cached.time <= config.cacheMaxAgeMs;
                state = { items: usable ? normalize(cached.rows, config.categories) : [],
                    status: usable ? 'stale' : 'error', updatedAt: usable ? cached.time : null };
                console.warn('포트폴리오 시트 갱신 실패:', error.message);
            } finally {
                clearTimeout(timeout);
                pending = null;
                emit();
            }
            return state;
        })();
        return pending;
    }
    root.SBSPortfolioSource = {
        subscribe(listener) { listeners.add(listener); listener(state); return () => listeners.delete(listener); },
        refresh,
        async detailImage(id) {
            return state.items.find((item) => item.id === id && item.featured)?.detailImage || '';
        },
        getState() { return state; }
    };
    setInterval(() => { if (!document.hidden) refresh(); }, config.refreshMs);
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && Date.now() - lastAttempt >= config.refreshMs) refresh();
    });
    refresh();
})(typeof window === 'undefined' ? null : window);
