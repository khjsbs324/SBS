/** 수업 준비물: 사용자 제공 목록과 '준비물 이미지와정보'의 참고 자료를 기준으로 연결합니다. */
// 이미지 CDN: 커밋 17f0243f4807a282828268eefd0c45c1c13890b7의 고정 Netlify 배포 주소.
// jsDelivr는 저장소 용량 제한으로 일부 원본 이미지를 차단하므로 사용하지 않습니다.
window.SBSResourcesData = Object.freeze({
    title: '자료실',
    description: '수업에 필요한 준비물과 사용 용도를 한눈에 확인하세요.',
    storeUrl: 'https://hwabang.net/',
    imageNote: '이미지는 참고용입니다. 준비하실 제품의 브랜드·규격·수량은 각 항목의 안내를 확인해 주세요.',
    ui: {
        optional: '선택',
        extrasTitle: '함께 챙겨주세요',
        enlarge: '이미지 확대',
        close: '이미지 확대 닫기',
        imageError: '이미지를 불러올 수 없습니다.',
        countUnit: '개 항목',
        purchase: '화방넷에서 구매',
        offline: '오프라인 구매',
        offlineNote: '안내된 규격에 맞춰 오프라인 매장에서 준비해 주세요.'
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
                        { id: 'colorist-bottles', name: '물약병', spec: '20cc · 12개', description: '말랑이 PE 소재로 준비하세요. 조색한 물감을 나누어 담을 때 사용합니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/color-paint-bottles.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/color-paint-bottles.webp',
                            purchase: { mode: 'offline' }
                        },
                        { id: 'colorist-paints', name: '알파 컬러리스트 포스터 물감', spec: '40ml · 12색 세트 · 튜브형', description: '조색과 배색 실습에 사용하는 물감입니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/pastel-sticks-set.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/pastel-sticks-set.webp',
                            purchase: {
                                mode: 'online',
                                links: [
                                    { url: 'https://hwabang.net/product/detail.html?product_no=46312', note: '알파 컬러리스트 · 튜브형 40ml · 12색 세트' }
                                ]
                            }
                        },
                        { id: 'colorist-brushes', name: '아트메이트 또는 화홍 납작붓', spec: '최소 6자루', details: ['5호 4자루 이상', '6호 2자루 이상'], description: '넓은 면을 고르게 채색할 때 사용합니다.', note: '시험 당일에는 오염되지 않은 새 붓을 추천합니다. 여유 있게 준비하세요.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/flat-paintbrush.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/flat-paintbrush.webp',
                            purchase: {
                                mode: 'online',
                                links: [
                                    { url: 'https://hwabang.net/product/detail.html?product_no=39435', note: '화홍 948 · 5호 4자루 이상, 6호 2자루 이상' }
                                ]
                            }
                        },
                        { id: 'colorist-paper-palette', name: '종이 팔레트', description: '물감을 덜어 조색하고 사용한 면을 떼어낼 수 있는 팔레트입니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/drawing-paper-pad.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/drawing-paper-pad.webp',
                            purchase: {
                                mode: 'online',
                                links: [
                                    { url: 'https://hwabang.net/product/detail.html?product_no=48240', note: '알파 종이파렛트 · 290 × 175mm · 30매' }
                                ]
                            }
                        },
                        { id: 'colorist-template', name: '템플레이트 104', description: '도형을 일정한 크기로 그릴 때 사용합니다. 104 규격을 확인해 주세요.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/square-template-ruler.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/square-template-ruler.webp',
                            purchase: {
                                mode: 'online',
                                links: [
                                    { url: 'https://hwabang.net/product/detail.html?product_no=39593', note: '코링 K-104 · 사각형판' }
                                ]
                            }
                        },
                        { id: 'colorist-mat', name: 'A3 커팅매트', spec: 'A3', description: '재단할 때 작업면을 보호하는 매트입니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/a3-cutting-mat.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/a3-cutting-mat.webp',
                            purchase: {
                                mode: 'online',
                                links: [
                                    { url: 'https://hwabang.net/product/detail.html?product_no=38395', note: 'A3 규격' }
                                ]
                            }
                        },
                        { id: 'colorist-bucket', name: '4분할 물통', spec: '4분할', description: '붓을 세척하고 물을 나누어 사용할 수 있는 물통으로 준비하세요.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/three-compartment-water-bucket.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/three-compartment-water-bucket.webp',
                            purchase: {
                                mode: 'online',
                                links: [
                                    { url: 'https://hwabang.net/product/detail.html?product_no=72275', note: '달리 2L · 4칸 선택' }
                                ]
                            }
                        },
                        { id: 'colorist-cloths', name: '면행주, 마른수건', description: '붓의 물기를 조절하고 작업면을 정리할 때 사용합니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/white-cloths.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/white-cloths.webp',
                            purchase: { mode: 'offline' }
                        },
                        { id: 'colorist-wipes', name: '물티슈', description: '손과 작업 도구에 묻은 물감을 닦을 때 사용합니다.',
                            purchase: {
                                mode: 'online',
                                links: [
                                    { url: 'https://hwabang.net/product/detail.html?product_no=67598', note: '캡형 · 100매' }
                                ]
                            }
                        },
                        { id: 'colorist-alcohol', name: '알콜스왑', description: '작업 도구와 주변을 정리할 때 사용합니다.',
                            purchase: { mode: 'offline' }
                        },
                        { id: 'colorist-bags', name: '일회용 위생팩', description: '작업 중 생기는 쓰레기나 젖은 용품을 따로 담을 때 사용합니다.',
                            purchase: { mode: 'offline' }
                        },
                        { id: 'colorist-box', name: '화구박스', description: '물감과 붓 등 준비물을 한곳에 보관하고 이동할 때 사용합니다.',
                            purchase: {
                                mode: 'online',
                                links: [
                                    { url: 'https://hwabang.net/product/detail.html?product_no=71220', note: '브레인 CA928 · 280 × 150 × 130mm' }
                                ]
                            }
                        },
                        { id: 'colorist-glue', name: '풀테이프', description: '종이와 컬러칩을 깔끔하게 부착할 때 사용합니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/correction-tape.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/correction-tape.webp',
                            purchase: { mode: 'offline' }
                        },
                        { id: 'colorist-scissors', name: '가위', description: '종이와 재료를 잘라 사용할 때 필요합니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/scissors.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/scissors.webp',
                            purchase: {
                                mode: 'online',
                                links: [
                                    { url: 'https://hwabang.net/product/detail.html?product_no=59179', note: '평화 M-601S' }
                                ]
                            }
                        },
                        { id: 'colorist-ruler', name: '30cm 방안자', spec: '30cm', description: '길이를 재고 선을 긋는 데 사용합니다. 눈금이 있는 방안자로 준비하세요.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/clear-ruler-30cm.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/clear-ruler-30cm.webp',
                            purchase: {
                                mode: 'online',
                                links: [
                                    { url: 'https://hwabang.net/product/detail.html?product_no=36773', note: '30cm 방안자' }
                                ]
                            }
                        },
                        { id: 'colorist-knife', name: '30도 사선칼', spec: '30도', description: '종이와 컬러칩을 정밀하게 재단할 때 사용합니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/utility-knife.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/utility-knife.webp',
                            purchase: {
                                mode: 'online',
                                links: [
                                    { url: 'https://hwabang.net/product/detail.html?product_no=70418', note: '30도 커터칼' }
                                ]
                            }
                        },
                        { id: 'colorist-sketchbook', name: '8절 스케치북', spec: '8절 · 170g 이상', description: '채색 연습에 사용합니다. 종이의 평량을 확인해 주세요.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/spiral-sketchbook.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/spiral-sketchbook.webp',
                            purchase: {
                                mode: 'online',
                                links: [
                                    { url: 'https://hwabang.net/product/detail.html?product_no=68071', note: 'AnB · 8절 · 180g 또는 200g 선택' }
                                ]
                            }
                        }
                    ]
                },
                {
                    id: 'color-chips',
                    title: '컬러칩',
                    note: '컬러칩 2종 모두 구비해 주세요. 구매 전 사이즈 확인은 필수입니다.',
                    items: [
                        { id: 'colorist-chip-155b', name: 'KS표준색 C&D 컬러차트 155B', spec: '155B', usage: '컬러개요 및 1교시용', description: '색상 비교와 배색에 사용하는 컬러차트입니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/ks-standard-color-guide-155b.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/ks-standard-color-guide-155b.webp',
                            purchase: {
                                mode: 'online',
                                links: [
                                    { url: 'https://hwabang.net/product/detail.html?product_no=71761', note: '155b 선택' }
                                ]
                            }
                        },
                        { id: 'colorist-chip-ks195', name: 'KS195 컬러리스트 색종이 M', spec: 'M 사이즈', usage: '2교시용', description: '2교시 작업에 사용하는 색종이입니다. M 사이즈를 확인해 주세요.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/colorist-supplies/ks195-color-chart.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/colorist-supplies/ks195-color-chart.webp',
                            purchase: { mode: 'offline' }
                        }
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
                        { id: 'storyboard-brushes', name: '붓', spec: '화홍', details: ['둥근붓: 14, 20호', '사선붓: 4, 5호', '세필붓: 2, 3호'], description: '채색할 면과 표현에 맞춰 세 종류를 준비하세요.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/storyboard-supplies/paintbrush-set.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/storyboard-supplies/paintbrush-set.webp',
                            purchase: {
                                mode: 'online',
                                links: [
                                    { url: 'https://hwabang.net/product/detail.html?product_no=67697', note: '화홍 700R · 14호, 20호 선택', label: '둥근붓 구매' },
                                    { url: 'https://hwabang.net/product/detail.html?product_no=39450', note: '화홍 972 · 4호, 5호 선택', label: '사선붓 구매' },
                                    { url: 'https://hwabang.net/product/detail.html?product_no=67268', note: '화홍 320 · 2호, 3호 선택', label: '세필붓 구매' }
                                ]
                            }
                        },
                        { id: 'storyboard-watercolors', name: '신한 SWC 수채화 물감', spec: '32색', description: '스토리보드의 색감과 명암을 표현하는 수채화 물감입니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/storyboard-supplies/watercolor-paint-set.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/storyboard-supplies/watercolor-paint-set.webp',
                            purchase: {
                                mode: 'online',
                                links: [
                                    { url: 'https://hwabang.net/product/detail.html?product_no=67677', note: '신한 SWC · 32색 선택' }
                                ]
                            }
                        },
                        { id: 'storyboard-pencils', name: '연필', spec: '톰보우 모노 · 2B, 4B', description: '밑그림과 명암 표현에 사용할 두 가지 경도로 준비하세요.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/storyboard-supplies/graphite-pencil-set.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/storyboard-supplies/graphite-pencil-set.webp',
                            purchase: {
                                mode: 'online',
                                links: [
                                    { url: 'https://hwabang.net/product/detail.html?product_no=38105', note: '톰보우 모노 J · 2B, 4B 선택' }
                                ]
                            }
                        },
                        { id: 'storyboard-eraser', name: '지우개', spec: '톰보우 지우개', description: '스케치를 수정하고 연필선의 농도를 조절할 때 사용합니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/storyboard-supplies/eraser-set.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/storyboard-supplies/eraser-set.webp',
                            purchase: {
                                mode: 'online',
                                links: [
                                    { url: 'https://hwabang.net/product/detail.html?product_no=347', note: '톰보우 모노 · 중 (PE-04A)' }
                                ]
                            }
                        },
                        { id: 'storyboard-acrylic', name: '아크릴판', spec: '미젤로 파렛트', optional: true, description: '조색 작업에 사용할 수 있는 선택 준비물입니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/storyboard-supplies/paint-mixing-palette.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/storyboard-supplies/paint-mixing-palette.webp',
                            purchase: { mode: 'offline' }
                        },
                        { id: 'storyboard-paper', name: '도화지', spec: '4절지 · 낱개', description: '드로잉과 채색 작업에 사용합니다. 4절 크기의 낱장으로 준비하세요.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/storyboard-supplies/watercolor-paper-pad.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/storyboard-supplies/watercolor-paper-pad.webp',
                            purchase: { mode: 'offline' }
                        },
                        { id: 'storyboard-bucket', name: '물통', spec: '달리 미술 물통 · 4칸 · 2L', description: '붓 세척과 채색에 사용할 물을 나누어 담는 물통입니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/storyboard-supplies/paint-water-bucket.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/storyboard-supplies/paint-water-bucket.webp',
                            purchase: {
                                mode: 'online',
                                links: [
                                    { url: 'https://hwabang.net/product/detail.html?product_no=72275', note: '달리 2L · 4칸 선택' }
                                ]
                            }
                        },
                        { id: 'storyboard-palette', name: '팔레트', spec: '미젤로 · 36칸', description: '색상별로 물감을 담고 혼합할 때 사용합니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/storyboard-supplies/watercolor-palette-case.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/storyboard-supplies/watercolor-palette-case.webp',
                            purchase: {
                                mode: 'online',
                                links: [
                                    { url: 'https://hwabang.net/product/detail.html?product_no=67569', note: '미젤로 · 36칸(34+2) 선택' }
                                ]
                            }
                        },
                        { id: 'storyboard-sharpener', name: '전동 연필깎이', spec: '금우 전동 연필깎이', description: '드로잉에 사용할 연필심을 다듬을 때 사용합니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/storyboard-supplies/pencil-sharpeners.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/storyboard-supplies/pencil-sharpeners.webp',
                            purchase: {
                                mode: 'online',
                                links: [
                                    { url: 'https://hwabang.net/product/detail.html?product_no=68243', note: '금우 V-3 · AA 건전지 4개 별도 준비' }
                                ]
                            }
                        },
                        { id: 'storyboard-stumps', name: '찰필', spec: '크레타 칼라 찰필 · 중', description: '연필로 그린 명암을 부드럽게 풀어 표현할 때 사용합니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/storyboard-supplies/blending-stumps.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/storyboard-supplies/blending-stumps.webp',
                            purchase: {
                                mode: 'online',
                                links: [
                                    { url: 'https://hwabang.net/product/detail.html?product_no=68694', note: '크레타칼라 · 중 9mm 낱자루 선택' }
                                ]
                            }
                        },
                        { id: 'storyboard-colored-pencils', name: '색연필', spec: '프리즈마 색연필 · 72색', description: '다양한 색상과 세부 표현을 위한 색연필 세트입니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/storyboard-supplies/colored-pencil-set.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/storyboard-supplies/colored-pencil-set.webp',
                            purchase: {
                                mode: 'online',
                                links: [
                                    { url: 'https://hwabang.net/product/detail.html?product_no=68141', note: '프리즈마 · 72색 선택' }
                                ]
                            }
                        },
                        { id: 'storyboard-sleeves', name: '팔토시', optional: true, description: '작업 중 소매가 물감이나 물에 닿는 것을 줄여줍니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/storyboard-supplies/protective-sleeves.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/storyboard-supplies/protective-sleeves.webp',
                            purchase: {
                                mode: 'online',
                                links: [
                                    { url: 'https://hwabang.net/product/detail.html?product_no=49480', note: '1세트 · 2개입' }
                                ]
                            }
                        },
                        { id: 'storyboard-apron', name: '앞치마', optional: true, description: '물감이 옷에 묻는 것을 줄여주는 작업용 앞치마입니다.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/storyboard-supplies/artist-aprons.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/storyboard-supplies/artist-aprons.webp',
                            purchase: {
                                mode: 'online',
                                links: [
                                    { url: 'https://hwabang.net/product/detail.html?product_no=74787', note: '몽마르트 · 베이지 또는 검정 선택' }
                                ]
                            }
                        },
                        { id: 'storyboard-poster-paints', name: '포스터 물감', details: ['알파: 블랙, 화이트 (튜브형)', '신한: 5, 27-1, 143-1, 18'], description: '브랜드별 색상과 신한 물감의 색상 번호를 확인해 주세요.', image: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/storyboard-supplies/color-chart-and-paint-bottles.png', thumbnail: 'https://6ad875c0a739f93be2a4929a--sbs-daejeon.netlify.app/assets/images/resources/storyboard-supplies/color-chart-and-paint-bottles.webp',
                            purchase: {
                                mode: 'online',
                                links: [
                                    { url: 'https://hwabang.net/product/detail.html?product_no=61874', note: '알파 튜브형 40ml · 11 화이트, 46 블랙 선택', label: '알파 구매' },
                                    { url: 'https://hwabang.net/product/detail.html?product_no=417', note: '신한 40ml · 5, 27-1, 143-1, 18 선택', label: '신한 구매' }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
