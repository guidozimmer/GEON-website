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
        // Hero Section
        { id: 'heroHeadingPt1', variable: 'heroHeadingPt1' },
        { id: 'heroHeadingPt2', variable: 'heroHeadingPt2' },
        { id: 'heroHeadingPt3', variable: 'heroHeadingPt3' },
        { id: 'heroHeadingPt4', variable: 'heroHeadingPt4' },

        // Navigation
        { id: 'aboutUsNav', variable: 'aboutUsNav' },
        { id: 'offerDropdown', variable: 'ourOfferNav' },
        { id: 'howItWorksNav', variable: 'howItWorksNav' },
        { id: 'contactNav', variable: 'contactNav' },
        { id: 'languageDropdownTrigger', variable: 'languageNav' },

        // About Us Section
        { id: 'aboutUsPt1', variable: 'aboutUsPt1' },
        { id: 'aboutUsPt2', variable: 'aboutUsPt2' },
        { id: 'aboutUsPt3', variable: 'aboutUsPt3' },
        { id: 'aboutUsPt4', variable: 'aboutUsPt4' },
        { id: 'aboutUsPt5', variable: 'aboutUsPt5' },
        { id: 'aboutUsPt6', variable: 'aboutUsPt6' },
        { id: 'aboutUsPt7', variable: 'aboutUsPt7' },
        { id: 'aboutUsPt8', variable: 'aboutUsPt8' },
        { id: 'aboutUsPt9', variable: 'aboutUsPt9' },
        { id: 'aboutUsPt10', variable: 'aboutUsPt10' },
        { id: 'aboutUsPt11', variable: 'aboutUsPt11' },
        { id: 'aboutUsPt12', variable: 'aboutUsPt12' },
        { id: 'aboutUsPt13', variable: 'aboutUsPt13' },
        { id: 'aboutUsPt14', variable: 'aboutUsPt14' },

        // Slider
        { id: 'quote', variable: 'sliderPt1' },
        { id: 'sliderPt2', variable: 'sliderPt2' },
        { id: 'sliderPt3', variable: 'sliderPt3' },

        // Our Offer Section
        { id: 'ourOfferPt1', variable: 'ourOfferPt1' },
        { id: 'ourOfferPt2', variable: 'ourOfferPt2' },
        { id: 'ourOfferPt3', variable: 'ourOfferPt3' },
        { id: 'ourOfferPt4', variable: 'ourOfferPt4' },
        { id: 'ourOfferPt5', variable: 'ourOfferPt5' },
        { id: 'ourOfferPt6', variable: 'ourOfferPt6' },
        { id: 'ourOfferPt7', variable: 'ourOfferPt7' },
        { id: 'ourOfferPt8', variable: 'ourOfferPt8' },

        // How It Works Section
        { id: 'howItWorksPt1', variable: 'howItWorksPt1' },
        { id: 'howItWorksPt2', variable: 'howItWorksPt2' },
        { id: 'howItWorksPt3', variable: 'howItWorksPt3' },
        { id: 'howItWorksPt4', variable: 'howItWorksPt4' },
        { id: 'howItWorksPt5', variable: 'howItWorksPt5' },
        { id: 'howItWorksPt6', variable: 'howItWorksPt6' },
        { id: 'howItWorksPt7', variable: 'howItWorksPt7' },
        { id: 'howItWorksPt8', variable: 'howItWorksPt8' },
        { id: 'howItWorksPt9', variable: 'howItWorksPt9' },
        { id: 'howItWorksPt10', variable: 'howItWorksPt10' },
        { id: 'howItWorksPt11', variable: 'howItWorksPt11' },
        { id: 'howItWorksPt12', variable: 'howItWorksPt12' },
        { id: 'howItWorksPt13', variable: 'howItWorksPt13' },

        // Contact Section
        { id: 'conatctPt1', variable: 'conatctPt1' },
        { id: 'conatctPt2', variable: 'nameTitle' },
        { id: 'conatctPt3', variable: 'emailTitle' },
        { id: 'conatctPt4', variable: 'phoneTitle' },
        { id: 'conatctPt5', variable: 'messageTitle' },
        { id: 'conatctPt6', variable: 'contactPt6' },
        { id: 'w-c-s-fc_p-1-dm-id', variable: 'contactPt7' },

        // Cookie Dialog
        { id: 'cm__title', variable: 'cookieTitle' },
        { id: 'cm__desc', variable: 'cookieDesc' },
        { id: 'cookieManageLink', variable: 'cookieManage' },
        { id: 'cookieAcceptAll', variable: 'cookieAcceptAll' },
        { id: 'cookieRejectAll', variable: 'cookieRejectAll' },
        { id: 'cookiePrivacyLink', variable: 'cookiePrivacy' },
        { id: 'cookieImpressumLink', variable: 'cookieImpressum' },


        // Main squares
        { id: 'mainSquare1Title', variable: 'mainSquare1' },
        { id: 'mainSquare1Desc', variable: 'mainSquare1Desc' },
        { id: 'mainSquare2Title', variable: 'mainSquare2' },
        { id: 'mainSquare2Desc', variable: 'mainSquare2Desc' },
        { id: 'mainSquare3Title', variable: 'mainSquare3' },
        { id: 'mainSquare3Desc', variable: 'mainSquare3Desc' },

        // Form questions
        { id: 'formQuestion1', variable: 'formQuestion1' },
        { id: 'formOption1_1', variable: 'formOption1_1' },
        { id: 'formOption1_2', variable: 'formOption1_2' },
        { id: 'formOption1_3', variable: 'formOption1_3' },
        { id: 'formOption1_4', variable: 'formOption1_4' },

        { id: 'formQuestion2', variable: 'formQuestion2' },
        { id: 'formOption2_1', variable: 'formOption2_1' },
        { id: 'formOption2_2', variable: 'formOption2_2' },
        { id: 'formQuestion2a', variable: 'formQuestion2a' },

        { id: 'formQuestion3', variable: 'formQuestion3' },

        { id: 'formQuestion4', variable: 'formQuestion4' },
        { id: 'formOption4_1', variable: 'formOption4_1' },
        { id: 'formOption4_2', variable: 'formOption4_2' },
        { id: 'formQuestion4a', variable: 'formQuestion4a' },
        { id: 'formOption4a_1', variable: 'formOption4a_1' },
        { id: 'formOption4a_2', variable: 'formOption4a_2' },
        { id: 'formOption4a_3', variable: 'formOption4a_3' },
        { id: 'formOption4a_4', variable: 'formOption4a_4' },

        { id: 'formQuestion5', variable: 'formQuestion5' },
        { id: 'formOption5_1', variable: 'formOption5_1' },
        { id: 'formOption5_2', variable: 'formOption5_2' },
        { id: 'formQuestion5a', variable: 'formQuestion5a' },

        { id: 'formQuestion6', variable: 'formQuestion6' },
        { id: 'formLabel6_1', variable: 'formLabel6_1' },
        { id: 'formLabel6_2', variable: 'formLabel6_2' },

        { id: 'prevButton', variable: 'formButtonBack' },
        { id: 'nextButton', variable: 'formButtonNext' }

      ];

      const placeholdersToUpdate = [
        { 
          id: 'name', 
          variable: 'namePlaceholder',
          type: 'placeholder' 
        },
        { 
          id: 'email', 
          variable: 'emailPlaceholder',
          type: 'placeholder' 
        },
        { 
          id: 'phoneNumber', 
          variable: 'phonePlaceholder',
          type: 'placeholder' 
        },
        { 
          id: 'message', 
          variable: 'messagePlaceholder',
          type: 'placeholder' 
        },
        { 
            id: 'code', 
            variable: 'codePlaceholder',
            type: 'placeholder' 
          },
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
