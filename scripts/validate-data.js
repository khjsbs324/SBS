const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const errors = [];
const warnings = [];

global.window = {};
require(path.join(root, 'data', 'curriculum-data.js'));
require(path.join(root, 'data', 'site-data.js'));
require(path.join(root, 'data', 'home-banner-data.js'));
require(path.join(root, 'data', 'course-detail-data.js'));

const curriculum = window.SBSCurriculumData;
const site = window.SBSSiteData;
const homeBanner = window.SBSHomeBannerData;
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

function isRootRelativeUrl(value) {
    return typeof value === 'string'
        && /^\/(?!\/)/.test(value)
        && !value.includes('..');
}

function checkRepoImage(url, label) {
    const prefix = 'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/';
    if (!url.startsWith(prefix)) return;

    const relativePath = decodeURIComponent(url.slice(prefix.length));
    assert(fs.existsSync(path.join(root, relativePath)), `${label}: 저장소 파일이 없습니다. (${relativePath})`);
}

function checkRootRelativeFile(url, label) {
    if (!isRootRelativeUrl(url)) return;

    const relativePath = decodeURIComponent(url.replace(/^\/+/, ''));
    assert(fs.existsSync(path.join(root, relativePath)), `${label}: 저장소 파일이 없습니다. (${relativePath})`);
}

assert(curriculum, 'SBSCurriculumData를 불러오지 못했습니다.');
assert(site, 'SBSSiteData를 불러오지 못했습니다.');
assert(homeBanner, 'SBSHomeBannerData를 불러오지 못했습니다.');

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
    const expectedShortcuts = [
        ['artwork-webtoon', '아트웍/웹툰 학과'],
        ['advertising-design', '광고편집 학과'],
        ['uiux-vibe-coding', 'UIUX바이브코딩 학과'],
        ['motion', '모션 학과'],
        ['ai-skillup', 'AI스킬업'],
        ['interior', '인테리어 학과'],
        ['cg', 'CG학과'],
        ['youtube-creator', '유튜브 크리에이터'],
        ['certificate', '자격증'],
        ['ai-software', '인공지능융합 SW학과'],
    ];
    const shortcutIds = new Set();

    assert(Array.isArray(site.shortcuts), '교육과정 바로가기 데이터가 올바르지 않습니다.');
    assert(site.shortcuts?.length === expectedShortcuts.length, '교육과정 바로가기는 10개여야 합니다.');
    site.shortcuts?.forEach((item, index) => {
        const expected = expectedShortcuts[index];

        assert(item.id === expected?.[0], `교육과정 바로가기 ID 또는 순서가 올바르지 않습니다. (${index + 1})`);
        assert(item.title === expected?.[1], `교육과정 바로가기 학과명 또는 순서가 올바르지 않습니다. (${index + 1})`);
        assert(item.label, `교육과정 바로가기 분류 문구가 없습니다. (${index + 1})`);
        assert(
            Array.isArray(item.description)
                && item.description.length > 0
                && item.description.every((line) => typeof line === 'string' && line.trim()),
            `교육과정 바로가기 설명이 올바르지 않습니다. (${index + 1})`,
        );
        assert(!Object.prototype.hasOwnProperty.call(item, 'target'), `교육과정 바로가기에 기존 커리큘럼 연결이 남아 있습니다. (${item.title || index + 1})`);
        assert(!Object.prototype.hasOwnProperty.call(item, 'detailUrl'), `교육과정 바로가기에 기존 서브페이지 연결이 남아 있습니다. (${item.title || index + 1})`);
        assert(!shortcutIds.has(item.id), `교육과정 바로가기 ID가 중복됩니다. (${item.id})`);
        shortcutIds.add(item.id);
    });
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
        assert(
            isHttpUrl(site.location.mapImage) || isRootRelativeUrl(site.location.mapImage),
            '지도 이미지 URL이 올바르지 않습니다.',
        );
        checkRepoImage(site.location.mapImage, '지도 이미지');
        checkRootRelativeFile(site.location.mapImage, '지도 이미지');
    }

    site.seminars?.items?.forEach((item, index) => {
        assert(isHttpUrl(item.image), `세미나 이미지 URL이 올바르지 않습니다. (${index + 1})`);
        checkRepoImage(item.image, `세미나 ${index + 1}`);
    });
}

