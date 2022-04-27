const bigButton = document.querySelector('.big-button');
const bigButtonPic = document.querySelector('.big-button__pic');
const catalog = document.querySelector('.catalog');
const mainElement = document.querySelector('article.main');

const STEP = 4;
const MAX = 252;

//--- TOOGLE CATALOG__ITEM ---
catalog.addEventListener('click', ({ target }) => {
    const submenuContainer = target.closest('.sub-menu__container');
    const submenuContent = submenuContainer.querySelector('.sub-menu__content');
    if (submenuContainer && submenuContent) {
        const isOpen = getComputedStyle(submenuContent).display;
        if (isOpen !== 'none') {
            submenuContent.style.display = '';
        } else {
            submenuContent.style.display = 'block';
        }
    }
});

// --- hide catalog ---
const gridLeftHide = cb => {
    const gtc = getComputedStyle(mainElement).gridTemplateColumns;

    let gtcSplited = gtc.split(' ');
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
bigButton.addEventListener('click', () => {
    const opacity = getComputedStyle(catalog).opacity;
    const match = matchMedia('(max-width: 425px)').matches;
    if (opacity != 0) {
        catalog.style.opacity = '0';
        if (!match)
            gridLeftHide(() => {
                setTimeout(() => {}, 0);
            });
    } else {
        if (!match)
            gridLeftShow(() => {
                catalog.style.opacity = '1';
            });
        catalog.style.opacity = '1';
    }
});
