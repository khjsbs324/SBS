const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const context = { window: {} };
for (const name of ['home-banner-data.js', 'curriculum-data.js', 'books-data.js', 'department-page-data.js']) {
    vm.runInNewContext(fs.readFileSync(path.join(root, 'data', name), 'utf8'), context, { filename: name });
}

const config = context.window.SBSDepartmentPageData;
const roadmap = context.window.SBSHomeBannerData.roadmap.pages.flatMap((page) => page.departments);
const images = context.window.SBSCurriculumData.subjectImages;
const books = new Set(context.window.SBSBooksData.books.map((book) => book.id));
const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };
const expectedOrder = ['artwork', 'ai-skillup', 'ai-sw', 'interior', 'motion', 'cg-vfx', 'youtube',
    'office', 'webtoon', 'uiux', 'visual', 'mechanical', 'senior', 'field-cert'];

assert(config.departments.length === 14, '학과는 14개여야 합니다.');
assert(config.departments.map((item) => item.id).join('|') === expectedOrder.join('|'), '사이드 메뉴 순서가 변경되었습니다.');
assert(config.departments.some((item) => item.id === config.defaultDepartment), '기본 선택 학과가 없습니다.');
assert(new Set(config.departments.map((item) => item.roadmapNumber)).size === 14, '로드맵 연결이 중복되었습니다.');

config.departments.forEach((item) => {
    const source = roadmap.find((entry) => entry.number === item.roadmapNumber);
    assert(source && source.courses.length > 0, `${item.label}: 로드맵 과목이 없습니다.`);
    item.books.forEach((id) => assert(books.has(id), `${item.label}: 교재 ${id}가 없습니다.`));
});

const courseNames = new Set(roadmap.flatMap((item) => item.courses));
Object.entries(config.imageAliases).forEach(([course, value]) => {
    assert(courseNames.has(course), `${course}: 로드맵에 없는 이미지 별칭입니다.`);
    const keys = Array.isArray(value) ? value : [value];
    keys.forEach((key) => assert(Array.isArray(images[key]) && images[key].length > 0,
        `${course}: ${key} 이미지가 없습니다.`));
});

if (errors.length) {
    console.error(errors.map((message) => `- ${message}`).join('\n'));
    process.exit(1);
}
console.log(`교육과정 서브페이지 검증 통과: ${config.departments.length}개 학과 / ${roadmap.reduce((count, item) => count + item.courses.length, 0)}개 과목`);
