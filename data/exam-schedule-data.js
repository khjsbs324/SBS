/** 자격증 일정 페이지에 표시할 종목과 공식 주관기관 링크. 날짜는 확인된 공고만 기재합니다. */
window.SBSExamScheduleData = Object.freeze({
    defaultCategory: 'engineer',
    categories: [
        {
            id: 'technician', label: '기능사',
            exams: [
                { id: 'interior-technician', name: '실내건축기능사', organizer: '한국산업인력공단', mode: '정기검정', stages: ['필기', '실기'], url: 'https://www.q-net.or.kr/man001.do?gId=04&gSite=L' },
                { id: 'architecture-cad-technician', name: '전산응용건축제도기능사', organizer: '한국산업인력공단', mode: '정기검정', stages: ['필기', '실기'], url: 'https://www.q-net.or.kr/man001.do?gId=04&gSite=L' },
                { id: 'computer-graphics-technician', name: '컴퓨터그래픽기능사', organizer: '한국산업인력공단', mode: '정기검정', stages: ['필기', '실기'], url: 'https://www.q-net.or.kr/man001.do?gId=04&gSite=L' },
                { id: 'web-design-technician', name: '웹디자인개발기능사', organizer: '한국산업인력공단', mode: '정기검정', stages: ['필기', '실기'], url: 'https://www.q-net.or.kr/man001.do?gId=04&gSite=L' }
            ]
        },
        {
            id: 'industrial', label: '산업기사',
            exams: [
                { id: 'interior-industrial', name: '실내건축산업기사', organizer: '한국산업인력공단', mode: '정기검정', stages: ['필기', '실기'], url: 'https://www.q-net.or.kr/man001.do?gId=03&gSite=L' },
                { id: 'color-industrial', name: '컬러리스트산업기사', organizer: '한국산업인력공단', mode: '정기검정', stages: ['필기', '실기'], url: 'https://www.q-net.or.kr/man001.do?gId=03&gSite=L' },
                { id: 'information-industrial', name: '정보처리산업기사', organizer: '한국산업인력공단', mode: '정기검정', stages: ['필기', '실기'], url: 'https://www.q-net.or.kr/man001.do?gId=03&gSite=L' }
            ]
        },
        {
            id: 'engineer', label: '기사',
            exams: [
                { id: 'interior-industrial', name: '실내건축산업기사', organizer: '한국산업인력공단', mode: '정기검정', stages: ['필기', '실기'], url: 'https://www.q-net.or.kr/man001.do?gId=03&gSite=L' },
                { id: 'interior-engineer', name: '실내건축기사', organizer: '한국산업인력공단', mode: '정기검정', stages: ['필기', '실기'], url: 'https://www.q-net.or.kr/man001.do?gId=03&gSite=L' },
                { id: 'color-engineer', name: '컬러리스트기사', organizer: '한국산업인력공단', mode: '정기검정', stages: ['필기', '실기'], url: 'https://www.q-net.or.kr/man001.do?gId=03&gSite=L' }
            ]
        },
        {
            id: 'office', label: '사무',
            exams: [
                { id: 'computer-literacy', name: '컴퓨터활용능력', organizer: '대한상공회의소', mode: '상시검정', grades: ['1급', '2급'], stages: ['필기', '실기'], url: 'https://license.korcham.net/' },
                { id: 'mos', name: 'MOS', organizer: 'YBM IT', mode: '상시검정', stages: ['실기'], url: 'https://www.ybmit.com/test_rec/gen_rec.jsp' }
            ]
        },
        {
            id: 'tax', label: '세무/회계',
            exams: [
                { id: 'computer-accounting-1', name: '전산회계 1급', organizer: '한국세무사회', mode: '정기검정', stages: ['이론·실무'], url: 'https://license.kacpta.or.kr/' },
                { id: 'computer-tax-2', name: '전산세무 2급', organizer: '한국세무사회', mode: '정기검정', stages: ['이론·실무'], url: 'https://license.kacpta.or.kr/' }
            ]
        },
        {
            id: 'design', label: '디자인',
            exams: [
                { id: 'gtq', name: 'GTQ', organizer: '한국생산성본부', mode: '정기검정', stages: ['실기'], url: 'https://license.kpc.or.kr/nasec/rceptexmncnfirm/selectExprschdul.do?year=2026', schedule: 'gtq' },
                { id: 'gtqi', name: 'GTQi', organizer: '한국생산성본부', mode: '정기검정', stages: ['실기'], url: 'https://license.kpc.or.kr/nasec/rceptexmncnfirm/selectExprschdul.do?year=2026', schedule: 'gtq' },
                { id: 'aice', name: 'AICE', organizer: 'KT AICE', mode: '정기·수시검정', url: 'https://aice.study/certi/examSchedule' }
            ]
        }
    ],
    schedules: {
        gtq: {
            title: '2026년 GTQ·GTQi 정기시험',
            rows: [
                { round: '제10회', apply: '09.23 ~ 09.30', exam: '10.24', result: '11.13' },
                { round: '제11회', apply: '10.28 ~ 11.04', exam: '11.28', result: '12.28' },
                { round: '제12회', apply: '11.18 ~ 11.25', exam: '12.19', result: '2027.01.08' }
            ]
        }
    }
});
