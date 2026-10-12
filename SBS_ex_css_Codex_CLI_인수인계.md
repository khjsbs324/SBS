# SBS 대전 지점 홈페이지 `ex_css` 작업 인수인계

> 이 문서는 `AGENTS.md`를 보완하는 **현재 작업 상태의 단일 인수인계 문서**다.
> 새 Codex 채팅은 작업을 시작하기 전에 `AGENTS.md`와 이 파일을 모두 읽어야 한다.

## 0. 60초 요약

| 항목 | 현재 상태 |
|---|---|
| 저장소 | `https://github.com/khjsbs324/SBS` |
| 프런트엔드 작업 브랜치 | `ex_css` |
| 운영 브랜치 | `main` |
| 원격 `main` 기준 | `53b71d851f46e84a2abfbdef200673e8c8fcb78e` |
| 원격 `ex_css` 최신 | `d1043dea2a14073721d6ec87b0ca0162c2265b95` |
| 브랜치 관계 | `ex_css`가 `main`보다 2커밋 앞, 0커밋 뒤 |
| Draft PR | `#1 ex_css → main`, open, draft, merge 가능 |
| Netlify Preview | `ready`, 최신 `ex_css` 커밋 반영 |
| 현재 구현 목표 | `AI 에이전트(클로드)` 고유 상세페이지 1개 파일럿 |
| 현재 HTML 페이지 | 총 8개: 메인 1 + 카테고리 6 + 고유 상세 1 |
| 데이터상 하위 과정 | 총 71개 |
| 고유 상세 연결 완료 | 71개 중 `AI 에이전트(클로드)` 1개 |
| Figma IA·플로우차트 | 파일과 노드는 지정됐지만 아직 제작 완료되지 않음 |
| 운영 배포 | 진행하지 않음. 사용자 승인 전 `main` 병합·푸시 금지 |

다음 작업은 아래 두 가지다.

1. Netlify Deploy Preview에서 AI 에이전트 상세페이지와 변경된 지도 이미지를 실제 브라우저로 최종 검수한다.
2. 현재 구현 기준의 페이지 IA와 사용자 플로우차트를 지정된 Figma 파일에 작성한다.

## 1. 이 작업의 목적과 확정된 사용자 결정

### 1.1 최종 목적

메인페이지의 전체 교육과정이나 카테고리 페이지에서 하위 과정을 클릭하면, 참고 사이트처럼 해당 과정만을 설명하는 **독립적인 고유 상세페이지**가 열리는 구조를 설계하고 구현한다.

고유 상세페이지의 파일럿은 다음 과정이다.

```text
AI Master
└─ AI 에이전트(클로드)
   └─ /courses/ai-agent.html
```

### 1.2 참고 자료

- 구현 방향 참고 페이지: `https://sbsart.com/class/web/ai/ai-agent.asp`
- Figma 파일: `https://www.figma.com/design/e9Zm4IW3vzkuG09H3RQvZL/%EC%B1%97gpt?node-id=60-2&t=5hzsgvNuLb3Et3qH-1`
- Figma file key: `e9Zm4IW3vzkuG09H3RQvZL`
- Figma 대상 node ID: `60:2`

참고 페이지는 정보 구조와 상세페이지 역할을 참고하기 위한 기준이다. 현재 구현은 참고 사이트의 HTML·문구·이미지를 그대로 복제한 것이 아니며, 대전점 사이트의 데이터 구조와 시각 체계에 맞춰 별도로 작성했다.

현재 실행 환경에서는 참고 URL 본문을 안정적으로 직접 가져오지 못했으므로, 참고 페이지와의 픽셀 단위 일치나 전체 콘텐츠 대조를 완료했다고 간주하면 안 된다.

### 1.3 사용자와 확정한 범위

| 결정 | 적용 내용 |
|---|---|
| 우선 전체 페이지 수와 구조를 파악 | 현재 HTML 8개, 하위 과정 데이터 71개로 확인 |
| 한 번에 전부 만들지 않음 | 파일럿 고유 상세페이지 1개만 구현 |
| 파일럿 대상 | `AI 에이전트(클로드)` |
| 메뉴에서 상세페이지로 이동 | 전체 교육과정, 메인 커리큘럼, AI Master 카테고리에서 연결 |
| 지도 이미지 변경 포함 | `Map/Map_Img.png` 변경을 `ex_css`에 포함 |
| 운영 배포 전 미리보기 | Draft PR 기반 Netlify Deploy Preview 사용 |
| IA·플로우차트 제작 | 지정 Figma 파일에서 다음 단계로 진행 |
| 운영 `main` | 별도 명시적 승인 전 병합·푸시 금지 |

### 1.4 현재 범위에서 제외

- 나머지 70개 하위 과정의 고유 상세페이지 생성
- 관리자 페이지 브랜치 `ex` 수정
- 과정 일정, 수강료, 모집인원 등 확인되지 않은 운영 정보 작성
- 새 Netlify 프로젝트 생성
- 사용자 승인 없는 Draft PR Ready 전환
- 사용자 승인 없는 `main` 병합과 운영 배포

## 2. 저장소와 브랜치의 권위 있는 현재 상태

이 절의 원격 상태는 2026-07-30에 GitHub 연결을 통해 다시 확인했다.

### 2.1 원격 브랜치

| 브랜치 | SHA | 역할 |
|---|---|---|
| `main` | `53b71d851f46e84a2abfbdef200673e8c8fcb78e` | Netlify 운영 |
| `ex_css` | `d1043dea2a14073721d6ec87b0ca0162c2265b95` | 현재 프런트엔드 작업 |

비교 결과:

```text
base: main
head: ex_css
status: ahead
ahead_by: 2
behind_by: 0
```

### 2.2 반영된 커밋

