const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const sass = require('sass');
const escapeClassName = require('tailwindcss/lib/util/escapeClassName').default;

const root = path.resolve(__dirname, '..');
const indexPath = path.join(root, 'index.html');
const frameworkPath = path.join(root, 'assets/css/framework.css');
const customCssPath = path.join(root, 'assets/css/main.css');
const customScssPath = path.join(root, 'assets/scss/main.scss');

const errors = [];
const checks = [];

function check(condition, message) {
    if (condition) checks.push(message);
    else errors.push(message);
}

const html = fs.readFileSync(indexPath, 'utf8');
const frameworkCss = fs.readFileSync(frameworkPath, 'utf8');
const customCss = fs.readFileSync(customCssPath, 'utf8');

check(!html.includes('cdn.tailwindcss.com'), 'Tailwind Play CDN 제거');
check(!html.includes('tailwind-config.js'), '브라우저용 Tailwind 설정 스크립트 제거');
check(
    html.includes('href="./assets/css/framework.css"') && html.includes('href="./assets/css/main.css"'),
    '정적 CSS 두 파일 연결'
);
check(
    html.indexOf('assets/css/framework.css') < html.indexOf('assets/css/main.css'),
    '유틸리티 CSS 뒤에 사용자 정의 CSS 적용'
);
check(frameworkCss.includes('tailwindcss v3.4.17'), '고정된 Tailwind 3.4.17 빌드 결과');
check(frameworkCss.length > 25000, '정적 유틸리티 CSS 생성');
check(customCss.length > 2000, 'SCSS 기반 사용자 정의 CSS 생성');

const criticalUtilities = [
    'flex',
    'grid',
    'hidden',
    'md:flex',
    'md:grid-cols-3',
    'lg:grid-cols-3',
    'xl:flex',
    'text-sbs-main',
    'hover:bg-sbs-main',
    'group-hover:text-sbs-main',
    'selection:bg-sbs-main',
    'bg-[#1a1738]',
    'bg-[#c15e42]',
    'md:text-[68px]',
    'lg:text-[88px]',
    'shadow-[0_20px_60px_rgba(13,130,255,0.08)]',
    '-translate-y-full',
    'translate-y-24',
    'scale-95',
    'opacity-0',
    'pointer-events-auto',
    'aspect-[1/1.41]'
];

for (const utility of criticalUtilities) {
    check(frameworkCss.includes(`.${escapeClassName(utility)}`), `필수 유틸리티 포함: ${utility}`);
}

const criticalCustomSelectors = [
    'html.lenis',
    '.animate-blob1',
    '.reveal.active',
    '.animate-slide-up',
    '.text-fill-animation',
    '.glass-header',
    '.animate-customFadeIn',
    'body.modal-open'
];

for (const selector of criticalCustomSelectors) {
    check(customCss.includes(selector), `필수 사용자 정의 스타일 포함: ${selector}`);
}

const sassResult = sass.compile(customScssPath, {
    style: 'compressed',
    sourceMap: false
}).css;
check(sassResult.trimEnd() === customCss.trimEnd(), 'SCSS 원본과 main.css 빌드 결과 일치');

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sbs-style-check-'));
const tempFrameworkPath = path.join(tempDir, 'framework.css');
const tailwindBin = path.join(root, 'node_modules/.bin/tailwindcss');
const build = spawnSync(tailwindBin, [
    '-c', path.join(root, 'tailwind.config.js'),
    '-i', path.join(root, 'assets/styles/framework.css'),
    '-o', tempFrameworkPath,
    '--minify'
], {
    cwd: root,
    encoding: 'utf8'
});

if (build.status !== 0) {
    errors.push(`Tailwind 재빌드 실패: ${build.stderr || build.stdout}`);
} else {
    const rebuiltFrameworkCss = fs.readFileSync(tempFrameworkPath, 'utf8');
    check(rebuiltFrameworkCss === frameworkCss, 'Tailwind 원본과 framework.css 빌드 결과 일치');
}

fs.rmSync(tempDir, { recursive: true, force: true });

console.log(`[스타일 검사] 통과 ${checks.length}개 / 오류 ${errors.length}개`);
for (const message of checks) console.log(`  ✓ ${message}`);
for (const message of errors) console.error(`  ✗ ${message}`);

if (errors.length > 0) process.exit(1);
