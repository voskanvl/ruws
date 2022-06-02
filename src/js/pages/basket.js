import "../../styles/style.sass";
import "../bigButtonListener";
import "../modal";
if (document.readyState === "loading") {
    console.log('document.readyState === "loading"');
    document.addEventListener("DOMContentLoaded", start);
} else {
    console.log('document.readyState !== "loading"');
    start();
}
function start() {
    const catalog = document.querySelector(".catalog");
    const checkout = document.querySelector(".info-panel__checkout");
    const modal = document.querySelector(".info-panel .modal");
    const close = document.querySelector(".info-panel .modal__close");

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
    //--- CLICK BigBUTTON
    document.querySelector(".big-button").click();
    //--- OPEN MODAL
    checkout.addEventListener("click", () => (modal.style.display = "flex"));
    close.addEventListener("click", () => (modal.style.display = "none"));
    //--- controls modal handler
    const controls = document.querySelectorAll(
        ".checkout-panel__controls > button",
    );
    console.log("🚀 ~ controls", controls);
    controls.forEach(control =>
        control.addEventListener(
            "click",
            () => (window.location.href = "/checkout.html"),
        ),
    );
}
