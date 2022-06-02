import ToogleCategory from "./toggleCatagory";

const mainElement = document.querySelector("article.main");
const catalog = document.querySelector("ul.catalog");
const bigButton = document.querySelector(".big-button");
bigButton.addEventListener("click", () => {
    const opacity = getComputedStyle(catalog).opacity;
    // const match = matchMedia("(max-width: 425px)").matches;
    if (opacity != 0) {
        catalog.style.opacity = "0";
        catalog.style.zIndex = "-1";
        // if (!match)
        ToogleCategory(mainElement).hide(() => {
            setTimeout(() => {}, 0);
        });
    } else {
        // if (!match)
        ToogleCategory(mainElement).show(() => {
            catalog.style.opacity = "1";
            catalog.style.zIndex = "9";
        });
        catalog.style.opacity = "1";
        catalog.style.zIndex = "9";
    }
});
