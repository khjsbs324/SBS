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
        if (item.schedule) assert(data.schedules[item.schedule], `${item.name}: 일정 매핑이 없습니다.`);
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
