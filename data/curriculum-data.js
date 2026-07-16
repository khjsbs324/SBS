/**
 * 주요 교육과정 데이터
 *
 * 이미지 주소, 과목 순서, 과정명을 수정할 때 이 파일만 변경합니다.
 */
(() => {
    const curriculumData = {
        'design_basic': ['일러스트', '포토웍스', '포토샵', '디테일일러스트'],
        'webtoon': ['발상과 표현', '색채학', '해부학', '웹툰 1-6', '웹툰포폴'],
        'artwork': ['디지털드로잉1-6', '발상과 표현', '색채학', '해부학', '인스타툰(금요특강)'],
        'ai_agent_basic': ['AI프롬프트엔지니어링1-2', 'AI 에이전트 기초/심화'],
        'ai_agent_advanced': ['AI크리에이터 바이브코딩', 'AI크리에이터 아트웍', 'AI크리에이터 CG마야', 'AI크리에이터 인테리어', 'AI크리에이터 유튜브', 'AI크리에이터 영상모션', 'AI크리에이터 편집', 'AI크리에이터 웹툰(이미지 준비중)'],
        'uiux': ['웹1-3', 'UIUX1-3', 'UIUX 스프린트(포폴기획 - 금요특강)', '웹포폴1-2'],
        'ai_sw': ['파이썬 1-3', '자바 1-2', 'C언어 1-2', '머신러닝 1-4(이미지 준비중)'],
        'visual': ['인포그래픽', '그래픽아트웍', '인디자인', '비주얼 아트 디렉터', '편집포폴 1-2'],
        'archi': ['캐드 1-2', '전산응용건축제도', '스케치업1-2', '맥스 1-3', 'BIM1-2', '실내건축자격증1-4&시공실무', '인테리어 콘셉트 제네시스(포폴기획 - 금요특강)', '인테리어 포폴 1-3'],
        'motion': ['프리미어', '베이직에펙', '모션에펙', '어드벤스에펙', '숏폼컨텐츠(금요특강)', 'Blender1-2', '시네마4D 1-4', '스토리보드 1-6', '모션 쇼릴(포폴기획 - 금요특강)', '모션포폴 1-3'],
        'cg_vfx': ['프리미어', '베이직에펙', '모션에펙', '어드벤스에펙', 'Blender1-2', '마야 1-7', '스토리보드1-6', '마야크리틱(포폴기획 - 금요특강)', '마야포폴1-6'],
        'youtube': ['프리미어', '베이직에펙', '모션에펙', '어드벤스에펙', '유튜브(영크리)', '유튜브(시니어)', '숏폼컨텐츠(금요특강)'],
        'product_cert': ['캐드 1-2', '퓨전360 1-2(이미지 준비중)', '인벤터', '전산응용기계제도'],
        'senior': ['컴퓨터기초(금요특강)'],
        'cert_oa': ['모스', '컴활2급', '컴활1급', '전산회계1급', '전산세무2급', '재경관리사', '실무엑셀(금요특강)(이미지 준비중)'],
        'cert_field': ['GTQ/GTQi', '컴퓨터그래픽기능사', '웹디자인개발기능사', '컬러리스트기사/산업기사', '정보처리기사/산업기사(이미지 준비중)', 'AICE', '정보처리기능사'],
        'national': ['편집디자인(포토샵, 일러스트, 인디자인) 실무자 양성과정', '실내건축 인테리어 과정(CAD, 스케치업)', '영상편집&유튜브편집제작(프리미어,에프터이펙트)실무자 양성과정', '[BIM] 스마트 건축 설계&실내인테리어 3D디자이너 양성과정(캐드,스케치업,레빗)', '[디지털디자인] AI 기반 UIUX 웹디자인 & 웹퍼블리셔 양성과정(Figma, HTML5, CSS)', '[디지털컨버전스] 공공데이터 융합 풀스택 웹 개발자 양성과정(Next.js & Spring)', '[과정평가형] 실내건축기능사 취득과정 (캐드,스케치업)']
    };

    const categoryNames = {
        'design_basic': '디자인 기초', 'webtoon': '웹툰', 'artwork': '아트웍(드로잉)',
        'ai_agent_basic': 'AI에이전트 (AI 기초)', 'ai_agent_advanced': 'AI에이전트 (AI 학과 심화)', 'uiux': 'UIUX바이브', 'ai_sw': '인공지능융합 SW',
        'visual': '시각편집디자인', 'archi': '건축, 인테리어', 'motion': '모션 그래픽',
        'cg_vfx': 'CG·VFX', 'youtube': '유튜브 크리에이터', 'product_cert': '제품/기계자격증',
        'senior': '시니어', 'cert_oa': '자격증 (사무 OA)', 'cert_field': '자격증 (분야별)', 'national': '국기'
    };

    const courseFlowData = {
        'design_basic': '일러스트,포토샵 > 디테일일러스트,포토웍스',
        'webtoon': '발상과 표현 > 색채학 > 해부학 > 포토샵/일러스트 > 포토웍스/디테일 일러스트 > 웹툰 1-6 > ComfyUI, Stable Diffusion > 웹툰 포폴',
        'artwork': '아트웍기초 > 발상과표현 > 색채학 > 해부학 > 포토샵/일러스트 > 포토웍스/디테일 일러스트 > 디지털 드로잉 1-6 > AI크리에이터 > ComfyUI, Stable Diffusion > 디지털 드로잉 포폴',
        'ai_agent_basic': 'AI 프롬프트엔지니어링1-2 > AI 에이전트 기초/심화 > AI 크리에이터',
        'ai_agent_advanced': 'AI 프롬프트엔지니어링1-2 > AI 에이전트 기초/심화 > AI 크리에이터',
        'uiux': '발상과표현 > 색채학 > 포토샵/일러스트 > 포토웍스/디테일 일러스트 > 인포그래픽/그래픽아트웍 > 웹 1-3 > UIUX 1-3 > AI크리에이터-바이브코딩 > UIUX-스프린트 > 웹포폴 1-2',
        'ai_sw': '파이썬 1-3 > 자바 1-2 > C언어 1-2 > 머신러닝 1-4',
        'visual': '발상과표현 > 색채학 > 포토샵/일러스트 > 포토웍스/디테일 일러스트 > 인포그래픽/그래픽아트웍 > 인디자인 > AI크리에이터-시각편집 > 시각편집-비주얼 아트 디렉터 > 편집포폴 1-2',
        'archi': '발상과표현 > 색채학 > 포토샵/일러스트 > 포토웍스/디테일 일러스트 > 캐드 1-2 > 전산응용건축제도 기능사 > 스케치업 1-2 > 맥스 1-3 / Revit BIM(건축설계)1-2 > 시공실무 (기사/산업기사) > 실내건축자격증1-4 > AI크리에이터-인테리어 > 인테리어-ICG > 인테리어 포폴 1-3',
        'motion': '발상과표현 > 색채학 > 포토샵/일러스트 > 포토웍스/디테일 일러스트 > 디지털 드로잉 1-6 > 프리미어 / 인포그래픽 > 애프터이펙트 / 그래픽아트웍 > 베이직에펙/모션 에펙 / 어드벤스 에펙 > 블렌더 1-2 / 시네마4D 1-4 > AI크리에이터-영상모션 / 스토리보드 > 모션-쇼릴 > 모션포폴 1-3',
        'cg_vfx': '발상과표현 > 색채학 > 포토샵/일러스트 > 포토웍스/디테일 일러스트 > 디지털 드로잉 > 프리미어 > 베이직에펙/모션에펙/어드벤스에펙 > 블렌더 1-2 > 마야 1-7 > AI크리에이터 - CG/마야 / 스토리보드 > 마야-크리틱 > 마야포폴(VFX) 1-6',
        'youtube': '포토샵/일러스트 > AI크리에이터-유튜브 > 유튜브 기초 > 유튜브 심화 > 베이직에펙/모션에펙/어드벤스에펙',
        'product_cert': '캐드 1-2 > 퓨전360 1-2 > 인벤터 > 전산응용기계제도',
        'senior': '컴퓨터기초 1-2',
        'cert_oa': 'MOS > 컴퓨터활용능력 1급/2급 > 전산회계 1급 > 전산세무 2급 > 재경관리사',
        'cert_field': 'ACP자격증 > GTQ·GTQi > 컴퓨터그래픽기능사 > 웹디자인개발기능사 > 컬러리스트 기사·산업기사 > AICE 자격증·AI-POT 자격 > 정보처리 기사·산업기사',
        'national': '국비 지원 과정별 상이 (상담 필요)'
    };

    const subjectImages = {
        'AI프롬프트엔지니어링1-2': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AI_Prompt_Engineering/AI_Prompt_Engineering2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AI_Prompt_Engineering/AI_Prompt_Engineering3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AI_Prompt_Engineering/AI_Prompt_Engineering4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AI_Prompt_Engineering/AI_Prompt_Engineering5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AI_Prompt_Engineering/AI_Prompt_Engineering6.jpg'
        ],
        'GTQ': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/GTQ/GTQ2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/GTQ/GTQ3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/GTQ/GTQ4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/GTQ/GTQ5.jpg'
        ],
        '그래픽아트웍': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Graphic_artwork/Graphic_artwork2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Graphic_artwork/Graphic_artwork3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Graphic_artwork/Graphic_artwork4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Graphic_artwork/Graphic_artwork5.jpg'
        ],
        'GTQ/GTQi': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/GTQi/GTQi2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/GTQi/GTQi3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/GTQi/GTQi4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/GTQi/GTQi5.jpg'
        ],
        '디지털드로잉1-6': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Digital_Drawing/Digital_Drawing3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Digital_Drawing/Digital_Drawing4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Digital_Drawing/Digital_Drawing5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Digital_Drawing/Digital_Drawing6.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Digital_Drawing/Digital_Drawing7.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Digital_Drawing/Digital_Drawing8.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Digital_Drawing/Digital_Drawing9.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Digital_Drawing/Digital_Drawing10.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Digital_Drawing/Digital_Drawing11.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Digital_Drawing/Digital_Drawing12.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Digital_Drawing/Digital_Drawing13.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Digital_Drawing/Digital_Drawing14.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Digital_Drawing/Digital_Drawing15.jpg'
        ],
        '해부학': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Anatomy/Anatomy2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Anatomy/Anatomy3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Anatomy/Anatomy4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Anatomy/Anatomy5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Anatomy/Anatomy6.jpg'
        ],
        '일러스트': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/illustration/illustration2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/illustration/illustration3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/illustration/illustration4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/illustration/illustration5.jpg'
        ],
        '인디자인': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/InDesign/InDesign2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/InDesign/InDesign3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/InDesign/InDesign4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/InDesign/InDesign5.jpg'
        ],
        '인스타툰(금요특강)': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Instagram_Toon/Instagram_Toon2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Instagram_Toon/Instagram_Toon3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Instagram_Toon/Instagram_Toon4.jpg'
        ],
        '인포그래픽': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Infographic/Infographic2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Infographic/Infographic3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Infographic/Infographic4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Infographic/Infographic5.jpg'
        ],
        'AI 에이전트 기초/심화': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AI_Agent/AI_Agent2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AI_Agent/AI_Agent3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AI_Agent/AI_Agent4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AI_Agents_Deep/AI_Agents_Deepening2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AI_Agents_Deep/AI_Agents_Deepening3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AI_Agents_Deep/AI_Agents_Deepening4.jpg'
        ],
        'AI크리에이터 편집': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Edit_AI_Creator/Edit_AI_Creator2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Edit_AI_Creator/Edit_AI_Creator3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Edit_AI_Creator/Edit_AI_Creator4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Edit_AI_Creator/Edit_AI_Creator5.jpg'
        ],
        'AI크리에이터 CG마야': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/CGAI_Creator_CGMaya/CGAI_Creator_CGMaya2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/CGAI_Creator_CGMaya/CGAI_Creator_CGMaya3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/CGAI_Creator_CGMaya/CGAI_Creator_CGMaya4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/CGAI_Creator_CGMaya/CGAI_Creator_CGMaya5.jpg'
        ],
        'AI크리에이터 바이브코딩': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/VibeAI/VibeAI_Creator_Vibe%20Coding2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/VibeAI/VibeAI_Creator_Vibe%20Coding3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/VibeAI/VibeAI_Creator_Vibe%20Coding4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/VibeAI/VibeAI_Creator_Vibe%20Coding5.jpg'
        ],
        'AI크리에이터 아트웍': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AI_Creator_Artwork/AI_Creator_Artwork2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AI_Creator_Artwork/AI_Creator_Artwork3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AI_Creator_Artwork/AI_Creator_Artwork4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AI_Creator_Artwork/AI_Creator_Artwork5.jpg'
        ],
        'AI크리에이터 인테리어': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AI_Creator_Interior/AI_Creator_Interior2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AI_Creator_Interior/AI_Creator_Interior3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AI_Creator_Interior/AI_Creator_Interior4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AI_Creator_Interior/AI_Creator_Interior5.jpg'
        ],
        'AI크리에이터 유튜브': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AI_Creator_YouTube/AI_Creator_YouTube2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AI_Creator_YouTube/AI_Creator_YouTube3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AI_Creator_YouTube/AI_Creator_YouTube4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AI_Creator_YouTube/AI_Creator_YouTube5.jpg'
        ],
        'AI크리에이터 영상모션': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AI_Creator_Video_Motion/AI_Creator_Video_Motion2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AI_Creator_Video_Motion/AI_Creator_Video_Motion3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AI_Creator_Video_Motion/AI_Creator_Video_Motion4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AI_Creator_Video_Motion/AI_Creator_Video_Motion5.jpg'
        ],
        '[BIM] 스마트 건축 설계&실내인테리어 3D디자이너 양성과정(캐드,스케치업,레빗)': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AaABIM/BIM_AaABIM_Architecture%20and%20Architectural2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AaABIM/BIM_AaABIM_Architecture%20and%20Architectural3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AaABIM/BIM_AaABIM_Architecture%20and%20Architectural4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AaABIM/BIM_AaABIM_Architecture%20and%20Architectural5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AaABIM/BIM_AaABIM_Architecture%20and%20Architectural6.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AaABIM/BIM_AaABIM_Architecture%20and%20Architectural7.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AaABIM/BIM_AaABIM_Architecture%20and%20Architectural8.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AaABIM/BIM_AaABIM_Architecture%20and%20Architectural9.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AaABIM/BIM_AaABIM_Architecture%20and%20Architectural10.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AaABIM/BIM_AaABIM_Architecture%20and%20Architectural11.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AaABIM/BIM_AaABIM_Architecture%20and%20Architectural12.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AaABIM/BIM_AaABIM_Architecture%20and%20Architectural13.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AaABIM/BIM_AaABIM_Architecture%20and%20Architectural14.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/AaABIM/BIM_AaABIM_Architecture%20and%20Architectural15.jpg'
        ],
        'UIUX 스프린트(포폴기획 - 금요특강)': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/SprintUIUX/SprintUIUX_Sprint2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/SprintUIUX/SprintUIUX_Sprint3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/SprintUIUX/SprintUIUX_Sprint4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/SprintUIUX/SprintUIUX_Sprint5.jpg'
        ],
        '[디지털디자인] AI 기반 UIUX 웹디자인 & 웹퍼블리셔 양성과정(Figma, HTML5, CSS)': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/UIUX_FrontEnd/UIUX_FrontEnd2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/UIUX_FrontEnd/UIUX_FrontEnd3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/UIUX_FrontEnd/UIUX_FrontEnd4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/UIUX_FrontEnd/UIUX_FrontEnd5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/UIUX_FrontEnd/UIUX_FrontEnd6.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/UIUX_FrontEnd/UIUX_FrontEnd7.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/UIUX_FrontEnd/UIUX_FrontEnd8.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/UIUX_FrontEnd/UIUX_FrontEnd9.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/UIUX_FrontEnd/UIUX_FrontEnd10.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/UIUX_FrontEnd/UIUX_FrontEnd11.jpg'
        ],
        '모션 쇼릴(포폴기획 - 금요특강)': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Motion_showreel/Motion_showreel2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Motion_showreel/Motion_showreel3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Motion_showreel/Motion_showreel4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Motion_showreel/Motion_showreel5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Motion_showreel/Motion_showreel6.jpg'
        ],
        '비주얼 아트 디렉터': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Art_director/Art_director2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Art_director/Art_director3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Art_director/Art_director4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Art_director/Art_director5.jpg'
        ],
        '[디지털컨버전스] 공공데이터 융합 풀스택 웹 개발자 양성과정(Next.js & Spring)': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Fullstec/Fullstec2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Fullstec/Fullstec3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Fullstec/Fullstec4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Fullstec/Fullstec5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Fullstec/Fullstec6.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Fullstec/Fullstec7.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Fullstec/Fullstec8.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Fullstec/Fullstec9.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Fullstec/Fullstec10.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Fullstec/Fullstec11.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Fullstec/Fullstec12.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Fullstec/Fullstec13.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Fullstec/Fullstec14.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Fullstec/Fullstec15.jpg'
        ],
        '웹툰 1-6': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Webtoon/1777000613257-6204d25a-661a-445c-a3b6-50fa51e652eb_3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Webtoon/1777000613257-6204d25a-661a-445c-a3b6-50fa51e652eb_4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Webtoon/1777000613257-6204d25a-661a-445c-a3b6-50fa51e652eb_5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Webtoon/1777000613257-6204d25a-661a-445c-a3b6-50fa51e652eb_6.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Webtoon/1777000613257-6204d25a-661a-445c-a3b6-50fa51e652eb_7.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Webtoon/1777000613257-6204d25a-661a-445c-a3b6-50fa51e652eb_8.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Webtoon/1777000613257-6204d25a-661a-445c-a3b6-50fa51e652eb_9.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Webtoon/1777000613257-6204d25a-661a-445c-a3b6-50fa51e652eb_10.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Webtoon/1777000613257-6204d25a-661a-445c-a3b6-50fa51e652eb_11.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Webtoon/1777000613257-6204d25a-661a-445c-a3b6-50fa51e652eb_12.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Webtoon/1777000613257-6204d25a-661a-445c-a3b6-50fa51e652eb_13.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Webtoon/1777000613257-6204d25a-661a-445c-a3b6-50fa51e652eb_14.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Webtoon/1777000613257-6204d25a-661a-445c-a3b6-50fa51e652eb_15.jpg'
        ],
        '인테리어 콘셉트 제네시스(포폴기획 - 금요특강)': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Genesis/Genesis2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Genesis/Genesis3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Genesis/Genesis4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Genesis/Genesis5.jpg'
        ],
        '정보처리기능사': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Information_processing_technician/Information_processing_technician2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Information_processing_technician/Information_processing_technician3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Information_processing_technician/Information_processing_technician4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Information_processing_technician/Information_processing_technician5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Information_processing_technician/Information_processing_technician6.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Information_processing_technician/Information_processing_technician7.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Information_processing_technician/Information_processing_technician8.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Information_processing_technician/Information_processing_technician9.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Information_processing_technician/Information_processing_technician10.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Information_processing_technician/Information_processing_technician11.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Information_processing_technician/Information_processing_technician12.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Information_processing_technician/Information_processing_technician13.jpg'
        ],
        '정보처리기사/산업기사(이미지 준비중)': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/An_information_processing_industry_engineer/An_information_processing_industry_engineer2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/An_information_processing_industry_engineer/An_information_processing_industry_engineer3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/An_information_processing_industry_engineer/An_information_processing_industry_engineer4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/An_information_processing_industry_engineer/An_information_processing_industry_engineer5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/An_information_processing_industry_engineer/An_information_processing_industry_engineer6.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/An_information_processing_industry_engineer/An_information_processing_industry_engineer8.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/An_information_processing_industry_engineer/An_information_processing_industry_engineer9.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/An_information_processing_industry_engineer/An_information_processing_industry_engineer10.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/An_information_processing_industry_engineer/An_information_processing_industry_engineer11.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/An_information_processing_industry_engineer/An_information_processing_industry_engineer12.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/An_information_processing_industry_engineer/An_information_processing_industry_engineer13.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/An_information_processing_industry_engineer/An_information_processing_industry_engineer14.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/An_information_processing_industry_engineer/An_information_processing_industry_engineer15.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/An_information_processing_industry_engineer/An_information_processing_industry_engineer16.jpg'
        ],
        '캐드 1-2': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/CAD/CAD2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/CAD/CAD3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/CAD/CAD4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/CAD/CAD5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/CAD/CAD6.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/CAD/CAD7.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/CAD/CAD8.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/CAD/CAD9.jpg'
        ],
        '컴퓨터기초(금요특강)': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Basics_computer/Basics_computer2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Basics_computer/Basics_computer3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Basics_computer/Basics_computer4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Basics_computer/Basics_computer5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Basics_computer/Basics_computer6.jpg'
        ],
        '컴활2급': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/computer_skills2/computer_skills2_2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/computer_skills2/computer_skills2_3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/computer_skills2/computer_skills2_4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/computer_skills2/computer_skills2_5.jpg'
        ],
        '컴활1급': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Computer_literacy_1level/Computer_literacy_1level3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Computer_literacy_1level/Computer_literacy_1level4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Computer_literacy_1level/Computer_literacy_1level5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Computer_literacy_1level/Computer_literacy_1level6.jpg'
        ],
        '전산회계1급': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Computerized_Accounting_1Class/Computerized_Accounting_1Class3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Computerized_Accounting_1Class/Computerized_Accounting_1Class4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Computerized_Accounting_1Class/Computerized_Accounting_1Class5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Computerized_Accounting_1Class/Computerized_Accounting_1Class6.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Computerized_Accounting_1Class/Computerized_Accounting_1Class7.jpg'
        ],
        '전산세무2급': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Computerized_tax_2level/Computerized_tax_2level3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Computerized_tax_2level/Computerized_tax_2level4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Computerized_tax_2level/Computerized_tax_2level5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Computerized_tax_2level/Computerized_tax_2level6.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Computerized_tax_2level/Computerized_tax_2level7.jpg'
        ],
        '재경관리사': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Financial_Manager/Financial_Manager2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Financial_Manager/Financial_Manager3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Financial_Manager/Financial_Manager4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Financial_Manager/Financial_Manager5.jpg'
        ],
        '전산응용기계제도': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Computerized_Application_Mechanical_System/Computerized_Application_Mechanical_System2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Computerized_Application_Mechanical_System/Computerized_Application_Mechanical_System3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Computerized_Application_Mechanical_System/Computerized_Application_Mechanical_System4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Computerized_Application_Mechanical_System/Computerized_Application_Mechanical_System5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Computerized_Application_Mechanical_System/Computerized_Application_Mechanical_System6.jpg'
        ],
        '전산응용건축제도': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Computer-Applied_Building_System/Computer-Applied_Building_System2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Computer-Applied_Building_System/Computer-Applied_Building_System3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Computer-Applied_Building_System/Computer-Applied_Building_System4.jpg'
        ],
        '인벤터': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Inventory/Inventory2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Inventory/Inventory3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Inventory/Inventory4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Inventory/Inventory5.jpg'
        ],
        '파이썬 1-3': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Python/Python2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Python/Python3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Python/Python4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Python/Python5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Python/Python6.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Python/Python7.jpg'
        ],
        '자바 1-2': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Java/Java3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Java/Java4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Java/Java5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Java/Java6.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Java/Java7.jpg'
        ],
        'C언어 1-2': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/C/C3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/C/C4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/C/C5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/C/C6.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/C/C7.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/C/C8.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/C/C9.jpg'
        ],
        'Blender1-2': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Blender1-2/Blender2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Blender1-2/Blender3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Blender1-2/Blender4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Blender1-2/Blender5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Blender1-2/Blender6.jpg'
        ],
        'BIM1-2': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/BIM1-2/BIM3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/BIM1-2/BIM4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/BIM1-2/BIM5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/BIM1-2/BIM6.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/BIM1-2/BIM7.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/BIM1-2/BIM8.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/BIM1-2/BIM9.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/BIM1-2/BIM10.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/BIM1-2/BIM11.jpg'
        ],
        '포토샵': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Photoshop/Photoshop2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Photoshop/Photoshop3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Photoshop/Photoshop4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Photoshop/Photoshop5.jpg'
        ],
        '포토웍스': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Photoworks/Photoworks2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Photoworks/Photoworks3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Photoworks/Photoworks4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Photoworks/Photoworks5.jpg'
        ],
        '퓨전360 1-2(이미지 준비중)': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Fusion360/Fusion360_2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Fusion360/Fusion360_3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Fusion360/Fusion360_4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Fusion360/Fusion360_5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Fusion360/Fusion360_6.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Fusion360/Fusion360_7.jpg'
        ],
        '프리미어': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Premiere/Premiere2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Premiere/Premiere3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Premiere/Premiere4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Premiere/Premiere5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Premiere/Premiere6.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Premiere/Premiere7.jpg'
        ],
        '유튜브': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/YouTube/YouTube3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/YouTube/YouTube4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/YouTube/YouTube5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/YouTube/YouTube6.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/YouTube/YouTube7.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/YouTube/YouTube8.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/YouTube/YouTube9.jpg'
        ],
        '유튜브(영크리)': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/YouTube_Youngcry/YouTube_Youngcry3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/YouTube_Youngcry/YouTube_Youngcry4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/YouTube_Youngcry/YouTube_Youngcry5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/YouTube_Youngcry/YouTube_Youngcry6.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/YouTube_Youngcry/YouTube_Youngcry7.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/YouTube_Youngcry/YouTube_Youngcry8.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/YouTube_Youngcry/YouTube_Youngcry9.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/YouTube_Youngcry/YouTube_Youngcry10.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/YouTube_Youngcry/YouTube_Youngcry11.jpg'
        ],
        '유튜브(시니어)': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/YouTube_senior/YouTube_senior3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/YouTube_senior/YouTube_senior4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/YouTube_senior/YouTube_senior5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/YouTube_senior/YouTube_senior6.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/YouTube_senior/YouTube_senior7.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/YouTube_senior/YouTube_senior8.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/YouTube_senior/YouTube_senior9.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/YouTube_senior/YouTube_senior10.jpg'
        ],
        '웹디자인개발기능사': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Skill_History_of_Web_Design_Development/Skill_History_of_Web_Design_Development2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Skill_History_of_Web_Design_Development/Skill_History_of_Web_Design_Development3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Skill_History_of_Web_Design_Development/Skill_History_of_Web_Design_Development4.jpg'
        ],
        '웹1-3': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/WEB/WEB3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/WEB/WEB4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/WEB/WEB5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/WEB/WEB6.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/WEB/WEB7.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/WEB/WEB8.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/WEB/WEB9.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/WEB/WEB10.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/WEB/WEB11.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/WEB/WEB12.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/WEB/WEB13.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/WEB/WEB14.jpg'
        ],
        'UIUX1-3': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/WEB/WEB15.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/WEB/WEB16.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/WEB/WEB17.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/WEB/WEB18.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/WEB/WEB19.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/WEB/WEB20.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/WEB/WEB21.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/WEB/WEB22.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/WEB/WEB23.jpg'
        ],
        '영상편집&유튜브편집제작(프리미어,에프터이펙트)실무자 양성과정': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Video_editing_and_YouTube_editing_production/Video_editing_and_YouTube_editing_production_(premier,effect)_training_course_for_practitioners2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Video_editing_and_YouTube_editing_production/Video_editing_and_YouTube_editing_production_(premier,effect)_training_course_for_practitioners3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Video_editing_and_YouTube_editing_production/Video_editing_and_YouTube_editing_production_(premier,effect)_training_course_for_practitioners4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Video_editing_and_YouTube_editing_production/Video_editing_and_YouTube_editing_production_(premier,effect)_training_course_for_practitioners5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Video_editing_and_YouTube_editing_production/Video_editing_and_YouTube_editing_production_(premier,effect)_training_course_for_practitioners6.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Video_editing_and_YouTube_editing_production/Video_editing_and_YouTube_editing_production_(premier,effect)_training_course_for_practitioners7.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Video_editing_and_YouTube_editing_production/Video_editing_and_YouTube_editing_production_(premier,effect)_training_course_for_practitioners8.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Video_editing_and_YouTube_editing_production/Video_editing_and_YouTube_editing_production_(premier,effect)_training_course_for_practitioners9.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Video_editing_and_YouTube_editing_production/Video_editing_and_YouTube_editing_production_(premier,effect)_training_course_for_practitioners10.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Video_editing_and_YouTube_editing_production/Video_editing_and_YouTube_editing_production_(premier,effect)_training_course_for_practitioners11.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Video_editing_and_YouTube_editing_production/Video_editing_and_YouTube_editing_production_(premier,effect)_training_course_for_practitioners12.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Video_editing_and_YouTube_editing_production/Video_editing_and_YouTube_editing_production_(premier,effect)_training_course_for_practitioners13.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Video_editing_and_YouTube_editing_production/Video_editing_and_YouTube_editing_production_(premier,effect)_training_course_for_practitioners14.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Video_editing_and_YouTube_editing_production/Video_editing_and_YouTube_editing_production_(premier,effect)_training_course_for_practitioners15.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Video_editing_and_YouTube_editing_production/Video_editing_and_YouTube_editing_production_(premier,effect)_training_course_for_practitioners16.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Video_editing_and_YouTube_editing_production/Video_editing_and_YouTube_editing_production_(premier,effect)_training_course_for_practitioners17.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Video_editing_and_YouTube_editing_production/Video_editing_and_YouTube_editing_production_(premier,effect)_training_course_for_practitioners18.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Video_editing_and_YouTube_editing_production/Video_editing_and_YouTube_editing_production_(premier,effect)_training_course_for_practitioners19.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Video_editing_and_YouTube_editing_production/Video_editing_and_YouTube_editing_production_(premier,effect)_training_course_for_practitioners20.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Video_editing_and_YouTube_editing_production/Video_editing_and_YouTube_editing_production_(premier,effect)_training_course_for_practitioners21.jpg'
        ],
        '어드벤스에펙': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Advances_Effec/Advances_Effec3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Advances_Effec/Advances_Effec4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Advances_Effec/Advances_Effec5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Advances_Effec/Advances_Effec6.jpg'
        ],
        '실무엑셀(금요특강)(이미지 준비중)': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Practical_Excel/Practical_Excel3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Practical_Excel/Practical_Excel4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Practical_Excel/Practical_Excel5.jpg'
        ],
        '시네마4D 1-4': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Cinema4D/Cinema4D3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Cinema4D/Cinema4D4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Cinema4D/Cinema4D5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Cinema4D/Cinema4D6.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Cinema4D/Cinema4D7.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Cinema4D/Cinema4D8.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Cinema4D/Cinema4D9.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Cinema4D/Cinema4D10.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Cinema4D/Cinema4D11.jpg'
        ],
        '스토리보드 1-6': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Storyboard/Storyboard3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Storyboard/Storyboard4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Storyboard/Storyboard5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Storyboard/Storyboard6.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Storyboard/Storyboard7.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Storyboard/Storyboard8.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Storyboard/Storyboard9.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Storyboard/Storyboard10.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Storyboard/Storyboard11.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Storyboard/Storyboard12.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Storyboard/Storyboard13.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Storyboard/Storyboard14.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Storyboard/Storyboard15.jpg'
        ],
        '스토리보드1-6': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Storyboard/Storyboard3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Storyboard/Storyboard4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Storyboard/Storyboard5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Storyboard/Storyboard6.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Storyboard/Storyboard7.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Storyboard/Storyboard8.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Storyboard/Storyboard9.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Storyboard/Storyboard10.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Storyboard/Storyboard11.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Storyboard/Storyboard12.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Storyboard/Storyboard13.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Storyboard/Storyboard14.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Storyboard/Storyboard15.jpg'
        ],
        '스케치업1-2': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Sketchup/Sketchup3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Sketchup/Sketchup4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Sketchup/Sketchup5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Sketchup/Sketchup6.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Sketchup/Sketchup7.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Sketchup/Sketchup8.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Sketchup/Sketchup9.jpg'
        ],
        '숏폼컨텐츠(금요특강)': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/ShortForm_Content/ShortForm_Content3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/ShortForm_Content/ShortForm_Content4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/ShortForm_Content/ShortForm_Content5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/ShortForm_Content/ShortForm_Content6.jpg'
        ],
        '색채학': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Color_Science/Color_Science3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Color_Science/Color_Science4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Color_Science/Color_Science5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Color_Science/Color_Science6.jpg'
        ],
        '베이직에펙': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Basic_Effec/Basic_Effec3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Basic_Effec/Basic_Effec4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Basic_Effec/Basic_Effec5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Basic_Effec/Basic_Effec6.jpg'
        ],
        '디테일일러스트': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Detailed_Illustration/Detailed_Illustration2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Detailed_Illustration/Detailed_Illustration3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Detailed_Illustration/Detailed_Illustration4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Detailed_Illustration/Detailed_Illustration5.jpg'
        ],
        '발상과 표현': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Ideas_and_Expressions/Ideas_and_Expressions3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Ideas_and_Expressions/Ideas_and_Expressions4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Ideas_and_Expressions/Ideas_and_Expressions5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Ideas_and_Expressions/Ideas_and_Expressions6.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Ideas_and_Expressions/Ideas_and_Expressions7.jpg'
        ],
        '모스': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Moss/Moss3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Moss/Moss4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Moss/Moss5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Moss/Moss6.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Moss/Moss7.jpg'
        ],
        '모션에펙': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Motion_Effec/Motion_Effec3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Motion_Effec/Motion_Effec4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Motion_Effec/Motion_Effec5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/Motion_Effec/Motion_Effec6.jpg'
        ],
        '맥스 1-3': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/MAX/MAX3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/MAX/MAX4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/MAX/MAX5.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/MAX/MAX6.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/MAX/MAX7.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/MAX/MAX8.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/MAX/MAX9.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/MAX/MAX10.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/MAX/MAX11.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/MAX/MAX12.jpg'
        ],
        '마야크리틱(포폴기획 - 금요특강)': [
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/MayaCritic/MayaCritic2.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/MayaCritic/MayaCritic3.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/MayaCritic/MayaCritic4.jpg',
            'https://cdn.jsdelivr.net/gh/sbsweb35-tech/SBS@main/MayaCritic/MayaCritic5.jpg'
        ]
    };

    window.SBSCurriculumData = Object.freeze({
        curriculumData,
        categoryNames,
        courseFlowData,
        subjectImages,
    });
})();
