const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const errors = [];
const warnings = [];

global.window = {};
require(path.join(root, 'data', 'curriculum-data.js'));
require(path.join(root, 'data', 'site-data.js'));
require(path.join(root, 'data', 'course-detail-data.js'));

const curriculum = window.SBSCurriculumData;
const site = window.SBSSiteData;
const courseDetails = window.SBSCourseDetailData;

function assert(condition, message) {
    if (!condition) errors.push(message);
}

function isHttpUrl(value) {
    try {
        const url = new URL(value);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
        return false;
    }
}

function checkRepoImage(url, label) {
    const prefix = 'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/';
    if (!url.startsWith(prefix)) return;

    const relativePath = decodeURIComponent(url.slice(prefix.length));
    assert(fs.existsSync(path.join(root, relativePath)), `${label}: 저장소 파일이 없습니다. (${relativePath})`);
}

assert(curriculum, 'SBSCurriculumData를 불러오지 못했습니다.');
assert(site, 'SBSSiteData를 불러오지 못했습니다.');

assert(courseDetails, 'SBSCourseDetailData could not be loaded.');

if (curriculum) {
    const {
        curriculumData,
        categoryNames,
        courseFlowData,
        subjectImages,
    } = curriculum;

    const subjects = new Set();
    Object.entries(curriculumData).forEach(([category, categorySubjects]) => {
        assert(categoryNames[category], `카테고리명이 없습니다. (${category})`);
        assert(courseFlowData[category], `교육과정 흐름이 없습니다. (${category})`);
        assert(Array.isArray(categorySubjects), `과목 목록이 배열이 아닙니다. (${category})`);
        categorySubjects.forEach((subject) => subjects.add(subject));
    });

    subjects.forEach((subject) => {
        if (!subjectImages[subject]?.length) {
            warnings.push(`이미지 연결이 없는 과목: ${subject}`);
        }
    });

    Object.entries(subjectImages).forEach(([subject, images]) => {
        if (!subjects.has(subject)) warnings.push(`교육과정에서 사용하지 않는 이미지 매핑: ${subject}`);
        assert(Array.isArray(images) && images.length > 0, `이미지 목록이 비어 있습니다. (${subject})`);

        images.forEach((url, index) => {
            assert(isHttpUrl(url), `잘못된 교육과정 이미지 URL: ${subject} ${index + 1}`);
            checkRepoImage(url, `${subject} ${index + 1}`);
        });
    });

    const imageArrayOwners = new Map();
    Object.entries(subjectImages).forEach(([subject, images]) => {
        const signature = JSON.stringify(images);
        const owners = imageArrayOwners.get(signature) || [];
        owners.push(subject);
        imageArrayOwners.set(signature, owners);
    });
    imageArrayOwners.forEach((owners) => {
        if (owners.length > 1) warnings.push(`동일 이미지 배열을 공유하는 과목: ${owners.join(', ')}`);
    });
}

if (site) {
    assert(isHttpUrl(site.brand?.logoUrl), '브랜드 로고 URL이 올바르지 않습니다.');
    assert(Array.isArray(site.shortcuts) && site.shortcuts.length > 0, '교육과정 바로가기 데이터가 없습니다.');
    assert(Array.isArray(site.portfolio) && site.portfolio.length > 0, '포트폴리오 데이터가 없습니다.');
    assert(Array.isArray(site.reviews?.items), '후기 데이터가 올바르지 않습니다.');
    assert(Array.isArray(site.seminars?.items), '세미나 데이터가 올바르지 않습니다.');
    assert(Array.isArray(site.courseMenu) && site.courseMenu.length > 0, '교육과정 2차 메뉴 데이터가 없습니다.');

    const curriculumTargets = new Set(Object.keys(curriculum?.curriculumData || {}));
    const linkedCourseDetailSlugs = new Set();
    site.courseMenu?.forEach((group, groupIndex) => {
        assert(group.id && group.title, `교육과정 2차 메뉴 그룹 정보가 올바르지 않습니다. (${groupIndex + 1})`);
        assert(curriculumTargets.has(group.target), `교육과정 2차 메뉴 그룹 연결이 올바르지 않습니다. (${group.title})`);
        assert(Array.isArray(group.items) && group.items.length > 0, `교육과정 2차 메뉴 항목이 없습니다. (${group.title})`);
        group.items?.forEach((item, itemIndex) => {
            assert(item.label, `교육과정 2차 메뉴명이 없습니다. (${group.title} ${itemIndex + 1})`);
            assert(curriculumTargets.has(item.target), `교육과정 2차 메뉴 연결이 올바르지 않습니다. (${group.title} > ${item.label})`);
            if (item.detailUrl) {
                assert(item.slug, `A course with detailUrl must have a slug. (${group.title} > ${item.label})`);
                assert(
                    /^\/courses\/[a-z0-9-]+\.html$/.test(item.detailUrl),
                    `Invalid course detail URL. (${item.detailUrl})`,
                );
                assert(
                    !item.detailUrl.includes('..'),
                    `Course detail URL cannot contain path traversal. (${item.detailUrl})`,
                );

                const detailPath = path.join(root, item.detailUrl.replace(/^\/+/, ''));
                assert(fs.existsSync(detailPath), `Course detail HTML is missing. (${item.detailUrl})`);
                assert(
                    Boolean(courseDetails?.[item.slug]),
                    `Course detail data is missing. (${item.slug})`,
                );

                if (item.slug) linkedCourseDetailSlugs.add(item.slug);
            }
        });
    });

    Object.keys(courseDetails || {}).forEach((slug) => {
        assert(
            linkedCourseDetailSlugs.has(slug),
            `Course detail data is not linked from the course menu. (${slug})`,
        );
    });

    site.portfolio?.forEach((item, index) => {
        assert(isHttpUrl(item.thumbnail), `포트폴리오 썸네일 URL이 올바르지 않습니다. (${index + 1})`);
        assert(isHttpUrl(item.detailImage), `포트폴리오 상세 URL이 올바르지 않습니다. (${index + 1})`);
    });

    if (site.location?.mapImage) {
        assert(isHttpUrl(site.location.mapImage), '지도 이미지 URL이 올바르지 않습니다.');
        checkRepoImage(site.location.mapImage, '지도 이미지');
    }

    site.seminars?.items?.forEach((item, index) => {
        assert(isHttpUrl(item.image), `세미나 이미지 URL이 올바르지 않습니다. (${index + 1})`);
        checkRepoImage(item.image, `세미나 ${index + 1}`);
    });
}

