import "../../styles/style.sass";

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
    catalog.addEventListener("click", ({ target }) => {
        const subMenu = target
            .closest(".catalog__item")
            .querySelector(".sub-menu__content");
        if (subMenu) {
            subMenu.classList.toggle("sub-menu__content_show");
        }
    });
}
