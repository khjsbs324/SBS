# Repository Guidelines

## 프로젝트 구조 및 모듈 구성

`index.html`은 정적 사이트의 메인 진입점이며 카테고리 상세페이지는 `courses/`에 있습니다. 재사용할 브라우저 동작은 `assets/js/`에 작성하고, 사이트 문구·메뉴·교육과정 데이터는 HTML에 중복하지 말고 `data/`에서 관리합니다.

홈페이지 스타일 원본은 `assets/scss/`에 있으며 `assets/scss/main.scss`가 섹션·레이아웃·컴포넌트 partial을 불러옵니다. 생성 파일은 `assets/css/main.css`입니다. 과정 상세페이지 스타일은 `assets/css/course-detail.css`에서 별도로 관리합니다. 루트의 과목별 폴더에는 이미지가 있으며 검증 스크립트는 `scripts/`에 있습니다.

## 빌드, 검증 및 개발 명령

- `npm ci`: `package-lock.json` 기준으로 검증용 의존성을 재현합니다.
- `npm install`: 초기 개발 환경에서 고정된 Sass 개발 의존성을 설치합니다.
- `npm run build:styles`: SCSS를 압축해 `assets/css/main.css`로 생성합니다.
- `npm run build:styles:dev`: 읽기 쉬운 개발용 CSS를 생성합니다.
- `npm run watch:styles`: SCSS 수정 중 홈페이지 CSS를 자동 재생성합니다.
- `npm run validate`: 데이터와 스타일 검증을 모두 실행합니다.
- `npm run validate:data`: 데이터 구조, URL, 이미지 매핑과 정적 ID를 검사합니다.
- `npm run validate:styles`: SCSS 구성과 생성된 CSS의 일치 여부를 검사합니다.
- `npx serve .`: 저장소를 로컬로 실행합니다. `index.html`과 수정한 `courses/` 페이지를 확인합니다.

Windows PowerShell 실행 정책이 `npm.ps1`을 차단하면 같은 명령을 `npm.cmd`로 실행합니다. 검증용 설치에서 `@parcel/watcher`의 설치 스크립트 승인 경고가 표시되더라도 실제 검증 명령의 종료 코드와 Sass 실행 결과를 기준으로 판단합니다.

## 코딩 스타일 및 명명 규칙

HTML과 JavaScript는 공백 4칸, SCSS는 공백 2칸 들여쓰기를 사용합니다. JavaScript의 세미콜론과 작은따옴표 스타일을 유지합니다. 동적 HTML에 값을 넣기 전에 이스케이프하고 URL은 `http:` 또는 `https:`만 허용합니다.

SCSS partial은 `layout/_header.scss`, `sections/_curriculum.scss`처럼 역할에 따라 이름을 정합니다. 클래스는 기존의 `hdr-`, `cd-`, `cur-` 접두사를 따릅니다. `main.css`를 직접 수정하지 말고 SCSS를 수정한 뒤 다시 빌드합니다.

## 테스트 지침

별도 단위 테스트 프레임워크나 커버리지 기준은 없으며 Node 기반 검증기를 사용합니다. 추가 검증 파일은 `validate-*.js`로 이름을 짓고 실패 시 0이 아닌 종료 코드를 반환해야 합니다. 리뷰 전 `npm run validate`와 `git diff --check`를 실행합니다.

시각 검수는 1440px, 1024px, 768px, 767px, 430px, 360px에서 진행합니다. 메인페이지와 수정한 `courses/` 페이지에서 가로 스크롤, 내비게이션, 모달, 외부 이미지, 전화·내부 링크를 확인합니다. AI 디자인 과정 카드는 768px에서 2열, 767px 이하에서 1열이어야 하며 12개 과정의 순서와 표기가 유지되어야 합니다. 모바일 메뉴는 열기·닫기와 `Esc` 키 닫기를 확인합니다.

