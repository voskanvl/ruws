import "../../styles/style.sass";
// import "../../components/range/range";
import "../bigButtonListener";
import "../switchTabs";
import Splide from "@splidejs/splide";

if (document.readyState === "loading") {
    console.log('document.readyState === "loading"');
    document.addEventListener("DOMContentLoaded", start);
} else {
    console.log('document.readyState !== "loading"');
    start();
}
function start() {
    const catalog = document.querySelector(".catalog");
    //--- TOOGLE CATALOG__ITEM ---
    const clickHandler = ({ target }) => {
        const subMenu = target
            .closest(".catalog__item")
            .querySelector(".sub-menu__content");
        if (subMenu) {
            subMenu.classList.toggle("sub-menu__content_show");
        }
    };
    catalog.addEventListener("click", clickHandler);
    //--- INIT CAROUSEL
    // M.Carousel.init(
    //     document.querySelector(".product-resume__carousel.carousel"),
    //     {
    //         indicators: false,
    //         numVisible: 3,
    //         padding: 7,
    //         fullWidth: true,
    //     },
    // );
    new Splide(".splide", {
        rewind: true,
        fixedWidth: 104,
        fixedHeight: 58,
        isNavigation: true,
        gap: 10,
        focus: "center",
        pagination: false,
        cover: true,
        dragMinThreshold: {
            mouse: 4,
            touch: 10,
        },
        breakpoints: {
            640: {
                fixedWidth: 66,
                fixedHeight: 38,
            },
        },
    }).mount();
    //--- INIT Tabs
}
