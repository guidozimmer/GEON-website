import { setupDropdown } from "./nav.js"
import { startNumberFade } from "./numberFade.js"



document.addEventListener('DOMContentLoaded', function () {
    if (typeof setupDropdown === 'function') {
        setupDropdown();
    }

    // Values to cycle through
    const values = ["1.142 Solarprojekte", "48.249 ha Flächen", "48 GW<sub>p</sub> Leistung", "96 GW Batterieleistung", "Machen wir etwas daraus!"];

    // Start the fader
    startNumberFade("numberDisplay", values);
});


