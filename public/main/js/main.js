import { loadTextFile, injectContent} from "./websiteText.js";
import { barGraphs } from "./barGraphs.js";
import { setupDropdown } from "./nav.js"
import { startNumberFade } from "./numberFade.js"

// Load the text file and inject content
loadTextFile('websiteText.txt', injectContent);
//barGraphs();


document.addEventListener('DOMContentLoaded', function () {
    if (typeof setupDropdown === 'function') {
        setupDropdown();
    }
});


// Values to cycle through
const values = ["1.142", "48.249", "48", "96", "Machen wir was draus!"];

// Start the fader
startNumberFade("numberDisplay", values);

