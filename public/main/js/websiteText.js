// Language switching module
const LanguageSwitcher = (() => {
    // Private variables
    let currentLanguage = 'EN'; // Default language
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
      
      // Example of updating multiple elements
      const elementsToUpdate = [
        { id: 'heroHeadingPt1', variable: 'heroHeadingPt1' },
        { id: 'heroHeadingPt2', variable: 'heroHeadingPt2' },
        { id: 'heroHeadingPt3', variable: 'heroHeadingPt3' },
        { id: 'heroHeadingPt4', variable: 'heroHeadingPt4' },

      ];
      
      elementsToUpdate.forEach(element => {
        const el = document.getElementById(element.id);
        if (el && variables[element.variable]) {
          el.textContent = variables[element.variable];
        }
      });
    }
  
    // Public method to switch language
    function switchLanguage(langCode) {
      // Validate language code
      if (!supportedLanguages.includes(langCode)) {
        console.error(`Unsupported language code: ${langCode}`);
        return;
      }
      
      // Update current language
      currentLanguage = langCode;
      
      // Construct the path to the language file
      const languageFilePath = `./languages/${langCode.toLowerCase()}.txt`;
      
      // Load and inject content
      loadTextFile(languageFilePath, injectContent);
      
      // Update dropdown active state
      updateLanguageDropdown(langCode);
    }
  
    // Helper function to update dropdown active state
    function updateLanguageDropdown(langCode) {
      // Remove active class from all language options
      supportedLanguages.forEach(code => {
        const langElement = document.getElementById(`lang${code}`);
        if (langElement) {
          langElement.classList.remove('active');
        }
      });
      
      // Add active class to selected language
      const activeElement = document.getElementById(`lang${langCode}`);
      if (activeElement) {
        activeElement.classList.add('active');
      }
    }
  
    // Initialize language (can be called on page load)
    function initializeLanguage() {
      // Check if there's a saved language preference in localStorage
      const savedLanguage = localStorage.getItem('appLanguage');
      
      // Switch to saved language or default to 'EN'
      switchLanguage(savedLanguage || 'EN');
    }
  
    // Expose public methods
    return {
      switchLanguage,
      initializeLanguage,
      getCurrentLanguage: () => currentLanguage
    };
  })();
  
  // Make the function globally accessible if needed
  window.switchLanguage = LanguageSwitcher.switchLanguage;
  
  // Initialize language on page load
  document.addEventListener('DOMContentLoaded', LanguageSwitcher.initializeLanguage);