| 커밋 | 메시지 | 핵심 내용 |
|---|---|---|
| `616c0ad348fd6ef1300b4c3eaa4bda644332f92b` | `feat: add AI agent detail page and update map image` | AI 에이전트 상세페이지, 연결 코드, 데이터, 스타일, 지도 이미지 |
| `d1043dea2a14073721d6ec87b0ca0162c2265b95` | `fix: load map image from deployed branch` | 지도 URL을 현재 배포의 로컬 이미지 경로로 수정 |

최신 커밋:

```text
https://github.com/khjsbs324/SBS/commit/d1043dea2a14073721d6ec87b0ca0162c2265b95
```

### 2.3 Draft Pull Request

| 항목 | 값 |
|---|---|
| PR | `#1` |
| 제목 | `feat: add AI agent course detail preview` |
| 방향 | `ex_css → main` |
| 상태 | open |
| Draft | true |
| Mergeable | true |
| 커밋 수 | 2 |
| 변경 파일 | 10 |
| 추가/삭제 | `+1186 / -14` |
| URL | `https://github.com/khjsbs324/SBS/pull/1` |

PR은 미리보기 배포를 만들기 위한 Draft다. 사용자 승인 전 병합하지 않는다.

### 2.4 Netlify Deploy Preview

| 항목 | 값 |
|---|---|
| 프로젝트 | `sbs-daejeon` |
| Site ID | `455ce8a1-2cf1-48cf-8a5f-9fd8483f8b71` |
| Deploy ID | `6a6b291b1f0e1b0008d39a93` |
| 컨텍스트 | `deploy-preview` |
| 브랜치 | `ex_css` |
| Commit ref | `d1043dea2a14073721d6ec87b0ca0162c2265b95` |
| 상태 | `ready` |
| GitHub status | `success` |
| 빌드 오류 | 없음 |
| 배포 시간 | 약 11초 |

URL:

- Preview 루트: `https://deploy-preview-1--sbs-daejeon.netlify.app`
- AI 에이전트: `https://deploy-preview-1--sbs-daejeon.netlify.app/courses/ai-agent.html`
- 지도 영역: `https://deploy-preview-1--sbs-daejeon.netlify.app/#location`
- Netlify 배포 상세: `https://app.netlify.com/projects/sbs-daejeon/deploys/6a6b291b1f0e1b0008d39a93`
- 고정 배포 permalink: `https://6a6b291b1f0e1b0008d39a93--sbs-daejeon.netlify.app`

`https://sbs-daejeon.netlify.app`은 운영 URL이므로 이번 파일럿 확인에는 사용하지 않는다.

## 3. 페이지 수와 현재 IA

### 3.1 실제 HTML 파일: 총 8개

| 레벨 | 페이지 | 파일 | 상태 |
|---|---|---|---|
| L1 | 메인페이지 | `index.html` | 기존 |
| L2 | AI Master | `courses/ai-master.html` | 기존 카테고리 |
| L2 | AI 디자인 | `courses/ai-design.html` | 기존 카테고리 |
| L2 | AI 모션·CG | `courses/ai-motion-cg.html` | 기존 카테고리 |
| L2 | AI 웹툰·드로잉 | `courses/ai-webtoon-drawing.html` | 기존 카테고리 |
| L2 | AI 인테리어·제품 | `courses/ai-interior-product.html` | 기존 카테고리 |
| L2 | 자격증 | `courses/certificate.html` | 기존 카테고리 |
| L3 | AI 에이전트(클로드) | `courses/ai-agent.html` | 이번 파일럿 |

### 3.2 하위 과정 데이터: 총 71개

| 카테고리 ID | 카테고리 | 하위 과정 수 | 고유 상세 연결 수 |
|---|---|---:|---:|
| `master` | AI MASTER | 9 | 1 |
| `design` | AI 디자인 | 12 | 0 |
| `motion` | AI 모션·CG | 17 | 0 |
| `drawing` | AI 웹툰·드로잉 | 7 | 0 |
| `interior` | AI 인테리어·제품 | 12 | 0 |
| `certificate` | 자격증 | 14 | 0 |
| 합계 |  | 71 | 1 |

중요:

- “현재 페이지가 8개”와 “향후 고유 상세 대상이 71개”는 다른 수치다.
- 현재는 71개 중 1개만 고유 상세페이지를 갖는다.
- `detailUrl`이 없는 나머지 과정은 기존 상담 또는 모달 흐름을 유지한다.
- 사용자 승인 전 나머지 70개 페이지를 생성하지 않는다.

### 3.3 현재 IA

```text
SBS 대전 지점 홈페이지
├─ 메인페이지 /
│  ├─ 주요 교육과정 바로가기
│  ├─ 전체 교육과정 2차 메뉴
│  │  ├─ AI MASTER
│  │  │  ├─ AI 에이전트(클로드) → /courses/ai-agent.html
│  │  │  └─ 그 외 8개 → 기존 과정/상담 흐름
│  │  ├─ AI 디자인
│  │  ├─ AI 모션·CG
│  │  ├─ AI 웹툰·드로잉
│  │  ├─ AI 인테리어·제품
│  │  └─ 자격증
│  ├─ 수강생 작품
│  ├─ 수강 후기
│  ├─ 오시는 길
│  └─ 세미나
├─ 카테고리 상세 6개
│  └─ AI Master /courses/ai-master.html
│     ├─ 전체 과정 카드 9개
│     └─ AI 에이전트 카드 → /courses/ai-agent.html
└─ 고유 과정 상세
   └─ AI 에이전트(클로드) /courses/ai-agent.html
      ├─ 과정 소개
      ├─ 커리큘럼
      ├─ 결과물
      ├─ 추천 대상
      ├─ FAQ
      ├─ 관련 과정
      └─ 상담 CTA
```

## 4. AI 에이전트로 진입하는 실제 클릭 경로

고유 상세페이지 링크는 한 곳만 수정한 것이 아니라, 같은 `detailUrl` 데이터를 여러 렌더러가 사용하도록 연결했다.

