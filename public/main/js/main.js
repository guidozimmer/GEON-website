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


const values = [
    [1142, "Solarprojekte", false],
    [48249, "ha Flächen", false],
    [48, "GW<sub>p</sub> Leistung", false],
    [96, "GW Batterieleistung", false],
    ["", "Machen wir was draus!", true] // Final slide
];

// Correct function call:
startNumberFade("number", "text", "numberDisplay", values, 4000); // Pass the correct containerId ("numberDisplay")
