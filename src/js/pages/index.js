import "../../styles/style.sass";
import "../bigButtonListener";
import "../modal";

const bigButton = document.querySelector(".big-button");

//--- ON LOAD
if (document.readyState === "loading") {
    console.log('document.readyState === "loading"');
    document.addEventListener("DOMContentLoaded", start);
} else {
    console.log('document.readyState !== "loading"');
    start();
}
function start() {
    setTimeout(() => {
        const catalog = document.querySelector(".catalog");
        const restoreHeight = () => {
            carouselTop.style.height = "";
            // carouselNovelty.style.height = "";
            carouselNews.style.height = "";
        };
        const carouselTop = document.querySelector(".carousel-top");
        const carouselNovelty = document.querySelector(".carousel-novelty");
        const carouselNews = document.querySelector(".carousel-news");
        const carouselTopCarousel = M.Carousel.init(carouselTop, {
            indicators: false,
            numVisible: 3,
            padding: 200,
            fullWidth: true,
        });
        const carouselNoveltyCarousel = M.Carousel.init(carouselNovelty, {
            indicators: true,
            numVisible: 1,
            padding: 400,
            fullWidth: true,
        });
        const carouselNewsCarousel = M.Carousel.init(carouselNews, {
            indicators: false,
            numVisible: 3,
            padding: 227,
            fullWidth: true,
        });
        restoreHeight();
        window.addEventListener("resize", restoreHeight);
        //--- обработчики листания каруселей
        //--- для TOP
        const topPrev = document.querySelector(
            '.slider-top button[data-slide="prev"',
        );
        const topNext = document.querySelector(
            '.slider-top button[data-slide="next"',
        );
        topNext.onclick = () => carouselTopCarousel.next();
        topPrev.onclick = () => carouselTopCarousel.prev();
        //--- для News
        const newsPrev = document.querySelector(
            '.slider-news button[data-slide="prev"',
        );
        const newsNext = document.querySelector(
            '.slider-news button[data-slide="next"',
        );
        newsNext.onclick = () => carouselNewsCarousel.next();
        newsPrev.onclick = () => carouselNewsCarousel.prev();
        //--- TOOGLE CATALOG__ITEM ---
        catalog.addEventListener("click", ({ target }) => {
            const subMenu = target
                .closest(".catalog__item")
                .querySelector(".sub-menu__content");
            if (subMenu) {
                subMenu.classList.toggle("sub-menu__content_show");
            }
        });
        //--- CLICK BigBUTTON
        document.querySelector(".big-button").click();
    }, 0);
}
