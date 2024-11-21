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


anime({
    targets: { value: 0 }, // Start value
    value: 1142, // End value
    duration: 2000, // Duration in milliseconds
    easing: 'easeOutQuad', // Easing function
    round: 1, // Round to the nearest whole number
    update: function (anim) {
        // Format the number with thousand separators
        const formattedNumber = anim.animatables[0].target.value.toLocaleString('de-DE');
        document.getElementById('animatedNumber1').textContent = formattedNumber + " Projekte";
    }
});

anime({
    targets: { value: 0 }, // Start value
    value: 48249, // End value
    duration: 2000, // Duration in milliseconds
    easing: 'easeOutQuad', // Easing function
    round: 1, // Round to the nearest whole number
    update: function (anim) {
        const formattedNumber = anim.animatables[0].target.value.toLocaleString('de-DE');
        document.getElementById('animatedNumber2').textContent = formattedNumber + " ha";
    }
});

anime({
    targets: { value: 0 }, // Start value
    value: 48, // End value
    duration: 2000, // Duration in milliseconds
    easing: 'easeOutQuad', // Easing function
    round: 1, // Round to the nearest whole number
    update: function (anim) {
        const formattedNumber = anim.animatables[0].target.value.toLocaleString('de-DE');
        document.getElementById('animatedNumber3').innerHTML = formattedNumber + " GW<sub>p</sub>";
    }
});


anime({
    targets: { value: 0 }, // Start value
    value: 96, // End value
    duration: 2000, // Duration in milliseconds
    easing: 'easeOutQuad', // Easing function
    round: 1, // Round to the nearest whole number
    update: function (anim) {
        const formattedNumber = anim.animatables[0].target.value.toLocaleString('de-DE');
        document.getElementById('animatedNumber4').textContent = formattedNumber + " GW Batterie";
    }
});
