/** 홈페이지 세미나: 시트의 공개 · 메인 노출 항목만 상태별로 표시합니다. */
(() => {
    const list = document.getElementById('seminar-list');
    const tabs = document.getElementById('seminar-tabs');
    const status = document.getElementById('seminar-status');
    const source = window.SBSSeminarSource;
    if (!list || !tabs || !status || !source) return;

    const common = window.SBSSiteData.seminars;
    let selected = null;
    let current = source.getState();

    function textElement(tag, className, value) {
        const element = document.createElement(tag);
        element.className = className;
        element.textContent = value;
        return element;
    }

    function detailRow(label, value, highlight = false) {
        const row = document.createElement('div');
        row.className = 'cnt-box18';
        row.append(textElement('span', 'cnt-tag9', label), textElement('span', highlight ? 'cnt-tag10' : '', value));
        return row;
    }

    function card(item, index) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'cnt-box14 group sem-card';
        button.setAttribute('aria-label', `${item.title} 세미나 포스터 보기`);
        const poster = textElement('div', 'cnt-box15', '');
        const image = document.createElement('img');
        image.className = 'cnt-img3';
        image.src = item.image;
        image.alt = item.title;
        image.loading = 'lazy';
        poster.append(image);
        const body = textElement('div', 'cnt-box16', '');
        const intro = document.createElement('div');
        intro.append(textElement('span', 'cnt-tag8', '[대전지점]'),
            textElement('h3', `cnt-tit5${index < 2 ? ' is-highlighted' : ''}`, item.title),
            textElement('p', 'cnt-txt8', item.description));
        const details = textElement('div', 'cnt-box17', '');
        if (item.date) details.append(detailRow('일시', item.date));
        if (item.applicationPeriod) details.append(detailRow('신청기간', item.applicationPeriod));
        details.append(detailRow('신청방법', common.applicationMethod, true));
        body.append(intro, details);
        button.append(poster, body);
        button.addEventListener('click', () => {
            window.openSeminarModal(item.title, '', item.detailImage || item.image);
        });
        return button;
    }

    function allLink() {
        const link = document.createElement('a');
        link.id = 'seminar-all-link';
        link.className = 'cnt-box19';
        link.href = common.all.url;
        link.append(textElement('span', 'cnt-tag11', common.all.title),
            textElement('span', 'cnt-tag12', common.all.label));
        return link;
    }

    function render() {
        const ongoing = current.items.filter((item) => item.mainVisible && item.status === 'ongoing');
        const ended = current.items.filter((item) => item.mainVisible && item.status === 'ended');
        if (!selected && current.status !== 'loading') selected = ongoing.length ? 'ongoing' : 'ended';
        tabs.querySelectorAll('[data-seminar-tab]').forEach((tab) => {
            const active = tab.dataset.seminarTab === selected;
            tab.classList.toggle('is-active', active);
            tab.setAttribute('aria-pressed', String(active));
        });
        const visible = selected === 'ongoing' ? ongoing : ended;
        const message = current.status === 'loading' ? '세미나를 불러오는 중입니다.'
            : current.status === 'error' ? '세미나를 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.'
            : current.status === 'stale' ? '갱신이 지연되어 최근 확인한 세미나를 표시합니다.'
            : visible.length ? '' : selected === 'ongoing' ? '현재 진행 중인 세미나가 없습니다.' : '종료된 세미나가 없습니다.';
        status.textContent = message;
        status.hidden = !message;
        list.setAttribute('aria-busy', String(current.status === 'loading'));
        list.replaceChildren(...visible.map(card), allLink());
    }

    tabs.addEventListener('click', (event) => {
        const tab = event.target.closest('[data-seminar-tab]');
        if (!tab || !tabs.contains(tab)) return;
        selected = tab.dataset.seminarTab;
        render();
    });
    source.subscribe((state) => { current = state; render(); });
})();
