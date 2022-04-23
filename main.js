const bigButton = document.querySelector('.big-button');
const catalog = document.querySelector('.catalog');
const mainElement = document.querySelector('article.main');

bigButton.addEventListener('click', () => {
    const display = getComputedStyle(catalog).display;
    if (display !== 'none') {
        mainElement.style.gridTemplateColumns = '1fr';
        mainElement.style.gridTemplateAreas = '"general" "brands"';
        catalog.style.display = 'none';
    } else {
        catalog.style.display = '';
        mainElement.style.gridTemplateColumns = '';
        mainElement.style.gridTemplateAreas = '';
    }
});
