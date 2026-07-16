/**
 * 주요 교육과정 탭, 카드 및 상세 모달
 */
(() => {
    const {
        curriculumData,
        categoryNames,
        courseFlowData,
        subjectImages,
    } = window.SBSCurriculumData;

    let currentCategory = '';
    let currentSubjectIndex = 0;
    let currentImageIndex = 0;
    let currentTotalImages = 3;

    document.addEventListener('DOMContentLoaded', () => {
        // Curriculum Tabs Logic
        const mainTabBtns = document.querySelectorAll('.tab-btn');
        const subTabsContainer = document.getElementById('sub-tabs-container');
        const subTabBtns = document.querySelectorAll('.sub-tab-btn');

        // Flow Dropdown Logic
        const flowToggleBtn = document.getElementById('flow-toggle-btn');
        const flowContentWrapper = document.getElementById('flow-content-wrapper');
        const flowToggleIcon = document.getElementById('flow-toggle-icon');

        let isFlowOpen = true; // 기본 열림 상태
        flowToggleBtn.addEventListener('click', () => {
            isFlowOpen = !isFlowOpen;
            if (isFlowOpen) {
                flowContentWrapper.style.gridTemplateRows = "1fr";
                flowContentWrapper.style.opacity = "1";
                flowToggleIcon.classList.add('rotate-180');
            } else {
                flowContentWrapper.style.gridTemplateRows = "0fr";
                flowContentWrapper.style.opacity = "0";
                flowToggleIcon.classList.remove('rotate-180');
            }
        });

        function renderCards(targetCategory) {
            const cardsContainer = document.getElementById('curriculum-cards');
            cardsContainer.innerHTML = '';

            const subjects = curriculumData[targetCategory] || [];

            // Update Flow Data
            const flowCatName = document.getElementById('flow-category-name');
            const flowContentText = document.getElementById('flow-content-text');

            flowCatName.textContent = categoryNames[targetCategory] || '';
            flowContentText.innerHTML = courseFlowData[targetCategory] || '상세 교육 흐름은 상담을 통해 확인 가능합니다.';

            // Generate Cards
            subjects.forEach((subject, index) => {
                const hasImages = subjectImages[subject] && subjectImages[subject].length > 0;
                const card = document.createElement('div');

                if (hasImages) {
                    card.className = "bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-[0_20px_50px_rgba(13,130,255,0.08)] hover:-translate-y-2 transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[160px]";
                    card.innerHTML = `
                        <div>
                            <div class="flex justify-between items-start mb-4">
                                <span class="w-10 h-10 rounded-full bg-gray-50 text-gray-500 font-bold flex items-center justify-center text-[14px] group-hover:bg-sbs-light group-hover:text-sbs-main transition-colors">
                                    ${String(index + 1).padStart(2, '0')}
                                </span>
                                <svg class="w-6 h-6 text-gray-300 group-hover:text-sbs-main transition-colors transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                            </div>
                            <h3 class="text-[20px] font-bold text-gray-900 group-hover:text-sbs-main transition-colors tracking-tight line-clamp-2">${subject}</h3>
                        </div>
                    `;
                } else {
                    card.className = "bg-white border border-gray-100 rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between min-h-[160px]";
                    card.innerHTML = `
                        <div>
                            <div class="flex justify-between items-start mb-4">
                                <div class="flex items-center gap-3">
                                    <span class="w-10 h-10 rounded-full bg-gray-50 text-gray-400 font-bold flex items-center justify-center text-[14px]">
                                        ${String(index + 1).padStart(2, '0')}
                                    </span>
                                    <span class="text-[#9ca3af] font-bold text-[14px] tracking-tight">이미지 준비중</span>
                                </div>
                                <svg class="w-6 h-6 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                            </div>
                            <h3 class="text-[20px] font-bold text-gray-900 tracking-tight line-clamp-2">${subject}</h3>
                        </div>
                    `;
                }
                card.onclick = () => window.openModal(targetCategory, index);
                cardsContainer.appendChild(card);
            });
        }

        function activateMainTab(target) {
            mainTabBtns.forEach(btn => {
                btn.classList.remove('text-gray-900', 'border-gray-900');
                btn.classList.add('text-gray-400', 'border-transparent');
            });
            const activeBtn = document.querySelector(`.tab-btn[data-target="${target}"]`);
            if(activeBtn) {
                activeBtn.classList.remove('text-gray-400', 'border-transparent');
                activeBtn.classList.add('text-gray-900', 'border-gray-900');
            }

            // Handle sub-tabs visibility
            if (target === 'ai_agent' || target === 'cert') {
                subTabsContainer.classList.remove('hidden');
                subTabsContainer.classList.add('flex');

                subTabBtns.forEach(btn => {
                    if (btn.dataset.parent === target) {
                        btn.classList.remove('hidden');
                    } else {
                        btn.classList.add('hidden');
                    }
                });

                // Activate first sub-tab automatically
                const firstSubTab = Array.from(subTabBtns).find(btn => btn.dataset.parent === target);
                if (firstSubTab) {
                    activateSubTab(firstSubTab.dataset.target);
                }
            } else {
                subTabsContainer.classList.add('hidden');
                subTabsContainer.classList.remove('flex');
                renderCards(target);
            }
        }

        function activateSubTab(target) {
            subTabBtns.forEach(btn => {
                btn.classList.remove('bg-gray-900', 'text-white', 'shadow-md');
                btn.classList.add('bg-white', 'text-gray-500');
            });
            const activeBtn = document.querySelector(`.sub-tab-btn[data-target="${target}"]`);
            if(activeBtn) {
                activeBtn.classList.remove('bg-white', 'text-gray-500');
                activeBtn.classList.add('bg-gray-900', 'text-white', 'shadow-md');
            }
            renderCards(target);
        }

        // Event Listeners for Tabs
        mainTabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                activateMainTab(e.target.dataset.target);
            });
        });

        subTabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                activateSubTab(e.target.dataset.target);
            });
        });

        // Initialize First Tab
        activateMainTab('design_basic');

        // 스와이프 기능 (Swipe)
        window.isSwiping = false;
        let touchStartX = 0;
        let touchEndX = 0;
        const viewer = document.getElementById('image-viewer-container');
        if(viewer) {
            viewer.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
                window.isSwiping = false;
            }, {passive: true});
            viewer.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                const diff = touchStartX - touchEndX;
                if (diff > 50) { // 왼쪽으로 스와이프 (다음 이미지)
                    window.isSwiping = true;
                    nextImage();
                } else if (diff < -50) { // 오른쪽으로 스와이프 (이전 이미지)
                    window.isSwiping = true;
                    prevImage();
                }
            }, {passive: true});
        }
    });

    // ==========================================
    // 기존 과정 상세 모달 Functions
    // ==========================================
    window.openModal = function(category, subjectIndex) {
        currentCategory = category;
        currentSubjectIndex = subjectIndex;
        currentImageIndex = 0;

        const modal = document.getElementById('course-modal');
        const container = document.getElementById('modal-container');

        // Set Category Title
        document.getElementById('modal-category-name-text').textContent = categoryNames[category];

        // Render Tabs
        renderModalTabs();

        // Render Image
        updateModalView();

        // Open Animation
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.classList.add('modal-open');
        if(lenis) lenis.stop();

        setTimeout(() => {
            container.classList.remove('scale-95', 'opacity-0');
            container.classList.add('scale-100', 'opacity-100');
        }, 10);
    }

    window.closeModal = function() {
        const modal = document.getElementById('course-modal');
        const container = document.getElementById('modal-container');

        container.classList.remove('scale-100', 'opacity-100');
        container.classList.add('scale-95', 'opacity-0');

        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.classList.remove('modal-open');
            if(lenis) lenis.start();
        }, 300);
    }

    function renderModalTabs() {
        const tabsContainer = document.getElementById('modal-tabs');
        tabsContainer.innerHTML = '';

        const subjects = curriculumData[currentCategory];

        subjects.forEach((subject, index) => {
            const hasImages = subjectImages[subject] && subjectImages[subject].length > 0;
            const btn = document.createElement('button');
            const isActive = index === currentSubjectIndex;

            let btnClass = `shrink-0 px-5 py-2.5 rounded-full font-bold text-[14px] md:text-[15px] transition-all snap-start ${
                isActive
                ? 'bg-gray-900 text-white shadow-md'
                : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'
            }`;

            if (!hasImages) {
                btnClass += ' opacity-50';
            }

            btn.className = btnClass;
            btn.textContent = subject;
            btn.onclick = () => {
                currentSubjectIndex = index;
                currentImageIndex = 0; // Reset image index on subject change
                renderModalTabs();
                updateModalView();
                btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            };

            tabsContainer.appendChild(btn);
        });
    }

    function updateModalView() {
        const display = document.getElementById('current-image-display');
        const subjectName = curriculumData[currentCategory][currentSubjectIndex];
        const images = subjectImages[subjectName];

        // 등록된 이미지가 있으면 해당 길이만큼, 없으면 기본 3장 설정
        currentTotalImages = images ? images.length : 3;

        display.style.opacity = 0;

        setTimeout(() => {
            if (images && images.length > 0) {
                // 실제 이미지가 있는 경우 렌더링
                display.innerHTML = `<img src="${images[currentImageIndex]}" alt="${subjectName} 과정 상세 이미지" class="w-full h-full object-contain rounded-2xl">`;
                display.classList.remove('bg-gray-100'); // 배경 회색 제거
            } else {
                // 이미지가 없는 경우 더미 렌더링
                display.innerHTML = `
                    <div class="flex flex-col items-center gap-4">
                        <span>${subjectName} - 준비중 ${currentImageIndex + 1}</span>
                    </div>
                `;
                display.classList.add('bg-gray-100');
            }

            display.style.opacity = 1;
            document.getElementById('modal-pagination').textContent = `${currentImageIndex + 1} / ${currentTotalImages}`;
        }, 150);
    }

    window.prevImage = function() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateModalView();
        } else {
            if (currentSubjectIndex > 0) {
                prevSubject();
            }
        }
    }

    window.nextImage = function() {
        if (currentImageIndex < currentTotalImages - 1) {
            currentImageIndex++;
            updateModalView();
        } else {
             if (currentSubjectIndex < curriculumData[currentCategory].length - 1) {
                nextSubject();
             }
        }
    }

    window.prevSubject = function() {
        if (currentSubjectIndex > 0) {
            currentSubjectIndex--;
            currentImageIndex = 0;
            renderModalTabs();
            updateModalView();

            const tabs = document.getElementById('modal-tabs').children;
            if(tabs[currentSubjectIndex]) {
                tabs[currentSubjectIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }

    window.nextSubject = function() {
        if (currentSubjectIndex < curriculumData[currentCategory].length - 1) {
            currentSubjectIndex++;
            currentImageIndex = 0;
            renderModalTabs();
            updateModalView();

            const tabs = document.getElementById('modal-tabs').children;
            if(tabs[currentSubjectIndex]) {
                tabs[currentSubjectIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }
})();
