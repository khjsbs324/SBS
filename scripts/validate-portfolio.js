/* Public-source portfolio snapshot integrity. No external or admin requests. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../data/portfolio-data.js'), 'utf8'), context);
const { items, categories } = context.window.SBSPortfolioData;
const expected = { interior: [21, 13, 11, 17, 0, 4], vfx: [5, 6, 5, 4, 7, 2], motion: [0, 0, 0, 7, 10, 6], dtp: [0, 0, 0, 22, 29, 12], web: [0, 0, 0, 11, 17, 14], artwork: [59, 37, 46, 4, 7, 1] };
assert.equal(items.length, 377);
assert.equal(new Set(items.map((item) => item.id)).size, 377);
for (const id of ['19747', '19424']) assert.ok(items.some((item) => item.id === id), `유지할 작품 ${id}`);
for (const id of ['19861', '18958', '18631', '18571', '18514', '18504', '18279']) assert.ok(!items.some((item) => item.id === id), `삭제할 작품 ${id}`);
assert.equal(categories.length, 7);
for (const [category, counts] of Object.entries(expected)) {
    for (const [index, year] of [2021, 2022, 2023, 2024, 2025, 2026].entries()) {
        assert.equal(items.filter((item) => item.category === category && item.date.startsWith(String(year))).length, counts[index], `${category} ${year}`);
    }
}
for (const [index, item] of items.entries()) {
    assert.equal(item.branch, '대전지점');
    assert.match(item.date, /^202[1-6]-\d{2}-\d{2}$/);
    assert.ok(expected[item.category]);
    assert.ok(item.title.trim());
    assert.ok(item.media.length);
    assert.equal(new URL(item.url).searchParams.get('seq'), item.id);
    assert.equal(new URL(item.url).pathname, '/portfolio/view.asp');
    for (const url of [item.url, item.thumbnail, ...item.media.map((media) => media.url)]) {
        assert.ok(['https:', 'http:'].includes(new URL(url).protocol));
        assert.ok(!new URL(url).pathname.startsWith('/admin/'));
    }
    if (index) assert.ok(items[index - 1].date >= item.date);
}
console.log('포트폴리오 검증 통과: 377개, 6개 학과, 2021~2023년 203개 / 2024~2026년 174개');
