# SBS 사이트 2단계 유지보수 안내서

## 목적

기존 화면과 동작을 유지하면서 스타일, 운영 데이터, 기능을 분리했다. 이미지 주소나 운영 콘텐츠는 데이터 파일에서, 디자인은 해당 SCSS partial에서만 수정한다.

## 파일 구조

```text
SBS/
├── index.html
├── package.json
├── assets/
│   ├── css/
│   │   └── main.css                # 빌드 결과물
│   ├── scss/
│   │   ├── abstracts/_tokens.scss  # 공통 색상·크기·속도
│   │   ├── base/                    # 초기화·전역·애니메이션
│   │   ├── layout/                  # 헤더·푸터·메뉴·고정 UI
│   │   ├── sections/                # 페이지 섹션별 스타일
│   │   ├── components/              # 카드·모달·상태 스타일
│   │   └── main.scss                # SCSS 진입점
│   └── js/
│       ├── content.js
│       ├── scroll.js
│       ├── curriculum.js
│       └── modals.js
├── data/
│   ├── curriculum-data.js
│   └── site-data.js
├── scripts/
│   ├── validate-data.js
│   └── validate-styles.js
```

`ex_css` 브랜치는 공개 홈페이지 프론트엔드만 관리한다. Supabase 설정, migration, seed 생성 스크립트와 이후 관리자 페이지 코드는 `ex` 브랜치에서 관리한다.

## 수정 위치

### 주요 교육과정

`data/curriculum-data.js`만 수정한다.

- `curriculumData`: 카테고리별 과목명과 순서
- `categoryNames`: 모달의 카테고리명
- `courseFlowData`: 과정 전체 흐름 문구
- `subjectImages`: 과목별 상세 이미지 주소와 순서

### 사이트 운영 콘텐츠

`data/site-data.js`만 수정한다.

- `brand.logoUrl`: 헤더·푸터·전체 메뉴 로고
- `shortcuts`: 교육과정 바로가기
- `portfolio`: 썸네일과 상세 이미지
- `reviews`: 후기와 취업자 특강
- `location`: 지도·주소·지하철·전화번호
- `seminars`: 세미나 이미지·제목·일정·신청 정보
- `contact`: 푸터 연락처

### 디자인

- 공통 값: `assets/scss/abstracts/_tokens.scss`
- 초기화·전역 설정·애니메이션: `assets/scss/base/`
- 헤더·푸터·메뉴·플로팅 UI: `assets/scss/layout/`
- 주요 교육과정 등 각 화면 영역: `assets/scss/sections/`
- 동적 카드·모달·상태: `assets/scss/components/`

`assets/css/main.css`는 직접 수정하지 않는다. SCSS를 수정한 뒤 아래 명령으로 다시 생성한다.

```bash
npm run build:styles
```

브라우저는 이 단일 정적 CSS만 불러온다. Tailwind 런타임이나 빌드 의존성은 사용하지 않는다.

### 기능

- 스크롤·헤더·플로팅 버튼: `assets/js/scroll.js`
- 교육과정 탭·카드·상세 모달: `assets/js/curriculum.js`
- 전체 메뉴·세미나·포트폴리오 모달: `assets/js/modals.js`
- 데이터와 화면 연결: `assets/js/content.js`

동적 UI 상태는 `is-open`, `is-active`, `is-visible` 같은 의미 기반 클래스로 제어한다. 상태 디자인은 `assets/scss/components/_states.scss`에서 관리한다.

## 수정 후 검사

```bash
npm install
npm run build:styles
npm run validate
```

검사는 데이터 구조, 이미지 주소, 필수 HTML 컨테이너, SCSS partial 연결, 단일 CSS 빌드 결과, Tailwind 잔여 클래스와 의존성을 확인한다.

## 관리자 페이지 연동 방향

별도 관리자 도메인은 `ex` 브랜치에서 Supabase를 통해 운영 데이터만 관리한다. 공개 사이트의 HTML·SCSS·JavaScript 디자인은 그대로 유지하고, 현재 `data` 파일과 동일한 필드 구조를 데이터베이스 조회 결과로 교체한다.

관리자 수정 대상은 이미지 주소·제목·설명·노출 순서·공개 여부·준비 중 상태로 제한한다. 색상, 여백, 레이아웃, 모달 구조는 관리자 수정 대상에 포함하지 않는다.
