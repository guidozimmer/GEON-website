let currentSlide = 0; // Track the current active slide
const slides = document.querySelectorAll('.slide');
const slideWrapper = document.querySelector('.slide-wrapper'); // Select the existing wrapper

/**
 * Initialize the slider by setting the wrapper width and slide dimensions.
 */
function initializeSlider() {
    slideWrapper.style.width = `${slides.length * 100}%`; // Set wrapper width dynamically
    slides.forEach((slide) => {
        slide.style.width = `${100 / slides.length}%`; // Each slide takes up a percentage of the wrapper
    });
}

/**
 * Update the slide position based on the current slide index.
 */
function updateSlidePosition() {
    const offset = -(currentSlide * 100); // Calculate offset for the active slide
    slideWrapper.style.transform = `translateX(${offset}%)`;
}

/**
 * Move to the next slide.
 */
export function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length; // Loop back to the first slide
    updateSlidePosition();
}

/**
 * Move to the previous slide.
 */
export function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Loop back to the last slide
    updateSlidePosition();
}

// Initialize the slider
initializeSlider();
updateSlidePosition();
