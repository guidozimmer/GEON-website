import { setupDropdown } from "./nav.js";
import { startNumberFade } from "./numberFade.js";
import { createLanguageSwitcher } from './websiteText.js';
import { redirectToCode } from './redirectForm.js';
import { initializeCookieConsent } from '../../cookies/cookieconsent-init.js';

const languageSwitcher = createLanguageSwitcher();

document.addEventListener('DOMContentLoaded', function () {

    /////////////// DROPDOWN ///////////////
    if (typeof setupDropdown === 'function') {
        setupDropdown();
    }

    /////////////// FADER ///////////////
    const values = ["1.142 Solarprojekte", "48.249 ha Flächen", "48 GW<sub>p</sub> Leistung", "96 GW Batterieleistung", "Machen wir etwas daraus!"];
    startNumberFade("numberDisplay", values);

    /////////////// COOKIE CONSENT INITIALIZATION ///////////////
    initializeCookieConsent('de'); // Default language is German

    /////////////// LANGUAGE SWITCHER ///////////////
    languageSwitcher.initializeLanguage();
    document.getElementById('langEN').addEventListener('click', () => {
        languageSwitcher.switchLanguage('EN');
        initializeCookieConsent('en'); // Reinitialize cookie consent for English
    });

    document.getElementById('langDE').addEventListener('click', () => {
        languageSwitcher.switchLanguage('DE');
        initializeCookieConsent('de'); // Reinitialize cookie consent for German
    });


    

    /////////////// REDIRECT-FORM ///////////////
    document.getElementById('redirectForm').addEventListener('submit', function(event) {
        redirectToCode(event, 'code'); // Pass the event and the input ID
    });
});
