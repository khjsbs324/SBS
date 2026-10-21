/**
 * SBS소개 페이지 공통 브랜드 및 푸터 데이터 연결
 */
(() => {
    const data = window.SBSSiteData;
    if (!data) return;

    const safeUrl = (value) => {
        try {
            const url = new URL(value, window.location.href);
            return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
        } catch {
            return '';
        }
    };

    document.querySelectorAll('[data-site-logo]').forEach((image) => {
        image.src = safeUrl(data.brand.logoUrl);
    });

    const footerPhone = document.getElementById('footer-phone');
    const footerEmail = document.getElementById('footer-email');
    const footerBlog = document.getElementById('footer-blog-link');

    if (footerPhone) footerPhone.textContent = data.contact.phone;
    if (footerEmail) footerEmail.textContent = data.contact.email;
    if (footerBlog) {
        footerBlog.href = safeUrl(data.contact.blogUrl);
        footerBlog.textContent = data.contact.blogUrl;
    }
})();