`npm run validate:data`가 종료 코드 0으로 끝나면서 이미지 미연결·미사용 매핑 경고만 출력하는 경우에는 기존 비차단 경고로 취급합니다. 새 오류나 경고 증가가 있으면 원인을 확인합니다.

## 커밋 및 Pull Request 지침

저장소의 간결한 Conventional Commit 형식을 따릅니다. `feat:`, `fix:`, `style:`, `data:`, `assets:` 뒤에 명령형 요약을 작성합니다. 관련 없는 로컬 변경은 커밋에 포함하지 않습니다.

Pull Request에는 영향받는 페이지와 데이터 파일, 실행한 검증 명령을 적습니다. 시각적 변경에는 데스크톱·모바일 캡처를 첨부하고 가능한 경우 미리보기 배포 URL을 연결합니다.

## 브랜치 및 배포 안전

프런트엔드 작업은 `ex_css`에서 진행합니다. 명시적인 승인 없이 운영 `main`에 병합하거나 푸시하지 않습니다. 비밀정보, `node_modules/`, `.netlify/`, 임시 QA 파일과 인수인계 문서는 커밋하지 않습니다. 운영 CDN 자산은 변경되지 않는 커밋 또는 릴리스에 고정합니다.

작업 시작 시 현재 브랜치와 `git status --short`를 먼저 확인합니다. 로컬 미커밋 파일이 있으면 `stash`, `reset`, 체크아웃 또는 임의 정리를 하지 않고 별도 worktree나 독립 복제본에서 병합·검증합니다. 커밋에는 요청받은 파일만 명시적으로 추가합니다.

운영 반영 승인을 받은 경우 다음 순서를 지킵니다.

1. 원격 `main`과 `ex_css`의 최신 커밋 및 ahead/behind 상태 확인
2. 로컬 미커밋 파일과 분리된 작업 공간 준비
3. 최신 `main`에 `ex_css`를 fast-forward 또는 충돌 없는 병합
4. `npm ci`, `npm run validate`, `git diff --check` 실행
5. 푸시 직전 원격 브랜치가 변경되지 않았는지 재확인
6. 검증 성공 시에만 `main` 푸시
7. 기존 Netlify `sbs-daejeon` 프로젝트의 운영 배포가 해당 커밋으로 `ready`인지 확인
8. 운영 URL에서 메인페이지와 영향받은 상세페이지 스모크 테스트

새 Netlify 프로젝트를 만들지 않습니다. 기존 프로젝트의 운영 브랜치는 `main`이며, 배포 커밋과 GitHub `main` SHA가 정확히 일치해야 합니다. 실행 환경에서 `.netlify.app` 직접 접속이 차단되면 Netlify 배포 메타데이터로 커밋·브랜치·상태를 확인하고 동일 커밋 소스를 브라우저로 검증하되, 가능한 환경에서 실제 운영 URL을 추가 확인합니다.

## 현재 운영 기준

기준일은 2026-07-29입니다.

- 원격 `main`과 `ex_css`: `53b71d851f46e84a2abfbdef200673e8c8fcb78e`
- Netlify 프로젝트: `sbs-daejeon`
- 운영 URL: `https://sbs-daejeon.netlify.app/`
- Netlify 운영 배포: `main`, 커밋 `53b71d8`, 상태 `ready`
- 검증 결과: 교육과정 카테고리 17개, 이미지 매핑 69개, 포트폴리오 18개, 세미나 3개, 정적 HTML ID 56개
- 스타일 검사: 61개 통과, 오류 0개
- 브라우저 스모크 테스트: 메인·AI 디자인 페이지, 카드 12개, 768/767px 열 전환, 360px 가로 스크롤, 모바일 메뉴와 필수 링크 통과

현재 로컬 `ex_css`가 `30d4795`에 머물러 있을 수 있으므로 새 작업 전에 원격을 갱신해야 합니다. 로컬 미커밋 파일을 보존한 상태에서 원격과 동기화하고, 실제 SHA를 다시 확인한 뒤 작업합니다.
