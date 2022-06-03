import "../../styles/style.sass";
import "../bigButtonListener";
import "../modal";
if (document.readyState === "loading") {
    console.log('document.readyState === "loading"');
    document.addEventListener("DOMContentLoaded", start);
} else {
    console.log('document.readyState !== "loading"');
    start();
}
function start() {
    const paymethdCheck = document.querySelector(".paymethod .checkbox");
    //--- CLICK BigBUTTON
    document.querySelector(".big-button").click();
    paymethdCheck.parentElement.addEventListener("click", () => {
        let { display } = paymethdCheck.style;
        console.log("🚀 ~ display", display);
        if (display === "none") {
            paymethdCheck.style.display = "block";
        } else {
            paymethdCheck.style.display = "none";
        }
    });
}
