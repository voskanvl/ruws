export default function initMCarousel(selector) {
    const slider = document.querySelectorAll(selector);
    M.Carousel.init(slider, {
        indicators: false,
        numVisible: 3,
        padding: 400,
        fullWidth: true,
    });
}
