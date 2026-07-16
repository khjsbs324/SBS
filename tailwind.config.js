/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './assets/js/**/*.js',
        './data/**/*.js'
    ],
    // 기존 단일 HTML의 인라인 CSS에서 Tailwind Play CDN이 감지하던 토큰까지
    // 정적 빌드에 포함해 변환 전 스타일 선택자 집합을 그대로 보존합니다.
    safelist: ['blur', 'backdrop-filter', 'delay-1000', 'ease-in-out'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif'],
            },
            colors: {
                sbs: {
                    main: '#0d82ff',
                    sub: '#3399ff',
                    light: '#e0f2fe',
                    bg: '#ffffff',
                    card: '#ffffff',
                    border: '#e5e7eb',
                }
            },
            animation: {
                'blob': 'blob 12s infinite',
                'blob-reverse': 'blob-reverse 15s infinite',
            },
            keyframes: {
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(40px, -60px) scale(1.1)' },
                    '66%': { transform: 'translate(-30px, 30px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                },
                'blob-reverse': {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(-40px, 60px) scale(1.1)' },
                    '66%': { transform: 'translate(30px, -30px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                }
            }
        }
    },
    plugins: []
};
