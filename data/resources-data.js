/** 수업 준비물: 사용자 제공 목록과 '준비물 이미지와정보'의 참고 자료를 기준으로 연결합니다. */
// 이미지 CDN: 커밋 17f0243f4807a282828268eefd0c45c1c13890b7의 고정 Netlify 배포 주소.
// jsDelivr는 저장소 용량 제한으로 일부 원본 이미지를 차단하므로 사용하지 않습니다.
window.SBSResourcesData = Object.freeze({
    title: '자료실',
    description: '수업에 필요한 준비물과 사용 용도를 한눈에 확인하세요.',
    imageNote: '이미지는 참고용입니다. 준비하실 제품의 브랜드·규격·수량은 각 항목의 안내를 확인해 주세요.',
    ui: {
        optional: '선택',
        extrasTitle: '함께 챙겨주세요',
        enlarge: '이미지 확대',
        close: '이미지 확대 닫기',
        imageError: '이미지를 불러올 수 없습니다.',
        countUnit: '개 항목'
    },
    categories: [
        {
            id: 'colorist',
            label: '컬러리스트',
            title: '컬러리스트 실기 재료',
            description: '실기 수업과 시험에 필요한 재료입니다. 제품별 규격과 준비 수량을 확인해 주세요.',
            sections: [
                {
                    id: 'supplies',
                    title: '준비물',
                    items: [
                        { id: 'colorist-bottles', name: '물약병', spec: '20cc · 12개', description: '말랑이 PE 소재로 준비하세요. 조색한 물감을 나누어 담을 때 사용합니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/color-paint-bottles.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/color-paint-bottles.webp' },
                        { id: 'colorist-paints', name: '알파 컬러리스트 포스터 물감', spec: '40ml · 12색 세트 · 튜브형', description: '조색과 배색 실습에 사용하는 물감입니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/pastel-sticks-set.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/pastel-sticks-set.webp' },
                        { id: 'colorist-brushes', name: '아트메이트 또는 화홍 납작붓', spec: '최소 6자루', details: ['5호 4자루 이상', '6호 2자루 이상'], description: '넓은 면을 고르게 채색할 때 사용합니다.', note: '시험 당일에는 오염되지 않은 새 붓을 추천합니다. 여유 있게 준비하세요.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/flat-paintbrush.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/flat-paintbrush.webp' },
                        { id: 'colorist-paper-palette', name: '종이 팔레트', description: '물감을 덜어 조색하고 사용한 면을 떼어낼 수 있는 팔레트입니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/drawing-paper-pad.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/drawing-paper-pad.webp' },
                        { id: 'colorist-template', name: '템플레이트 104', description: '도형을 일정한 크기로 그릴 때 사용합니다. 104 규격을 확인해 주세요.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/square-template-ruler.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/square-template-ruler.webp' },
                        { id: 'colorist-mat', name: 'A3 커팅매트', spec: 'A3', description: '재단할 때 작업면을 보호하는 매트입니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/a3-cutting-mat.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/a3-cutting-mat.webp' },
                        { id: 'colorist-bucket', name: '4분할 물통', spec: '4분할', description: '붓을 세척하고 물을 나누어 사용할 수 있는 물통으로 준비하세요.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/three-compartment-water-bucket.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/three-compartment-water-bucket.webp' },
                        { id: 'colorist-cloths', name: '면행주, 마른수건', description: '붓의 물기를 조절하고 작업면을 정리할 때 사용합니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/white-cloths.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/white-cloths.webp' },
                        { id: 'colorist-wipes', name: '물티슈', description: '손과 작업 도구에 묻은 물감을 닦을 때 사용합니다.' },
                        { id: 'colorist-alcohol', name: '알콜스왑', description: '작업 도구와 주변을 정리할 때 사용합니다.' },
                        { id: 'colorist-bags', name: '일회용 위생팩', description: '작업 중 생기는 쓰레기나 젖은 용품을 따로 담을 때 사용합니다.' },
                        { id: 'colorist-box', name: '화구박스', description: '물감과 붓 등 준비물을 한곳에 보관하고 이동할 때 사용합니다.' },
                        { id: 'colorist-glue', name: '풀테이프', description: '종이와 컬러칩을 깔끔하게 부착할 때 사용합니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/correction-tape.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/correction-tape.webp' },
                        { id: 'colorist-scissors', name: '가위', description: '종이와 재료를 잘라 사용할 때 필요합니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/scissors.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/scissors.webp' },
                        { id: 'colorist-ruler', name: '30cm 방안자', spec: '30cm', description: '길이를 재고 선을 긋는 데 사용합니다. 눈금이 있는 방안자로 준비하세요.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/clear-ruler-30cm.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/clear-ruler-30cm.webp' },
                        { id: 'colorist-knife', name: '30도 사선칼', spec: '30도', description: '종이와 컬러칩을 정밀하게 재단할 때 사용합니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/utility-knife.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/utility-knife.webp' },
                        { id: 'colorist-sketchbook', name: '8절 스케치북', spec: '8절 · 170g 이상', description: '채색 연습에 사용합니다. 종이의 평량을 확인해 주세요.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/spiral-sketchbook.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/spiral-sketchbook.webp' }
                    ]
                },
                {
                    id: 'color-chips',
                    title: '컬러칩',
                    note: '컬러칩 2종 모두 구비해 주세요. 구매 전 사이즈 확인은 필수입니다.',
                    items: [
                        { id: 'colorist-chip-155b', name: 'KS표준색 C&D 컬러차트 155B', spec: '155B', usage: '컬러개요 및 1교시용', description: '색상 비교와 배색에 사용하는 컬러차트입니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/ks-standard-color-guide-155b.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/ks-standard-color-guide-155b.webp' },
                        { id: 'colorist-chip-ks195', name: 'KS195 컬러리스트 색종이 M', spec: 'M 사이즈', usage: '2교시용', description: '2교시 작업에 사용하는 색종이입니다. M 사이즈를 확인해 주세요.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/ks195-color-chart.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/ks195-color-chart.webp' }
                    ]
                }
            ]
        },
        {
            id: 'storyboard',
            label: '스토리보드',
            title: '스토리보드 과정 준비물',
            description: '드로잉부터 채색까지, 스토리보드 수업에 사용할 도구를 준비해 주세요.',
            sections: [
                {
                    id: 'supplies',
                    title: '준비물',
                    items: [
                        { id: 'storyboard-brushes', name: '붓', spec: '화홍', details: ['둥근붓: 14, 20호', '사선붓: 4, 5호', '세필붓: 2, 3호'], description: '채색할 면과 표현에 맞춰 세 종류를 준비하세요.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/storyboard-supplies/paintbrush-set.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/storyboard-supplies/paintbrush-set.webp' },
                        { id: 'storyboard-watercolors', name: '신한 SWC 수채화 물감', spec: '32색', description: '스토리보드의 색감과 명암을 표현하는 수채화 물감입니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/storyboard-supplies/watercolor-paint-set.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/storyboard-supplies/watercolor-paint-set.webp' },
                        { id: 'storyboard-pencils', name: '연필', spec: '톰보우 모노 · 2B, 4B', description: '밑그림과 명암 표현에 사용할 두 가지 경도로 준비하세요.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/storyboard-supplies/graphite-pencil-set.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/storyboard-supplies/graphite-pencil-set.webp' },
                        { id: 'storyboard-eraser', name: '지우개', spec: '톰보우 지우개', description: '스케치를 수정하고 연필선의 농도를 조절할 때 사용합니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/storyboard-supplies/eraser-set.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/storyboard-supplies/eraser-set.webp' },
                        { id: 'storyboard-acrylic', name: '아크릴판', spec: '미젤로 파렛트', optional: true, description: '조색 작업에 사용할 수 있는 선택 준비물입니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/storyboard-supplies/paint-mixing-palette.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/storyboard-supplies/paint-mixing-palette.webp' },
                        { id: 'storyboard-paper', name: '도화지', spec: '4절지 · 낱개', description: '드로잉과 채색 작업에 사용합니다. 4절 크기의 낱장으로 준비하세요.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/storyboard-supplies/watercolor-paper-pad.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/storyboard-supplies/watercolor-paper-pad.webp' },
                        { id: 'storyboard-bucket', name: '물통', spec: '달리 미술 물통 · 4칸 · 2L', description: '붓 세척과 채색에 사용할 물을 나누어 담는 물통입니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/storyboard-supplies/paint-water-bucket.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/storyboard-supplies/paint-water-bucket.webp' },
                        { id: 'storyboard-palette', name: '팔레트', spec: '미젤로 · 36칸', description: '색상별로 물감을 담고 혼합할 때 사용합니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/storyboard-supplies/watercolor-palette-case.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/storyboard-supplies/watercolor-palette-case.webp' },
                        { id: 'storyboard-sharpener', name: '전동 연필깎이', spec: '금우 전동 연필깎이', description: '드로잉에 사용할 연필심을 다듬을 때 사용합니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/storyboard-supplies/pencil-sharpeners.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/storyboard-supplies/pencil-sharpeners.webp' },
                        { id: 'storyboard-stumps', name: '찰필', spec: '크레타 칼라 찰필 · 중', description: '연필로 그린 명암을 부드럽게 풀어 표현할 때 사용합니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/storyboard-supplies/blending-stumps.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/storyboard-supplies/blending-stumps.webp' },
                        { id: 'storyboard-colored-pencils', name: '색연필', spec: '프리즈마 색연필 · 72색', description: '다양한 색상과 세부 표현을 위한 색연필 세트입니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/storyboard-supplies/colored-pencil-set.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/storyboard-supplies/colored-pencil-set.webp' },
                        { id: 'storyboard-sleeves', name: '팔토시', optional: true, description: '작업 중 소매가 물감이나 물에 닿는 것을 줄여줍니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/storyboard-supplies/protective-sleeves.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/storyboard-supplies/protective-sleeves.webp' },
                        { id: 'storyboard-apron', name: '앞치마', optional: true, description: '물감이 옷에 묻는 것을 줄여주는 작업용 앞치마입니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/storyboard-supplies/artist-aprons.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/storyboard-supplies/artist-aprons.webp' },
                        { id: 'storyboard-poster-paints', name: '포스터 물감', details: ['알파: 블랙, 화이트 (튜브형)', '신한: 5, 27-1, 143-1, 18'], description: '브랜드별 색상과 신한 물감의 색상 번호를 확인해 주세요.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/storyboard-supplies/color-chart-and-paint-bottles.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/storyboard-supplies/color-chart-and-paint-bottles.webp' }
                    ]
                }
            ]
        }
    ]
});
