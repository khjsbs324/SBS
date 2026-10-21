const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
global.window = {};
require(path.join(root, 'data/resources-data.js'));
const data = window.SBSResourcesData;
assert(data?.title && data.description && data.imageNote, '자료실 공통 안내가 없습니다.');
assert.deepEqual(data.categories.map((category) => category.id), ['colorist', 'storyboard']);

const ids = new Set();
const images = new Set();
let total = 0;
for (const category of data.categories) {
    assert(category.label && category.title && category.description, `과정 안내 누락: ${category.id}`);
    const items = category.sections.flatMap((section) => section.items);
    assert.equal(items.length, category.id === 'colorist' ? 19 : 14, `준비물 누락: ${category.id}`);
    for (const item of items) {
        total += 1;
        assert(!ids.has(item.id), `준비물 ID 중복: ${item.id}`);
        ids.add(item.id);
        assert(item.name?.trim() && item.description?.trim(), `준비물 이름 또는 설명 누락: ${item.id}`);
        if (!item.image) continue;
        assert.match(item.image, /^(colorist|storyboard)-supplies\/[a-z0-9-]+\.png$/, `이미지 경로 오류: ${item.id}`);
        assert(item.image.startsWith(`${category.id}-supplies/`), `다른 과정의 이미지가 연결됨: ${item.id}`);
        const source = fs.readFileSync(path.join(root, item.image));
        assert.equal(source.subarray(1, 4).toString(), 'PNG', `PNG 파일 오류: ${item.image}`);
        const thumbnail = fs.readFileSync(path.join(root, 'assets/images/resources', item.image.replace(/\.png$/, '.webp')));
        assert.equal(thumbnail.toString('ascii', 0, 4), 'RIFF', `썸네일 파일 오류: ${item.image}`);
        assert.equal(thumbnail.toString('ascii', 8, 12), 'WEBP', `WebP 형식 오류: ${item.image}`);
        assert(thumbnail.length < source.length, `썸네일 크기 최적화 확인: ${item.image}`);
        images.add(item.image);
    }
}

const colorist = data.categories[0];
assert.equal(colorist.sections[0].items.length, 17);
assert.equal(colorist.sections[1].items.length, 2);
assert(colorist.sections[1].note.includes('사이즈'), '컬러칩 사이즈 확인 안내가 필요합니다.');
assert.deepEqual(colorist.sections[1].items.map((item) => item.usage), ['컬러개요 및 1교시용', '2교시용']);
assert.deepEqual(colorist.sections[0].items.filter((item) => !item.image).map((item) => item.name), ['물티슈', '알콜스왑', '일회용 위생팩', '화구박스']);
assert.deepEqual(data.categories[1].sections[0].items.filter((item) => item.optional).map((item) => item.name), ['아크릴판', '팔토시', '앞치마']);
assert.equal(images.size, 29, '제공된 준비물 이미지 29개가 모두 연결되어야 합니다.');
assert.equal(fs.existsSync(path.join(root, 'resources.html')), true);
console.log(`[자료실 검사] ${data.categories.length}개 과정 / ${total}개 항목 / 원본·WebP 이미지 ${images.size}쌍 통과`);
