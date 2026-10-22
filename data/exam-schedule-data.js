/** 공식 공고를 확인한 2026년 자격증 일정. 날짜는 ISO 형식으로 관리합니다. */
(() => {
    const dates = (start, end = start, label = '') => ({ start, end, label });
    const technicianRows = [
        { round: '제1회', stage: '필기', apply: dates('2026-01-06', '2026-01-09'), exam: dates('2026-01-20', '2026-01-24'), result: dates('2026-01-30') },
        { round: '제2회', stage: '필기', apply: [dates('2026-03-16', '2026-03-17'), dates('2026-03-19', '2026-03-20')], exam: dates('2026-04-04', '2026-04-09'), result: dates('2026-04-22') },
        { round: '제3회', stage: '필기', apply: dates('2026-06-08', '2026-06-11'), exam: dates('2026-06-27', '2026-07-02'), result: dates('2026-07-15') },
        { round: '제4회', stage: '필기', apply: dates('2026-08-24', '2026-08-27'), exam: dates('2026-09-16', '2026-09-21'), result: dates('2026-10-07') },
        { round: '제1회', stage: '실기', apply: dates('2026-02-02', '2026-02-05'), exam: dates('2026-03-14', '2026-04-05'), result: dates('2026-04-17') },
        { round: '제2회', stage: '실기', apply: dates('2026-04-27', '2026-04-30'), exam: dates('2026-05-30', '2026-06-14'), result: dates('2026-07-03') },
        { round: '제3회', stage: '실기', apply: dates('2026-07-27', '2026-07-30'), exam: dates('2026-08-29', '2026-09-16'), result: dates('2026-10-08') },
        { round: '제4회', stage: '실기', apply: dates('2026-10-12', '2026-10-15'), exam: dates('2026-11-14', '2026-12-02'), result: dates('2026-12-18') }
    ];
    // 큐넷 종목별 시행표: 웹디자인개발기능사는 현지채점(1차 발표), 나머지 등록 기능사는 2차 발표.
    const webResults = { '제1회': '2026-04-10', '제2회': '2026-06-26', '제3회': '2026-10-02', '제4회': '2026-12-11' };
    const qnetNotes = [
        '정기검정 일반 응시자 기준입니다. 시험일은 회차별 시행기간이며 개인별 시험일·시험장은 접수 후 확인하세요.',
        '원서접수는 정기 접수기간입니다. 빈자리 접수와 접수 개시 시각은 큐넷 공고를 확인하세요. 합격자 발표는 해당일 09:00입니다.'
    ];
    const aiceYouthRows = [
        { round: '제1회', apply: dates('2025-12-29', '2026-01-24'), exam: dates('2026-01-31'), result: dates('2026-02-14') },
        { round: '제2회', apply: dates('2026-03-30', '2026-04-17'), exam: dates('2026-04-25'), result: dates('2026-05-09') },
        { round: '제3회', apply: dates('2026-04-27', '2026-05-23'), exam: dates('2026-05-30'), result: dates('2026-06-13') },
        { round: '제4회', apply: dates('2026-06-22', '2026-07-18'), exam: dates('2026-07-25'), result: dates('2026-08-08') },
        { round: '제5회', apply: dates('2026-08-17', '2026-09-12'), exam: dates('2026-09-19'), result: dates('2026-10-03') },
        { round: '제6회', apply: dates('2026-10-26', '2026-11-21'), exam: dates('2026-11-28'), result: dates('2026-12-12') }
    ];
    const aiceAdultRows = [
        { round: '제1회', apply: dates('2026-02-02', '2026-02-20'), exam: dates('2026-02-27', '2026-02-28'), result: dates('2026-03-14') },
        { round: '제2회', apply: dates('2026-03-30', '2026-04-17'), exam: dates('2026-04-24', '2026-04-25'), result: dates('2026-05-09') },
        { round: '제3회', apply: dates('2026-06-01', '2026-06-19'), exam: dates('2026-06-26', '2026-06-27'), result: dates('2026-07-11') },
        { round: '제4회', apply: dates('2026-08-03', '2026-08-21'), exam: dates('2026-08-28', '2026-08-29'), result: dates('2026-09-12') },
        { round: '제5회', apply: dates('2026-10-05', '2026-10-23'), exam: dates('2026-10-30', '2026-10-31'), result: dates('2026-11-14') },
        { round: '제6회', apply: dates('2026-11-23', '2026-12-11'), exam: dates('2026-12-18', '2026-12-19'), result: dates('2027-01-02') }
    ];
    const associateOffline = {
        '제3회': { apply: dates('2026-06-01', '2026-06-12', '오프라인'), exam: dates('2026-06-27', '2026-06-27', '오프라인 11:00') },
        '제4회': { apply: dates('2026-08-03', '2026-08-14', '오프라인'), exam: dates('2026-08-29', '2026-08-29', '오프라인 11:00') },
        '제5회': { apply: dates('2026-10-05', '2026-10-16', '오프라인'), exam: dates('2026-10-31', '2026-10-31', '오프라인 11:00') }
    };

window.SBSExamScheduleData = Object.freeze({
    defaultCategory: 'engineer',
    categories: [
        {
            id: 'technician', label: '기능사',
            exams: [
                { id: 'interior-technician', name: '실내건축기능사', organizer: '한국산업인력공단', mode: '정기검정', stages: ['필기', '실기'], url: 'https://www.q-net.or.kr/crf021.do?id=crf02101&gSite=Q&gId=&scheType=04', schedule: 'qnet-technician' },
                { id: 'architecture-cad-technician', name: '전산응용건축제도기능사', organizer: '한국산업인력공단', mode: '정기검정', stages: ['필기', '실기'], url: 'https://www.q-net.or.kr/crf021.do?id=crf02101&gSite=Q&gId=&scheType=04', schedule: 'qnet-technician' },
                { id: 'computer-graphics-technician', name: '컴퓨터그래픽기능사', organizer: '한국산업인력공단', mode: '정기검정', stages: ['필기', '실기'], url: 'https://www.q-net.or.kr/crf021.do?id=crf02101&gSite=Q&gId=&scheType=04', schedule: 'qnet-technician' },
                { id: 'web-design-technician', name: '웹디자인개발기능사', organizer: '한국산업인력공단', mode: '정기검정', stages: ['필기', '실기'], url: 'https://www.q-net.or.kr/crf021.do?id=crf02101&gSite=Q&gId=&scheType=04', schedule: 'qnet-web-technician' }
            ]
        },
        {
            id: 'industrial', label: '산업기사',
            exams: [
                { id: 'interior-industrial', name: '실내건축산업기사', organizer: '한국산업인력공단', mode: '정기검정', stages: ['필기', '실기'], url: 'https://www.q-net.or.kr/crf021.do?id=crf02101&gSite=Q&gId=&scheType=03', schedule: 'qnet-engineer' },
                { id: 'color-industrial', name: '컬러리스트산업기사', organizer: '한국산업인력공단', mode: '정기검정', stages: ['필기', '실기'], url: 'https://www.q-net.or.kr/crf021.do?id=crf02101&gSite=Q&gId=&scheType=03', schedule: 'qnet-engineer' },
                { id: 'information-industrial', name: '정보처리산업기사', organizer: '한국산업인력공단', mode: '정기검정', stages: ['필기', '실기'], url: 'https://www.q-net.or.kr/crf021.do?id=crf02101&gSite=Q&gId=&scheType=03', schedule: 'qnet-engineer' }
            ]
        },
        {
            id: 'engineer', label: '기사',
            exams: [
                { id: 'interior-industrial', name: '실내건축산업기사', organizer: '한국산업인력공단', mode: '정기검정', stages: ['필기', '실기'], url: 'https://www.q-net.or.kr/crf021.do?id=crf02101&gSite=Q&gId=&scheType=03', schedule: 'qnet-engineer' },
                { id: 'interior-engineer', name: '실내건축기사', organizer: '한국산업인력공단', mode: '정기검정', stages: ['필기', '실기'], url: 'https://www.q-net.or.kr/crf021.do?id=crf02101&gSite=Q&gId=&scheType=03', schedule: 'qnet-engineer' },
                { id: 'color-engineer', name: '컬러리스트기사', organizer: '한국산업인력공단', mode: '정기검정', stages: ['필기', '실기'], url: 'https://www.q-net.or.kr/crf021.do?id=crf02101&gSite=Q&gId=&scheType=03', schedule: 'qnet-engineer' }
            ]
        },
        {
            id: 'office', label: '사무',
            exams: [
                { id: 'computer-literacy', name: '컴퓨터활용능력', organizer: '대한상공회의소', mode: '상시검정', grades: ['1급', '2급'], stages: ['필기', '실기'], url: 'https://license.korcham.net/', schedule: 'computer-literacy' },
                { id: 'mos', name: 'MOS', organizer: 'YBM IT', mode: '상시검정', stages: ['실기'], url: 'https://www.ybmit.com/test_rec/gen_rec.jsp', schedule: 'mos' }
            ]
        },
        {
            id: 'tax', label: '세무/회계',
            exams: [
                { id: 'computer-accounting-1', name: '전산회계 1급', organizer: '한국세무사회', mode: '정기검정', stages: ['이론·실무'], url: 'https://license.kacta.or.kr/web/info/info_diary.aspx', schedule: 'tax' },
                { id: 'computer-tax-2', name: '전산세무 2급', organizer: '한국세무사회', mode: '정기검정', stages: ['이론·실무'], url: 'https://license.kacta.or.kr/web/info/info_diary.aspx', schedule: 'tax' }
            ]
        },
        {
            id: 'design', label: '디자인',
            exams: [
                { id: 'gtq', name: 'GTQ', organizer: '한국생산성본부', mode: '정기검정', stages: ['실기'], url: 'https://license.kpc.or.kr/nasec/rceptexmncnfirm/selectExprschdul.do?year=2026', schedule: 'gtq' },
                { id: 'gtqi', name: 'GTQi', organizer: '한국생산성본부', mode: '정기검정', stages: ['실기'], url: 'https://license.kpc.or.kr/nasec/rceptexmncnfirm/selectExprschdul.do?year=2026', schedule: 'gtq' },
                { id: 'aice', name: 'AICE', organizer: 'KT AICE', mode: '정기·수시검정', grades: ['Associate', 'Basic', 'Professional', 'Junior', 'Future', 'Generative'], url: 'https://aice.study/certi/examSchedule', schedule: 'aice' }
            ]
        }
    ],
    sources: {
        'qnet-technician': { name: '큐넷 기능사 시행일정·종목별 발표일', url: 'https://www.q-net.or.kr/crf021.do?id=crf02101&gSite=Q&gId=&scheType=04', checkedAt: '2026-10-22' },
        'qnet-engineer': { name: '큐넷 기사·산업기사 시행일정·종목별 발표일', url: 'https://www.q-net.or.kr/crf021.do?id=crf02101&gSite=Q&gId=&scheType=03', checkedAt: '2026-10-22' },
        'qnet-notice': { name: '큐넷 2026년 시행계획 공고', url: 'https://www.q-net.or.kr/man004.do?ARTL_SEQ=5249930&BOARD_ID=Q001&gSite=Q&id=man00402', checkedAt: '2026-10-22' },
        tax: { name: '한국세무사회 2026년 시험일정', url: 'https://license.kacta.or.kr/web/info/info_diary.aspx', checkedAt: '2026-10-22' },
        gtq: { name: '한국생산성본부 2026년 시험일정', url: 'https://license.kpc.or.kr/nasec/rceptexmncnfirm/selectExprschdul.do?year=2026', checkedAt: '2026-10-22' },
        aice: { name: 'AICE 2026년 등급별 시험일정', url: 'https://aice.study/certi/examSchedule', checkedAt: '2026-10-22' },
        korcham: { name: '대한상공회의소 시험시행 안내', url: 'https://license.korcham.net/customer/faq.do?bigCate=13', checkedAt: '2026-10-22' },
        mos: { name: 'YBM MOS 시험 안내', url: 'https://www.ybmit.com/mos/int_test.jsp', checkedAt: '2026-10-22' }
    },
    schedules: {
        'qnet-technician': {
            year: 2026, title: '정기시험', sources: ['qnet-technician', 'qnet-notice'],
            notes: qnetNotes,
            rows: technicianRows
        },
        'qnet-web-technician': {
            year: 2026, title: '정기시험', sources: ['qnet-technician', 'qnet-notice'],
            notes: qnetNotes,
            rows: technicianRows.map(row => row.stage === '실기' ? { ...row, result: dates(webResults[row.round]) } : row)
        },
        'qnet-engineer': {
            year: 2026, title: '정기시험', sources: ['qnet-engineer', 'qnet-notice'],
            notes: qnetNotes,
            rows: [
                { round: '제1회', stage: '필기', apply: dates('2026-01-12', '2026-01-15'), exam: dates('2026-01-30', '2026-03-03'), result: dates('2026-03-11') },
                { round: '제2회', stage: '필기', apply: dates('2026-04-20', '2026-04-23'), exam: dates('2026-05-09', '2026-05-29'), result: dates('2026-06-10') },
                { round: '제3회', stage: '필기', apply: dates('2026-07-20', '2026-07-23'), exam: dates('2026-08-07', '2026-09-01'), result: dates('2026-09-09') },
                { round: '제1회', stage: '실기', apply: dates('2026-03-23', '2026-03-26'), exam: dates('2026-04-18', '2026-05-06'), result: dates('2026-06-12') },
                { round: '제2회', stage: '실기', apply: dates('2026-06-22', '2026-06-25'), exam: dates('2026-07-18', '2026-08-05'), result: dates('2026-09-11') },
                { round: '제3회', stage: '실기', apply: [dates('2026-09-21', '2026-09-23'), dates('2026-09-28')], exam: dates('2026-10-24', '2026-11-13'), result: dates('2026-12-18') }
            ]
        },
        tax: {
            year: 2026, title: '정기시험', sources: ['tax'],
            notes: ['원서접수 마지막 날은 18:00에 마감합니다.'],
            rows: [
                { round: '제124회', apply: dates('2026-01-02', '2026-01-08'), exam: dates('2026-01-31'), result: dates('2026-02-26') },
                { round: '제125회', apply: dates('2026-03-05', '2026-03-11'), exam: dates('2026-04-04'), result: dates('2026-04-23') },
                { round: '제126회', apply: dates('2026-04-30', '2026-05-07'), exam: dates('2026-06-06'), result: dates('2026-06-25') },
                { round: '제127회', apply: dates('2026-07-02', '2026-07-08'), exam: dates('2026-08-01'), result: dates('2026-08-20') },
                { round: '제128회', apply: dates('2026-08-27', '2026-09-02'), exam: dates('2026-10-03'), result: dates('2026-10-29') },
                { round: '제129회', apply: dates('2026-11-05', '2026-11-11'), exam: dates('2026-12-05'), result: dates('2026-12-24') }
            ]
        },
        gtq: {
            year: 2026, title: '정기시험', sources: ['gtq'],
            rows: [
                { round: '제1회', apply: dates('2025-12-24', '2025-12-31'), exam: dates('2026-01-24'), result: dates('2026-02-20') },
                { round: '제2회', apply: dates('2026-01-28', '2026-02-04'), exam: dates('2026-02-28'), result: dates('2026-03-20') },
                { round: '제3회', apply: dates('2026-02-25', '2026-03-04'), exam: dates('2026-03-28'), result: dates('2026-04-17') },
                { round: '제4회', apply: dates('2026-03-25', '2026-04-01'), exam: dates('2026-04-25'), result: dates('2026-05-15') },
                { round: '제5회', apply: dates('2026-04-29', '2026-05-06'), exam: dates('2026-05-30'), result: dates('2026-06-26') },
                { round: '제6회', apply: dates('2026-05-27', '2026-06-04'), exam: dates('2026-06-27'), result: dates('2026-07-17') },
                { round: '제7회', apply: dates('2026-06-24', '2026-07-01'), exam: dates('2026-07-25'), result: dates('2026-08-14') },
                { round: '제8회', apply: dates('2026-07-22', '2026-07-29'), exam: dates('2026-08-22'), result: dates('2026-09-11') },
                { round: '제9회', apply: dates('2026-08-19', '2026-08-26'), exam: dates('2026-09-19'), result: dates('2026-10-16') },
                { round: '제10회', apply: dates('2026-09-23', '2026-09-30'), exam: dates('2026-10-24'), result: dates('2026-11-13') },
                { round: '제11회', apply: dates('2026-10-28', '2026-11-04'), exam: dates('2026-11-28'), result: dates('2026-12-28') },
                { round: '제12회', apply: dates('2026-11-18', '2026-11-25'), exam: dates('2026-12-19'), result: dates('2027-01-08') }
            ]
        },
        aice: {
            year: 2026, title: '시험 일정', sources: ['aice'],
            gradeNotes: {
                Future: ['Future 1·2·3급 공통 일정이며 온라인·오프라인 시험을 운영합니다.'],
                Junior: ['Junior는 온라인 시험입니다.'],
                Basic: ['Basic은 온라인 시험입니다.'],
                Associate: ['3·4·5회는 온라인·오프라인 접수 마감일이 다릅니다.', '완화검정은 국가공인 이전 Associate 자격 취득자 대상입니다. 일반 정기시험과 구분해 접수하세요.'],
                Professional: ['Professional은 연간 4회 온라인 시험을 시행합니다.'],
                Generative: ['Generative는 기업·기관 대상 B2B 전용 시험으로, 공개된 정기시험 날짜가 없습니다. 단체 도입 문의에서 일정을 확인하세요.']
            },
            rows: [
                ...['Future', 'Junior'].flatMap(grade => aiceYouthRows.map(row => ({ ...row, grade }))),
                ...aiceAdultRows.map(row => ({ ...row, grade: 'Basic' })),
                ...aiceAdultRows.map(row => {
                    const offline = associateOffline[row.round];
                    return {
                        ...row, grade: 'Associate',
                        ...(offline ? {
                            apply: [{ ...row.apply, label: '온라인' }, offline.apply],
                            exam: [{ ...row.exam, label: '온라인' }, offline.exam]
                        } : {})
                    };
                }),
                { round: '제3회 · 완화검정', grade: 'Associate', apply: dates('2026-05-18', '2026-06-05'), exam: dates('2026-06-13'), result: dates('2026-06-27') },
                { round: '제4회 · 완화검정', grade: 'Associate', apply: dates('2026-11-16', '2026-12-04'), exam: dates('2026-12-12'), result: dates('2026-12-26') },
                ...[0, 1, 2, 4].map((index, round) => ({ ...aiceAdultRows[index], round: `제${round + 1}회`, grade: 'Professional' })),
                { round: 'B2B 전용', grade: 'Generative', apply: '단체 도입 문의', exam: '단체시험 일정 확인', result: '공식 안내 확인' }
            ]
        },
        'computer-literacy': {
            year: 2026, title: '상시시험', sources: ['korcham'],
            notes: ['1·2급 공통 운영 기준입니다. 시험장별 개설 일정과 잔여 좌석은 공식 접수처에서 확인하세요.'],
            rows: [
                { round: '상시', stage: '필기', apply: '시험 개설일부터\n시험일 4일 전까지', exam: '시험장별 개설일 중 선택', result: '시험 다음 날\n10:00' },
                { round: '상시', stage: '실기', apply: '시험 개설일부터\n시험일 4일 전까지', exam: '시험장별 개설일 중 선택', result: '수~화 응시분 기준\n2주 후 화요일 10:00' }
            ]
        },
        mos: {
            year: 2026, title: '상시시험', sources: ['mos'],
            notes: ['시험센터·과목별 개설 일정과 접수 가능 여부는 YBM 공식 접수처에서 확인하세요.'],
            rows: [
                { round: '상시', apply: '시험센터별 접수 일정 확인', exam: '시험센터별 개설일 중 선택', result: '시험 종료 즉시' }
            ]
        }
    }
});
})();
