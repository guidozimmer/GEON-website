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
        { id: 'contactNavId', variable: 'contactNav' },
        { id: 'languageDropdownTrigger', variable: 'languageNav' },

        // Code Section
        { id: "w-c-s-bgc_p-1-dm-id-2", variable: "codePt2"},

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
        { id: 'howItWorksIntro', variable: 'howItWorksIntro' },

        
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
        { id: 'contactPt1', variable: 'contactPt1' },
        { id: 'contactPt2', variable: 'contactPt2' },
        { id: 'contactPt4', variable: 'contactPt4' },
        { id: 'contactPt5', variable: 'contactPt5' },
        { id: 'contactPt6', variable: 'contactPt6' },
        { id: 'contactPt7', variable: 'contactPt7' },
        { id: 'contactPt8', variable: 'contactPt8' },
        { id: 'contactPt9', variable: 'contactPt9' },

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

        { id: 'landPt1', variable: 'landPt1' },
        { id: 'landPt2', variable: 'landPt2' },
        { id: 'landPt3', variable: 'landPt3' },
        { id: 'landPt4', variable: 'landPt4' },
        { id: 'landPt5', variable: 'landPt5' },
        { id: 'landPt6', variable: 'landPt6' },
        { id: 'landPt7', variable: 'landPt7' },
        { id: 'landPt8', variable: 'landPt8' },
        { id: 'landPt9', variable: 'landPt9' },
        { id: 'landPt10', variable: 'landPt10' },
        { id: 'landPt11', variable: 'landPt11' },
        { id: 'landPt12', variable: 'landPt12' },
        { id: 'landPt13', variable: 'landPt13' },
        { id: 'landPt14', variable: 'landPt14' },
        { id: 'landPt15', variable: 'landPt15' },
        { id: 'landPt16', variable: 'landPt16' },
        { id: 'landPt17', variable: 'landPt17' },
        { id: 'landPt18', variable: 'landPt18' },
        { id: 'landPt19', variable: 'landPt19' },
        { id: 'landPt20', variable: 'landPt20' },
        { id: 'landPt21', variable: 'landPt21' },
        { id: 'landPt22', variable: 'landPt22' },
        { id: 'landPt23', variable: 'landPt23' },
        { id: 'landPt24', variable: 'landPt24' },
        { id: 'landPt25', variable: 'landPt25' },
        { id: 'landPt26', variable: 'landPt26' },
        { id: 'landPt27', variable: 'landPt27' },
        { id: 'landPt28', variable: 'landPt28' },
        { id: 'landPt29', variable: 'landPt29' },
        { id: 'landPt30', variable: 'landPt30' },
        { id: 'landPt31', variable: 'landPt31' },
        { id: 'landPt32', variable: 'landPt32' },
        { id: 'landPt33', variable: 'landPt33' },
        { id: 'landPt34', variable: 'landPt34' },
        { id: 'landPt35', variable: 'landPt35' },
        { id: 'landPt36', variable: 'landPt36' },
        { id: 'landPt37', variable: 'landPt37' },
        { id: 'landPt38', variable: 'landPt38' },
        { id: 'landPt39', variable: 'landPt39' },
        { id: 'landPt40', variable: 'landPt40' },
        { id: 'landPt41', variable: 'landPt41' },
        { id: 'landPt42', variable: 'landPt42' },
        { id: 'landPt43', variable: 'landPt43' },
        { id: 'landPt44', variable: 'landPt44' },
        { id: 'landPt45', variable: 'landPt45' },
        { id: 'landPt46', variable: 'landPt46' },
        { id: 'landPt47', variable: 'landPt47' },
        { id: 'landPt48', variable: 'landPt48' },
        { id: 'landPt49', variable: 'landPt49' },
        { id: 'landPt50', variable: 'landPt50' },
        { id: 'landPt51', variable: 'landPt51' },
        { id: 'landPt52', variable: 'landPt52' },
        { id: 'landPt53', variable: 'landPt53' },
        { id: 'landPt54', variable: 'landPt54' },
        { id: 'landPt55', variable: 'landPt55' },
        { id: 'landPt56', variable: 'landPt56' },
        { id: 'landPt57', variable: 'landPt57' },
        { id: 'landPt58', variable: 'landPt58' },
        { id: 'landPt59', variable: 'landPt59' },
        { id: 'landPt60', variable: 'landPt60' },
        { id: 'landPt61', variable: 'landPt61' },
        { id: 'landPt62', variable: 'landPt62' },
        { id: 'landPt63', variable: 'landPt63' },
        { id: 'landPt64', variable: 'landPt64' },
        { id: 'landPt65', variable: 'landPt65' },
        { id: 'landPt66', variable: 'landPt66' },
        { id: 'landPt67', variable: 'landPt67' },
        { id: 'landPt68', variable: 'landPt68' },
        { id: 'landPt69', variable: 'landPt69' },
        { id: 'landPt70', variable: 'landPt70' },
        { id: 'landPt71', variable: 'landPt71' },
        { id: 'landPt72', variable: 'landPt72' },
        { id: 'landPt73', variable: 'landPt73' },
        { id: 'landPt74', variable: 'landPt74' },
        { id: 'landPt75', variable: 'landPt75' },
        { id: 'landPt76', variable: 'landPt76' },
        { id: 'landPt77', variable: 'landPt77' },
        { id: 'landPt78', variable: 'landPt78' },
        { id: 'landPt79', variable: 'landPt79' },
        { id: 'landPt80', variable: 'landPt80' },
        { id: 'landPt81', variable: 'landPt81' },
        { id: 'landPt82', variable: 'landPt82' },
        { id: 'landPt83', variable: 'landPt83' },
        { id: 'landPt84', variable: 'landPt84' },
        { id: 'landPt85', variable: 'landPt85' },
        { id: 'landPt86', variable: 'landPt86' },
        { id: 'landPt87', variable: 'landPt87' },
        { id: 'landPt88', variable: 'landPt88' },
        { id: 'landPt89', variable: 'landPt89' },
        { id: 'landPt90', variable: 'landPt90' },
        { id: 'landPt91', variable: 'landPt91' },
        { id: 'landPt92', variable: 'landPt92' },
        { id: 'landPt93', variable: 'landPt93' },
        { id: 'landPt94', variable: 'landPt94' },
        { id: 'landPt95', variable: 'landPt95' },
        { id: 'landPt96', variable: 'landPt96' },
        { id: 'landPt97', variable: 'landPt97' },
        { id: 'landPt98', variable: 'landPt98' },
        { id: 'landPt99', variable: 'landPt99' },
        { id: 'landPt100', variable: 'landPt100' },
        { id: 'landPt101', variable: 'landPt101' },
        { id: 'landPt102', variable: 'landPt102' },
        { id: 'landPt103', variable: 'landPt103' },
        { id: 'landPt104', variable: 'landPt104' },
        { id: 'landPt105', variable: 'landPt105' },
        { id: 'landPt106', variable: 'landPt106' },
        { id: 'landPt107', variable: 'landPt107' },
        { id: 'landPt108', variable: 'landPt108' },
        { id: 'landPt109', variable: 'landPt109' },
        { id: 'landPt110', variable: 'landPt110' },
        

        
        { id: 'communityTitle', variable: 'communityTitle' },
        { id: 'communityIntro1', variable: 'communityIntro1' },
        { id: 'communityIntro2', variable: 'communityIntro2' },
        { id: 'communityIntro3', variable: 'communityIntro3' },
        { id: 'communityIntro4', variable: 'communityIntro4' },
        { id: 'communityFormTitle1', variable: 'communityFormTitle1' },
        { id: 'communityFormTitle2', variable: 'communityFormTitle2' },
        { id: 'communityFormTitle3', variable: 'communityFormTitle3' },
        { id: 'communityFormTitle4', variable: 'communityFormTitle4' },
        { id: 'communityFormTitle5', variable: 'communityFormTitle5' },
        { id: 'communityFormTitle6', variable: 'communityFormTitle6' },
        { id: 'communityPt1', variable: 'communityPt1' },
        { id: 'communityPt2', variable: 'communityPt2' },
        { id: 'communityPt3', variable: 'communityPt3' },
        { id: 'communityPt4', variable: 'communityPt4' },
        { id: 'communityPt5', variable: 'communityPt5' },
        { id: 'communityPt6', variable: 'communityPt6' },
        { id: 'communityPt7', variable: 'communityPt7' },
        { id: 'communityPt8', variable: 'communityPt8' },
        { id: 'communityPt9', variable: 'communityPt9' },
        { id: 'communityPt10', variable: 'communityPt10' },
        { id: 'communityPt11', variable: 'communityPt11' },
        { id: 'communityPt12', variable: 'communityPt12' },
        { id: 'communityPt13', variable: 'communityPt13' },
        { id: 'communityPt14', variable: 'communityPt14' },
        { id: 'communityPt15', variable: 'communityPt15' },
        { id: 'communityPt16', variable: 'communityPt16' },
        { id: 'communityPt17', variable: 'communityPt17' },
        { id: 'communityPt18', variable: 'communityPt18' },
        { id: 'communityPt19', variable: 'communityPt19' },
        { id: 'communityPt20', variable: 'communityPt20' },
        { id: 'communityPt21', variable: 'communityPt21' },
        { id: 'communityPt22', variable: 'communityPt22' },
        { id: 'communityPt23', variable: 'communityPt23' },
        { id: 'communityPt24', variable: 'communityPt24' },
        { id: 'communityPt25', variable: 'communityPt25' },
        { id: 'communityPt26', variable: 'communityPt26' },
        { id: 'communityPt27', variable: 'communityPt27' },
        { id: 'communityPt28', variable: 'communityPt28' },
        { id: 'communityPt29', variable: 'communityPt29' },
        { id: 'communityPt30', variable: 'communityPt30' },
        { id: 'communityPt31', variable: 'communityPt31' },
        { id: 'communityPt32', variable: 'communityPt32' },
        { id: 'communityPt33', variable: 'communityPt33' },
        { id: 'communityPt34', variable: 'communityPt34' },
        { id: 'communityPt35', variable: 'communityPt35' },
        { id: 'communityPt36', variable: 'communityPt36' },
        { id: 'communityPt37', variable: 'communityPt37' },
        { id: 'communityPt38', variable: 'communityPt38' },
        
        
        
        { id: 'investorPt1', variable: 'investorPt1' },
        { id: 'investorPt2', variable: 'investorPt2' },
        { id: 'investorPt3', variable: 'investorPt3' },
        { id: 'investorPt4', variable: 'investorPt4' },
        { id: 'investorPt5', variable: 'investorPt5' },
        { id: 'investorPt6', variable: 'investorPt6' },
        { id: 'investorPt7', variable: 'investorPt7' },
        { id: 'investorPt8', variable: 'investorPt8' },
        { id: 'investorPt9', variable: 'investorPt9' },
        { id: 'investorPt10', variable: 'investorPt10' },
        { id: 'investorPt11', variable: 'investorPt11' },
        { id: 'investorPt12', variable: 'investorPt12' },
        { id: 'investorPt13', variable: 'investorPt13' },
        { id: 'investorPt14', variable: 'investorPt14' },
        { id: 'investorPt15', variable: 'investorPt15' },
        { id: 'investorPt16', variable: 'investorPt16' },
        { id: 'investorPt17', variable: 'investorPt17' },
        { id: 'investorPt18', variable: 'investorPt18' },
        { id: 'investorPt19', variable: 'investorPt19' },
        { id: 'investorPt20', variable: 'investorPt20' },
        { id: 'investorPt21', variable: 'investorPt21' },
        { id: 'investorPt22', variable: 'investorPt22' },
        { id: 'investorPt23', variable: 'investorPt23' },
        { id: 'investorPt24', variable: 'investorPt24' },
        { id: 'investorPt25', variable: 'investorPt25' },
        { id: 'investorPt26', variable: 'investorPt26' },
        { id: 'investorPt27', variable: 'investorPt27' },
        { id: 'investorPt28', variable: 'investorPt28' },
        { id: 'investorPt29', variable: 'investorPt29' },
        { id: 'investorPt30', variable: 'investorPt30' },
        { id: 'investorPt31', variable: 'investorPt31' },
        { id: 'investorPt32', variable: 'investorPt32' },
        
        
        { id: 'landTitlePt1', variable: 'landTitlePt1' },
        { id: 'landTitlePt2', variable: 'landTitlePt2' },

        { id: 'investorsTitlePt1', variable: 'investorsTitlePt1' },
        { id: 'investorsTitlePt2', variable: 'investorsTitlePt2' },


        { id: 'ourOfferTitlePt1', variable: 'ourOfferTitlePt1' },
        { id: 'ourOfferTitlePt2', variable: 'ourOfferTitlePt2' },


        { id: 'entryCode', variable: 'entryCode' },

        { id: 'yes', variable: 'yes' },
        { id: 'no', variable: 'no' },

        { id: 'communityTitlePt1', variable: 'communityTitlePt1' },
        { id: 'communityTitlePt2', variable: 'communityTitlePt2' },

        { id: 'addLocationButton', variable: 'addLocationButton' },

        { id: 'privacyPolicy', variable: 'privacyPolicy' },
        { id: 'imprint', variable: 'imprint' },

        { id: 'test', variable: 'test' },

      ];

      const placeholdersToUpdate = [
        { 
          id: 'contactFormName', 
          variable: 'namePlaceholder',
          type: 'placeholder' 
        },
        { 
          id: 'contactFormEmail', 
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

      const classToUpdate = [
        { class: 'landOwnerPrev', variable: 'landOwnerPrev' },
        { class: 'landOwnerNext', variable: 'landOwnerNext' },
        { class: 'communityPrev', variable: 'communityPrev' },
        { class: 'communityNext', variable: 'communityNext' },
        { class: 'investorPrev', variable: 'investorPrev' },
        { class: 'investorNext', variable: 'investorNext' },

      ]

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

      classToUpdate.forEach(item => {
        const elements = document.getElementsByClassName(item.class);
        Array.from(elements).forEach(el => {
          if (variables[item.variable]) {
            el.textContent = variables[item.variable];
          }
        });
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
