class SliderRandomAccess {
    /*
     * el: HTMLElement[] | iterable HTMLElement
     * viewport: HTMLElement
     * viewport contains els
     * controls: HTMLElement[] | iterable HTMLElement
     * controls.length === el.length
     * controls[i] -> els[i]
     */
    constructor(els, viewport, controls) {
        this.els = [...els];
        this.controls = [...controls];
        if (this.els.length !== this.controls.length)
            throw Error(
                "Количесво элементов управления должно соответствовать количеству элементов перемещения ",
            );
        this.viewport = viewport;
        this.currentCardId = 0;
        this.controls.forEach((control, idx) => {
            console.log(idx, control.scrollWidth);
            control.addEventListener("click", () => {
                this.#moveToCard(idx);
                control.classList.add("novelty__ellipse-active");
            });
        });
    }
    #moveToCard(n) {
        // productCards[currentProductCardId].scrollIntoView({behavior:"smooth", inline:"center"});
        //TODO: Не работает в Chrome! ?

        //находим положение центра n элемента
        const clientRect = this.els[n].getBoundingClientRect();
        const elementCenter = clientRect.left + clientRect.width / 2;
        //находим положение центра viewport
        const viewportRect = this.viewport.getBoundingClientRect();
        const viewportCenter = viewportRect.left + viewportRect.width / 2;
        //находим смещение
        const offset = viewportCenter - elementCenter;

        this.viewport.style.transform = `translateX(${offset}px)`;

        // const gotStyle = getComputedStyle(this.els[this.currentCardId]);
        // // const correction = 2;
        // const widthCard =
        //     this.els[this.currentCardId].offsetWidth +
        //     parseInt(gotStyle.marginRight) +
        //     parseInt(gotStyle.borderLeft);

        // const nextPosition = widthCard * this.currentCardId;

        // this.viewport.style.transform = `translateX(-${nextPosition}px)`;
    }
}
