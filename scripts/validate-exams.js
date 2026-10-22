const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
global.window = {};
require(path.join(root, 'data', 'exam-schedule-data.js'));

const data = window.SBSExamScheduleData;
assert(data && Array.isArray(data.categories));
assert.deepEqual(data.categories.map((item) => item.label),
    ['기능사', '산업기사', '기사', '사무', '세무/회계', '디자인']);
assert(data.categories.some((item) => item.id === data.defaultCategory));

for (const group of data.categories) {
    assert(group.id && group.exams.length, `${group.label}: 종목이 없습니다.`);
    assert.equal(new Set(group.exams.map((item) => item.id)).size, group.exams.length,
        `${group.label}: 중복 종목 ID가 있습니다.`);
    for (const item of group.exams) {
        assert(item.name && item.organizer && item.mode, `${group.label}: 종목 정보가 부족합니다.`);
        assert.equal(new URL(item.url).protocol, 'https:', `${item.name}: 공식 URL은 HTTPS여야 합니다.`);
        const schedule = data.schedules[item.schedule];
        assert(schedule, `${item.name}: 일정 매핑이 없습니다.`);
        for (const grade of item.grades || ['']) {
            for (const stage of item.stages || ['']) {
                const rows = schedule.rows.filter(row => (!row.grade || row.grade === grade) && (!row.stage || row.stage === stage));
                assert(rows.length, `${item.name} ${grade} ${stage}: 표시할 일정이 없습니다.`);
            }
        }
        for (const row of schedule.rows) {
            if (row.grade) assert(item.grades?.includes(row.grade), `${item.name}: 알 수 없는 급수 ${row.grade}`);
            if (row.stage) assert(item.stages?.includes(row.stage), `${item.name}: 알 수 없는 시험 구분 ${row.stage}`);
        }
    }
}

function validDate(value) {
    assert.match(value, /^\d{4}-\d{2}-\d{2}$/, `ISO 날짜 형식이 아닙니다: ${value}`);
    const date = new Date(`${value}T00:00:00Z`);
    assert(Number.isFinite(date.getTime()), `유효하지 않은 날짜: ${value}`);
    assert.equal(date.toISOString().slice(0, 10), value, `존재하지 않는 날짜: ${value}`);
}

function dateRanges(value, context) {
    if (Array.isArray(value)) {
        assert(value.length, `${context}: 기간 목록이 비어 있습니다.`);
        return value.flatMap(entry => dateRanges(entry, context));
    }
    if (typeof value === 'string') {
        assert(value.trim(), `${context}: 안내 문구가 비어 있습니다.`);
        return [];
    }
    assert(value && typeof value === 'object', `${context}: 일정 값이 없습니다.`);
    validDate(value.start);
    validDate(value.end);
    assert(value.start <= value.end, `${context}: 시작일이 종료일보다 늦습니다.`);
    return [value];
}

for (const source of Object.values(data.sources)) {
    assert(source.name);
    assert.equal(new URL(source.url).protocol, 'https:');
    validDate(source.checkedAt);
}

for (const [id, schedule] of Object.entries(data.schedules)) {
    assert(Number.isInteger(schedule.year) && schedule.title, `${id}: 연도·제목이 없습니다.`);
    assert(schedule.sources?.length, `${id}: 공식 출처가 없습니다.`);
    schedule.sources.forEach(key => assert(data.sources[key], `${id}: 출처 ${key}를 찾을 수 없습니다.`));
    assert(schedule.rows?.length, `${id}: 표에 표시할 행이 없습니다.`);
    const keys = new Set();
    for (const row of schedule.rows) {
        assert(row.round, `${id}: 회차 또는 상시 구분이 없습니다.`);
        const key = [row.grade, row.stage, row.round].join('|');
        assert(!keys.has(key), `${id}: 중복 일정 ${key}`);
        keys.add(key);
        const apply = dateRanges(row.apply, `${id} ${key} 원서접수`);
        const exam = dateRanges(row.exam, `${id} ${key} 시험일`);
        const result = dateRanges(row.result, `${id} ${key} 합격자 발표`);
        if (exam.length) {
            const firstExam = exam.map(range => range.start).sort()[0];
            const lastExam = exam.map(range => range.end).sort().at(-1);
            assert(exam.every(range => Number(range.start.slice(0, 4)) === schedule.year), `${id}: 시험 연도가 다릅니다.`);
            assert(apply.every(range => range.end <= firstExam), `${id} ${key}: 접수 마감이 시험 이후입니다.`);
            assert(result.every(range => range.start >= lastExam), `${id} ${key}: 합격 발표가 시험 이전입니다.`);
        }
    }
}

const category = (id) => data.categories.find((item) => item.id === id);
assert.deepEqual(category('office').exams.map((item) => item.name), ['컴퓨터활용능력', 'MOS']);
assert.deepEqual(category('office').exams[0].grades, ['1급', '2급']);
assert.deepEqual(category('office').exams[0].stages, ['필기', '실기']);
assert.deepEqual(category('tax').exams.map((item) => item.name), ['전산회계 1급', '전산세무 2급']);
assert.deepEqual(category('design').exams.map((item) => item.name), ['GTQ', 'GTQi', 'AICE']);

for (const page of ['index.html', 'about.html', 'portfolio.html', 'seminar.html', 'books.html', 'curriculum.html', 'exam-schedule.html']) {
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    assert(html.includes('href="./exam-schedule.html"'), `${page}: 자격증 일정 링크가 없습니다.`);
}

console.log(`자격증 일정 검증 통과: ${data.categories.length}개 분야 / ${data.categories.reduce((sum, item) => sum + item.exams.length, 0)}개 종목 배치`);
