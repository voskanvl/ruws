const bigButton = document.querySelector('.big-button');
const bigButtonPic = document.querySelector('.big-button__pic');
const catalog = document.querySelector('.catalog');
const mainElement = document.querySelector('article.main');

bigButton.addEventListener('click', () => {
    const display = getComputedStyle(catalog).display;
    if (display !== 'none') {
        catalog.style.opacity = '0'
        setTimeout(() => {
            mainElement.style.gridTemplateColumns = '1fr';
            mainElement.style.gridTemplateAreas = '"general" "brands"';
            catalog.style.display = 'none';
            bigButtonPic.style.transform = 'rotate(0deg)';
        }, 800)
    } else {
        catalog.style.display = 'flex';
        setTimeout(() => { catalog.style.opacity = '1' }, 0)
        mainElement.style.gridTemplateColumns = '';
        mainElement.style.gridTemplateAreas = '';
        bigButtonPic.style.transform = 'rotate(90deg)';
    }
});
//--- MODAL ---
const burgerButton = document.querySelector('.burger__pic');
const modal = document.querySelector('.modal');
const close = document.querySelector('.modal__close');
burgerButton.addEventListener('click', () => {
    const isOpen = getComputedStyle(modal).display;
    console.log('🚀 ~ isOpen', isOpen, modal);
    if (isOpen === 'none') {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
});
close.addEventListener('click', () => {
    document.body.style.overflow = '';
    modal.style.display = 'none';
});
//--- TOOGLE CATALOG__ITEM ---
catalog.addEventListener('click', ({ target }) => {
    const submenuContainer = target.closest('.sub-menu__container');
    const submenuContent = submenuContainer.querySelector('.sub-menu__content');
    console.log('🚀 ~ submenu', submenuContainer, submenuContent);
    if (submenuContainer && submenuContent) {
        const isOpen = getComputedStyle(submenuContent).display;
        if (isOpen !== 'none') {
            submenuContent.style.display = '';
        } else {
            submenuContent.style.display = 'block';
        }
    }
});