### 4.1 경로 A: 메인 전체 교육과정 메뉴

```text
index.html
→ 전체 교육과정 버튼
→ AI MASTER 그룹
→ AI 에이전트(클로드)
→ /courses/ai-agent.html
```

구현:

- 데이터: `data/site-data.js > courseMenu[master].items[0].detailUrl`
- 렌더러: `assets/js/submenu.js`
- `detailUrl`이 있으면 `<button>` 대신 `<a>`를 생성

### 4.2 경로 B: 메인 커리큘럼 카드

```text
index.html#curriculum
→ AI Master 탭
→ AI 에이전트 기초/심화 카드
→ /courses/ai-agent.html
```

구현:

- 데이터 연결명: `curriculumLabel: "AI 에이전트 기초/심화"`
- URL 탐색: `assets/js/curriculum.js > findCourseDetailUrl(subject)`
- `curriculumLabel` 또는 `label`이 일치하고 `detailUrl`이 있으면 카드가 `<a>`가 됨
- `detailUrl`이 없는 기존 과정은 계속 모달을 사용

### 4.3 경로 C: AI Master 카테고리 페이지

```text
/courses/ai-master.html
→ 전체 교육과정 9개
→ AI 에이전트(클로드) 카드
→ /courses/ai-agent.html
```

구현:

- 카테고리 셸: `courses/ai-master.html`
- 카테고리 데이터: `data/course-page-data.js`
- 카테고리 렌더러: `assets/js/course-page.js`
- 카드 렌더러: `assets/js/course-detail.js > renderCourseCards()`
- `detailUrl`이 있으면 카드가 `<a>`가 되고, 없으면 `<article>` 유지

### 4.4 경로 D: 고유 상세페이지 내부

```text
/courses/ai-agent.html
├─ breadcrumb Home → /
├─ breadcrumb AI Master → /courses/ai-master.html
├─ 관련 과정 → /courses/ai-master.html#curriculum
└─ CTA AI Master 보기 → /courses/ai-master.html
```

## 5. 파일럿 상세페이지 구현 명세

### 5.1 문서 진입점

파일:

```text
courses/ai-agent.html
```

핵심 식별자:

```html
<body class="cd-item-page" data-course-detail="ai-agent">
```

메타 정보:

- 제목: `AI 에이전트(클로드) 과정 | SBS아카데미AIX학원 대전점`
- 설명: Claude와 Gemini를 활용한 업무 자동화 시스템 설계 과정
- JavaScript 비활성화 시 안내 문구 제공

### 5.2 스크립트 로딩 순서

로딩 순서는 의존성 때문에 중요하다.

```text
1. ../data/site-data.js
2. ../data/course-detail-data.js
3. ../assets/js/course-item-page.js
4. ../assets/js/course-detail.js
```

역할:

1. 사이트 공통 정보와 메뉴 데이터를 로드한다.
2. `ai-agent` 과정 콘텐츠를 로드한다.
3. 데이터로 전체 상세페이지 마크업을 생성한다.
4. 모바일 메뉴, 스크롤 상태, 섹션 활성화, reveal 동작을 연결한다.

이 순서를 임의로 바꾸지 않는다.

### 5.3 페이지 섹션

| 순서 | 영역 | 앵커/클래스 | 데이터 키 | 현재 수량 |
|---:|---|---|---|---:|
| 1 | 스킵 링크 | `#main-content` | 고정 문구 | 1 |
| 2 | 고정 헤더 | `.cd-hdr` | 사이트·과정 데이터 | 1 |
| 3 | 히어로 | `.cd-item-hero` | `heroTitle`, `description`, `chips`, `quick` | 칩 4, 요약 3 |
| 4 | 과정 소개 | `#overview` | `overviewTitle`, `values` | 핵심 가치 4 |
| 5 | 커리큘럼 | `#curriculum` | `curriculum` | 6단계 |
| 6 | 결과물 | `#outcomes` | `outcomes` | 3 |
| 7 | 추천 대상 | `#target` | `targets` | 4 |
| 8 | FAQ | `#faq` | `faq` | 4 |
| 9 | 관련 과정 | `.cd-item-related` | `related` | 3 |
| 10 | 상담 CTA | `.cd-cta` | 사이트 전화·카테고리 URL | 2개 행동 |
| 11 | 푸터 | `.cd-footer` | 학원명·주소·전화 | 1 |

### 5.4 현재 콘텐츠의 핵심

과정 식별:

- 이름: `AI 에이전트(클로드)`
- 카테고리: `AI Master`
- 영문 표기: `AI AGENT · CLAUDE`
- 주요 도구/주제: Claude, Gemini, 업무 자동화, 프롬프트 설계

6단계 커리큘럼:

1. AI 에이전트 기본 구조
2. 프롬프트와 맥락 설계
3. Claude 업무 활용
4. Gemini 멀티모달 활용
5. 반복 업무 자동화 설계
6. 나만의 AI 에이전트 프로젝트

결과물:

1. 리서치·요약 에이전트
2. 문서 초안·검수 워크플로우
3. 개인 업무 자동화 설계안

관련 과정:

- AI 프롬프트 엔지니어링
- AI 바이브코딩
- AI-POT

일정·모집인원·수강료처럼 변경될 수 있는 정보는 고정값을 만들지 않고 대전점 상담으로 안내한다.

### 5.5 상호작용과 접근성

구현된 동작:

