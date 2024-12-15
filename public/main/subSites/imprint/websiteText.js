export function createLanguageSwitcher() {
    // Private variables
    let currentLanguage = 'DE'; // Default language
    const supportedLanguages = ['EN', 'DE']; // Supported language codes
  
    // Function to load the text file
    function loadTextFile(url, callback) {
        fetch(url)
            .then(response => response.text())
            .then(data => callback(data))
            .catch(error => console.error('Error loading text file:', error));
    }
  
    // Function to parse the text file content and inject into the HTML
    function injectContent(data) {
        const lines = data.split('\n');
        const variables = {};
  
        lines.forEach(line => {
            const [key, value] = line.split(' = ');
            if (key && value) {
                variables[key.trim()] = value.trim().replace(/"/g, '');
            }
        });
  
        // Text elements to update
        const textElementsToUpdate = [
            // Navigation
            { id: 'aboutUsNav', variable: 'aboutUsNav' },
            { id: 'offerDropdown', variable: 'ourOfferNav' },
            { id: 'howItWorksNav', variable: 'howItWorksNav' },
            { id: 'contactNav', variable: 'contactNav' },
            { id: 'languageDropdownTrigger', variable: 'languageNav' },
        ];
  
        const placeholdersToUpdate = [

        ];
  
        // Update text content
        textElementsToUpdate.forEach(element => {
            const el = document.getElementById(element.id);
            if (el && variables[element.variable]) {
                el.textContent = variables[element.variable];
            }
        });
  
        // Update placeholders
        placeholdersToUpdate.forEach(element => {
            const el = document.querySelector(`[name="${element.id}"]`) || document.getElementById(element.id);
  
            if (el && variables[element.variable]) {
                if (element.type === 'placeholder') {
                    el.placeholder = variables[element.variable];
                }
            }
        });
    }
  
    // Public method to switch language
    function switchLanguage(langCode) {
        if (!supportedLanguages.includes(langCode)) {
            console.error(`Unsupported language code: ${langCode}`);
            return;
        }
  
        currentLanguage = langCode;
  
        // Construct the path to the language file
        const languageFilePath = `./languages/${langCode.toLowerCase()}.txt`;
  
        // Load and inject content
        loadTextFile(languageFilePath, injectContent);
  
        // Update dropdown active state
        updateLanguageDropdown(langCode);
  
        // Save language preference
        localStorage.setItem('appLanguage', langCode);
    }
  
    // Helper function to update dropdown active state
    function updateLanguageDropdown(langCode) {
        supportedLanguages.forEach(code => {
            const langElement = document.getElementById(`lang${code}`);
            if (langElement) {
                langElement.classList.remove('active');
            }
        });
  
        const activeElement = document.getElementById(`lang${langCode}`);
        if (activeElement) {
            activeElement.classList.add('active');
        }
    }
  
    // Initialize language (can be called on page load)
    function initializeLanguage() {
        const savedLanguage = localStorage.getItem('appLanguage') || 'DE';
        switchLanguage(savedLanguage);
    }
  
    // Public API
    return {
        switchLanguage,
        initializeLanguage,
        getCurrentLanguage: () => currentLanguage
    };
  }
  