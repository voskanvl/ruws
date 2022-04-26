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
                this.moveToCard(idx);
                controls[this.currentCardId].setAttribute("active", false);
                control.setAttribute("active", true);
                this.currentCardId = idx; //только для novelty
                //TODO: сделать универсальным присвоение активного класса
            });
        });
    }
    moveToCard(n) {
        //находим положение центра n элемента
        if (!n) n = this.currentCardId;
        const clientRect = this.els[n].getBoundingClientRect();
        const elementCenter = clientRect.left + clientRect.width / 2;
        //находим положение центра viewport
        const viewportRect = this.viewport.getBoundingClientRect();
        const viewportCenter = viewportRect.left + viewportRect.width / 2;
        //находим смещение
        const offset = viewportCenter - elementCenter;

        this.viewport.style.transform = `translateX(${offset}px)`;
    }
}