- 본문 바로가기 스킵 링크
- 데스크톱 고정 헤더
- 스크롤 20px 이후 헤더 그림자 상태
- `820px` 이하 모바일 메뉴
- 모바일 메뉴 열기·닫기와 본문 스크롤 잠금
- 모바일 메뉴 링크 클릭 시 자동 닫기
- `Esc` 키로 모바일 메뉴 닫기
- `820px` 초과 리사이즈 시 메뉴 상태 초기화
- 현재 보이는 섹션에 헤더 메뉴 활성 상태 적용
- reveal 애니메이션
- `IntersectionObserver` 미지원 시 콘텐츠 즉시 표시
- `prefers-reduced-motion` 사용자의 애니메이션 최소화
- FAQ 아코디언
- FAQ 첫 항목 기본 열림
- 한 FAQ를 열면 다른 항목 닫힘
- `aria-expanded`, `aria-controls`, `hidden` 동기화
- 카드와 FAQ의 `:focus-visible` 표시

### 5.6 URL과 출력 안전

`assets/js/course-item-page.js`:

- 동적 문구를 `escapeHtml()`로 이스케이프
- 내부 경로 `/`, `./`, `../`, 해시 `#`, 전화 `tel:` 허용
- 외부 URL은 `http:`와 `https:`만 허용
- 잘못된 URL은 `#`로 대체

`assets/js/content.js`:

- 현재 페이지 기준으로 상대·루트 상대 URL을 해석
- 최종 프로토콜이 `http:` 또는 `https:`일 때만 반환

동적 HTML을 추가할 때 이 안전 규칙을 우회하지 않는다.

## 6. 시각 설계와 반응형 기준

### 6.1 현재 시각 체계

스타일 파일:

```text
assets/css/course-detail.css
```

기본 토큰:

| 토큰 | 값 |
|---|---|
| Primary blue | `#0d82ff` |
| Dark blue | `#075db8` |
| Ink | `#111827` |
| Muted | `#667085` |
| Soft background | `#f5f8fc` |
| Max content width | `1280px` |
| 기본 큰 radius | `28px` |

AI 에이전트 전용 보조색:

- Violet: `#7f56d9`
- Cyan: `#00a6d6`

히어로 비주얼은 외부 이미지를 사용하지 않고 CSS와 SVG로 다음 흐름을 표현한다.

```text
INPUT: 업무 목표·참고 자료
→ AI AGENT: Claude, 맥락 이해·실행·검토
→ OUTPUT: 정리된 문서·자동화 결과
```

### 6.2 실제 반응형 기준

| 구간 | 상세페이지 동작 |
|---|---|
| `1080px` 이하 | 헤더 간격 축소, 히어로 비율 조정, 가치 카드 2열 |
| `820px` 이하 | 데스크톱 내비게이션 숨김, 모바일 메뉴 표시, 히어로 1열, 상세 결과·관련 과정 2열 |
| `560px` 이하 | 주요 카드와 결과·관련 과정 1열, 버튼 풀 너비, 모바일 타이포 축소 |
| reduced motion | 스크롤·전환·애니메이션 사실상 비활성화 |

주의:

- `767px` 규칙은 기존 카테고리 과정 카드 `.cd-course-grid`를 1열로 바꾸는 기준이다.
- AI 에이전트 고유 상세의 핵심 1열 전환은 `560px` 기준이다.
- 이전 인수인계의 “AI 에이전트가 767px에서 전부 1열”이라는 해석은 사용하지 않는다.

검수 권장 너비:

```text
1440, 1080, 1024, 821, 820, 768, 767, 560, 559, 430, 360
```

## 7. 소스 구조와 데이터 흐름

### 7.1 파일별 책임

| 파일 | 책임 | 이번 변경 |
|---|---|---|
| `index.html` | 메인 화면 컨테이너와 스크립트 로딩 | 직접 수정 없음 |
| `data/site-data.js` | 메뉴, 과정 링크, 사이트 콘텐츠, 지도 URL | 수정 |
| `data/curriculum-data.js` | 메인 커리큘럼 탭과 과정명 | 기존 사용 |
| `assets/js/content.js` | 사이트 데이터와 메인 DOM 연결 | 기존 사용 |
| `assets/js/curriculum.js` | 메인 과정 카드와 모달, 상세 URL 탐색 | 수정 |
| `assets/js/submenu.js` | 전체 교육과정 2차 메뉴 | 수정 |
| `data/course-page-data.js` | 카테고리 페이지 설명 데이터 | 기존 사용 |
| `assets/js/course-page.js` | 6개 카테고리 페이지 공통 렌더링 | 기존 사용 |
| `assets/js/course-detail.js` | 카테고리 카드와 상세 공통 인터랙션 | 수정 |
| `data/course-detail-data.js` | 고유 과정별 상세 콘텐츠 | 신규 |
| `assets/js/course-item-page.js` | 고유 상세페이지 공통 렌더러 | 신규 |
| `courses/ai-agent.html` | 파일럿 상세페이지 셸 | 신규 |
| `assets/css/course-detail.css` | 카테고리와 고유 상세 스타일 | 수정 |
| `scripts/validate-data.js` | 데이터, 경로, 상세 연결 검증 | 수정 |
| `Map/Map_Img.png` | 메인 오시는 길 지도 | 수정 |

### 7.2 전체 데이터 흐름

```text
data/site-data.js
├─ shortcuts ───────────────→ assets/js/content.js ─────→ 메인 카테고리 바로가기
├─ courseMenu ──────────────→ assets/js/submenu.js ─────→ 전체 교육과정 메뉴
├─ courseMenu + curriculum ─→ assets/js/curriculum.js ──→ 메인 과정 카드/모달
├─ courseMenu ──────────────→ assets/js/course-detail.js → 카테고리 과정 카드
└─ location.mapImage ───────→ assets/js/content.js ─────→ 메인 지도

data/course-page-data.js
└─ assets/js/course-page.js ─→ 카테고리 상세 6개

data/course-detail-data.js
└─ assets/js/course-item-page.js
   └─ courses/ai-agent.html ─→ AI 에이전트 고유 상세
```

### 7.3 고유 상세페이지를 추가할 때 필요한 최소 연결

현재는 확장하지 않지만, 향후 승인 후 다른 과정을 추가할 때 필요한 구조는 다음과 같다.

