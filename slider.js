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
    constructor(els, viewport) {
        this.els = [...els];
        this.viewport = viewport;
        this.currentCardId = 0;
        this.inc = this.#inc.bind(this);
        this.dec = this.#dec.bind(this);
    }
    get currentCardId() {
        return this.#currentCardId;
    }
    set currentCardId(x) {
        this.#currentCardId = x;
        console.log("🚀 ~ this.#currentCardId", this.#currentCardId);
        this.currentCardId >= this.els.length - 1
            ? (this.max = true)
            : (this.max = false);
        this.currentCardId <= 0 ? (this.min = true) : (this.min = false);
        console.log("min -", this.min, "max -", this.max);
    }
    #inc() {
        this.currentCardId++;
        if (this.currentCardId >= this.els.length - 1) {
            this.max = true;
            this.viewport.dispatchEvent(this.#edgeOver);
            return;
        }
        this.#moveToNextCard();
    }
    #dec() {
        this.currentCardId--;
        if (this.currentCardId <= 0) {
            this.min = true;
            this.viewport.dispatchEvent(this.#edgeUnder);
            return;
        }
        this.#moveToNextCard();
    }
    #moveToNextCard() {
        // productCards[currentProductCardId].scrollIntoView({behavior:"smooth", inline:"center"});
        //TODO: Не работает в Chrome! ?
        const gotStyle = getComputedStyle(this.els[0]);
        // const correction = 2;
        const widthCard =
            this.els[0].offsetWidth +
            parseInt(gotStyle.marginRight) +
            parseInt(gotStyle.borderLeft);
        const nextPosition = parseInt(widthCard) * this.currentCardId;
        this.viewport.scrollTo({
            left: nextPosition,
            top: 0,
            behavior: "smooth",
        });
    }
}
