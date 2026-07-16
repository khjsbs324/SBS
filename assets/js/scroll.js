/**
 * 스크롤, 노출 애니메이션, 헤더 및 플로팅 버튼
 */
let lenis;

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 스크롤 부드럽게 (Lenis 적용)
    // ==========================================
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // 부드러운 감속 효과
        smoothWheel: true,
        wheelMultiplier: 1,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GNB 등 링크 앵커 클릭 시 Lenis로 스크롤 이동
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId && targetId !== '#') {
                lenis.scrollTo(targetId, { offset: -80 });
            }
        });
    });

    // Scroll Animation Observer
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    });

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // Number Counter Animation (통계 숫자 증가 애니메이션)
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseFloat(target.getAttribute('data-target'));
                const decimals = parseInt(target.getAttribute('data-decimal')) || 0;
                const duration = 2000; // 애니메이션 지속 시간 (2초)
                let startTime = null;

                function updateCounter(currentTime) {
                    if (!startTime) startTime = currentTime;
                    const progress = Math.min((currentTime - startTime) / duration, 1);
                    // easeOutQuart 애니메이션 곡선 적용
                    const easeProgress = 1 - Math.pow(1 - progress, 4);
                    const currentValue = endValue * easeProgress;

                    target.textContent = currentValue.toFixed(decimals);

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.textContent = endValue.toFixed(decimals);
                    }
                }

                requestAnimationFrame(updateCounter);
                observer.unobserve(target); // 한 번만 실행되도록 관찰 해제
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Header Scroll Effect
    const header = document.getElementById('header');
    const scrollControls = document.getElementById('scroll-controls');
    const smartScrollIcon = document.getElementById('smart-scroll-icon');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

        if (currentScrollY > 20) {
            header.classList.add('shadow-sm');
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.classList.remove('shadow-sm');
            header.style.background = 'rgba(255, 255, 255, 0.75)';
        }

        // 스크롤 버튼 활성화 로직
        if (currentScrollY > 300) {
            scrollControls.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
            scrollControls.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
        } else {
            scrollControls.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
            scrollControls.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
        }

        // 스크롤 방향에 따른 아이콘 및 동작 변경
        if (currentScrollY > lastScrollY && currentScrollY < maxScroll - 50) {
            // 아래로 스크롤 중
            window.scrollDirection = 'down';
            if(smartScrollIcon) {
                smartScrollIcon.classList.add('rotate-180');
                smartScrollIcon.classList.remove('group-hover:-translate-y-1');
                smartScrollIcon.classList.add('group-hover:translate-y-1');
            }
        } else if (currentScrollY < lastScrollY || currentScrollY >= maxScroll - 50) {
            // 위로 스크롤 중이거나 최하단에 도달했을 때 (최상단 이동 아이콘으로 변경)
            window.scrollDirection = 'up';
            if(smartScrollIcon) {
                smartScrollIcon.classList.remove('rotate-180');
                smartScrollIcon.classList.remove('group-hover:translate-y-1');
                smartScrollIcon.classList.add('group-hover:-translate-y-1');
            }
        }
        lastScrollY = currentScrollY;
    });

    // Floating CTA
    const floatingCta = document.getElementById('floating-cta');
    let scrollTimeout;

    window.addEventListener('scroll', () => {
        floatingCta.classList.remove('translate-y-24', 'opacity-0');
        floatingCta.classList.add('translate-y-0', 'opacity-100');

        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }

        scrollTimeout = setTimeout(() => {
            floatingCta.classList.remove('translate-y-0', 'opacity-100');
            floatingCta.classList.add('translate-y-24', 'opacity-0');
        }, 1500);
    });


});

// ==========================================
// 스크롤 제어 함수 (플로팅 배너 등에서 사용)
// ==========================================
window.scrollToSection = function(id) {
    if(lenis) {
        lenis.scrollTo(id, { offset: -80 });
    }
}

window.scrollToTop = function() {
    if(lenis) lenis.scrollTo(0, { duration: 1.5 });
    else window.scrollTo({top: 0, behavior: 'smooth'});
};

window.scrollToBottom = function() {
    if(lenis) lenis.scrollTo('bottom', { duration: 1.5 });
    else window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
};

window.goToCurriculum = function(target) {
    const tabButton = document.querySelector(`.tab-btn[data-target="${target}"]`);
    if (tabButton) tabButton.click();

    if (lenis) {
        lenis.scrollTo('#curriculum', { offset: -80 });
    } else {
        document.querySelector('#curriculum')?.scrollIntoView({ behavior: 'smooth' });
    }
};

window.scrollDirection = 'up';
window.handleSmartScroll = function() {
    if (window.scrollDirection === 'down') {
        scrollToBottom();
    } else {
        scrollToTop();
    }
};
