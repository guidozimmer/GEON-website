import { setupDropdown } from "./nav.js"
import { startNumberFade } from "./numberFade.js"
import { createLanguageSwitcher } from './websiteText.js';

const languageSwitcher = createLanguageSwitcher();


document.addEventListener('DOMContentLoaded', function () {
    if (typeof setupDropdown === 'function') {
        setupDropdown();
    }

    // Values to cycle through
    const values = ["1.142 Solarprojekte", "48.249 ha Flächen", "48 GW<sub>p</sub> Leistung", "96 GW Batterieleistung", "Machen wir etwas daraus!"];

    // Start the fader
    startNumberFade("numberDisplay", values);

    

    languageSwitcher.initializeLanguage();

    // Example: Switch to English
    document.getElementById('langEN').addEventListener('click', () => {
        languageSwitcher.switchLanguage('EN');
    });

    // Example: Switch to German
    document.getElementById('langDE').addEventListener('click', () => {
        languageSwitcher.switchLanguage('DE');
    });
});





