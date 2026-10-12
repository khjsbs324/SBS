/** 공개 읽기 전용 시트. A:I = ID/작성일/순서/학과/작품명/공개/메인/썸네일/상세 링크. J열 메모는 요청하지 않습니다. */
window.SBSPortfolioConfig = {
    spreadsheetId: '1RrApzQTiIABG8bLxi0xElfboOE3WLoWlz_iN7msw7Ho',
    sheetId: '1255958363',
    range: 'A4:I',
    mediaSheetId: '1',
    mediaRange: 'A1:E',
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
