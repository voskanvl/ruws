const bigButton = document.querySelector(".big-button");
const catalog = document.querySelector(".catalog");
const mainElement = document.querySelector("article.main");

bigButton.addEventListener("click", () => {
    const display = getComputedStyle(catalog).display;
    if (display !== "none") {
        mainElement.style.gridTemplateColumns = "unset";
        catalog.style.display = "none";
    } else {
        catalog.style.display = "";
        mainElement.style.gridTemplateColumns = "";
    }
});
