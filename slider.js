class Slider {
    /*
     * el: HTMLElement[] | iterable HTMLElement
     * viewport: HTMLElement
     * viewport contains els
     */
    #edgeOver = new CustomEvent("over", { bubbles: true });
    #edgeUnder = new CustomEvent("under", { bubbles: true });
    #currentCardId;
    els = null;
    viewport = null;
    min = true;
    max = false;
    constructor(els, viewport, option) {
        this.els = [...els];
        this.viewport = viewport;
        this.currentCardId = 0;
        this.inc = this.#inc.bind(this);
        this.dec = this.#dec.bind(this);
        this.option = option;
    }
    get currentCardId() {
        return this.#currentCardId;
    }
    set currentCardId(x) {
        //на один меньше чем кличество
        if (x >= this.els.length) {
            this.max = true;
            this.viewport.dispatchEvent(this.#edgeOver);
            return;
        } else {
            this.max = false;
            this.#currentCardId = x;
        }
        if (x <= 0) {
            this.min = true;
            this.viewport.dispatchEvent(this.#edgeUnder);
            return;
        } else {
            this.min = false;
            this.#currentCardId = x;
        }
        console.log("min -", this.min, "max -", this.max);
    }
    #inc() {
        this.currentCardId++;
        this.#moveToNextCard();
    }
    #dec() {
        this.currentCardId--;
        this.#moveToNextCard();
    }
    #moveToNextCard() {
        // productCards[currentProductCardId].scrollIntoView({behavior:"smooth", inline:"center"});
        //TODO: Не работает в Chrome! ?

        // const gotStyle = getComputedStyle(this.els[this.currentCardId]);
        // // const correction = 2;
        // const widthCard =
        //     this.els[this.currentCardId].offsetWidth +
        //     parseInt(gotStyle.marginRight) +
        //     parseInt(gotStyle.borderLeft);

        // const nextPosition = widthCard * this.currentCardId;

        const clientRect = this.els[this.currentCardId].getBoundingClientRect();
        const elementCenter = clientRect.left + clientRect.width / 2;
        //находим положение центра viewport
        const viewportRect = this.viewport.getBoundingClientRect();
        const viewportCenter = viewportRect.left + viewportRect.width / 2;
        //находим смещение
        const offset = viewportCenter - elementCenter;

        this.viewport.style.transform = `translateX(${offset}px)`;
    }
}
