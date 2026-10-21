/** 세미나 관리 시트 읽기 전용 연결. 종료일은 한국 날짜 기준으로 당일까지 '진행 중'입니다. */
((root) => {
    const headers = ['세미나 ID', '게시일', '노출 순서', '제목', '설명', '공개 여부', '메인 노출', '진행 일시', '종료일', '상태', '신청 기간', '썸네일 URL', '상세 이미지 URL', '원본 상세 링크', '신청 링크'];

    function safeUrl(value) {
        try {
            const url = new URL(String(value));
            return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
        } catch { return ''; }
    }

    function parse(text) {
        const match = text.match(/^\s*(?:\/\*O_o\*\/\s*)?google\.visualization\.Query\.setResponse\(([\s\S]*)\);?\s*$/);
        if (!match) throw new Error('시트 응답 형식 오류');
        const data = JSON.parse(match[1]);
        if (data.status !== 'ok' || !Array.isArray(data.table?.cols) || !Array.isArray(data.table?.rows)) {
            throw new Error('시트 읽기 실패');
        }
        if (!headers.every((header, index) => data.table.cols[index]?.label === header)) {
            throw new Error('세미나 관리 헤더 또는 범위가 변경되었습니다.');
        }
        return data.table.rows.map((row) => headers.map((_, index) => row.c?.[index] || {}));
    }

    function dateString(cell) {
        const raw = String(cell?.v ?? '');
        const gviz = raw.match(/^Date\((\d{4}),(\d{1,2}),(\d{1,2})(?:,.*)?\)$/);
        if (gviz) return `${gviz[1]}-${String(Number(gviz[2]) + 1).padStart(2, '0')}-${gviz[3].padStart(2, '0')}`;
        const formatted = String(cell?.f ?? raw);
        const match = formatted.match(/^(\d{4})[.\-/]\s*(\d{1,2})[.\-/]\s*(\d{1,2})/);
        return match ? `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}` : '';
    }

    function todayInKorea(now = new Date()) {
        const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
        const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
        return `${values.year}-${values.month}-${values.day}`;
    }

    function normalize(rows, today = todayInKorea()) {
        const seen = new Set();
        return rows.flatMap((cells) => {
            const values = cells.map((cell) => cell?.v ?? '');
            const id = String(values[0]).trim();
            const title = String(values[3]).trim();
            const image = safeUrl(values[11]);
            const endDate = dateString(cells[8]);
            const postedAt = dateString(cells[1]);
            if (!/^[a-zA-Z0-9_-]+$/.test(id) || seen.has(id) || !title || values[5] !== '공개'
                || !image) return [];
            seen.add(id);
            return [{
                id, title, image, endDate,
                status: endDate ? (endDate < today ? 'ended' : 'ongoing')
                    : postedAt && postedAt < today ? 'ended' : 'unknown',
                mainVisible: values[6] === '예',
                description: String(values[4]).trim(), date: String(values[7]).trim(),
                applicationPeriod: String(values[10]).trim(), detailImage: safeUrl(values[12]),
                detailUrl: safeUrl(values[13]), applicationUrl: safeUrl(values[14]),
                order: Number.isFinite(Number(values[2])) && String(values[2]).trim() ? Number(values[2]) : Number.MAX_SAFE_INTEGER,
                postedAt
            }];
        }).sort((a, b) => a.order - b.order || b.postedAt.localeCompare(a.postedAt) || a.id.localeCompare(b.id));
    }

    if (typeof module !== 'undefined' && module.exports) module.exports = { parse, normalize, safeUrl, dateString, todayInKorea };
    if (!root?.SBSSeminarConfig) return;

    const config = root.SBSSeminarConfig;
    const cacheKey = `sbs-seminars-v1:${config.spreadsheetId}:${config.sheetId}:${config.range}`;
    const listeners = new Set();
    let state = { items: [], status: 'loading' };
    let pending = null;
    let lastAttempt = 0;

    function readCache() {
        try {
            const cached = JSON.parse(localStorage.getItem(cacheKey));
            if (Array.isArray(cached?.rows) && Number.isFinite(cached.time) && cached.time <= Date.now()
                && Date.now() - cached.time <= config.cacheMaxAgeMs) return cached;
        } catch { /* 로컬 저장소 접근 불가 */ }
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
                    tqx: 'out:json', tq: 'select A,B,C,D,E,F,G,H,I,J,K,L,M,N,O where A is not null', _: String(Date.now()) });
                const response = await fetch(url, { signal: controller.signal, credentials: 'omit', cache: 'no-store' });
                if (!response.ok) throw new Error('시트 연결 실패');
                const rows = parse(await response.text());
                const cached = { time: Date.now(), rows };
                state = { items: normalize(rows), status: 'live' };
                try { localStorage.setItem(cacheKey, JSON.stringify(cached)); } catch { /* 저장 용량 제한 */ }
            } catch (error) {
                const cached = readCache();
                state = { items: cached ? normalize(cached.rows) : [], status: cached ? 'stale' : 'error' };
                console.warn('세미나 시트 갱신 실패:', error.message);
            } finally {
                clearTimeout(timeout);
                pending = null;
                listeners.forEach((listener) => listener(state));
            }
            return state;
        })();
        return pending;
    }

    root.SBSSeminarSource = {
        subscribe(listener) { listeners.add(listener); listener(state); return () => listeners.delete(listener); },
        refresh,
        getState() { return state; }
    };
    setInterval(() => { if (!document.hidden) refresh(); }, config.refreshMs);
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && Date.now() - lastAttempt >= config.refreshMs) refresh();
    });
    refresh();
})(typeof window === 'undefined' ? null : window);
