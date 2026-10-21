/** 과정별 준비물 목록과 접근 가능한 이미지 확대 보기. */
(() => {
    const data = window.SBSResourcesData;
    const tabs = document.getElementById('rs-tabs');
    const panels = document.getElementById('rs-panels');
    const dialog = document.getElementById('rs-dialog');
    if (!data || !tabs || !panels || !dialog) return;

    const status = document.getElementById('rs-status');
    const dialogImage = document.getElementById('rs-dialog-image');
    const dialogCopy = document.getElementById('rs-dialog-copy');
    const dialogError = document.getElementById('rs-dialog-error');
    let returnFocus;
    let restartLenis = false;

    function node(tag, className, text) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text) element.textContent = text;
        return element;
    }

    function imageUrl(path) {
        try {
            const url = new URL(path, location.href);
            return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
        } catch { return ''; }
    }

    function itemCount(category) {
        return category.sections.reduce((total, section) => total + section.items.length, 0);
    }

    function information(item, headingTag = 'h4') {
        const copy = node('div', 'rs-card-copy');
        if (item.usage) copy.append(node('p', 'rs-usage', item.usage));
        const heading = node(headingTag, 'rs-card-title', item.name);
        if (headingTag === 'h2') heading.id = 'rs-dialog-title';
        copy.append(heading);
        if (item.optional) copy.append(node('span', 'rs-optional', data.ui.optional));
        if (item.spec) copy.append(node('p', 'rs-spec', item.spec));
        if (item.details) {
            const list = node('ul', 'rs-details');
            item.details.forEach((text) => list.append(node('li', '', text)));
            copy.append(list);
        }
        copy.append(node('p', 'rs-description', item.description));
        if (item.note) copy.append(node('p', 'rs-item-note', item.note));
        return copy;
    }

    function openImage(item, trigger) {
        returnFocus = trigger;
        dialogCopy.replaceChildren(information(item, 'h2'));
        dialogImage.hidden = false;
        dialogError.hidden = true;
        dialogImage.alt = `${item.name} 참고 이미지`;
        dialogImage.src = imageUrl(item.image);
        dialog.showModal();
        document.body.classList.add('rs-dialog-open');
        restartLenis = typeof lenis !== 'undefined' && lenis && !lenis.isStopped;
        if (restartLenis) lenis.stop();
    }

    function card(item) {
        const entry = node('li', item.image ? 'rs-card' : 'rs-extra-card');
        entry.dataset.resourceId = item.id;
        if (item.image) {
            const media = node('button', 'rs-media');
            media.type = 'button';
            media.setAttribute('aria-label', `${item.name} ${data.ui.enlarge}`);
            media.setAttribute('aria-haspopup', 'dialog');
            const image = node('img');
            image.src = imageUrl(item.thumbnail);
            image.alt = `${item.name} 참고 이미지`;
            image.width = 640;
            image.height = 640;
            image.loading = 'lazy';
            image.decoding = 'async';
            const hint = node('span', 'rs-zoom-hint', '+');
            hint.setAttribute('aria-hidden', 'true');
            image.addEventListener('error', () => {
                if (!image.dataset.original) {
                    image.dataset.original = 'true';
                    image.src = imageUrl(item.image);
                    return;
                }
                image.hidden = true;
                media.disabled = true;
                media.append(node('span', 'rs-image-error', data.ui.imageError));
            });
            media.addEventListener('click', () => openImage(item, media));
            media.append(image, hint);
            entry.append(media);
        }
        entry.append(information(item, item.image ? 'h4' : 'h5'));
        return entry;
    }

    function renderSection(section, categoryId) {
        const wrapper = node('section', section.id === 'color-chips' ? 'rs-section rs-chip-section' : 'rs-section');
        const heading = node('div', 'rs-section-heading');
        const title = node('h3', '', section.title);
        title.id = `rs-${categoryId}-${section.id}`;
        wrapper.setAttribute('aria-labelledby', title.id);
        heading.append(title, node('span', 'rs-section-count', `${section.items.length}${data.ui.countUnit}`));
        wrapper.append(heading);
        if (section.note) wrapper.append(node('p', 'rs-section-note', section.note));
        const list = node('ul', 'rs-grid');
        const extras = node('ul', 'rs-extra-grid');
        section.items.forEach((item) => (item.image ? list : extras).append(card(item)));
        wrapper.append(list);
        if (extras.children.length) {
            const extraGroup = node('div', 'rs-extras');
            extraGroup.append(node('h4', 'rs-extras-title', data.ui.extrasTitle), extras);
            wrapper.append(extraGroup);
        }
        return wrapper;
    }

    document.getElementById('rs-page-title').textContent = data.title;
    document.getElementById('rs-page-description').textContent = data.description;
    document.getElementById('rs-image-note').textContent = data.imageNote;
    document.getElementById('rs-dialog-close').setAttribute('aria-label', data.ui.close);
    dialogError.textContent = data.ui.imageError;

    data.categories.forEach((category) => {
        const button = node('button', 'rs-tab');
        button.type = 'button';
        button.id = `rs-tab-${category.id}`;
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-controls', `rs-panel-${category.id}`);
        button.append(node('span', '', category.label), node('span', 'rs-tab-count', String(itemCount(category))));
        button.addEventListener('click', () => selectCategory(category.id, true));
        tabs.append(button);

        const panel = node('div', 'rs-panel');
        panel.id = `rs-panel-${category.id}`;
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', button.id);
        panel.tabIndex = 0;
        const heading = node('header', 'rs-course-heading');
        heading.append(node('h2', '', category.title), node('p', '', category.description));
        panel.append(heading, ...category.sections.map((section) => renderSection(section, category.id)));
        panels.append(panel);
    });

    function categoryFromUrl() {
        const id = new URL(location.href).searchParams.get('category');
        return data.categories.find((category) => category.id === id) || data.categories[0];
    }

    function selectCategory(id, updateHistory = false) {
        const category = data.categories.find((item) => item.id === id) || data.categories[0];
        if (dialog.open) dialog.close();
        data.categories.forEach((item) => {
            const selected = item.id === category.id;
            const tab = document.getElementById(`rs-tab-${item.id}`);
            tab.setAttribute('aria-selected', String(selected));
            tab.tabIndex = selected ? 0 : -1;
            document.getElementById(`rs-panel-${item.id}`).hidden = !selected;
        });
        status.textContent = `${category.title}, ${itemCount(category)}${data.ui.countUnit}`;
        if (updateHistory) {
            const url = new URL(location.href);
            url.searchParams.set('category', category.id);
            if (url.href !== location.href) history.pushState(null, '', url);
        }
    }

    tabs.addEventListener('keydown', (event) => {
        const buttons = [...tabs.querySelectorAll('[role="tab"]')];
        const current = buttons.indexOf(document.activeElement);
        if (current < 0) return;
        let next;
        if (event.key === 'ArrowRight') next = (current + 1) % buttons.length;
        else if (event.key === 'ArrowLeft') next = (current - 1 + buttons.length) % buttons.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = buttons.length - 1;
        else return;
        event.preventDefault();
        buttons[next].click();
        buttons[next].focus({ preventScroll: true });
    });

    dialogImage.addEventListener('error', () => {
        dialogImage.hidden = true;
        dialogError.hidden = false;
    });
    document.getElementById('rs-dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('keydown', (event) => {
        if (event.key !== 'Tab') return;
        event.preventDefault();
        document.getElementById('rs-dialog-close').focus();
    });
    let backdropPointer = false;
    function outsideDialog(event) {
        const rect = dialog.getBoundingClientRect();
        return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    }
    dialog.addEventListener('pointerdown', (event) => { backdropPointer = outsideDialog(event); });
    dialog.addEventListener('click', (event) => {
        if (backdropPointer && outsideDialog(event)) dialog.close();
        backdropPointer = false;
    });
    dialog.addEventListener('close', () => {
        document.body.classList.remove('rs-dialog-open');
        if (restartLenis && typeof lenis !== 'undefined' && lenis) lenis.start();
        restartLenis = false;
        if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
        dialogImage.removeAttribute('src');
    });
    window.addEventListener('popstate', () => selectCategory(categoryFromUrl().id));
    selectCategory(categoryFromUrl().id);
})();
