const tabs = document.querySelector(".product-description__tabs");
const bodies = document.querySelectorAll(
    ".product-description__body-container",
);
tabs.children[0].classList.add("active");
bodies[0].classList.add("active");

tabs.addEventListener("click", ({ target }) => {
    const tab = target.closest(".product-description__tab");
    const activeTab = tabs.querySelector(".active");
    const currentId = activeTab.dataset.id;
    const {
        dataset: { id },
    } = tab;
    tabs.children[currentId].classList.remove("active");
    bodies[currentId].classList.remove("active");
    tabs.children[id].classList.add("active");
    bodies[id].classList.add("active");
});
