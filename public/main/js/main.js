import { setupDropdown } from "./nav.js";
import { startNumberFade } from "./numberFade.js";
import { createLanguageSwitcher } from './websiteText.js';
import { redirectToCode } from './redirectForm.js';

const languageSwitcher = createLanguageSwitcher();

document.addEventListener('DOMContentLoaded', function () {

    /////////////// DROPDOWN ///////////////
    if (typeof setupDropdown === 'function') {
        setupDropdown();
    }

    /////////////// FADER ///////////////
    const DEValues = ["1.142 Solarprojekte", "48.249 ha Flächen", "48 GW<sub>p</sub> Leistung", "96 GW Batterieleistung", "Machen wir etwas daraus!"];
    const ENValues = ["1,142 Photovoltaic Projects", "48,249 ha of Land", "48 GW<sub>p</sub> Solar Capacity", "96 GW Battery Storage", "Let’s make it happen!"];
    startNumberFade("numberDisplay", DEValues, ENValues);

    /////////////// COOKIE CONSENT INITIALIZATION ///////////////


    /////////////// LANGUAGE SWITCHER ///////////////
    languageSwitcher.initializeLanguage();
    document.getElementById('langEN').addEventListener('click', () => {
        languageSwitcher.switchLanguage('EN');
    });

    document.getElementById('langDE').addEventListener('click', () => {
        languageSwitcher.switchLanguage('DE');
    });


    

    /////////////// REDIRECT-FORM ///////////////
    document.getElementById('redirectForm').addEventListener('submit', function(event) {
        redirectToCode(event, 'code'); // Pass the event and the input ID
    });
});





