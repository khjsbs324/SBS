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
                flowToggleIcon.classList.add('is-rotated');
            } else {
                flowContentWrapper.style.gridTemplateRows = "0fr";
                flowContentWrapper.style.opacity = "0";
                flowToggleIcon.classList.remove('is-rotated');
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
                    card.className="curc-box group";
                    card.innerHTML = `
                        <div>
                            <div class="curc-box2">
                                <span class="curc-tag">
                                    ${String(index + 1).padStart(2, '0')}
                                </span>
                                <svg class="curc-ico" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                            </div>
                            <h3 class="curc-tit">${subject}</h3>
                        </div>
                    `;
                } else {
                    card.className="curc-box3";
                    card.innerHTML = `
                        <div>
                            <div class="curc-box2">
                                <div class="curc-box4">
                                    <span class="curc-tag2">
                                        ${String(index + 1).padStart(2, '0')}
                                    </span>
                                    <span class="curc-tag3">이미지 준비중</span>
                                </div>
                                <svg class="curc-ico2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                            </div>
                            <h3 class="curc-tit2">${subject}</h3>
                        </div>
                    `;
                }
                card.onclick = () => window.openModal(targetCategory, index);
                cardsContainer.appendChild(card);
            });
        }

        function activateMainTab(target) {
            mainTabBtns.forEach(btn => btn.classList.remove('is-active'));
            const activeBtn = document.querySelector(`.tab-btn[data-target="${target}"]`);
            if(activeBtn) {
                activeBtn.classList.add('is-active');
            }

            // Handle sub-tabs visibility
            if (target === 'ai_agent' || target === 'cert') {
                subTabsContainer.classList.add('is-open');

                subTabBtns.forEach(btn => {
                    if (btn.dataset.parent === target) {
                        btn.classList.add('is-show');
                    } else {
                        btn.classList.remove('is-show');
                    }
                });

                // Activate first sub-tab automatically
                const firstSubTab = Array.from(subTabBtns).find(btn => btn.dataset.parent === target);
                if (firstSubTab) {
                    activateSubTab(firstSubTab.dataset.target);
                }
            } else {
                subTabsContainer.classList.remove('is-open');
                subTabBtns.forEach(btn => btn.classList.remove('is-show'));
                renderCards(target);
            }
        }

        function activateSubTab(target) {
            subTabBtns.forEach(btn => btn.classList.remove('is-active'));
            const activeBtn = document.querySelector(`.sub-tab-btn[data-target="${target}"]`);
            if(activeBtn) {
                activeBtn.classList.add('is-active');
            }
            renderCards(target);
        }

        window.selectCurriculumCategory = function(target) {
            const subTab = document.querySelector(`.sub-tab-btn[data-target="${target}"]`);

            if (subTab) {
                activateMainTab(subTab.dataset.parent);
                activateSubTab(target);
            } else {
                activateMainTab(target);
            }

            const curriculum = document.getElementById('curriculum');
            window.requestAnimationFrame(() => {
                if (typeof window.scrollToSection === 'function') {
                    window.scrollToSection('#curriculum');
                } else {
                    curriculum?.scrollIntoView({ behavior: 'smooth' });
                }
            });
        };

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
        modal.classList.add('is-open');
        document.body.classList.add('modal-open');
        if(lenis) lenis.stop();

        setTimeout(() => {
            container.classList.add('is-active');
        }, 10);
    }

    window.closeModal = function() {
        const modal = document.getElementById('course-modal');
        const container = document.getElementById('modal-container');

        container.classList.remove('is-active');

        setTimeout(() => {
            modal.classList.remove('is-open');
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

            let btnClass = `course-tab${isActive ? ' is-active' : ''}`;

            if (!hasImages) {
                btnClass += ' is-disabled';
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
                display.innerHTML = `<img src="${images[currentImageIndex]}" alt="${subjectName} 과정 상세 이미지" class="curc-img">`;
                display.classList.remove('is-empty');
                display.classList.add('is-filled');
            } else {
                // 이미지가 없는 경우 더미 렌더링
                display.innerHTML = `
                    <div class="curc-box5">
                        <span>${subjectName} - 준비중 ${currentImageIndex + 1}</span>
                    </div>
                `;
                display.classList.remove('is-filled');
                display.classList.add('is-empty');
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
