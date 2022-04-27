class Slider {
    /*
     * el: HTMLElement[] | iterable HTMLElement
     * viewport: HTMLElement
     * viewport contains els
     */
    #edgeOver = new CustomEvent("over", { bubbles: true });
    #edgeUnder = new CustomEvent("under", { bubbles: true });
    #currentCardId;
    #commonWidth;
    #maxOffset;
    currentOffset = 0;
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
        this.#commonWidth = this.els.reduce((acc, el) => {
            const gcs = getComputedStyle(el);
            return acc + parseInt(gcs.width) + parseInt(gcs.marginRight);
        }, 0);
        this.#maxOffset = this.#commonWidth - viewport.clientWidth;
        console.log(viewport, this.#commonWidth, this.#maxOffset);
    }
    get currentCardId() {
        return this.#currentCardId;
    }
    set currentCardId(x) {
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
        const elementRect =
            this.els[this.currentCardId].getBoundingClientRect();
        const elementLeft = elementRect.x;

        const viewportRect = this.viewport.getBoundingClientRect();
        const viewportLeft = viewportRect.x;

        const offset = viewportLeft - elementLeft;

        this.viewport.style.transform = `translateX(${offset}px)`;
        this.currentOffset = offset;
        console.log("🚀 ~ this.currentOffset", offset, this.currentOffset);
    }
}
