/** 자격증 분야·종목·급수·시험 구분 선택. */
(() => {
    const data = window.SBSExamScheduleData;
    const categoryNav = document.getElementById('ex-categories');
    const subjectList = document.getElementById('ex-subject-list');
    const detail = document.getElementById('ex-detail-content');
    if (!data || !categoryNav || !subjectList || !detail) return;

    const params = new URLSearchParams(location.search);
    let categoryId = data.categories.some((item) => item.id === params.get('category'))
        ? params.get('category') : data.defaultCategory;
    let examId = params.get('exam');
    let grade = params.get('grade');
    let stage = params.get('stage');

    function category() {
        return data.categories.find((item) => item.id === categoryId);
    }

    function exam() {
        return category().exams.find((item) => item.id === examId);
    }

    function syncSelection() {
        if (!exam()) examId = category().exams[0].id;
        grade = exam().grades?.includes(grade) ? grade : exam().grades?.[0] || '';
        stage = exam().stages?.includes(stage) ? stage : exam().stages?.[0] || '';
    }

    function updateUrl(replace = false) {
        const url = new URL(location.href);
        url.searchParams.set('category', categoryId);
        url.searchParams.set('exam', examId);
        if (grade) url.searchParams.set('grade', grade);
        else url.searchParams.delete('grade');
        if (stage) url.searchParams.set('stage', stage);
        else url.searchParams.delete('stage');
        history[replace ? 'replaceState' : 'pushState'](null, '', url);
    }

    function button(label, className, active, key, value) {
        const node = document.createElement('button');
        node.type = 'button';
        node.className = `${className}${active ? ' is-active' : ''}`;
        node.textContent = label;
        node.dataset[key] = value;
        node.setAttribute('aria-pressed', String(active));
        return node;
    }

    function renderCategories() {
        const fragment = document.createDocumentFragment();
        data.categories.forEach((item) => {
            fragment.append(button(item.label, 'ex-category', item.id === categoryId, 'category', item.id));
        });
        categoryNav.replaceChildren(fragment);
    }

    function renderSubjects() {
        const fragment = document.createDocumentFragment();
        category().exams.forEach((item, index) => {
            const control = button('', 'ex-subject', item.id === examId, 'exam', item.id);
            const number = document.createElement('span');
            number.className = 'ex-subject-number';
            number.textContent = String(index + 1).padStart(2, '0');
            const name = document.createElement('span');
            name.textContent = item.name;
            control.append(number, name);
            fragment.append(control);
        });
        subjectList.replaceChildren(fragment);
    }

    function optionGroup(label, values, key, active) {
        const wrapper = document.createElement('div');
        wrapper.className = 'ex-option-row';
        const heading = document.createElement('span');
        heading.className = 'ex-option-label';
        heading.textContent = label;
        const controls = document.createElement('div');
        controls.className = 'ex-option-controls';
        controls.setAttribute('role', 'group');
        controls.setAttribute('aria-label', label);
        values.forEach((value) => {
            controls.append(button(value, 'ex-option', value === active, key, value));
        });
        wrapper.append(heading, controls);
        return wrapper;
    }

    function officialUrl(value) {
        try {
            const url = new URL(value);
            return ['https:', 'http:'].includes(url.protocol) ? url.href : '';
        } catch { return ''; }
    }

    function formatDate(value, year) {
        const [dateYear, month, day] = value.split('-');
        return Number(dateYear) === year ? `${month}.${day}` : `${dateYear}.${month}.${day}`;
    }

    function renderScheduleCell(cell, value, year) {
        const entries = Array.isArray(value) ? value : [value];
        entries.forEach((entry) => {
            const line = document.createElement('span');
            line.className = 'ex-cell-line';
            if (typeof entry === 'string') {
                line.classList.add('ex-cell-text');
                line.textContent = entry;
            } else {
                const start = formatDate(entry.start, year);
                const period = entry.start === entry.end ? start : `${start} ~ ${formatDate(entry.end, year)}`;
                if (entry.label) {
                    const label = document.createElement('small');
                    label.className = 'ex-cell-label';
                    label.textContent = entry.label;
                    line.append(label);
                }
                line.append(document.createTextNode(period));
            }
            cell.append(line);
        });
    }

    function renderSchedule(item, root) {
        const schedule = data.schedules[item.schedule];
        const rows = (schedule?.rows || []).filter((row) =>
            (!row.stage || row.stage === stage) && (!row.grade || row.grade === grade)
        ).sort((a, b) => {
            const start = (row) => (Array.isArray(row.exam) ? row.exam[0] : row.exam)?.start || '';
            return start(a).localeCompare(start(b));
        });
        const section = document.createElement('section');
        section.className = 'ex-schedule';
        const heading = document.createElement('h3');
        heading.textContent = [schedule?.year && `${schedule.year}년`, item.name, grade, stage, schedule?.title || '시험 일정'].filter(Boolean).join(' ');
        section.append(heading);

        const scroller = document.createElement('div');
        scroller.className = 'ex-table-scroll';
        scroller.setAttribute('tabindex', '0');
        scroller.setAttribute('role', 'region');
        scroller.setAttribute('aria-label', `${heading.textContent} 표, 좌우로 스크롤할 수 있습니다`);
        scroller.setAttribute('data-lenis-prevent', '');
        const table = document.createElement('table');
        const caption = document.createElement('caption');
        caption.className = 'menu-sr-only';
        caption.textContent = heading.textContent;
        const head = document.createElement('thead');
        const headRow = document.createElement('tr');
        ['회차', '원서접수', '시험일', '합격자 발표'].forEach((label) => {
            const cell = document.createElement('th');
            cell.scope = 'col';
            cell.textContent = label;
            headRow.append(cell);
        });
        head.append(headRow);
        const body = document.createElement('tbody');
        rows.forEach((row) => {
            const tr = document.createElement('tr');
            const round = document.createElement('th');
            round.scope = 'row';
            round.textContent = row.round;
            tr.append(round);
            [row.apply, row.exam, row.result].forEach((value) => {
                const cell = document.createElement('td');
                renderScheduleCell(cell, value, schedule.year);
                tr.append(cell);
            });
            body.append(tr);
        });
        if (!rows.length) {
            const tr = document.createElement('tr');
            const cell = document.createElement('td');
            cell.colSpan = 4;
            cell.className = 'ex-schedule-empty';
            cell.textContent = '선택한 시험의 일정은 공식 공고 확인 후 안내합니다.';
            tr.append(cell);
            body.append(tr);
        }
        table.append(caption, head, body);
        scroller.append(table);
        section.append(scroller);

        const hasDates = rows.some(row => [row.apply, row.exam, row.result].some(value => typeof value !== 'string'));
        const notes = [
            ...(hasDates ? [`연도가 생략된 날짜는 ${schedule.year}년입니다.`] : []),
            ...(schedule?.notes || []),
            ...(schedule?.gradeNotes?.[grade] || [])
        ];
        notes.forEach((text) => {
            const note = document.createElement('p');
            note.className = 'ex-schedule-note';
            note.textContent = text;
            section.append(note);
        });
        (schedule?.sources || []).forEach((key) => {
            const source = data.sources[key];
            const url = officialUrl(source?.url);
            if (!url) return;
            const line = document.createElement('p');
            line.className = 'ex-schedule-source';
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = source.name;
            line.append(link, document.createTextNode(` · ${source.checkedAt.replaceAll('-', '.')} 확인`));
            section.append(line);
        });
        root.append(section);
    }

    function renderDetail() {
        const item = exam();
        const root = document.createDocumentFragment();
        const intro = document.createElement('div');
        intro.className = 'ex-detail-intro';
        const badge = document.createElement('span');
        badge.className = 'ex-mode';
        badge.textContent = item.mode;
        const title = document.createElement('h3');
        title.textContent = item.name;
        const meta = document.createElement('p');
        meta.textContent = `시행기관  ${item.organizer}`;
        intro.append(badge, title, meta);
        root.append(intro);

        const options = document.createElement('div');
        options.className = 'ex-options';
        if (item.grades?.length) options.append(optionGroup('급수', item.grades, 'grade', grade));
        if (item.stages?.length > 1) options.append(optionGroup('시험', item.stages, 'stage', stage));
        if (options.childElementCount) root.append(options);

        renderSchedule(item, root);
        const url = officialUrl(item.url);
        if (url) {
            const link = document.createElement('a');
            link.className = 'ex-official-link';
            link.href = url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = `${item.organizer} 공식 일정 확인 ↗`;
            root.append(link);
        }
        detail.replaceChildren(root);
        document.getElementById('ex-detail-title').textContent = `${category().label} 시험 일정`;
    }

    function render() {
        syncSelection();
        renderCategories();
        renderSubjects();
        renderDetail();
    }

    categoryNav.addEventListener('click', (event) => {
        const control = event.target.closest('button[data-category]');
        if (!control || control.dataset.category === categoryId) return;
        categoryId = control.dataset.category;
        examId = '';
        grade = '';
        stage = '';
        render();
        updateUrl();
        categoryNav.querySelector(`[data-category="${categoryId}"]`)?.focus({ preventScroll: true });
    });

    subjectList.addEventListener('click', (event) => {
        const control = event.target.closest('button[data-exam]');
        if (!control || control.dataset.exam === examId) return;
        examId = control.dataset.exam;
        grade = '';
        stage = '';
        render();
        updateUrl();
        subjectList.querySelector(`[data-exam="${examId}"]`)?.focus({ preventScroll: true });
    });

    detail.addEventListener('click', (event) => {
        const control = event.target.closest('button[data-grade], button[data-stage]');
        if (!control) return;
        const key = control.dataset.grade ? 'grade' : 'stage';
        const value = control.dataset[key];
        if ((key === 'grade' ? grade : stage) === value) return;
        if (key === 'grade') grade = value;
        else stage = value;
        renderDetail();
        updateUrl();
        detail.querySelector(`button[data-${key}="${value}"]`)?.focus({ preventScroll: true });
    });

    window.addEventListener('popstate', () => {
        const next = new URLSearchParams(location.search);
        categoryId = data.categories.some((item) => item.id === next.get('category'))
            ? next.get('category') : data.defaultCategory;
        examId = next.get('exam');
        grade = next.get('grade');
        stage = next.get('stage');
        render();
    });

    render();
})();