if (courseDetails) {
    Object.entries(courseDetails).forEach(([slug, detail]) => {
        assert(detail.slug === slug, `Course detail slug does not match its key. (${slug})`);
        assert(detail.name && detail.categoryName, `Course detail identity is incomplete. (${slug})`);
        assert(
            Array.isArray(detail.chips) && detail.chips.length > 0,
            `Course detail hero chips are missing. (${slug})`,
        );
        assert(
            Array.isArray(detail.quick) && detail.quick.length > 0,
            `Course detail quick info is missing. (${slug})`,
        );
        assert(
            Array.isArray(detail.curriculum) && detail.curriculum.length > 0,
            `Course detail curriculum is missing. (${slug})`,
        );
        assert(
            Array.isArray(detail.outcomes) && detail.outcomes.length > 0,
            `Course detail outcomes are missing. (${slug})`,
        );
        assert(
            Array.isArray(detail.targets) && detail.targets.length > 0,
            `Course detail audience data is missing. (${slug})`,
        );
        assert(
            Array.isArray(detail.faq) && detail.faq.length > 0,
            `Course detail FAQ is missing. (${slug})`,
        );
        assert(
            Array.isArray(detail.related) && detail.related.length > 0,
            `Course detail related courses are missing. (${slug})`,
        );

        const detailHtmlPath = path.join(root, 'courses', `${slug}.html`);
        assert(fs.existsSync(detailHtmlPath), `Course detail HTML is missing. (${slug})`);
        if (fs.existsSync(detailHtmlPath)) {
            const detailHtml = fs.readFileSync(detailHtmlPath, 'utf8');
            assert(
                detailHtml.includes(`data-course-detail="${slug}"`),
                `Course detail HTML has an invalid data key. (${slug})`,
            );
        }
    });
}

const htmlPath = path.join(root, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const requiredIds = [
    'curriculum-shortcuts-grid',
    'portfolio-grid',
    'reviews-content',
    'location-content',
    'seminar-list',
    'curriculum-cards',
    'course-modal',
    'seminar-modal',
    'portfolio-modal',
];

requiredIds.forEach((id) => {
    assert(html.includes(`id="${id}"`), `필수 화면 컨테이너가 없습니다. (#${id})`);
});

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
assert(duplicateIds.length === 0, `중복 ID가 있습니다. (${duplicateIds.join(', ')})`);

for (const match of html.matchAll(/(?:src|href)="(\.\/[^"?#]+)(?:[?#][^"]*)?"/g)) {
    assert(fs.existsSync(path.join(root, match[1])), `index.html에서 불러오는 파일이 없습니다. (${match[1]})`);
}

if (warnings.length) {
    console.log('\n[경고]');
    warnings.forEach((message) => console.log(`- ${message}`));
}

if (errors.length) {
    console.error('\n[오류]');
    errors.forEach((message) => console.error(`- ${message}`));
    process.exit(1);
}

console.log('\n검증 완료');
console.log(`- 교육과정 카테고리: ${Object.keys(curriculum.curriculumData).length}개`);
console.log(`- 과목별 이미지 매핑: ${Object.keys(curriculum.subjectImages).length}개`);
console.log(`- 포트폴리오: ${site.portfolio.length}개`);
console.log(`- 세미나: ${site.seminars.items.length}개`);
console.log(`- 정적 HTML ID: ${ids.length}개`);
