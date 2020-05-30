import { ICONS } from "./constants";

const toogleHighlighted = (icon, show) => {
    console.log(`.${ICONS[icon]}-icon`);
    document
        .querySelector(`.${ICONS[icon]}-icon`)
        .classList[show ? "add" : "remove"]("highlighted");
};
export default function initButton(handleUserInteraction) {
    let selectedIcon = 0;

    function buttonClick(event) {
        if (event.target.classList.contains("left-btn")) {
            toogleHighlighted(selectedIcon, false);
            selectedIcon = (2 + selectedIcon) % ICONS.length;
            toogleHighlighted(selectedIcon, true);
        } else if (event.target.classList.contains("right-btn")) {
            toogleHighlighted(selectedIcon, false);
            selectedIcon = (1 + selectedIcon) % ICONS.length;
            toogleHighlighted(selectedIcon, true);
        } else {
            handleUserInteraction(ICONS[selectedIcon]);
        }
    }
    document.querySelector(".buttons").addEventListener("click", buttonClick);
}
