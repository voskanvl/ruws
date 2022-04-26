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
        if (x >= this.els.length - 1) {
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
        const gotStyle = getComputedStyle(this.els[this.currentCardId]);
        // const correction = 2;
        const widthCard =
            this.els[0].offsetWidth +
            parseInt(gotStyle.marginRight) +
            parseInt(gotStyle.borderLeft);
        const nextPosition = widthCard * this.currentCardId;
        this.viewport.scrollTo({
            left: nextPosition,
            top: 0,
            behavior: "smooth",
        });
    }
}
