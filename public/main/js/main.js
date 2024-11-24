import { loadTextFile, injectContent} from "./websiteText.js";
import { barGraphs } from "./barGraphs.js";
import { setupDropdown } from "./nav.js"
import { startNumberFade } from "./numberFade.js"

// Load the text file and inject content
loadTextFile('websiteText.txt', injectContent);
//barGraphs();

console.log("test");

document.addEventListener('DOMContentLoaded', function () {
    if (typeof setupDropdown === 'function') {
        setupDropdown();
    }
});


const values = [    
    [1142, "Solarprojekte", "0", "500px"], // First slide: number at 50px, text at 75px
    [48249, "ha Flächen", "950px", "1000px"], // Second slide: number at 100px, text at 12px
    [48, "GW<sub>p</sub> Leistung", "1000px", "1000px"], // Third slide: number at 20px, text at 40px
    [96, "GW Batterieleistung", "1000px", "800px"], // Fourth slide: number at 10px, text at 90px
    [0, "Machen wir was draus!", "-5000px", "900px"] // Final slide: default positions
];

// Start the fade effect
startNumberFade("number", "text", "numberDisplay", values, 4000); // 4-second interval

console.log("test1");