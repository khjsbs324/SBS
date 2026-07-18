const fs = require('fs');
const path = require('path');
const sass = require('sass');

const root = path.resolve(__dirname, '..');
const indexPath = path.join(root, 'index.html');
const cssPath = path.join(root, 'assets/css/main.css');
const scssPath = path.join(root, 'assets/scss/main.scss');
const errors = [];
const checks = [];

function check(condition, message) {
    if (condition) checks.push(message);
    else errors.push(message);
}

const html = fs.readFileSync(indexPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');
const scss = fs.readFileSync(scssPath, 'utf8');
const packageJson = fs.readFileSync(path.join(root, 'package.json'), 'utf8');

check(!html.includes('cdn.tailwindcss.com'), 'Tailwind 브라우저 CDN 없음');
check(!html.includes('assets/css/framework.css'), 'framework.css 연결 제거');
check(html.includes('href="./assets/css/main.css"'), '단일 빌드 CSS 연결');
check(!fs.existsSync(path.join(root, 'tailwind.config.js')), 'Tailwind 설정 파일 제거');
check(!fs.existsSync(path.join(root, 'assets/css/framework.css')), 'Tailwind 빌드 파일 제거');
check(!fs.existsSync(path.join(root, 'assets/styles/framework.css')), 'Tailwind 진입 파일 제거');
check(!packageJson.toLowerCase().includes('tailwind'), 'Tailwind 패키지와 빌드 명령 제거');
check(css.length > 50000, '분리된 SCSS의 통합 CSS 생성');

const usePaths = [...scss.matchAll(/@use\s+['"]([^'"]+)['"]/g)].map((match) => match[1]);
for (const usePath of usePaths) {
    const parts = usePath.split('/');
    const fileName = `_${parts.pop()}.scss`;
    const partialPath = path.join(root, 'assets/scss', ...parts, fileName);
    check(fs.existsSync(partialPath), `SCSS partial 연결: ${usePath}`);
}

for (const category of ['abstracts', 'base', 'layout', 'sections', 'components']) {
    check(usePaths.some((usePath) => usePath.startsWith(`${category}/`)), `SCSS ${category} 카테고리 연결`);
}

const requiredSelectors = [
    '.base-page',
    '.hdr-hdr',
    '.hero-sec',
    '.cur-sec',
    '.cnt-btn',
    '.curc-box',
    '.smod-box',
    '.cmod-box',
    '.pmod-box',
    '.tab-btn.is-active',
    '.menu-box.is-open',
    '.scroll-box.is-visible',
    '.glass-header',
    '.reveal.active',
    'body.modal-open'
];

for (const selector of requiredSelectors) {
    check(css.includes(selector), `필수 스타일 포함: ${selector}`);
}

const sourceFiles = [
    indexPath,
    ...fs.readdirSync(path.join(root, 'assets/js')).filter((name) => name.endsWith('.js')).map((name) => path.join(root, 'assets/js', name)),
    ...fs.readdirSync(path.join(root, 'data')).filter((name) => name.endsWith('.js')).map((name) => path.join(root, 'data', name))
];
const sourceText = sourceFiles.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
const classTokens = [];

for (const match of sourceText.matchAll(/\b(?:class|className)\s*=\s*["'`]([^"'`]+)["'`]/g)) {
    classTokens.push(...match[1].split(/\s+/));
}

for (const call of sourceText.matchAll(/classList\.(?:add|remove|toggle|contains)\(([^)]*)\)/g)) {
    for (const literal of call[1].matchAll(/["']([^"']+)["']/g)) classTokens.push(literal[1]);
}

const utilityPatterns = [
    /^(?:sm|md|lg|xl|2xl|hover|group-hover|focus):/,
    /^(?:bg|text|border)-(?:gray|white|black|transparent|indigo|sbs|\[)/,
    /^(?:opacity|translate-[xy]|scale|rotate|pointer-events|grid-cols|col-span|row-span|space-[xy]|rounded|aspect|shadow)(?:-|$)/,
    /^(?:p[trblxy]?|m[trblxy]?|w|h|min-w|max-w|min-h|max-h|gap|inset|top|right|bottom|left|z|font|leading|tracking|items|justify|self|place|overflow|object|cursor|transition|duration|ease|snap|shrink|grow)-(?:\[|\d|[a-z])/,
    /^(?:flex|grid|hidden|block|inline|inline-block|fixed|absolute|relative|sticky)$/
];
const utilityTokens = [...new Set(classTokens.filter((token) => utilityPatterns.some((pattern) => pattern.test(token))))];

check(utilityTokens.length === 0, `HTML·JS·데이터에 Tailwind 유틸리티 클래스 없음${utilityTokens.length ? ` (${utilityTokens.join(', ')})` : ''}`);
check(!sourceText.includes('--tw-') && !scss.includes('--tw-'), 'Tailwind 전용 CSS 변수 없음');

const compiledCss = sass.compile(scssPath, {
    style: 'compressed',
    sourceMap: false
}).css;
check(compiledCss.trimEnd() === css.trimEnd(), 'SCSS 원본과 main.css 빌드 결과 일치');

console.log(`[스타일 검사] 통과 ${checks.length}개 / 오류 ${errors.length}개`);
for (const message of checks) console.log(`  ✓ ${message}`);
for (const message of errors) console.error(`  ✗ ${message}`);

if (errors.length > 0) process.exit(1);
