const STEP = 4;
const MAX = 252;
const WIDTH_LEFT_FIELD = "auto";
const gridLeftHide = mainElement => cb => {
    const match = matchMedia("(max-width: 425px)").matches;
    if (match) return;
    const gtc = getComputedStyle(mainElement).gridTemplateColumns;

    let gtcSplited = gtc.split(" ");
    let gtcValue = gtcSplited.length > 1 ? parseInt(gtcSplited[0]) : 0;

    const interval = setInterval(() => {
        mainElement.style.gridTemplateColumns = `${gtcValue}px 100%`;
        if (gtcValue <= 0) {
            cb();
            clearInterval(interval);
        }
        gtcValue -= STEP;
    }, 0);
};
// --- show catalog ---
const gridLeftShow = mainElement => cb => {
    const match = matchMedia("(max-width: 425px)").matches;
    if (match) return;
    let gtcValue = 0;

    const interval = setInterval(() => {
        mainElement.style.gridTemplateColumns = `${gtcValue}px ${WIDTH_LEFT_FIELD}`;
        if (gtcValue >= MAX) {
            cb();
            clearInterval(interval);
        }
        gtcValue += STEP;
    }, 0);
};

const ToogleCategory = mainElement => {
    return { hide: gridLeftHide(mainElement), show: gridLeftShow(mainElement) };
};

export default ToogleCategory;
