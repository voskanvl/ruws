class SlideModel {
    constructor(els, wraper, slider, { left, right }) {
        slider = slider ? slider : Slider;
        this.slider = new slider(els, wraper);
        this.left = left;
        this.right = right;
        this.right.addEventListener("click", () => {
            this.slider.inc();
            this.right.setAttribute("disable", this.slider.max);
            this.left.setAttribute("disable", this.slider.min);
        });
        this.left.addEventListener("click", () => {
            this.slider.dec();
            this.right.setAttribute("disable", this.slider.max);
            this.left.setAttribute("disable", this.slider.min);
        });
        ["wheel", "touchmove"].forEach(type =>
            wraper.parentElement.addEventListener(type, ev => {
                console.log(type, "fire", this.slider.max, this.slider.min);
                this.right.setAttribute("disable", this.slider.max);
                this.left.setAttribute("disable", this.slider.min);
            }),
        );
    }
}
