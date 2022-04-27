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
    wraper = null;
    min = true;
    max = false;
    constructor(els, wraper, option) {
        this.els = [...els];
        this.wraper = wraper;
        this.currentCardId = 0;
        this.inc = this.#inc.bind(this);
        this.dec = this.#dec.bind(this);
        this.option = option;
        this.#commonWidth = this.els.reduce((acc, el) => {
            const gcs = getComputedStyle(el);
            return acc + parseInt(gcs.width) + parseInt(gcs.marginRight);
        }, 0);
        this.#maxOffset = this.#commonWidth - wraper.clientWidth;
        //запрещаем прокрутку
        ["scroll", "wheel", "touchmove"].forEach(type =>
            this.wraper.parentElement.addEventListener(type, ev => {
                // console.log("scroll", this);
                // this.#currentCardId = this.getCurrentCard();
                ev.preventDefault();
            }),
        );
    }
    get currentCardId() {
        return this.#currentCardId;
    }
    set currentCardId(x) {
        if (x >= this.els.length) {
            this.max = true;
            this.wraper.dispatchEvent(this.#edgeOver);
            return;
        } else {
            this.max = false;
            this.#currentCardId = x;
        }
        if (x <= 0) {
            this.min = true;
            this.wraper.dispatchEvent(this.#edgeUnder);
            return;
        } else {
            this.min = false;
            this.#currentCardId = x;
        }
        console.log("min -", this.min, "max -", this.max);
    }
    #inc() {
        // this.#currentCardId = this.getCurrentCard();
        this.currentCardId++;
        this.#moveToNextCard();
    }
    #dec() {
        // this.#currentCardId = this.getCurrentCard();
        this.currentCardId--;
        this.#moveToNextCard();
    }
    #moveToNextCard() {
        const elementRect =
            this.els[this.currentCardId].getBoundingClientRect();
        const elementLeft = elementRect.x;

        const wraperRect = this.wraper.getBoundingClientRect();
        const wraperLeft = wraperRect.x;

        const offset = wraperLeft - elementLeft;

        this.wraper.style.transform = `translateX(${offset}px)`;
        this.currentOffset = offset;
        console.log("🚀 ~ this.currentOffset", offset, this.currentOffset);
    }
    getCurrentCard() {
        //определяем смещение vieport scroll = this.wraper.parentElement.scrollLeft
        //вычесляем на какой элемент попадант scroll
        const scroll = this.wraper.parentElement.scrollLeft;
        let currentWidth = 0;
        let currentElement = -1;
        for (let idx in this.els) {
            const widthEl = this.els[idx].getBoundingClientRect().width;
            if (scroll >= currentWidth && scroll < currentWidth + widthEl) {
                currentElement = idx;
                break;
            }
            currentWidth += widthEl;
        }
        return +currentElement;
    }
}
