document.addEventListener('DOMContentLoaded', () => {

    // =========================
    // Prevent back button from closing page when lightbox open
    // =========================
    let lightboxOpen = false;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');

    history.pushState(null, document.title, location.href); // Initial state

    window.onpopstate = function () {
        if (lightboxOpen) {
            lightbox.style.display = 'none';
            lightboxOpen = false;
        } else {
            history.pushState(null, document.title, location.href);
        }
    };

    // =========================
    // Smooth scroll for nav links
    // =========================
    const links = document.querySelectorAll('header nav ul li a');
    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            document.querySelector(link.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // =========================
    // Before/After Slider
    // =========================
    const slider = document.getElementById("slider");
    const afterImg = document.getElementById("afterImg");

    if (slider && afterImg) {
        slider.addEventListener("input", () => {
            afterImg.style.clipPath = `inset(0 ${100 - slider.value}% 0 0)`;
        });

        // Mobile / touch support
        let isTouching = false;

        slider.addEventListener("touchstart", () => { isTouching = true; });
        slider.addEventListener("touchend", () => { isTouching = false; });
        slider.addEventListener("touchmove", (e) => {
            if (isTouching) {
                const rect = slider.getBoundingClientRect();
                const touch = e.touches[0];
                let value = ((touch.clientX - rect.left) / rect.width) * 100;
                value = Math.max(0, Math.min(100, value));
                slider.value = value;
                afterImg.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
            }
        });
    }

    // =========================
    // Gallery Lightbox
    // =========================
    const images = document.querySelectorAll('.gallery-container img');

    images.forEach(img => {
        img.addEventListener('click', () => {
            const src = img.getAttribute('data-src') || img.src;
            lightboxImage.src = src;
            lightbox.style.display = 'flex';
            lightboxOpen = true;
            history.pushState({ lightbox: true }, document.title, location.href);
        });
    });

    // Close lightbox function
    const closeLightbox = () => {
        lightbox.style.display = 'none';
        lightboxOpen = false;
        history.pushState(null, document.title, location.href);
    };

    // Close via X button
    const closeBtn = document.querySelector('.lightbox .close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    // Close via clicking outside image
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) closeLightbox();
    });

    // Close via Esc key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeLightbox();
    });

});
