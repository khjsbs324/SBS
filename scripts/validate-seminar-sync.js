const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { parse, normalize, safeUrl, dateString, todayInKorea } = require('../assets/js/seminar-source.js');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const seminarHtml = fs.readFileSync(path.join(root, 'seminar.html'), 'utf8');
const content = fs.readFileSync(path.join(root, 'assets/js/content.js'), 'utf8');
const config = fs.readFileSync(path.join(root, 'data/seminar-config.js'), 'utf8');
const headers = ['세미나 ID', '게시일', '노출 순서', '제목', '설명', '공개 여부', '메인 노출', '진행 일시', '종료일', '상태', '신청 기간', '썸네일 URL', '상세 이미지 URL', '원본 상세 링크', '신청 링크'];
const response = (rows, names = headers) => `google.visualization.Query.setResponse(${JSON.stringify({
    status: 'ok', table: { cols: names.map((label) => ({ label })), rows: rows.map((values) => ({ c: values.map((v) => ({ v })) })) }
})});`;
const row = (overrides = {}) => Object.assign([
    'SEMINAR-1', '', 2, '세미나 제목', '소개', '공개', '예', '2026. 10. 12 14:00',
    'Date(2026,9,12)', '진행 중', '2026. 10. 1 ~ 12', 'https://example.com/poster.jpg',
    'https://example.com/detail.jpg', 'https://example.com/detail', 'https://example.com/apply'
], overrides);

assert.equal(parse(response([row()])).length, 1);
assert.throws(() => parse(response([row()], ['변경된 헤더', ...headers.slice(1)])), /헤더/);
assert.throws(() => parse('not a gviz response'), /형식/);
assert.equal(dateString({ v: 'Date(2026,9,12)' }), '2026-10-12');
assert.equal(dateString({ v: 46307, f: '2026. 10. 12' }), '2026-10-12');
assert.equal(todayInKorea(new Date('2026-10-11T15:00:00.000Z')), '2026-10-12');
assert.equal(safeUrl('javascript:alert(1)'), '');

const rows = parse(response([row(), row({ 0: 'SEMINAR-2', 2: 1, 8: 'Date(2026,9,11)' })]));
const items = normalize(rows, '2026-10-12');
assert.deepEqual(items.map((item) => item.id), ['SEMINAR-2', 'SEMINAR-1']);
assert.deepEqual(items.map((item) => item.status), ['ended', 'ongoing']);
assert.equal(items[1].detailImage, 'https://example.com/detail.jpg');
assert.equal(items[1].mainVisible, true);
const publicOnly = normalize(parse(response([row({ 0: 'PUBLIC-ONLY', 1: 'Date(2025,0,1)', 6: '아니오', 8: '' })])), '2026-10-12');
assert.equal(publicOnly.length, 1);
assert.equal(publicOnly[0].mainVisible, false);
assert.equal(publicOnly[0].status, 'ended');
assert.equal(normalize(parse(response([row({ 5: '비공개' }), row({ 11: 'javascript:alert(1)' })])), '2026-10-12').length, 0);
assert.equal(normalize(parse(response([row(), row()])), '2026-10-12').length, 1);
assert(html.includes('id="seminar-tabs"') && html.includes('id="seminar-list"'), '메인 세미나 요소 누락');
assert(html.includes('./assets/js/seminar-source.js') && html.includes('./assets/js/home-seminars.js'), '세미나 스크립트 연결 누락');
assert(seminarHtml.includes('id="sm-grid"') && seminarHtml.includes('id="sm-pagination"'), '세미나 서브페이지 목록 또는 페이지네이션 누락');
assert(seminarHtml.includes('./assets/js/seminar-source.js') && seminarHtml.includes('./assets/js/seminar.js'), '세미나 서브페이지 시트 연결 누락');
assert(!content.includes('data.seminars.items'), '옛 정적 세미나 카드가 남아 있습니다.');
assert(config.includes("range: 'A4:O'"), '시트 범위가 올바르지 않습니다.');

console.log('세미나 시트 연결 검증 통과: 헤더/공개·메인/종료일/정렬/URL/메인 연결');