1. `data/site-data.js` 과정 항목에 `slug`와 `/courses/{slug}.html` 형태의 `detailUrl` 추가
2. 필요하면 메인 커리큘럼 과정명과 맞추기 위한 `curriculumLabel` 추가
3. `data/course-detail-data.js`에 같은 slug 키의 전체 콘텐츠 추가
4. `courses/{slug}.html` 셸 추가
5. `<body data-course-detail="{slug}">`를 정확히 일치
6. 검증 실행
7. 로컬·Preview 시각 검수

`assets/js/course-item-page.js`가 충분히 공통화되어 있는지 파일럿 승인 후 평가한다. 페이지별 전용 비주얼이 필요하면 데이터 또는 제한된 variant 클래스로 확장하고 대량 복제는 피한다.

## 8. PR에 포함된 정확한 변경 범위

원격 `main...ex_css` 비교 기준 변경 파일은 10개다.

| 파일 | 상태 | 변경량 | 의미 |
|---|---|---:|---|
| `Map/Map_Img.png` | modified | binary | 변경된 대전점 지도 |
| `assets/css/course-detail.css` | modified | `+537` | 고유 상세 레이아웃·반응형 |
| `assets/js/course-detail.js` | modified | `+13/-3` | 상세 링크 카드와 공통 동작 |
| `assets/js/course-item-page.js` | added | `+343` | 고유 상세 공통 렌더러 |
| `assets/js/curriculum.js` | modified | `+27/-2` | 메인 과정 카드 상세 연결 |
| `assets/js/submenu.js` | modified | `+13/-6` | 전체 교육과정 상세 연결 |
| `courses/ai-agent.html` | added | `+22` | AI 에이전트 페이지 셸 |
| `data/course-detail-data.js` | added | `+128` | AI 에이전트 상세 데이터 |
| `data/site-data.js` | modified | `+8/-2` | 과정 링크와 지도 경로 |
| `scripts/validate-data.js` | modified | `+95/-1` | 상세페이지·지도 검증 |

다음 파일은 이번 PR 변경 범위가 아니다.

```text
index.html
assets/scss/**
assets/css/main.css
data/course-page-data.js
assets/js/course-page.js
```

## 9. 지도 이미지 문제의 원인과 해결

### 9.1 사용자가 발견한 증상

`Map/Map_Img.png`를 변경하고 `ex_css`에 반영했지만 Netlify Deploy Preview에서는 이전 지도 이미지가 표시됐다.

### 9.2 원인

메인 지도 데이터가 배포에 포함된 파일이 아니라 아래 운영 `main` CDN 주소를 사용했다.

```text
https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Map/Map_Img.png
```

따라서 `ex_css` Preview에서도 원격 `main`의 지도만 읽었다. 저장소 소유자 경로도 현재 GitHub 저장소 `khjsbs324/SBS`와 달랐다.

### 9.3 수정

`data/site-data.js`:

```js
"mapImage": "/Map/Map_Img.png"
```

루트 상대 경로를 사용하므로:

- 운영 배포에서는 운영 배포에 포함된 이미지
- Deploy Preview에서는 Preview 커밋에 포함된 이미지

를 각각 읽는다.

### 9.4 검증기 보강

`scripts/validate-data.js`에 다음 검사를 추가했다.

- 안전한 루트 상대 URL인지 확인
- `..` 경로 이동 거부
- 루트 상대 경로가 실제 저장소 파일을 가리키는지 확인
- 기존 HTTP(S) URL도 계속 허용

### 9.5 남은 사용자 확인

Netlify 빌드 상태와 반영 커밋은 확인했지만, 제한된 Codex 네트워크 환경에서는 Preview 도메인을 직접 내려받지 못했다. 실제 브라우저에서 다음 주소를 강력 새로고침해 최종 확인해야 한다.

```text
https://deploy-preview-1--sbs-daejeon.netlify.app/#location
```

Windows:

```text
Ctrl + Shift + R
```

그래도 이전 이미지라면 다음을 구분한다.

1. 페이지 HTML/JS 캐시
2. 서비스 워커 또는 브라우저 캐시
3. 실제 이미지 파일 내용이 기대 이미지와 다른 경우
4. 다른 Netlify 배포 또는 운영 URL을 열어 둔 경우

## 10. 검증기와 완료된 검증

### 10.1 실행 명령

최신 제품 변경 기준으로 다음 명령을 통과했다.

```powershell
node --check data/site-data.js
node --check scripts/validate-data.js
npm.cmd run validate
git diff --check
```

`npm.cmd run validate`는 다음을 실행한다.

```text
npm run validate:data
npm run validate:styles
```

### 10.2 데이터 검증이 확인하는 항목

- 사이트·커리큘럼·고유 상세 데이터 로드
- 카테고리와 과정 target 연결
- `detailUrl`이 있는 과정의 slug 존재
- 상세 URL 형식 `/courses/[a-z0-9-]+.html`
- 경로 이동 `..` 금지
- 상세 HTML 실제 존재
- 동일 slug의 상세 데이터 존재
- 상세 데이터가 메뉴에서 실제로 연결됐는지 확인
- 상세 콘텐츠의 chips, quick, curriculum, outcomes, targets, FAQ, related 존재
- HTML의 `data-course-detail`과 slug 일치
- 지도 URL의 안전성과 실제 파일 존재
- 메인 필수 DOM ID 존재
- 메인 중복 ID 없음
- 메인 상대 경로 파일 존재

### 10.3 결과

- 데이터 검증: 통과
- 스타일 검증: `61/61` 통과
- `git diff --check`: 통과
- 기존 데이터 경고: 19개
- 경고 19개는 이미지 매핑과 관련된 기존 경고이며 이번 변경의 실패가 아님
- Netlify GitHub status: success
- Netlify deploy state: ready

### 10.4 검증 완료와 미완료의 경계

완료:

