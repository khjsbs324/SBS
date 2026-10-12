/** 시트 쓰기 없이 공개/정렬/입력 안전성/페이지 연결을 검사합니다. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { normalize, parse, safeUrl } = require('../assets/js/portfolio-source.js');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../data/portfolio-config.js'), 'utf8'), context);
const config = context.window.SBSPortfolioConfig;
const sourceCode = fs.readFileSync(path.join(__dirname, '../assets/js/portfolio-source.js'), 'utf8');
assert.equal(config.range, 'A4:L', '상세 이미지 및 원본 링크 열을 포함한 범위 조회');
assert.ok(sourceCode.includes("select A,F,D,E,B,I,L,G,C,J where F = '공개'"), '원본 링크와 상세 이미지를 작품 관리에서 조회');
assert.ok(!sourceCode.includes('config.mediaSheetId'), '상세 미디어 탭을 별도로 조회하지 않음');
const headers = ['작품 ID', '공개 여부', '학과', '작품명', '작성일', '썸네일 URL', '원본 상세 링크', '메인 노출', '노출 순서', '상세 이미지 URL'];
const row = (id, visible = '공개', featured = '아니오', order = '') =>
    [id, visible, '웹·UIUX', `작품 ${id}`, 'Date(2026,9,7)', 'https://example.com/a.jpg', 'https://example.com/detail', featured, order, 'https://example.com/detail.jpg'];
const rows = [row('1', '공개', '예', 2), row('2', '비공개', '예', 0), row('3', '공개', '아니오', 1), row('4')];
const normalized = normalize(rows, config.categories);
assert.deepEqual(normalized.map((item) => item.id), ['3', '1', '4']);
assert.deepEqual(normalized.filter((item) => item.featured).map((item) => item.id), ['1']);
assert.equal(normalized.find((item) => item.id === '1').detailImage, 'https://example.com/detail.jpg');
assert.equal(normalized[0].date, '2026-10-07');
assert.equal(normalize([row('1'), row('1')], config.categories).length, 1);
assert.equal(normalize([row('1', '')], config.categories).length, 0);
assert.deepEqual(normalize([], config.categories), []);
const unsafe = row('5');
unsafe[6] = 'javascript:alert(1)';
assert.equal(normalize([unsafe], config.categories).length, 0);
assert.equal(safeUrl('data:text/html,hi'), '');
const table = { cols: headers.map((label) => ({ label })), rows: rows.map((r) => ({ c: r.map((v) => ({ v })) })) };
const wrap = (value) => `/*O_o*/\ngoogle.visualization.Query.setResponse(${JSON.stringify(value)});`;
assert.deepEqual(parse(wrap({ status: 'ok', table })), rows);
assert.throws(() => parse('<html>Login</html>'));
assert.throws(() => parse(wrap({ status: 'error' })));
assert.throws(() => parse(wrap({ status: 'ok', table: { ...table, cols: [] } })));
assert.deepEqual(parse(wrap({ status: 'ok', table: { ...table, rows: [] } })), []);
for (const filename of ['index.html', 'portfolio.html']) {
    const html = fs.readFileSync(path.join(__dirname, '..', filename), 'utf8');
    assert.ok(html.includes('data/portfolio-config.js'));
    assert.ok(html.includes('assets/js/portfolio-source.js'));
    assert.ok(!html.includes('data/portfolio-data.js'));
}
console.log('포트폴리오 시트 연결 검증 통과: 공개/메인 노출/정렬/빈 데이터/안전한 URL/응답 검증/양쪽 페이지 연결');
