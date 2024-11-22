import { loadTextFile, injectContent} from "./websiteText.js";
import { barGraphs } from "./barGraphs.js";
import { setupDropdown } from "./nav.js"

// Load the text file and inject content
loadTextFile('websiteText.txt', injectContent);
//barGraphs();


document.addEventListener('DOMContentLoaded', function () {
    if (typeof setupDropdown === 'function') {
        setupDropdown();
    }
});


const animateNumber = (targetId, endValue, suffix = "", isHTML = false) => {
    anime({
        targets: { value: 0 },
        value: endValue,
        duration: 2000,
        easing: 'easeOutQuad',
        round: 1,
        update: (anim) => {
            const formattedNumber = anim.animatables[0].target.value.toLocaleString('de-DE');
            const content = `
                <span style="font-size: 2.3rem; font-weight: bold;">${formattedNumber}</span>
                <span style="font-size: 1.5rem;"> ${suffix}</span>
            `;
            document.getElementById(targetId).innerHTML = content;
        }
    });
};

// Animations
animateNumber('animatedNumber1', 1142, "Projekte");
animateNumber('animatedNumber2', 48249, "ha");
animateNumber('animatedNumber3', 48, "GW<sub>p</sub>", true);
animateNumber('animatedNumber4', 96, "GW Batterie");