- 코드 문법과 Node 기반 검증
- GitHub 원격 커밋과 PR 상태
- Netlify 빌드 완료와 커밋 일치
- PR 생성 당시 데스크톱 전체 페이지 및 360px 기본 스모크 테스트 기록

아직 최종 완료로 처리하지 말 것:

- 지도 경로 수정 후 사용자의 브라우저에서 새 이미지 육안 확인
- 모든 권장 너비에서 최신 Preview 재검수
- 참고 페이지와 정보 구조 대조
- Figma IA 및 플로우차트 작성
- 사용자 파일럿 디자인 승인
- 운영 `main` 배포

## 11. 로컬 작업 트리와 Codex 환경의 중요한 제약

### 11.1 현재 로컬 상태 스냅샷

```text
## ex_css...origin/ex_css [behind 1]
 M data/site-data.js
 D ex.md
 M scripts/validate-data.js
?? AGENTS.md
?? SBS_ex_css_Codex_CLI_인수인계.md
```

로컬 `git log -1`:

```text
616c0ad feat: add AI agent detail page and update map image
```

### 11.2 왜 원격 커밋이 로컬에서 미커밋처럼 보이는가

현재 Codex 샌드박스에서는 작업 파일은 수정할 수 있지만 `.git`은 읽기 전용으로 제공될 수 있다. 이 때문에 마지막 지도 경로 수정은 GitHub Git Data API를 통해 원격 `ex_css`에 커밋했다.

결과:

- 원격 `ex_css`: `d1043de`
- 로컬 `HEAD`: `616c0ad`
- 로컬 `origin/ex_css`: fetch하지 않았다면 `616c0ad`
- 로컬의 `data/site-data.js`, `scripts/validate-data.js`: 원격 `d1043de`와 같은 수정 내용이지만 로컬 HEAD 기준으로는 modified 표시

이 상태는 원격 커밋 누락이 아니라 **로컬 Git 메타데이터가 한 커밋 뒤에 있는 상태**다.

### 11.3 파일별 소유권과 처리

| 상태 | 파일 | 처리 |
|---|---|---|
| 원격에 이미 반영된 제품 변경 | `data/site-data.js` | 중복 커밋하지 않음 |
| 원격에 이미 반영된 제품 변경 | `scripts/validate-data.js` | 중복 커밋하지 않음 |
| 사용자/기존 로컬 변경 | `ex.md` 삭제 | 임의 복원·삭제·커밋 금지 |
| 사용자가 요청한 지침 | `AGENTS.md` | 현재 미추적, 임의 제품 커밋 금지 |
| 현재 인수인계 | `SBS_ex_css_Codex_CLI_인수인계.md` | 현재 미추적, 사용자 요청 없이 제품 커밋 금지 |

### 11.4 안전한 로컬 동기화

사용자 또는 `.git` 쓰기가 가능한 환경에서만 다음을 실행한다.

```powershell
git status --short --branch
git fetch origin
git log --oneline --decorate -3 origin/ex_css
git diff -- data/site-data.js scripts/validate-data.js
git reset --mixed origin/ex_css
git status --short --branch
```

`git reset --mixed origin/ex_css`의 목적:

- `HEAD`와 인덱스를 원격 최신 커밋으로 이동
- 작업 파일은 그대로 유지
- `ex.md` 삭제와 미추적 문서는 그대로 보존
- 이미 원격에 반영된 두 파일의 modified 표시 제거

금지:

```text
git reset --hard
git checkout --
git clean -fd
```

새 채팅은 명령 실행 전 반드시 실제 `git status`를 다시 확인한다. 이 문서의 상태를 무조건 현재 상태라고 가정하지 않는다.

### 11.5 GitHub Desktop에서 보이는 상태

GitHub Desktop이 마지막 원격 커밋을 fetch하지 않았거나 로컬 HEAD가 이동하지 않았다면 지도 경로 수정 파일이 미커밋처럼 보일 수 있다.

필요한 동작:

1. 현재 저장소가 `C:\Users\SBS\Documents\GitHub\SBS`인지 확인
2. 현재 브랜치가 `ex_css`인지 확인
3. Fetch origin
4. 원격 최신 커밋 `d1043de`가 보이는지 확인
5. 로컬 변경을 보존한 상태로 동기화

다른 경로에 같은 저장소를 clone한 GitHub Desktop 항목을 보고 있지 않은지도 확인한다.

## 12. Figma IA와 플로우차트 작업 상태

### 12.1 현재 상태

- Figma MCP 추가 명령이 대화에서 제시됨: `codex mcp add figma --url https://mcp.figma.com/mcp`
- 현재 Codex 환경에는 Figma 연결 도구가 노출됨
- 대상 Figma 파일과 node `60:2`가 지정됨
- 실제 IA 차트와 페이지 플로우차트 작성 완료 기록은 없음
- 따라서 새 채팅은 차트가 이미 만들어졌다고 가정하지 않는다

새 환경에서 Figma가 보이지 않으면 먼저 다음으로 연결 상태를 확인한다.

```powershell
codex mcp list
```

목록에 없을 때만 다시 추가한다.

### 12.2 IA 차트에 반드시 포함할 것

```text
메인
├─ 주요 교육과정 바로가기
├─ 전체 교육과정 메뉴
│  └─ AI Master
│     ├─ 카테고리 상세
│     └─ AI 에이전트 고유 상세
├─ 수강생 작품
├─ 수강 후기
├─ 오시는 길
└─ 세미나
```

상태 표기:

- 기존 페이지
- 이번 파일럿 구현 완료
- 향후 확장 후보
- 현재 미구현

71개 과정 전체를 모두 구현 완료처럼 그리지 않는다.

### 12.3 사용자 플로우차트에 반드시 포함할 것

주 흐름:

```text
메인 진입
→ 전체 교육과정 열기
→ AI Master 확인
→ AI 에이전트 클릭
→ 고유 상세페이지
→ 과정 소개
→ 커리큘럼
→ 결과물·FAQ
→ 전화 상담 또는 AI Master 복귀
```

대체 진입:

```text
메인 AI Master 카테고리 바로가기
→ AI Master 카테고리 상세
→ AI 에이전트 카드
→ 고유 상세페이지
```

예외 흐름:

```text
detailUrl 없는 과정 클릭
→ 기존 모달 또는 상담 안내
```

### 12.4 Figma 산출물 권장 구성

node `60:2` 아래 또는 사용자가 지정한 인접 공간에 다음 프레임을 구분한다.

1. `CURRENT IA — SBS Daejeon`
2. `PILOT USER FLOW — AI Agent`
3. `PAGE ANATOMY — /courses/ai-agent.html`
4. `FUTURE EXPANSION — 71 course entries`
5. `LEGEND — Existing / Pilot / Future / External`

차트 작성 전 Figma 파일의 실제 현재 구조와 node 이름을 읽고, 기존 사용자의 프레임을 덮어쓰지 않는다.

## 13. 남아 있는 작업과 알려진 위험

### 13.1 반드시 남은 작업

1. 최신 Preview에서 변경된 지도 이미지 육안 확인
2. AI 에이전트 페이지 데스크톱·태블릿·모바일 재검수
3. 실제 클릭 경로 A~D 확인
4. 콘솔 오류 확인
5. 참고 페이지와 정보 구조 비교
6. Figma IA와 플로우차트 작성
7. 사용자 파일럿 승인

### 13.2 현재 알려진 위험

| 위험 | 설명 | 대응 |
|---|---|---|
| 로컬 HEAD 지연 | 원격보다 한 커밋 뒤 | 안전한 fetch + mixed reset 또는 GitHub API 기준 확인 |
| 브라우저 캐시 | 이전 지도 표시 가능 | Preview URL 확인 후 강력 새로고침 |
| 상대 경로 | Netlify는 Linux case-sensitive | `/Map/Map_Img.png` 대소문자 유지 |
| JavaScript 의존 | 상세 본문이 동적으로 생성 | 스크립트 로딩 순서와 콘솔 오류 확인 |
| 동적 데이터 키 | slug 불일치 시 페이지 로드 실패 | validator와 `data-course-detail` 일치 유지 |
| 장문 줄바꿈 | 360px에서 한국어 문구가 길 수 있음 | 360/430px 육안 확인 |
| 참고 페이지 해석 | 직접 대조가 완료되지 않음 | 브라우저로 참고 페이지를 열어 IA 중심 비교 |
| 과도한 확장 | 70개 페이지를 일괄 생성할 위험 | 사용자 승인 전 파일럿 1개 유지 |

### 13.3 의도적으로 하지 않은 것

- `main` 병합
- 운영 Netlify 배포
- 새 Netlify 사이트 생성
- 나머지 70개 고유 상세페이지 생성
- 수강료 조회 폼 구현
- 데이터베이스 또는 관리자 CMS 연결
- 참고 사이트 문구와 이미지를 복사
- Figma 차트 완료 선언

## 14. 새 채팅의 정확한 작업 순서

### 단계 1: 지침과 상태 읽기

```text
1. AGENTS.md 전체 읽기
2. SBS_ex_css_Codex_CLI_인수인계.md 전체 읽기
3. 새 사용자 메시지와 충돌하는 과거 상태가 있는지 확인
```

### 단계 2: 로컬과 원격 확인

```powershell
git status --short --branch
git branch --show-current
git remote -v
git log -1 --oneline
git log --oneline --decorate -5
```

가능하면 GitHub 연결로 다음도 재확인한다.

- `ex_css` 최신 SHA
- PR #1 상태와 head SHA
- Netlify commit status

이 문서에 적힌 SHA와 달라졌다면 새 원격 상태를 우선하고 문서를 다시 갱신한다.

### 단계 3: 로컬 동기화 판단

다른 로컬 변경을 보존한 상태에서만 fetch 또는 mixed reset을 사용한다. `.git`이 읽기 전용이면 억지로 로컬 커밋하지 말고 GitHub 연결과 로컬 파일을 비교한다.

### 단계 4: 로컬 검증

```powershell
npm.cmd run validate
git diff --check
node --check data/site-data.js
node --check data/course-detail-data.js
node --check assets/js/course-item-page.js
node --check assets/js/course-detail.js
```

### 단계 5: Preview 스모크 테스트

대상:

```text
https://deploy-preview-1--sbs-daejeon.netlify.app/
https://deploy-preview-1--sbs-daejeon.netlify.app/courses/ai-master.html
https://deploy-preview-1--sbs-daejeon.netlify.app/courses/ai-agent.html
https://deploy-preview-1--sbs-daejeon.netlify.app/#location
```

화면:

```text
1440, 1080, 1024, 821, 820, 768, 560, 559, 430, 360
```

기능:

- 전체 교육과정 열기·닫기
- AI 에이전트 링크
- 메인 커리큘럼 링크
- AI Master 카드 링크
- breadcrumb
- 헤더 앵커
- 모바일 메뉴
- FAQ
- CTA와 전화 링크
- 관련 과정
- 지도 이미지
- 콘솔 오류
- 가로 오버플로
- 키보드 포커스
- reduced motion

### 단계 6: Figma IA·플로우차트

Figma skill 지침을 먼저 읽고 파일 구조를 확인한 뒤 node `60:2`에서 현재 IA, 파일럿 사용자 흐름, 페이지 해부도를 작성한다.

차트에는 “현재 구현”과 “향후 70개 확장”을 시각적으로 분리한다.

### 단계 7: 발견된 문제만 최소 수정

문제와 관련된 파일만 수정한다.

```powershell
npm.cmd run validate
git diff --check
git status --short
git diff --stat
git diff
```

커밋 범위에서 다음을 제외한다.

