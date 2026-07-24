/**
 * 사이트 운영 콘텐츠 데이터
 *
 * 교육과정 외 이미지 주소, 세미나, 포트폴리오, 후기, 지도 및 연락처는
 * 이 파일에서만 수정합니다.
 */
window.SBSSiteData = Object.freeze({
    "brand": {
        "logoUrl": "https://se.sbsart.com/2022/img/common/logo.svg"
    },
    "shortcuts": [
        {
            "target": "ai_agent",
            "label": "AI Master",
            "title": "AI Master",
            "description": [
                "AI 자동화, 바이브코딩"
            ],
            "ariaLabel": "AI Master 교육과정 바로가기"
        },
        {
            "target": "uiux",
            "label": "HOT",
            "title": "AI 디자인",
            "description": [
                "AI 디자인",
                "웹 UIUX, 시각편집"
            ],
            "ariaLabel": "AI 디자인 교육과정 바로가기",
            "detailUrl": "./courses/ai-design.html"
        },
        {
            "target": "motion",
            "label": "AI 모션·CG",
            "title": "AI 모션/CG",
            "description": [
                "유튜브/영상편집"
            ],
            "ariaLabel": "AI 모션·CG 교육과정 바로가기"
        },
        {
            "target": "webtoon",
            "label": "AI 웹툰/드로잉",
            "title": "AI 웹툰/드로잉",
            "description": [
                "미술 기초, 디지털드로잉"
            ],
            "ariaLabel": "AI 웹툰·드로잉 교육과정 바로가기"
        },
        {
            "target": "archi",
            "label": "AI 인테리어",
            "title": "AI 인테리어/제품",
            "description": [
                "인테리어/기계,제품"
            ],
            "ariaLabel": "AI 인테리어·제품 교육과정 바로가기"
        },
        {
            "target": "cert",
            "label": "AI 자격증",
            "title": "자격증",
            "description": [
                "디자인/사무/AI자격증"
            ],
            "ariaLabel": "AI 자격증 교육과정 바로가기"
        }
    ],
    "courseMenu": [
        {
            "id": "master",
            "title": "AI MASTER",
            "target": "ai_agent_basic",
            "items": [
                { "label": "AI 에이전트(클로드)", "target": "ai_agent_basic" },
                { "label": "AI 프롬프트 엔지니어링", "target": "ai_agent_basic" },
                { "label": "AI-POT", "target": "cert_field" },
                { "label": "AI 바이브코딩", "target": "ai_agent_advanced" },
                { "label": "AI 마케팅 영상 제작", "target": "youtube" },
                { "label": "AI 비주얼 디자인", "target": "ai_agent_advanced" },
                { "label": "스마트 AI 생활활용(시니어)", "target": "senior" },
                { "label": "WRTN AI", "target": "ai_agent_basic" },
                { "label": "국가공인 AI 자격증 - AICE", "target": "cert_field" }
            ]
        },
        {
            "id": "design",
            "title": "AI 디자인",
            "target": "uiux",
            "items": [
                { "label": "시각디자이너 전문가(취업) 과정", "target": "national", "group": "국비 과정" },
                { "label": "인디자인 디지털출판 과정", "target": "visual", "group": "시각편집디자인" },
                { "label": "AI 크리에이터 - 시각편집", "target": "ai_agent_advanced", "group": "AI 심화" },
                { "label": "디자인 실무 포트폴리오", "target": "visual", "group": "시각편집디자인" },
                { "label": "패키지·브랜딩 디자인", "target": "visual", "group": "시각편집디자인" },
                { "label": "포토샵", "target": "design_basic", "group": "디자인 기초" },
                { "label": "일러스트", "target": "design_basic", "group": "디자인 기초" },
                { "label": "UI/UX 웹디자인 전문가 & 취업 포트폴리오", "target": "uiux", "group": "UI/UX" },
                { "label": "Figma", "target": "uiux", "group": "UI/UX" },
                { "label": "UI/UX 디자인", "target": "uiux", "group": "UI/UX" },
                { "label": "AI 바이브코딩", "target": "ai_agent_advanced", "group": "AI 심화" },
                { "label": "UI/UX 포트폴리오", "target": "uiux", "group": "UI/UX" }
            ]
        },
        {
            "id": "motion",
            "title": "AI 모션·CG",
            "target": "motion",
            "items": [
                { "label": "모션그래픽디자이너 전문가(취업)과정", "target": "motion" },
                { "label": "CG 애니메이션 전문가(취업)과정", "target": "cg_vfx" },
                { "label": "AI 모션그래픽 제작", "target": "ai_agent_advanced" },
                { "label": "AI 크리에이터 - 유튜브", "target": "youtube" },
                { "label": "AI 크리에이터 - 영상·모션", "target": "ai_agent_advanced" },
                { "label": "프리미어 프로(영상 편집)", "target": "motion" },
                { "label": "애프터이펙트", "target": "motion" },
                { "label": "Cinema 4D", "target": "motion" },
                { "label": "블렌더", "target": "motion" },
                { "label": "모션그래픽 포트폴리오", "target": "motion" },
                { "label": "AI CG·3D 비주얼 제작", "target": "cg_vfx" },
                { "label": "3D 에셋(지브러쉬)", "target": "cg_vfx" },
                { "label": "리깅 & 애니메이션", "target": "cg_vfx" },
                { "label": "합성(누크)", "target": "cg_vfx" },
                { "label": "FX(후디니)", "target": "cg_vfx" },
                { "label": "룩뎁(언리얼)", "target": "cg_vfx" },
                { "label": "CG 포트폴리오", "target": "cg_vfx" }
            ]
        },
        {
            "id": "drawing",
            "title": "AI 웹툰·드로잉",
            "target": "webtoon",
            "items": [
                { "label": "웹툰 & AI 어시스트", "target": "webtoon" },
                { "label": "AI 아트 크리에이터", "target": "ai_agent_advanced" },
                { "label": "디지털아트 드로잉 마스터과정", "target": "artwork" },
                { "label": "캐릭터 콘텐츠 크리에이터(이모티콘·굿즈)", "target": "artwork" },
                { "label": "스토리보드 & 비주얼 스토리텔링", "target": "motion" },
                { "label": "아이패드 드로잉", "target": "artwork" },
                { "label": "비주얼 아이디어 & 컬러 디자인", "target": "artwork" }
            ]
        },
        {
            "id": "interior",
            "title": "AI 인테리어·제품",
            "target": "archi",
            "items": [
                { "label": "인테리어·기계제품 취업과정", "target": "national" },
                { "label": "AI 크리에이터 - 인테리어", "target": "ai_agent_advanced" },
                { "label": "실내건축 자격증", "target": "archi" },
                { "label": "공간디자인 기초", "target": "archi" },
                { "label": "리터칭 및 도면 표현", "target": "archi" },
                { "label": "오토캐드", "target": "archi" },
                { "label": "스케치업 프로", "target": "archi" },
                { "label": "3ds Max", "target": "archi" },
                { "label": "BIM", "target": "archi" },
                { "label": "Inventor", "target": "product_cert" },
                { "label": "라이노세라스(라이노)", "target": "product_cert" },
                { "label": "포트폴리오", "target": "archi" }
            ]
        },
        {
            "id": "certificate",
            "title": "자격증",
            "target": "cert_oa",
            "items": [
                { "label": "MOS", "target": "cert_oa" },
                { "label": "컴퓨터활용능력 2급", "target": "cert_oa" },
                { "label": "컴퓨터활용능력 1급", "target": "cert_oa" },
                { "label": "회계실무 기초과정", "target": "cert_oa" },
                { "label": "세무실무 중급과정", "target": "cert_oa" },
                { "label": "세무실무 전문가과정", "target": "cert_oa" },
                { "label": "재경관리사", "target": "cert_oa" },
                { "label": "WRTN AI", "target": "ai_agent_basic" },
                { "label": "AI-POT", "target": "cert_field" },
                { "label": "국가공인 AI 자격증 - AICE", "target": "cert_field" },
                { "label": "컴퓨터그래픽기능사", "target": "cert_field" },
                { "label": "웹디자인개발기능사", "target": "cert_field" },
                { "label": "GTQ·GTQi", "target": "cert_field" },
                { "label": "ACP", "target": "cert_field" }
            ]
        }
    ],
    "portfolio": [
        {
            "detailImage": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EC%9D%B8%EB%A7%88%EB%A6%AC%EC%95%84,%20%EB%B0%B0%EB%AF%B8%EB%82%98,%20%EB%B0%95%EC%86%8C%ED%98%B8,%20%EC%8B%AC%EC%9C%A0%EB%82%98%20%EB%B3%B8%EB%AC%B8.jpg",
            "thumbnail": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EC%9D%B8%EB%A7%88%EB%A6%AC%EC%95%84,%20%EB%B0%B0%EB%AF%B8%EB%82%98,%20%EB%B0%95%EC%86%8C%ED%98%B8,%20%EC%8B%AC%EC%9C%A0%EB%82%98%20%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg",
            "alt": "수강생 작품"
        },
        {
            "detailImage": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/(%EA%B0%95%EC%98%88%EB%A6%AC,%20%EA%B9%80%EB%AF%BC%EC%B2%B4,%20%EC%9B%90%EC%98%88%EC%A7%80,%20%EA%B9%80%EB%8F%84%EC%97%B0)%20%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg",
            "thumbnail": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/(%EA%B0%95%EC%98%88%EB%A6%AC,%20%EA%B9%80%EB%AF%BC%EC%B2%B4,%20%EC%9B%90%EC%98%88%EC%A7%80,%20%EA%B9%80%EB%8F%84%EC%97%B0)%20%EC%8D%B8%EB%84%A4%EC%9D%BC-1.jpg",
            "alt": "수강생 작품"
        },
        {
            "detailImage": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EC%9D%B8%EB%A7%88%EB%A6%AC%EC%95%84%20%EB%B3%B8%EB%AC%B8(0).jpg",
            "thumbnail": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EC%9D%B8%EB%A7%88%EB%A6%AC%EC%95%84%20%EC%8D%B8%EB%84%A4%EC%9D%BC.png",
            "alt": "수강생 작품"
        },
        {
            "detailImage": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EA%B9%80%EA%B2%BD%EC%9D%80,%20%EC%9C%A4%EC%84%B1%EB%AF%BC_%EB%B3%B8%EB%AC%B8.jpg",
            "thumbnail": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EA%B9%80%EA%B2%BD%EC%9D%80,%20%EC%9C%A4%EC%84%B1%EB%AF%BC_%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg",
            "alt": "수강생 작품"
        },
        {
            "detailImage": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EA%B9%80%EC%88%98%EB%B9%88,%20%EB%B0%95%EC%9D%80%EB%B9%84,%20%EC%9C%A4%ED%83%9D%ED%95%9C_%EB%B3%B8%EB%AC%B8.jpg",
            "thumbnail": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EA%B9%80%EC%88%98%EB%B9%88,%20%EB%B0%95%EC%9D%80%EB%B9%84,%20%EC%9C%A4%ED%83%9D%ED%95%9C_%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg",
            "alt": "수강생 작품"
        },
        {
            "detailImage": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EA%B9%80%EC%9C%A0%EC%8B%A0,%20%EB%82%98%EC%9C%A4%ED%95%98,%20%EC%9E%84%EC%86%8C%EC%97%B0_%EB%B3%B8%EB%AC%B8.jpg",
            "thumbnail": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EA%B9%80%EC%9C%A0%EC%8B%A0,%20%EB%82%98%EC%9C%A4%ED%95%98,%20%EC%9E%84%EC%86%8C%EC%97%B0_%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg",
            "alt": "수강생 작품"
        },
        {
            "detailImage": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EC%86%A1%EB%A7%8C%EA%B8%B0%20%EB%B3%B8%EB%AC%B8.jpg",
            "thumbnail": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EC%86%A1%EB%A7%8C%EA%B8%B0%20%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg",
            "alt": "수강생 작품"
        },
        {
            "detailImage": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EB%B3%B8%EB%AC%B8%201000(0).jpg",
            "thumbnail": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EC%8D%B8%EB%84%A4%EC%9D%BC%20400300.jpg",
            "alt": "수강생 작품"
        },
        {
            "detailImage": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/portfolio3.jpg",
            "thumbnail": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/SBS_portfolio_thumb(610).jpg",
            "alt": "수강생 작품"
        },
        {
            "detailImage": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EC%9E%84%EB%8B%A4%ED%98%9C%20%EB%B3%B8%EB%AC%B8.jpg",
            "thumbnail": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EC%9E%84%EB%8B%A4%ED%98%9C%20%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg",
            "alt": "수강생 작품"
        },
        {
            "detailImage": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EB%B0%B0%EC%88%98%EC%97%B0%20%EB%B3%B8%EB%AC%B8.jpg",
            "thumbnail": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EB%B0%B0%EC%88%98%EC%97%B0%20%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg",
            "alt": "수강생 작품"
        },
        {
            "detailImage": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EA%B9%80%EB%AF%BC%EC%86%94%20%EB%B3%B8%EB%AC%B8.jpg",
            "thumbnail": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EA%B9%80%EB%AF%BC%EC%86%94%20%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg",
            "alt": "수강생 작품"
        },
        {
            "detailImage": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EC%97%84%EB%AF%BC%EC%84%AD%20%EB%B3%B8%EB%AC%B8.jpg",
            "thumbnail": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EC%97%84%EB%AF%BC%EC%84%AD%20%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg",
            "alt": "수강생 작품"
        },
        {
            "detailImage": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EA%B3%A0%EC%96%B8%EC%A0%95%20%EB%B3%B8%EB%AC%B8.jpg",
            "thumbnail": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EA%B3%A0%EC%96%B8%EC%A0%95%20%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg",
            "alt": "수강생 작품"
        },
        {
            "detailImage": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EC%8B%AC%ED%9A%A8%EC%9D%80%20%EB%B3%B8%EB%AC%B8.jpg",
            "thumbnail": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EC%8B%AC%ED%9A%A8%EC%9D%80%20%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg",
            "alt": "수강생 작품"
        },
        {
            "detailImage": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EC%8B%AC%ED%9A%A8%EC%9D%80%20%EB%B3%B8%EB%AC%B8(0).jpg",
            "thumbnail": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EC%8B%AC%ED%9A%A8%EC%9D%80%20%EB%B3%B8%EB%AC%B8(0).jpg",
            "alt": "수강생 작품"
        },
        {
            "detailImage": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EB%B0%95%ED%98%84%EC%A0%95%20%EB%B3%B8%EB%AC%B81.jpg",
            "thumbnail": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EB%B0%95%ED%98%84%EC%A0%95%20%EC%8D%B8%EB%84%A4%EC%9D%BC1.jpg",
            "alt": "수강생 작품"
        },
        {
            "detailImage": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EC%9C%A0%EC%86%8C%EC%9D%B4%20%EB%B3%B8%EB%AC%B8.jpg",
            "thumbnail": "https://cdn.koreaedugroup.com/sbsfile/gallery_img/%EC%9C%A0%EC%86%8C%EC%9D%B4%20%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg",
            "alt": "수강생 작품"
        }
    ],
    "reviews": {
        "hero": {
            "type": "수강생 취업자 특강",
            "title": "\"SBS아카데미컴퓨터아트학원 대전지점 취업자 현직자 특강\"",
            "subtitle": "[컴퓨터 대전] UIUX 현직자 특강",
            "year": "2026",
            "name": "김선민"
        },
        "items": [
            {
                "type": "취업생 인터뷰",
                "quote": "\"학원에서의 배움을 토대로 현재 디자이너로서 다양한 경험을 하고 있습니다.\"",
                "course": "[대전] 웹디자인",
                "name": "임예나"
            },
            {
                "type": "취업생 인터뷰",
                "quote": "\"자소서 작성이나 포트폴리오를 준비할 때에도 첨삭과 피드백을 받을 수 있어 큰 도움이 되었습니다.\"",
                "course": "[대전] 광고편집",
                "name": "최해인"
            },
            {
                "type": "수강생 인터뷰",
                "quote": "\"비전공자도 아트에 관련한 직무 역량을 기초부터 쌓을 수 있도록 체계적으로 커리큘럼이 갖춰져 있다고 느꼈습니다.\"",
                "course": "[대전] CG",
                "name": "김동권"
            },
            {
                "type": "수강생 인터뷰",
                "quote": "\"일단 훌륭한 강사님께서 수강생 한 명, 한 명의 수준과 속도에 최대한 맞춰가면서 수업을 진행해주신 점이 도움이 되지 않았나 싶습니다.\"",
                "course": "[대전] 모션그래픽",
                "name": "강대솔"
            }
        ]
    },
    "location": {
        "mapImage": "https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Map/Map_Img.png",
        "mapAlt": "SBS아카데미컴퓨터아트학원 대전점 위치 지도",
        "academyName": "SBS아카데미컴퓨터아트학원 대전점",
        "addressLines": [
            "대덕대로 179 굿모닝어학원빌딩 9층",
            "sbs아카데미컴퓨터아트학원 대전점"
        ],
        "subway": "시청역 2번 출구에서 타임월드 방향으로 10분거리",
        "phone": "042-719-8383"
    },
    "seminars": {
        "applicationMethod": "스마트러닝 앱 → 메인페이지 화면 중앙(특강 및 세미나) → 원하는 세미나 클릭! → 하단 (특강&세미나) 신청",
        "items": [
            {
                "branch": "[대전지점]",
                "title": "인스타툰으로 시작하는 나만의 콘텐츠 브랜딩 세미나",
                "description": "퍼스널 브랜딩부터 실전 드로잉, 채널 성장 노하우까지 현업 작가에게 직접 배웁니다.",
                "date": "2026. 04. 29 (수) 16:00",
                "applicationPeriod": "2026. 04. 01 ~ 2026. 04. 28",
                "image": "https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/seminar/seminar1.jpg",
                "backgroundClass": "poster-lilac"
            },
            {
                "branch": "[대전지점]",
                "title": "AI가 대신 일하는 시대, AI에이전트 실전 세미나",
                "description": "Claude Code로 만드는 자동화 워크플로우 실무 활용 및 확장 전략을 배웁니다.",
                "date": "2026. 04. 30 (목) 14:00 - 16:00",
                "applicationPeriod": "2026. 04. 01 ~ 2026. 04. 29",
                "image": "https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/seminar/seminar2.jpg",
                "backgroundClass": "poster-night"
            },
            {
                "branch": "[대전지점]",
                "title": "인테리어 AI 크리에이터 신규과정 런칭",
                "description": "신규과정 소개와 인테리어 분야에서의 AI전망 및 연계 방법을 알아봅니다.",
                "date": "2025. 11. 28 (금) 13:00 - 15:00",
                "applicationPeriod": "~ 2025. 11. 27",
                "image": "https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/seminar/seminar3.jpg",
                "backgroundClass": "poster-clay"
            }
        ],
        "all": {
            "title": "Xgen / ACP 자격증 등",
            "label": "특강 전체보기 →",
            "url": "https://se.sbsart.com/community/seminar.asp?placeSeq=12"
        }
    },
    "contact": {
        "phone": "042-719-8383",
        "email": "privacy@koreaedugroup.com",
        "blogUrl": "https://blog.naver.com/korea_sbs"
    }
});