if (homeBanner) {
    assert(homeBanner.support?.title, '국비지원 띠배너 제목이 없습니다.');
    assert(homeBanner.support?.academyPhone, '학원 문의 전화번호가 없습니다.');
    assert(
        isHttpUrl(homeBanner.support?.certification?.imageUrl)
            || isRootRelativeUrl(homeBanner.support?.certification?.imageUrl),
        '우수훈련기관 인증 이미지 URL이 올바르지 않습니다.',
    );
    checkRootRelativeFile(homeBanner.support?.certification?.imageUrl, '우수훈련기관 인증 이미지');
    assert(Array.isArray(homeBanner.slides), '국비지원 과정 슬라이드가 올바르지 않습니다.');
    assert(homeBanner.slides?.length === 4, '국비지원 과정 슬라이드는 4개여야 합니다.');
    homeBanner.slides?.forEach((slide, index) => {
        assert(slide.id && slide.label && slide.title, `국비지원 과정 기본 정보가 없습니다. (${index + 1})`);
        assert(Array.isArray(slide.types) && slide.types.length > 0, `국비지원 과정 유형이 없습니다. (${slide.title || index + 1})`);
        assert(slide.tuition && slide.copayment, `국비지원 과정 비용 정보가 없습니다. (${slide.title || index + 1})`);
        assert(slide.period && slide.duration, `국비지원 과정 일정 정보가 없습니다. (${slide.title || index + 1})`);
        assert(isHttpUrl(slide.url), `국비지원 과정 URL이 올바르지 않습니다. (${slide.title || index + 1})`);
    });
    const roadmapPages = homeBanner.roadmap?.pages;
    assert(Array.isArray(roadmapPages) && roadmapPages.length === 2, '메인 로드맵은 2페이지여야 합니다.');
    if (Array.isArray(roadmapPages)) {
        const departments = roadmapPages.flatMap((page) => Array.isArray(page.departments) ? page.departments : []);
        assert(roadmapPages.every((page) => Array.isArray(page.departments) && page.departments.length === 7), '메인 로드맵 각 페이지는 학과 7개를 포함해야 합니다.');
        assert(departments.length === 14, '메인 로드맵 학과는 14개여야 합니다.');
        assert(departments.every((department) => department.number && department.title), '메인 로드맵 학과 번호 또는 제목이 없습니다.');
        assert(departments.every((department) => Array.isArray(department.courses) && department.courses.length > 0), '메인 로드맵 과정 목록이 비어 있습니다.');
        assert(departments.map((department) => department.number).join(',') === Array.from({ length: 14 }, (_, index) => String(index + 1).padStart(2, '0')).join(','), '메인 로드맵 학과 번호는 01번부터 14번까지 순서대로 작성해야 합니다.');
    }
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
const aboutHtmlPath = path.join(root, 'about.html');
assert(fs.existsSync(aboutHtmlPath), 'SBS소개 서브페이지가 없습니다. (about.html)');
const aboutHtml = fs.existsSync(aboutHtmlPath) ? fs.readFileSync(aboutHtmlPath, 'utf8') : '';
const requiredIds = [
    'support-banner-content',
    'support-course-slider',
    'support-course-slide',
    'home-roadmap-content',
    'home-roadmap-slide',
    'home-roadmap-dots',
    'home-roadmap-status',
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

const movedSections = [
    ['stats', '2'],
    ['why-sbs', '3'],
    ['roadmap', '4'],
    ['curriculum-detail', '5'],
    ['academy-info', '6'],
];

movedSections.forEach(([id, pageNumber]) => {
    assert(!html.includes(`id="${id}"`), `메인페이지에 이동 대상 섹션이 남아 있습니다. (#${id})`);
    assert(aboutHtml.includes(`id="${id}"`), `소개 페이지에 이동된 섹션이 없습니다. (#${id})`);
    assert(
        aboutHtml.includes(`id="${id}"`) && aboutHtml.includes(`data-page-number="${pageNumber}"`),
        `소개 페이지 섹션 번호가 올바르지 않습니다. (#${id}: ${pageNumber})`,
    );
});

const pageSectionSequences = [
    ['index.html', html, ['home', 'curriculum', 'portfolio', 'reviews', 'location', 'seminar']],
    ['about.html', aboutHtml, ['about-intro', 'stats', 'why-sbs', 'roadmap', 'curriculum-detail', 'academy-info']],
];

pageSectionSequences.forEach(([fileName, pageHtml, sectionIds]) => {
    sectionIds.forEach((id, index) => {
        const pageNumber = String(index + 1);
        const sectionPattern = new RegExp(
            `<section\\b(?=[^>]*\\bid="${id}")(?=[^>]*\\bdata-page-number="${pageNumber}")[^>]*>`,
        );
        assert(sectionPattern.test(pageHtml), `${fileName}의 페이지 번호가 올바르지 않습니다. (#${id}: ${pageNumber})`);
        assert(
            pageHtml.includes(`data-section-link="${id}"`),
            `${fileName}의 사이드바에 섹션 링크가 없습니다. (#${id})`,
        );
    });
});

const pages = [
    ['index.html', html],
    ['about.html', aboutHtml],
];
let staticIdCount = 0;

pages.forEach(([fileName, pageHtml]) => {
    const pageIds = [...pageHtml.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
    const duplicateIds = [...new Set(pageIds.filter((id, index) => pageIds.indexOf(id) !== index))];
    assert(duplicateIds.length === 0, `${fileName}에 중복 ID가 있습니다. (${duplicateIds.join(', ')})`);
    staticIdCount += pageIds.length;

    for (const match of pageHtml.matchAll(/(?:src|href)="(\.\/[^"?#]+)(?:[?#][^"]*)?"/g)) {
        assert(fs.existsSync(path.join(root, match[1])), `${fileName}에서 불러오는 파일이 없습니다. (${match[1]})`);
    }
});

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
console.log(`- 정적 HTML ID: ${staticIdCount}개`);
