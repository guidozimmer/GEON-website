import { setupDropdown } from "../../js/nav.js"
import { createLanguageSwitcher } from './websiteText.js';



const languageSwitcher = createLanguageSwitcher();


document.addEventListener('DOMContentLoaded', function () {

    /////////////// DROPDOWN ///////////////
    if (typeof setupDropdown === 'function') {
        setupDropdown();
    }

    
    /////////////// LANGUAGE SWITCHER ///////////////
    languageSwitcher.initializeLanguage();
    document.getElementById('langEN').addEventListener('click', () => {
        languageSwitcher.switchLanguage('EN');
    });
    document.getElementById('langDE').addEventListener('click', () => {
        languageSwitcher.switchLanguage('DE');
    });
    
});





