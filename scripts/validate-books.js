const assert = require('node:assert/strict');
const path = require('node:path');

global.window = {};
require(path.join(__dirname, '..', 'data', 'books-data.js'));

const data = window.SBSBooksData;
assert(data && Array.isArray(data.books) && Array.isArray(data.categories));
assert.equal(data.books.length, 28, '이번에 분류된 교재는 중복 없이 28권이어야 합니다.');
assert.equal(new Set(data.books.map((book) => book.id)).size, data.books.length, '상품 ID가 중복되었습니다.');
assert.deepEqual(data.categories.map((item) => item.id), [
    'all', 'interior', 'certificate', 'cg-motion', 'web-uiux', 'it'
]);

const booksById = new Map(data.books.map((book) => [book.id, book]));
assert.deepEqual(data.featuredIds, ['1340', '1339', '1280', '1217', '1390']);
assert.equal(new Set(data.featuredIds).size, data.featuredIds.length, '추천 교재가 중복되었습니다.');
for (const book of data.books) {
    assert.match(book.id, /^\d+$/, `상품 ID가 올바르지 않습니다: ${book.id}`);
    assert(book.title.trim(), `상품명이 비어 있습니다: ${book.id}`);
    assert(Number.isInteger(book.price) && book.price > 0, `정가가 올바르지 않습니다: ${book.id}`);
    const image = new URL(book.image);
    assert.equal(image.protocol, 'https:', `이미지 URL이 HTTPS가 아닙니다: ${book.id}`);
    assert.equal(image.hostname, 'cdn.koreaedugroup.com', `교재몰 CDN 이미지가 아닙니다: ${book.id}`);
}

const referenced = new Set();
for (const id of data.featuredIds) {
    assert(booksById.has(id), `등록되지 않은 추천 교재입니다: ${id}`);
    referenced.add(id);
}
for (const category of data.categories.slice(1)) {
    assert(category.label && Array.isArray(category.bookIds), `분류가 올바르지 않습니다: ${category.id}`);
    assert.equal(new Set(category.bookIds).size, category.bookIds.length, `분류에 중복 상품이 있습니다: ${category.id}`);
    for (const id of category.bookIds) {
        assert(booksById.has(id), `등록되지 않은 상품 ID입니다: ${category.id} / ${id}`);
        assert(!data.featuredIds.includes(id), `추천 교재가 개별 탭에 중복되었습니다: ${category.id} / ${id}`);
        referenced.add(id);
    }
}
assert.equal(referenced.size, data.books.length, '분류되지 않은 교재가 있습니다.');
assert.equal(new URL(data.cartUrl).href, 'https://kedustore.com/mypage/cart.asp');
assert.equal(new URL(data.storeUrl).origin, 'https://kedustore.com');
console.log(`[교재 검사] ${data.books.length}권 / ${data.categories.length - 1}개 분류 통과`);
