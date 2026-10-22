const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
global.window = {};
require(path.join(root, 'data/resources-data.js'));
const data = window.SBSResourcesData;
assert(data?.title && data.description && data.imageNote, '자료실 공통 안내가 없습니다.');
assert.equal(data.storeUrl, 'https://hwabang.net/', '준비물 구매 사이트 주소 오류');
assert(data.ui.purchase && data.ui.offline && data.ui.offlineNote, '구매 안내 문구 누락');
assert.deepEqual(data.categories.map((category) => category.id), ['colorist', 'storyboard']);

const cdnBase = 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/';
const ids = new Set();
const images = new Set();
let total = 0;
let online = 0;
let purchaseLinks = 0;
const offlineIds = [];
for (const category of data.categories) {
    assert(category.label && category.title && category.description, `과정 안내 누락: ${category.id}`);
    const items = category.sections.flatMap((section) => section.items);
    assert.equal(items.length, category.id === 'colorist' ? 19 : 14, `준비물 누락: ${category.id}`);
    for (const item of items) {
        total += 1;
        assert(!ids.has(item.id), `준비물 ID 중복: ${item.id}`);
        ids.add(item.id);
        assert(item.name?.trim() && item.description?.trim(), `준비물 이름 또는 설명 누락: ${item.id}`);
        assert(['online', 'offline'].includes(item.purchase?.mode), `구매 방법 누락: ${item.id}`);
        if (item.purchase.mode === 'offline') {
            offlineIds.push(item.id);
            assert(!item.purchase.links?.length, `오프라인 항목에 구매 링크가 있음: ${item.id}`);
        } else {
            online += 1;
            const links = item.purchase.links;
            assert(Array.isArray(links) && links.length > 0, `온라인 구매 링크 누락: ${item.id}`);
            const destinations = new Set();
            for (const link of links) {
                const url = new URL(link.url);
                assert.equal(url.origin, 'https://hwabang.net', `구매 사이트 오류: ${item.id}`);
                assert.equal(url.pathname, '/product/detail.html', `상품 상세 주소 오류: ${item.id}`);
                assert.match(url.searchParams.get('product_no') || '', /^\d+$/, `상품 번호 누락: ${item.id}`);
                assert(!destinations.has(url.href), `같은 준비물의 구매 링크 중복: ${item.id}`);
                destinations.add(url.href);
                assert(link.note?.trim(), `구매 옵션 안내 누락: ${item.id}`);
                if (links.length > 1) assert(link.label?.trim(), `상품 구분 버튼 이름 누락: ${item.id}`);
                purchaseLinks += 1;
            }
        }
        if (!item.image) continue;
        assert(item.image.startsWith(cdnBase), `고정 배포 CDN 주소 오류: ${item.id}`);
        const imagePath = item.image.slice(cdnBase.length);
        const thumbnailPath = `assets/images/resources/${imagePath.replace(/\.png$/, '.webp')}`;
        assert.equal(item.thumbnail, `${cdnBase}${thumbnailPath}`, `썸네일 CDN 주소 오류: ${item.id}`);
        assert.match(imagePath, /^(colorist|storyboard)-supplies\/[a-z0-9-]+\.png$/, `이미지 경로 오류: ${item.id}`);
        assert(imagePath.startsWith(`${category.id}-supplies/`), `다른 과정의 이미지가 연결됨: ${item.id}`);
        const source = fs.readFileSync(path.join(root, imagePath));
        assert.equal(source.subarray(1, 4).toString(), 'PNG', `PNG 파일 오류: ${item.image}`);
        const thumbnail = fs.readFileSync(path.join(root, thumbnailPath));
        assert.equal(thumbnail.toString('ascii', 0, 4), 'RIFF', `썸네일 파일 오류: ${item.image}`);
        assert.equal(thumbnail.toString('ascii', 8, 12), 'WEBP', `WebP 형식 오류: ${item.image}`);
        assert(thumbnail.length < source.length, `썸네일 크기 최적화 확인: ${item.image}`);
        images.add(imagePath);
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
assert.equal(online, 25, '온라인 구매 대상은 25개 항목입니다.');
assert.equal(purchaseLinks, 28, '붓 3종과 포스터 물감 2종을 포함한 구매 링크가 필요합니다.');
assert.deepEqual(offlineIds, [
    'colorist-bottles', 'colorist-cloths', 'colorist-alcohol', 'colorist-bags',
    'colorist-glue', 'colorist-chip-ks195', 'storyboard-acrylic', 'storyboard-paper'
], '오프라인 구매 대상 확인 필요');
assert.equal(fs.existsSync(path.join(root, 'resources.html')), true);
console.log(`[자료실 검사] ${data.categories.length}개 과정 / ${total}개 항목 / 온라인 ${online}개·오프라인 ${offlineIds.length}개 / 구매 링크 ${purchaseLinks}개 / 원본·WebP 이미지 ${images.size}쌍 통과`);
