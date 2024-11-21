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
    value: 1000, // End value
    duration: 2000, // Duration in milliseconds
    easing: 'easeOutQuad', // Easing function
    round: 1, // Round to the nearest whole number
    update: function(anim) {
        // Update the number displayed
        document.getElementById('animated-number').textContent = anim.animatables[0].target.value;
    }
});