```text
ex.md
AGENTS.md
SBS_ex_css_Codex_CLI_인수인계.md
node_modules/
.netlify/
임시 QA 파일
```

단, 사용자가 문서 커밋을 별도로 요청하면 문서 전용 커밋으로 처리할 수 있다.

### 단계 8: `ex_css` Preview 갱신

제품 수정이 있을 때만:

1. `ex_css`에 Conventional Commit
2. 원격 `ex_css` 푸시
3. PR #1 head SHA 확인
4. Netlify status가 `success`/`ready`가 될 때까지 확인
5. Preview 재검수

### 단계 9: 사용자 승인 요청

다음 결과를 보여준다.

- Preview 링크
- 데스크톱·모바일 검수 결과
- 지도 확인 결과
- Figma IA·플로우차트 링크
- 남은 문제

승인 전 운영 배포로 넘어가지 않는다.

## 15. 향후 운영 반영 절차

이 절은 사용자가 `main` 반영을 명시적으로 승인한 뒤에만 실행한다.

사용자와 처음 합의한 운영 반영 순서:

1. 원격 `main` 최신 상태 확인
2. 기존 로컬 미커밋 파일을 건드리지 않도록 별도 작업 공간 준비
3. `ex_css → main` 병합
4. 전체 검증 실행
5. `main` 푸시
6. Netlify 운영 배포 확인
7. 운영 사이트 스모크 테스트

안전 원칙:

- 현재 dirty worktree에서 바로 병합하지 않는다.
- 별도 worktree나 깨끗한 clone을 사용한다.
- PR head와 검수한 Preview commit이 같은지 확인한다.
- 병합 전 `main`이 이동했으면 다시 비교·검증한다.
- 운영 배포 성공만 확인하지 말고 실제 페이지와 지도를 다시 확인한다.

## 16. 파일럿 완료 기준

다음이 모두 충족돼야 AI 에이전트 파일럿을 완료로 처리한다.

- [ ] 원격 `ex_css` 최신 커밋과 Preview commit ref 일치
- [ ] 메인 전체 교육과정에서 상세페이지 이동
- [ ] 메인 커리큘럼 카드에서 상세페이지 이동
- [ ] AI Master 카테고리 카드에서 상세페이지 이동
- [ ] breadcrumb와 관련 과정 링크 정상
- [ ] 히어로부터 푸터까지 모든 섹션 표시
- [ ] 6단계 커리큘럼, 결과물 3개, 추천 4개, FAQ 4개 표시
- [ ] 모바일 메뉴와 FAQ 키보드 동작 정상
- [ ] 권장 너비에서 잘림·겹침·가로 오버플로 없음
- [ ] 콘솔 오류 없음
- [ ] 변경된 지도 이미지 육안 확인
- [ ] `npm.cmd run validate` 통과
- [ ] `git diff --check` 통과
- [ ] Figma IA와 플로우차트 작성
- [ ] 사용자가 파일럿 화면 승인

## 17. 인수인계 문서의 휴대성

현재 다음 문서는 로컬 미추적 파일이다.

```text
AGENTS.md
SBS_ex_css_Codex_CLI_인수인계.md
```

따라서:

- 같은 PC, 같은 저장소, 새 채팅: 읽고 이어갈 수 있음
- 다른 PC 또는 새 clone: 문서가 자동으로 내려오지 않음

다른 환경에서도 자동으로 이어가려면 사용자의 별도 요청을 받아 문서 전용 커밋으로 `ex_css`에 반영해야 한다. 제품 코드 커밋에 무심코 섞지 않는다.

## 18. 새 Codex 채팅에 입력할 시작 프롬프트

```text
C:\Users\SBS\Documents\GitHub\SBS 저장소에서 작업해줘.

먼저 AGENTS.md와 SBS_ex_css_Codex_CLI_인수인계.md를 처음부터 끝까지 읽어.
현재 제품 작업 브랜치는 ex_css이고, 문서에 기록된 원격 기준은
d1043dea2a14073721d6ec87b0ca0162c2265b95야.

하지만 문서 상태를 그대로 믿지 말고 git status, 현재 브랜치, 원격 ex_css,
Draft PR #1의 head SHA와 Netlify Deploy Preview 상태를 읽기 전용으로 다시 확인해.
기존 로컬 변경인 ex.md 삭제, AGENTS.md와 인수인계 문서를 임의로 복원·삭제·커밋하지 마.

현재 목표는 AI 에이전트(클로드) 고유 상세페이지 1개 파일럿이야.
다른 70개 고유 상세페이지는 만들지 마.

먼저 아래 Preview에서 실제 화면을 검수해:
https://deploy-preview-1--sbs-daejeon.netlify.app/courses/ai-agent.html

메인 지도도 강력 새로고침 후 확인해:
https://deploy-preview-1--sbs-daejeon.netlify.app/#location

그다음 지정된 Figma 파일의 node 60:2를 확인하고,
현재 사이트 IA, AI 에이전트 사용자 플로우, 상세페이지 구조도를 작성해.
현재 구현과 향후 확장을 구분해서 표시해.

발견된 문제만 최소 수정하고 npm.cmd run validate와 git diff --check를 실행해.
사용자 승인 전 main 병합, 운영 배포, 다른 상세페이지 확장을 하지 마.
```

## 19. 다음 인수인계 갱신 규칙

다음 상태가 바뀔 때 이 파일도 갱신한다.

- 원격 `ex_css` 최신 SHA
- PR 상태 또는 head SHA
- Netlify Deploy ID와 Preview URL
- 지도 육안 확인 결과
- Figma 차트 위치와 완료 상태
- 사용자 파일럿 승인 여부
- 추가된 고유 상세페이지 수
- `main` 병합·운영 배포 여부

완료된 항목과 계획을 섞지 말고 각각 `완료`, `검증 대기`, `미착수`로 구분한다.
