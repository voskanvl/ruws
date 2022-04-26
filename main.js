const bigButton = document.querySelector(".big-button");
const bigButtonPic = document.querySelector(".big-button__pic");
const catalog = document.querySelector(".catalog");
const mainElement = document.querySelector("article.main");

const STEP = 4;
const MAX = 252;
// --- hide catalog ---
const gridLeftHide = cb => {
    const gtc = getComputedStyle(mainElement).gridTemplateColumns;

    let gtcSplited = gtc.split(" ");
    let gtcValue = gtcSplited.length > 1 ? parseInt(gtcSplited[0]) : 0;

    const interval = setInterval(() => {
        mainElement.style.gridTemplateColumns = `${gtcValue}px auto`;
        if (gtcValue <= 0) {
            cb();
            clearInterval(interval);
        }
        gtcValue -= STEP;
    }, 0);
};
// --- show catalog ---
const gridLeftShow = cb => {
    let gtcValue = 0;

    const interval = setInterval(() => {
        mainElement.style.gridTemplateColumns = `${gtcValue}px auto`;
        if (gtcValue >= MAX) {
            cb();
            clearInterval(interval);
        }
        gtcValue += STEP;
    }, 0);
};
//---
bigButton.addEventListener("click", () => {
    const opacity = getComputedStyle(catalog).opacity;
    const match = matchMedia("(max-width: 425px)").matches;
    // we don't open/close catlog on resolution under 425px ---
    // console.log(
    // "🚀 ~ file: main.js ~ line 41 ~ bigButton.addEventListener ~ match",
    // match,
    // );
    if (opacity != 0) {
        catalog.style.opacity = "0";
        if (!match)
            gridLeftHide(() => {
                setTimeout(() => {}, 0);
            });
    } else {
        if (!match)
            gridLeftShow(() => {
                catalog.style.opacity = "1";
            });
        catalog.style.opacity = "1";
    }
});
//--- MODAL ---
const burgerButton = document.querySelector(".burger__pic");
const modal = document.querySelector(".modal");
const close = document.querySelector(".modal__close");
burgerButton.addEventListener("click", () => {
    const isOpen = getComputedStyle(modal).display;
    // console.log("🚀 ~ isOpen", isOpen, modal);
    if (isOpen === "none") {
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    }
});
close.addEventListener("click", () => {
    document.body.style.overflow = "";
    modal.style.display = "none";
});
//--- TOOGLE CATALOG__ITEM ---
catalog.addEventListener("click", ({ target }) => {
    const submenuContainer = target.closest(".sub-menu__container");
    const submenuContent = submenuContainer.querySelector(".sub-menu__content");
    // console.log("🚀 ~ submenu", submenuContainer, submenuContent);
    if (submenuContainer && submenuContent) {
        const isOpen = getComputedStyle(submenuContent).display;
        if (isOpen !== "none") {
            submenuContent.style.display = "";
        } else {
            submenuContent.style.display = "block";
        }
    }
});

//--- TOP-PRODUCTS SLIDER ---
const productCards = document.querySelectorAll(".product-card");
const rightTop = document.querySelector(".top-controls__right");
const leftTop = document.querySelector(".top-controls__left");
const wrapTop = document.querySelector(".top-carousel__wrap");

// const moveToNextCard = (el) => {
//     // productCards[currentProductCardId].scrollIntoView({behavior:"smooth", inline:"center"});
//     //TODO: Не работает в Chrome! ?
//     const gotStyle = getComputedStyle(el);
const sliderTop = new Slider(productCards, wrapTop);
wrapTop.addEventListener("over", () => rightNews.setAttribute("disable", true));
wrapTop.addEventListener("under", () => leftTop.setAttribute("disable", true));
rightTop.addEventListener("click", () => {
    sliderTop.inc();
    rightTop.setAttribute("disable", sliderTop.max);
    leftTop.setAttribute("disable", sliderTop.min);
});
leftTop.addEventListener("click", () => {
    sliderTop.dec();
    rightTop.setAttribute("disable", sliderTop.max);
    leftTop.setAttribute("disable", sliderTop.min);
});

//--- NEWS ---
const newsCards = document.querySelectorAll(".news-card");
const wrapNews = document.querySelector(".news-carousel__wrap");
console.log(wrapNews);
const rightNews = document.querySelector(".news-carousel__controlsright");
const leftNews = document.querySelector(".news-carousel__controlsleft");
const sliderNews = new Slider(newsCards, wrapNews);
rightNews.addEventListener("click", () => {
    sliderNews.inc();
    rightNews.setAttribute("disable", sliderNews.max);
    leftNews.setAttribute("disable", sliderNews.min);
});
leftNews.addEventListener("click", () => {
    sliderNews.dec();
    rightNews.setAttribute("disable", sliderNews.max);
    leftNews.setAttribute("disable", sliderNews.min);
});

//--- NOVELTY ---
