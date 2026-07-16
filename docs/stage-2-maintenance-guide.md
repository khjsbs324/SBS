# SBS 사이트 2단계 유지보수 안내서

## 목적

기존 화면과 동작은 유지하면서 `index.html`에 섞여 있던 스타일, 데이터, 기능을 분리했다. 앞으로 이미지 주소나 운영 콘텐츠를 수정할 때 전체 HTML을 변경하지 않고 관련 데이터 파일만 수정하는 것이 원칙이다.

## 파일 구조

```text
SBS/
├── index.html
├── package.json
├── tailwind.config.js
├── assets/
│   ├── css/
│   │   ├── framework.css
│   │   └── main.css
│   ├── scss/
│   │   └── main.scss
│   ├── styles/
│   │   └── framework.css
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
└── docs/
    └── stage-2-maintenance-guide.md
```

## 수정 위치

### 주요 교육과정 수정

`data/curriculum-data.js`만 수정한다.

- `curriculumData`: 카테고리별 과목명과 노출 순서
- `categoryNames`: 모달에 표시할 카테고리명
- `courseFlowData`: 과정 전체 흐름 문구
- `subjectImages`: 과목별 상세 이미지 주소와 이미지 순서

이미지 순서는 배열의 위에서 아래 순서로 표시된다. 파일명의 숫자 순서에 의존하지 않는다.

### 사이트 운영 콘텐츠 수정

`data/site-data.js`만 수정한다.

- `brand.logoUrl`: 헤더, 푸터, 전체 메뉴 로고
- `shortcuts`: 교육과정 바로가기 카드
- `portfolio`: 포트폴리오 썸네일과 상세 이미지
- `reviews`: 후기와 취업자 특강 문구
- `location`: 지도 이미지, 주소, 지하철, 전화번호
- `seminars`: 세미나 이미지, 제목, 일정, 신청 정보
- `contact`: 푸터 전화번호, 이메일, 블로그 주소

### 디자인 수정

- 공통 스타일 원본: `assets/scss/main.scss`
- 색상, 폰트, 반응형 유틸리티 설정: `tailwind.config.js`
- HTML 섹션 구조와 Tailwind 클래스: `index.html`, `assets/js/content.js`

`assets/css/framework.css`와 `assets/css/main.css`는 빌드 결과물이므로 직접 수정하지 않는다. 디자인 원본을 수정한 뒤 아래 명령으로 두 CSS 파일을 다시 생성한다.

```bash
npm run build:styles
```

브라우저에서는 Tailwind CDN이나 Sass를 실행하지 않는다. 빌드된 정적 CSS만 로드하므로 외부 Tailwind 스크립트 장애와 버전 변경의 영향을 받지 않는다.

운영 데이터 수정 시에는 디자인 파일을 함께 변경하지 않는다.

### 기능 수정

- 스크롤, 헤더, 플로팅 버튼: `assets/js/scroll.js`
- 교육과정 탭, 카드, 상세 이미지 모달: `assets/js/curriculum.js`
- 전체 메뉴, 세미나 모달, 포트폴리오 모달: `assets/js/modals.js`
- 데이터와 화면 연결: `assets/js/content.js`

## 수정 후 검사

저장소 루트에서 다음 명령을 실행한다.

```bash
npm install
npm run build:styles
npm run validate
```

검사 항목은 다음과 같다.

- 데이터 파일 로딩 여부
- 교육과정 카테고리명과 과정 흐름 누락
- 이미지 URL 형식
- jsDelivr URL에 연결된 저장소 파일 존재 여부
- 포트폴리오, 세미나, 지도 데이터 형식
- `index.html`이 불러오는 로컬 파일 존재 여부
- 필수 화면 컨테이너와 중복 ID
- Tailwind CDN과 브라우저 설정 스크립트 제거 여부
- 반응형, 상태 전환, 모달에 필요한 필수 유틸리티 생성 여부
- SCSS 및 Tailwind 원본과 빌드된 CSS의 일치 여부

`경고`는 기존 데이터 상태를 알려주며 실행을 중단하지 않는다. `오류`가 있으면 수정한 뒤 다시 검사해야 한다.

## 관리자 페이지 연동 시 유지할 구조

추후 Supabase와 별도 관리자 페이지를 연결할 때 `data` 파일의 필드 구조를 데이터베이스 테이블로 옮긴다. 공개 사이트의 디자인과 렌더링 코드는 유지하고, 데이터의 출처만 정적 파일에서 Supabase 조회로 교체한다.

관리자 페이지에서는 다음 항목만 변경할 수 있게 한다.

- 이미지 주소 또는 업로드 파일
- 제목과 설명
- 노출 순서
- 공개 여부
- 준비 중 상태

색상, 여백, 레이아웃, 모달 구조 등 디자인 값은 관리자 수정 대상에서 제외한다.
