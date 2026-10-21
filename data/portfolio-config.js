/** 공개 읽기 전용 시트. A:L = ID/작성일/순서/학과/작품명/공개/메인/유형/썸네일/상세 이미지/영상/원본 링크. 영상 URL은 사이트에서 요청하지 않습니다. */
window.SBSPortfolioConfig = {
    spreadsheetId: '1RrApzQTiIABG8bLxi0xElfboOE3WLoWlz_iN7msw7Ho',
    sheetId: '1255958363',
    range: 'A4:L',
    refreshMs: 60000,
    cacheMaxAgeMs: 3600000,
    title: '포트폴리오',
    description: '결과로 증명하는 실력, 수강생 포트폴리오',
    categories: [
        { id: 'all', label: '전체' },
        { id: 'interior', label: '건축/인테리어' },
        { id: 'vfx', label: 'CG/마야' },
        { id: 'motion', label: '영상/모션' },
        { id: 'dtp', label: '시각편집' },
        { id: 'web', label: '웹·UIUX' },
        { id: 'artwork', label: '디지털드로잉' }
    ]
};
