document.addEventListener('DOMContentLoaded', () => {
    let currentQuestion = 0;
    const totalQuestions = 13;
    let locationCount = 1;
    const COMMUNITY_TOTAL_QUESTIONS = 5;
    let communityCurrentQuestion = 0;
    const INVESTOR_TOTAL_QUESTIONS = 6;
    let investorCurrentQuestion = 0;
    
    // Get all squares and forms
    const landOwnerSquare = document.getElementById('landOwnerSquare');
    const investorSquare = document.getElementById('investorSquare');
    const communitySquare = document.getElementById('communitySquare');

    const landOwnerForm = document.getElementById('landOwnerForm');
    const investorForm = document.getElementById('investorForm');
    const communityForm = document.getElementById('communityForm');

    // Add these to your initialization code
    document.querySelector('#landowner-data-protection')?.addEventListener('change', updateNavigationButtons);
    document.querySelector('#community-data-protection')?.addEventListener('change', updateCommunityNavigationButtons);
    document.querySelector('#investor-data-protection')?.addEventListener('change', updateInvestorNavigationButtons);

    
    // Add Location Button Handler
    document.getElementById('addLocationButton')?.addEventListener('click', addLocationFields);

    landOwnerForm.style.display = 'none';

    initializeSimpleFormQuestions();
    
    // Function to hide all forms
    function hideAllForms() {
        landOwnerForm.style.display = 'none';
        investorForm.style.display = 'none';
        communityForm.style.display = 'none';
        
        landOwnerSquare.classList.remove('active');
        investorSquare.classList.remove('active');
        communitySquare.classList.remove('active');
    }

    // Add click handlers for each square
    landOwnerSquare.addEventListener('click', () => {
        if (landOwnerForm.style.display === 'block') {
            hideAllForms();
            resetForm();
        } else {
            hideAllForms();
            landOwnerForm.style.display = 'block';
            landOwnerSquare.classList.add('active');
            showQuestion(0);
        }
    });

    investorSquare.addEventListener('click', () => {
        if (investorForm.style.display === 'block') {
            hideAllForms();
            resetInvestorForm();
        } else {
            hideAllForms();
            investorForm.style.display = 'block';
            investorSquare.classList.add('active');
            
            // Ensure question0 is visible and active
            const question0 = document.querySelector('#investorForm #question0');
            if (question0) {
                question0.classList.add('active');
                // Make sure data protection is visible
                const dataProtection = question0.querySelector('.data-protection');
                if (dataProtection) {
                    dataProtection.style.display = 'block';
                }
            }
            showInvestorQuestion(0);
        }
    });
    
    communitySquare.addEventListener('click', () => {
        if (communityForm.style.display === 'block') {
            hideAllForms();
            resetCommunityForm();
        } else {
            hideAllForms();
            communityForm.style.display = 'block';
            communitySquare.classList.add('active');
            
            // Ensure question0 is visible and active
            const question0 = document.querySelector('#communityForm #question0');
            if (question0) {
                question0.classList.add('active');
                // Make sure data protection is visible
                const dataProtection = question0.querySelector('.data-protection');
                if (dataProtection) {
                    dataProtection.style.display = 'block';
                }
            }
            showCommunityQuestion(0);
        }
    });

    


    

    function resetInvestorForm() {
        investorCurrentQuestion = 0;
        
        // Reset all selections and inputs
        document.querySelectorAll('#investorForm .option-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        document.querySelectorAll('#investorForm input').forEach(input => {
            if (input.type === 'range') {
                input.value = input.defaultValue;
                const valueDisplay = input.parentElement.querySelector('.slider-value');
                if (valueDisplay) {
                    updateSliderValue(input, valueDisplay);
                }
            } else {
                input.value = '';
            }
        });
        
        showInvestorQuestion(0);
    }
    
    function showInvestorQuestion(questionNumber) {
        document.querySelectorAll('#investorForm .question-container').forEach(q => {
            q.classList.remove('active');
        });
        
        const currentQuestionEl = document.querySelector(`#investorForm #question${questionNumber}`);
        if (currentQuestionEl) {
            currentQuestionEl.classList.add('active');
            initializeInvestorQuestion(questionNumber);
        }
        
        updateInvestorNavigationButtons();
    }
    
    function initializeInvestorQuestion(questionNumber) {
        const container = document.querySelector(`#investorForm #question${questionNumber}`);
        if (!container) return;
    
        const optionCards = container.querySelectorAll('.option-card');
        optionCards.forEach(card => {
            card.addEventListener('click', () => handleInvestorOptionCardClick(card, optionCards));
        });
    
        // Initialize slider if present
        const slider = container.querySelector('.slider');
        if (slider) {
            const valueDisplay = container.querySelector('.slider-value');
            slider.addEventListener('input', () => {
                updateSliderValue(slider, valueDisplay);
                updateInvestorNavigationButtons();
            });
            updateSliderValue(slider, valueDisplay);
        }
    
        // Initialize input validation for required fields
        if (questionNumber === 1 || questionNumber === 2) {
            const inputs = container.querySelectorAll('input[required]');
            inputs.forEach(input => {
                input.addEventListener('input', updateInvestorNavigationButtons);
            });
        }
    }
    
    function handleInvestorOptionCardClick(card, optionCards) {
        if (card.classList.contains('multi-select')) {
            card.classList.toggle('selected');
        } else {
            optionCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
        }
        
        updateInvestorNavigationButtons();
    }
    
    function isInvestorQuestionAnswered(questionNumber) {
        const container = document.querySelector(`#investorForm #question${questionNumber}`);
        if (!container) return false;
    
        switch(questionNumber) {
            case 0: // Introduction
                return container.querySelector('#investor-data-protection').checked;
            
            case 1: // Personal Information
            case 2: // Business Address
                const requiredInputs = container.querySelectorAll('input[required]');
                return Array.from(requiredInputs).every(input => input.value.trim() !== '');
                
            case 3: // Technology Preferences
                return container.querySelectorAll('.option-card.selected').length > 0;
                
            case 4: // Investment Volume
                return container.querySelector('.option-card.selected') !== null;
                
            case 5: // IRR
                return container.querySelector('.slider')?.value !== '';
                
            case 6: // Project Status
                return container.querySelectorAll('.option-card.selected').length > 0;
                
            default:
                return false;
        }
    }
    
    

    function submitInvestorForm() {
        const form = document.querySelector('#investorForm form');
        if (!form) return;
    
        // Map form values to Salesforce fields
        
        // Personal Information (Question 1)
        document.getElementById('00NMz0000040cHV').value = document.querySelector('#investorForm #vorname').value || '';
        document.getElementById('00NMz0000040bzm').value = document.querySelector('#investorForm #nachname').value || '';
        document.getElementById('00NMz000004XZMU').value = document.querySelector('#investorForm #position').value || '';
        document.getElementById('00NMz000004Xbo5').value = document.querySelector('#investorForm #unternehmen').value || '';
        document.getElementById('phone').value = document.querySelector('#investorForm #telefon').value || '';
        document.getElementById('email').value = document.querySelector('#investorForm #email_visible').value || '';
    
        // Business Address (Question 2)
        document.getElementById('00NMz0000040cKj').value = document.querySelector('#investorForm #strasse').value || '';
        document.getElementById('00NMz0000040cML').value = document.querySelector('#investorForm #plz').value || '';
        document.getElementById('00NMz0000040cNx').value = document.querySelector('#investorForm #ort').value || '';
        document.getElementById('00NMz0000040b26').value = document.querySelector('#investorForm #land').value || '';
    
        // Technology Preferences (Question 3)
        const techSelect = document.getElementById('00NMz000004XbrJ');
        // Reset all selections
        Array.from(techSelect.options).forEach(option => {
            option.selected = false;
        });
        
        // Map selected technologies
        const selectedTechs = document.querySelectorAll('#investorForm #question3 .option-card.selected');
        selectedTechs.forEach(tech => {
            const value = tech.getAttribute('data-value');
            if (value === 'pv') {
                techSelect.querySelector('option[value="Photovoltaik-Projekte"]').selected = true;
            } else if (value === 'battery') {
                techSelect.querySelector('option[value="Batteriespeichersysteme"]').selected = true;
            } else if (value === 'combined') {
                techSelect.querySelector('option[value="Kombinierte Anlagen (PV + Speicher)"]').selected = true;
            }
        });
    
        // Investment Volume (Question 4)
        const volumeSelect = document.getElementById('00NMz000004Xbsv');
        // Reset selection
        volumeSelect.value = '';
        
        const selectedVolume = document.querySelector('#investorForm #question4 .option-card.selected');
        if (selectedVolume) {
            const value = selectedVolume.getAttribute('data-value');
            switch(value) {
                case '1-5': 
                    volumeSelect.value = '1-5 Mio.';
                    break;
                case '5-10': 
                    volumeSelect.value = '5-10 Mio.';
                    break;
                case '10-25': 
                    volumeSelect.value = '10-25 Mio.';
                    break;
                case '25+': 
                    volumeSelect.value = '> 25 Mio.';
                    break;
            }
        }
    
        // Equity Return/IRR (Question 5)
        const irrValue = document.querySelector('#investorForm #question5 .slider').value || '';
        document.getElementById('00NMz000004Xbw9').value = irrValue ? `${irrValue}%` : '';
    
        // Project Status (Question 6)
        const statusSelect = document.getElementById('00NMz000004Xc4D');
        // Reset all selections
        Array.from(statusSelect.options).forEach(option => {
            option.selected = false;
        });
        
        // Map selected statuses
        const selectedStatuses = document.querySelectorAll('#investorForm #question6 .option-card.selected');
        selectedStatuses.forEach(status => {
            const value = status.getAttribute('data-value');
            if (value === 'development') {
                statusSelect.querySelector('option[value="In Entwicklung"]').selected = true;
            } else if (value === 'ready') {
                statusSelect.querySelector('option[value="Ready-to-build"]').selected = true;
            } else if (value === 'operational') {
                statusSelect.querySelector('option[value="In Betrieb"]').selected = true;
            }
        });
    
        console.log('Investor Form values being sent to Salesforce:');
        console.log('First Name:', document.getElementById('00NMz0000040cHV').value);
        console.log('Last Name:', document.getElementById('00NMz0000040bzm').value);
        console.log('Position:', document.getElementById('00NMz000004XZMU').value);
        console.log('Company:', document.getElementById('00NMz000004Xbo5').value);
        console.log('Phone:', document.getElementById('phone').value);
        console.log('Email:', document.getElementById('email').value);
        console.log('Street:', document.getElementById('00NMz0000040cKj').value);
        console.log('Postal Code:', document.getElementById('00NMz0000040cML').value);
        console.log('City:', document.getElementById('00NMz0000040cNx').value);
        console.log('Country:', document.getElementById('00NMz0000040b26').value);
        
        // Submit the form
        form.submit();
    }


    // Add event listeners for navigation
    document.querySelector('#investorForm #prevButton')?.addEventListener('click', () => {
        if (investorCurrentQuestion > 0) {
            investorCurrentQuestion--;
            showInvestorQuestion(investorCurrentQuestion);
        }
    });
    
    document.querySelector('#investorForm #nextButton')?.addEventListener('click', () => {
        if (investorCurrentQuestion < INVESTOR_TOTAL_QUESTIONS) {
            investorCurrentQuestion++;
            showInvestorQuestion(investorCurrentQuestion);
        } else {
            submitInvestorForm();
        }
    });


    function resetCommunityForm() {
        communityCurrentQuestion = 0;
        
        // Reset all selections and inputs
        document.querySelectorAll('#communityForm .option-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        document.querySelectorAll('#communityForm .conditional-question').forEach(q => {
            q.classList.remove('visible');
        });
        
        document.querySelectorAll('#communityForm input').forEach(input => {
            input.value = '';
        });
        
        showCommunityQuestion(0);
    }
    
    function showCommunityQuestion(questionNumber) {
        document.querySelectorAll('#communityForm .question-container').forEach(q => {
            q.classList.remove('active');
        });
        
        const currentQuestionEl = document.querySelector(`#communityForm #question${questionNumber}`);
        if (currentQuestionEl) {
            currentQuestionEl.classList.add('active');
            initializeCommunityQuestion(questionNumber);
        }
        
        updateCommunityNavigationButtons();
    }
    
    function initializeCommunityQuestion(questionNumber) {
        const container = document.querySelector(`#communityForm #question${questionNumber}`);
        if (!container) return;
    
        const optionCards = container.querySelectorAll('.option-card');
        optionCards.forEach(card => {
            card.addEventListener('click', () => handleCommunityOptionCardClick(card, optionCards));
        });
    
        // Initialize any required input validation
        if (questionNumber === 1 || questionNumber === 2) {
            const inputs = container.querySelectorAll('input[required]');
            inputs.forEach(input => {
                input.addEventListener('input', updateCommunityNavigationButtons);
            });
        }
    }
    
    function handleCommunityOptionCardClick(card, optionCards) {
        if (card.classList.contains('multi-select')) {
            card.classList.toggle('selected');
            const conditionalId = card.getAttribute('data-shows');
            if (conditionalId) {
                const container = card.closest('.question-container');
                const anySelected = Array.from(container.querySelectorAll('.multi-select'))
                    .some(c => c.classList.contains('selected'));
                const conditional = document.getElementById(conditionalId);
                if (conditional) {
                    conditional.style.display = anySelected ? 'block' : 'none';
                }
            }
        } else {
            // Single select handling
            optionCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            
            const conditionalId = card.getAttribute('data-shows');
            if (conditionalId) {
                const conditional = document.getElementById(conditionalId);
                if (conditional) {
                    conditional.style.display = card.classList.contains('selected') ? 'block' : 'none';
                }
            }
        }
        
        updateCommunityNavigationButtons();
    }
    
    function isCommunityQuestionAnswered(questionNumber) {
        const container = document.querySelector(`#communityForm #question${questionNumber}`);
        if (!container) return false;
    
        switch(questionNumber) {
            case 0: // Introduction
                return container.querySelector('#community-data-protection').checked;
            
            case 1: // Municipal Information
            case 2: // Contact Information
                const requiredInputs = container.querySelectorAll('input[required]');
                return Array.from(requiredInputs).every(input => input.value.trim() !== '');
                
            case 3: // Own Land
                const hasSelection = container.querySelector('.option-card.selected') !== null;
                if (hasSelection && container.querySelector('.option-card.selected').getAttribute('data-value') === 'ja') {
                    return container.querySelectorAll('#question3a .option-card.selected').length > 0;
                }
                return hasSelection;
                
            case 4: // Project Types
            case 5: // Interests
                return container.querySelectorAll('.option-card.selected').length > 0;
                
            default:
                return false;
        }
    }
    

    function submitCommunityForm() {
        const form = document.querySelector('#communityForm form');
        if (!form) return;
    
        // Map form values to Salesforce fields
        
        // Municipal Information (Question 1)
        document.getElementById('00NMz0000040bzl').value = document.querySelector('#communityForm #bundesland_visible').value || '';
        document.getElementById('00NMz0000040c2z').value = document.querySelector('#communityForm #gemeinde_visible').value || '';
        document.getElementById('00NMz0000040cB3').value = document.querySelector('#communityForm #amt_visible').value || '';
        document.getElementById('00NMz0000040cKj').value = document.querySelector('#communityForm #strasse_visible').value || '';
        document.getElementById('00NMz0000040cML').value = document.querySelector('#communityForm #plz_visible').value || '';
        document.getElementById('00NMz0000040cNx').value = document.querySelector('#communityForm #ort_visible').value || '';
    
        // Contact Information (Question 2)
        document.getElementById('00NMz0000040cHV').value = document.querySelector('#communityForm #vorname_visible').value || '';
        document.getElementById('00NMz0000040bzm').value = document.querySelector('#communityForm #nachname_visible').value || '';
        document.getElementById('00NMz000004XcsD').value = document.querySelector('#communityForm #position_visible').value || '';
        document.getElementById('phone').value = document.querySelector('#communityForm #telefon_visible').value || '';
        document.getElementById('email').value = document.querySelector('#communityForm #email_visible').value || '';
    
        // Own Land (Question 3)
        const hasOwnLand = document.querySelector('#communityForm #question3 .option-card.selected')?.getAttribute('data-value') === 'ja';
        document.getElementById('00NMz000004Xcx3').value = hasOwnLand ? '1' : '0';
    
        // Land types if own land is available
        if (hasOwnLand) {
            const landTypes = Array.from(document.querySelectorAll('#communityForm #question3a .option-card.selected'))
                .map(card => card.getAttribute('data-value'))
                .filter(Boolean)
                .join(';');
            document.getElementById('00NMz0000040bRt').value = landTypes;
        } else {
            document.getElementById('00NMz0000040bRt').value = '';
        }
    
        // Project Types (Question 4)
        const projectTypes = Array.from(document.querySelectorAll('#communityForm #question4 .option-card.selected'))
            .map(card => card.getAttribute('data-value'))
            .filter(Boolean)
            .join(';');
        document.getElementById('00NMz000004Xd1t').value = projectTypes;
    
        // Interests (Question 5) - combine multiple selections into a semicolon-separated string
        const interestsArray = [];
        const selectedInterests = document.querySelectorAll('#communityForm #question5 .option-card.selected');
        
        selectedInterests.forEach(interest => {
            const value = interest.getAttribute('data-value');
            let sfValue = '';
            
            switch(value) {
                case 'Potenzialanalyse':
                    sfValue = 'Potentialanalyse';
                    break;
                case 'Verpachtung':
                    sfValue = 'Verpachtung der gemeindeeigenen Flächen';
                    break;
                case 'Beteiligung':
                    sfValue = 'Direkte Beteiligung der Gemeinde an den Projekten';
                    break;
                case 'Bürgerbeteiligung':
                    sfValue = 'Bürgerbeteiligungsmodell';
                    break;
                case 'Investorenmodell':
                    sfValue = 'Investorenmodell, kommunale Beteiligung in Anlehnung an §6 EEG 2021';
                    break;
            }
            
            if (sfValue) {
                interestsArray.push(sfValue);
            }
        });
        
        // Create a semicolon-separated string of all selected interests
        const interestsString = interestsArray.join(';');
        document.getElementById('00NMz000004Xd57').value = interestsString;
    
        console.log('Community Form values being sent to Salesforce:');
        console.log('Bundesland:', document.getElementById('00NMz0000040bzl').value);
        console.log('Gemeinde:', document.getElementById('00NMz0000040c2z').value);
        console.log('Amt:', document.getElementById('00NMz0000040cB3').value);
        console.log('Straße:', document.getElementById('00NMz0000040cKj').value);
        console.log('PLZ:', document.getElementById('00NMz0000040cML').value);
        console.log('Stadt:', document.getElementById('00NMz0000040cNx').value);
        console.log('Vorname:', document.getElementById('00NMz0000040cHV').value);
        console.log('Nachname:', document.getElementById('00NMz0000040bzm').value);
        console.log('Position:', document.getElementById('00NMz000004XcsD').value);
        console.log('Phone:', document.getElementById('phone').value);
        console.log('Email:', document.getElementById('email').value);
        console.log('Hat eigene Flächen:', document.getElementById('00NMz000004Xcx3').value);
        console.log('Land Typen:', document.getElementById('00NMz0000040bRt').value);
        console.log('Projekt Typen:', document.getElementById('00NMz000004Xd1t').value);
        
        // Submit the form
        form.submit();
    }
    
    // Add event listeners for navigation
    document.querySelector('#communityForm #prevButton')?.addEventListener('click', () => {
        if (communityCurrentQuestion > 0) {
            communityCurrentQuestion--;
            showCommunityQuestion(communityCurrentQuestion);
        }
    });
    
    document.querySelector('#communityForm #nextButton')?.addEventListener('click', () => {
        if (communityCurrentQuestion < COMMUNITY_TOTAL_QUESTIONS) {
            communityCurrentQuestion++;
            showCommunityQuestion(communityCurrentQuestion);
        } else {
            submitCommunityForm();
        }
    });


    function addLocationFields() {
        locationCount++;
        const container = document.getElementById('locationFieldsContainer');
        const newLocation = document.createElement('div');
        newLocation.className = 'location-entry';
        
        newLocation.innerHTML = `
            <img src="./img/x.svg" alt="Remove" class="remove-location">
            <div class="input-group">
                <div class="input-field">
                    <label for="bundesland${locationCount}">Bundesland</label>
                    <input type="text" id="bundesland${locationCount}" name="bundesland[]" required>
                </div>
                <div class="input-field">
                    <label for="landkreis${locationCount}">Landkreis</label>
                    <input type="text" id="landkreis${locationCount}" name="landkreis[]" required>
                </div>
                <div class="input-field">
                    <label for="gemarkung${locationCount}">Gemarkung</label>
                    <input type="text" id="gemarkung${locationCount}" name="gemarkung[]" required>
                </div>
            </div>
            <div class="input-group">
                <div class="input-field">
                    <label for="flur${locationCount}">Flur</label>
                    <input type="text" id="flur${locationCount}" name="flur[]" required>
                </div>
                <div class="input-field">
                    <label for="flurstueck${locationCount}">Flurstück</label>
                    <input type="text" id="flurstueck${locationCount}" name="flurstueck[]" required>
                </div>
                <div class="input-field">
                    <label for="flaeche${locationCount}">Fläche in ha</label>
                    <input type="number" id="flaeche${locationCount}" name="flaeche[]" min="0" required>
                </div>
                <div class="input-field">
                    <label for="amt${locationCount}">Amt</label>
                    <input type="text" id="amt${locationCount}" name="amt[]" required>
                </div>
            </div>
        `;
        
        container.appendChild(newLocation);
        
        // Add event listeners
        const removeImg = newLocation.querySelector('.remove-location');
        if (removeImg) {
            removeImg.addEventListener('click', () => removeLocationEntry(removeImg));
        }
        
        newLocation.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', updateNavigationButtons);
        });
    }
 
    function initializeLocationEntries() {
        document.querySelectorAll('.location-entry input').forEach(input => {
            input.addEventListener('input', updateNavigationButtons);
        });
    }
    
 
    function showConditionalQuestion(conditionalId) {
        const conditional = document.querySelector(`#${conditionalId}`);
        if (conditional) {
            conditional.classList.add('visible');
            const slider = conditional.querySelector('.slider');
            const valueDisplay = conditional.querySelector('.slider-value');
            if (slider && valueDisplay) {
                setTimeout(() => {
                    updateSliderValue(slider, valueDisplay);
                }, 0);
            }
        }
    }
 
    function resetForm() {
        currentQuestion = 0;
        locationCount = 1;
        
        document.querySelectorAll('.option-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelectorAll('.conditional-question').forEach(q => {
            q.classList.remove('visible');
        });
        document.querySelectorAll('input').forEach(input => {
            input.value = '';
        });
        
        const container = document.getElementById('locationFieldsContainer');
        if (container) {
            const firstLocation = container.firstElementChild;
            container.innerHTML = '';
            if (firstLocation) {
                container.appendChild(firstLocation);
            }
        }
        
        showQuestion(0);
    }
 
    function updateSliderValue(slider, valueDisplay) {
        const value = slider.value;
        if (slider.hasAttribute('data-percentage')) {
            valueDisplay.textContent = `${value}%`;
        } else if (slider.hasAttribute('data-year')) {
            valueDisplay.textContent = value;
        } else {
            valueDisplay.textContent = `${value} ha`;
        }
    
        // Calculate position directly based on slider value
        const sliderWidth = slider.getBoundingClientRect().width;
        const thumbWidth = 16; // Approximate width of the thumb
        const range = slider.max - slider.min;
        const valuePos = ((value - slider.min) / range) * (sliderWidth - thumbWidth);
        
        // Apply position directly without transitions
        valueDisplay.style.transition = 'none';
        valueDisplay.style.left = `${valuePos}px`;
        
        // Force reflow to ensure transition is disabled before any other changes
        valueDisplay.offsetHeight;
    }
    
    function updateMonthSlider(slider, valueDisplay) {
        const months = [
            'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
            'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
        ];
        const value = parseInt(slider.value);
        valueDisplay.textContent = months[value - 1];
        
        // Calculate position directly based on slider value
        const sliderWidth = slider.getBoundingClientRect().width;
        const thumbWidth = 16; // Approximate width of the thumb
        const range = slider.max - slider.min;
        const valuePos = ((value - slider.min) / range) * (sliderWidth - thumbWidth);
        
        // Apply position directly without transitions
        valueDisplay.style.transition = 'none';
        valueDisplay.style.left = `${valuePos}px`;
        
        // Force reflow to ensure transition is disabled
        valueDisplay.offsetHeight;
    }

    

    // In the handleOptionCardClick function
    function handleOptionCardClick(card, optionCards) {
        if (card.closest('#question9')) {
            if (card.getAttribute('data-value') === 'keine') {
                // Clicking "Keine besondere Merkmale"
                if (!card.classList.contains('selected')) {
                    optionCards.forEach(c => c.classList.remove('selected'));
                    card.classList.add('selected');
                } else {
                    card.classList.remove('selected');
                }
            } else {
                // Clicking other options
                const keineOption = card.closest('.question-container').querySelector('.option-card[data-value="keine"]');
                if (keineOption) keineOption.classList.remove('selected');
                card.classList.toggle('selected');
            }
            updateNavigationButtons();
            return;
        }

        if (card.closest('#question6')) {
            if (card.getAttribute('data-value') === 'Nein') {
                optionCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                const conditional = document.getElementById('question6a');
                if (conditional) {
                    conditional.style.display = 'none';
                }
            } else {
                const neinOption = card.closest('.question-container').querySelector('.option-card[data-value="Nein"]');
                if (neinOption) neinOption.classList.remove('selected');
                
                card.classList.toggle('selected');
                const anyInfraSelected = Array.from(optionCards)
                    .some(c => c.classList.contains('selected') && c.getAttribute('data-value') !== 'Nein');
                
                const conditional = document.getElementById('question6a');
                if (conditional) {
                    conditional.style.display = anyInfraSelected ? 'block' : 'none';
                }
            }
            updateNavigationButtons();
            return;
        }

        if (card.closest('#question13')) {
            const phoneCard = card.closest('.question-container').querySelector('.option-card[data-value="phone"]');
            const conditionalQuestion = document.getElementById('question13a');
            
            if (card === phoneCard) {
                card.classList.toggle('selected');
                conditionalQuestion.style.display = card.classList.contains('selected') ? 'block' : 'none';
                if (!card.classList.contains('selected')) {
                    conditionalQuestion.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
                }
            } else {
                card.classList.toggle('selected');
            }
            updateNavigationButtons();
            return;
        }
    
        if (card.classList.contains('multi-select')) {
            card.classList.toggle('selected');
            const conditionalId = card.getAttribute('data-shows');
            if (conditionalId) {
                const container = card.closest('.question-container');
                const anySelected = Array.from(container.querySelectorAll('.multi-select'))
                    .some(c => c.classList.contains('selected'));
                const conditional = document.getElementById(conditionalId);
                if (conditional) {
                    conditional.style.display = anySelected ? 'block' : 'none';
                }
            }
        } else {
            const container = card.closest('.question-container');
            container.querySelectorAll('.option-card').forEach(c => {
                c.classList.remove('selected');
            });
            card.classList.add('selected');
            
            const conditionalId = card.getAttribute('data-shows');
            container.querySelectorAll('.conditional-question').forEach(cq => {
                cq.style.display = 'none';
            });
            
            if (conditionalId) {
                const conditional = document.getElementById(conditionalId);
                if (conditional) {
                    conditional.style.display = 'block';
                }
            }
        }
        
        updateNavigationButtons();
    }
    

        // For landowner form
        function showQuestion(questionNumber) {
            document.querySelectorAll('.question-container').forEach(q => {
                q.classList.remove('active');
            });
            
            const currentQuestionEl = document.querySelector(`#question${questionNumber}`);
            if (currentQuestionEl) {
                currentQuestionEl.classList.add('active');
                initializeQuestion(questionNumber);
            }
            
            // Specific to landowner form data protection
            const dataProtection = document.querySelector('#landOwnerForm .data-protection');
            if (dataProtection) {
                dataProtection.style.display = questionNumber === totalQuestions ? 'block' : 'none';
            }
            
            updateNavigationButtons();
        }
    
        function initializeSimpleFormQuestions() {
            ['investor', 'community'].forEach(formType => {
                const question0 = document.querySelector(`#${formType}Question0`);
                const contactForm = document.querySelector(`#${formType}ContactForm`);
                
                if (question0 && contactForm) {
                    question0.querySelectorAll('.option-card').forEach(card => {
                        card.addEventListener('click', () => {
                            const optionCards = question0.querySelectorAll('.option-card');
                            optionCards.forEach(c => c.classList.remove('selected'));
                            card.classList.add('selected');
                            
                            if (card.getAttribute('data-value') === 'ja') {
                                contactForm.style.display = 'block';
                            }
                        });
                    });
                }
            });
        }   


    function updateMonthSlider(slider, valueDisplay) {
        const months = [
            'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
            'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
        ];
        const value = parseInt(slider.value);
        valueDisplay.textContent = months[value - 1];
        
        const percent = (value - slider.min) / (slider.max - slider.min);
        const sliderWidth = slider.offsetWidth;
        valueDisplay.style.left = `${percent * sliderWidth}px`;
    }
    
    function initializeMonthYearSliders() {
        const monthSlider = document.querySelector('.month-slider .slider');
        const monthValue = monthSlider?.closest('.slider-wrapper').querySelector('.slider-value');
        const yearSlider = document.querySelector('.year-slider .slider');
        const yearValue = yearSlider?.closest('.slider-wrapper').querySelector('.slider-value');
    
        if (monthSlider && monthValue) {
            monthSlider.addEventListener('input', () => updateMonthSlider(monthSlider, monthValue));
            updateMonthSlider(monthSlider, monthValue);
        }
    
        if (yearSlider && yearValue) {
            yearSlider.addEventListener('input', () => updateSliderValue(yearSlider, yearValue));
            updateSliderValue(yearSlider, yearValue);
        }
    }
       
 
    function initializeQuestion(questionNumber) {
        const container = document.querySelector(`#question${questionNumber}`);
        if (!container) return;
    
        const optionCards = container.querySelectorAll('.option-card');
        optionCards.forEach(card => {
            card.addEventListener('click', () => handleOptionCardClick(card, optionCards));
        });
    
        // Add event listener for select in conditional questions
        if (questionNumber === 4) {
            const conditionalSelect = container.querySelector('#question4a select');
            if (conditionalSelect) {
                conditionalSelect.addEventListener('change', () => {
                    updateNavigationButtons();
                });
            }
        }
 
        if (questionNumber === 0) {
            const neinOption = container.querySelector('.option-card[data-value="nein"]');
            const hasSelected = container.querySelector('.option-card.selected');
            if (neinOption && !hasSelected) {
                neinOption.classList.add('selected');
            }
        }
 
        const slider = container.querySelector('.slider');
        if (slider) {
            const valueDisplay = container.querySelector('.slider-value');
            slider.addEventListener('input', () => {
                updateSliderValue(slider, valueDisplay);
                updateNavigationButtons();
            });
            updateSliderValue(slider, valueDisplay);
        }

        if (questionNumber === 5) {
            const verpachtetCard = container.querySelector('.option-card[data-value="Verpachtet"]');
            if (verpachtetCard) {
                verpachtetCard.addEventListener('click', () => {
                    const conditionalQuestion = container.querySelector('#question5a');
                    if (conditionalQuestion) {
                        conditionalQuestion.style.display = 'block';
                        
                        // Initialize early termination options
                        const earlyTerminationCards = conditionalQuestion.querySelectorAll('.option-card');
                        earlyTerminationCards.forEach(card => {
                            // Remove any existing click listeners
                            card.replaceWith(card.cloneNode(true));
                        });
                        
                        // Re-add click listeners
                        conditionalQuestion.querySelectorAll('.option-card').forEach(card => {
                            card.addEventListener('click', (event) => {
                                event.stopPropagation();  // Prevent event from bubbling up
                                event.preventDefault();   // Prevent default behavior
                                
                                // Handle the selection
                                conditionalQuestion.querySelectorAll('.option-card').forEach(c => 
                                    c.classList.remove('selected')
                                );
                                card.classList.add('selected');
                                updateNavigationButtons();
                            });
                        });
                    }
                });
            }
            
            // Handle other options (not Verpachtet)
            const otherCards = container.querySelectorAll('.option-card:not([data-value="Verpachtet"])');
            otherCards.forEach(card => {
                card.addEventListener('click', () => {
                    const conditionalQuestion = container.querySelector('#question5a');
                    if (conditionalQuestion) {
                        conditionalQuestion.style.display = 'none';
                        conditionalQuestion.querySelectorAll('.option-card').forEach(c => 
                            c.classList.remove('selected')
                        );
                    }
                });
            });
        }


        if (questionNumber === 6) {
            const slider = container.querySelector('#question6a .slider');
            const valueDisplay = container.querySelector('#question6a .slider-value');
            if (slider && valueDisplay) {
                updateSliderValue(slider, valueDisplay);
            }
        }
        



 
        if (questionNumber === 7) {
            const distanceSelect = container.querySelector('#question7a .select-wrapper select:first-child');
            const voltageSelect = container.querySelector('#question7a .select-wrapper select:last-child');
            
            if (distanceSelect) {
                distanceSelect.addEventListener('change', () => {
                    updateNavigationButtons();
                });
            }
            
            if (voltageSelect) {
                voltageSelect.addEventListener('change', () => {
                    updateNavigationButtons();
                });
            }
        }

        if (questionNumber === 8) {
            const distanceSelect = container.querySelector('#question8a .select-wrapper select');
            
            if (distanceSelect) {
                distanceSelect.addEventListener('change', () => {
                    updateNavigationButtons();
                });
            }
        }

        if (questionNumber === 10) {
            document.querySelectorAll('.remove-location').forEach(btn => {
                btn.onclick = () => removeLocationEntry(btn);
            });

            // Add Location Button Handler
            document.getElementById('addLocationButton')?.addEventListener('click', addLocationFields); 
        }

        if (questionNumber === 11 || questionNumber === 12) {
            const inputs = container.querySelectorAll('input[required], select[required]');
            inputs.forEach(input => {
                input.addEventListener('input', updateNavigationButtons);
                input.addEventListener('change', updateNavigationButtons);
                
                // Trigger initial validation
                input.dispatchEvent(new Event('input'));
            });
        }

        initializeMonthYearSliders();
    }


    
 
    function showQuestion(questionNumber) {
        document.querySelectorAll('.question-container').forEach(q => {
            q.classList.remove('active');
        });
        
        const currentQuestionEl = document.querySelector(`#question${questionNumber}`);
        if (currentQuestionEl) {
            currentQuestionEl.classList.add('active');
            initializeQuestion(questionNumber);
        }
        
        updateNavigationButtons();
    }
 
    function updateNavigationButtons() {
        const prevButton = document.querySelector('#prevButton');
        const nextButton = document.querySelector('#nextButton');
        
        if (prevButton) {
            prevButton.disabled = currentQuestion === 0;
        }
    
        if (nextButton) {
            const isLastQuestion = currentQuestion === totalQuestions;

            nextButton.textContent = document.querySelector('#languageDropdownTrigger').textContent === 'English' 
            ? (isLastQuestion ? 'Submit' : 'Continue')
            : (isLastQuestion ? 'Absenden' : 'Weiter');

            // Only for question 1, check if "Nein" is selected
            if (currentQuestion === 1) {
                const selectedCard = document.querySelector('#question1 .option-card.selected');
                nextButton.disabled = !selectedCard || selectedCard.getAttribute('data-value') === 'nein';
            } else {
                // For all other questions, use the existing validation
                nextButton.disabled = !isQuestionAnswered(currentQuestion);
            }
        }
    }

    function updateCommunityNavigationButtons() {
        const prevButton = document.querySelector('.communityPrev');
        const nextButton = document.querySelector('.communityNext');

        
        if (prevButton) {
            prevButton.disabled = communityCurrentQuestion === 0;
        }
    
        if (nextButton) {
            const isLastQuestion = communityCurrentQuestion === COMMUNITY_TOTAL_QUESTIONS;
            
            nextButton.textContent = document.querySelector('#languageDropdownTrigger').textContent === 'English' 
                ? (isLastQuestion ? 'Submit' : 'Continue')
                : (isLastQuestion ? 'Absenden' : 'Weiter');

            nextButton.disabled = !isCommunityQuestionAnswered(communityCurrentQuestion);
        }
    }

    function updateInvestorNavigationButtons() {
        const prevButton = document.querySelector('.investorPrev');
        const nextButton = document.querySelector('.investorNext');
        
        if (prevButton) {
            prevButton.disabled = investorCurrentQuestion === 0;
        }
    
        if (nextButton) {
            const isLastQuestion = investorCurrentQuestion === INVESTOR_TOTAL_QUESTIONS;

            nextButton.textContent = document.querySelector('#languageDropdownTrigger').textContent === 'English' 
            ? (isLastQuestion ? 'Submit' : 'Continue')
            : (isLastQuestion ? 'Absenden' : 'Weiter');

            nextButton.disabled = !isInvestorQuestionAnswered(investorCurrentQuestion);
        }
    }







 
    function isQuestionAnswered(questionNumber) {
        const container = document.querySelector(`#question${questionNumber}`);
        if (!container) {
            console.log(`No container found for question ${questionNumber}`);
            return false;
        }
    
    
        switch(questionNumber) {
            case 0: // First question (usually an introduction or general question)
                return container.querySelector('#landowner-data-protection')?.checked || false;
            
            case 1: // Land ownership
                const selectedCard = container.querySelector('.option-card.selected');
                
                if (!selectedCard) {
                    return false;
                }
                
                return true;
            
            case 2: // Land type
                const selectedTypes = container.querySelectorAll('.option-card.selected');
                return selectedTypes.length > 0;
            
            case 3: // Total area (slider)
                const slider = container.querySelector('.slider');
                return slider && slider.value !== '' && parseInt(slider.value) > 0;
            
            case 4: // Contiguous Area
                const contiguousCard = container.querySelector('.option-card.selected');
                
                if (!contiguousCard) {
                    return false;
                }
                
                // If "Nein" is selected, check the additional dropdown
                if (contiguousCard.getAttribute('data-value') === 'nein') {
                    const conditionalSelect = container.querySelector('#question4a select');
                    return conditionalSelect && conditionalSelect.value !== '';
                }
                
                return true;
            
            case 5: // Current Land Use
                const landUseCard = container.querySelector('.option-card.selected');
                
                if (!landUseCard) {
                    return false;
                }
                
                // If "Verpachtet" is selected, check additional conditions
                if (landUseCard.getAttribute('data-value') === 'Verpachtet') {
                    const yearSlider = container.querySelector('.year-slider .slider');
                    const earlyTerminationCard = container.querySelector('#question5a .option-card.selected');
                    
                    
                    // Check if year is selected and early termination option is selected
                    return yearSlider && 
                           yearSlider.value !== '' && 
                           earlyTerminationCard !== null;
                }
                
                return true;
            
            case 6: // Infrastructure Proximity
                const infraCards = container.querySelectorAll('.option-card.selected');
                
                if (infraCards.length === 0) {
                    return false;
                }
                
                // If infrastructure selected, check percentage slider
                const hasInfraSelected = Array.from(infraCards)
                    .some(card => card.hasAttribute('data-shows'));
                
                if (hasInfraSelected) {
                    const percentageSlider = container.querySelector('#question6a .slider');
                    return percentageSlider && percentageSlider.value !== '';
                }
                
                return true;
            
            case 7: // High Voltage Lines
                const highVoltageCard = container.querySelector('.option-card.selected');
                
                if (!highVoltageCard) {
                    return false;
                }
                
                // If "Ja" is selected, check additional selects
                if (highVoltageCard.getAttribute('data-value') === 'ja') {
                    const distanceSelect = container.querySelector('#question7a .select-wrapper select:first-child');
                    const voltageSelect = container.querySelector('#question7a .select-wrapper select:last-child');
                    
                    return distanceSelect && voltageSelect && 
                           distanceSelect.value !== '' && 
                           voltageSelect.value !== '';
                }
                
                return true;
            
            case 8: // Substation
                const substationCard = container.querySelector('.option-card.selected');
                
                if (!substationCard) {
                    return false;
                }
                
                // If "Ja" is selected, check additional select
                if (substationCard.getAttribute('data-value') === 'ja') {
                    const distanceSelect = container.querySelector('#question8a .select-wrapper select');
                    return distanceSelect && distanceSelect.value !== '';
                }
                
                return true;
            
            case 9: // Special Features
                const specialFeatureCards = container.querySelectorAll('.option-card.selected');
                return specialFeatureCards.length > 0;

            case 10: 
                // Always allow progression past location fields
                return true;
            
            
            case 11:
                // Check select and required fields
                const anredeSelect = container.querySelector('#anrede');
                const requiredInputs11 = container.querySelectorAll('input[required]');
                return anredeSelect.value !== '' && 
                        Array.from(requiredInputs11).every(input => input.value.trim() !== '');
            
            case 12:
                return Array.from(container.querySelectorAll('input[required]'))
                    .every(field => field.value && field.value !== '');
            
            case 13:
                const hasContactMethod = container.querySelector('.option-card.selected') !== null;
                if (hasContactMethod) {
                    const phoneSelected = container.querySelector('.option-card[data-value="phone"].selected') !== null;
                    if (phoneSelected) {
                        return container.querySelector('#question13a .option-card.selected') !== null;
                    }
                    return true;
                }
                return false;
            
            
            default:
                console.log(`No specific validation for question ${questionNumber}`);
                return true;
        }

    }


            
    const removeLocationEntry = (element) => {
        const locationEntry = element.closest('.location-entry');
        if (locationEntry) {
            locationEntry.remove();
            updateNavigationButtons();
        }
    };



    function submitForm() {
        console.log('Submitting landowner form to Salesforce...');
        
        const form = document.querySelector('#landForm');
        if (!form) {
            console.error('Landowner form not found!');
            return;
        }
    
        console.log('Form action URL:', form.action);
        
        // CRITICAL: Handle checkbox fields properly
        function setCheckboxValue(name, isChecked) {
            let checkbox = form.querySelector(`input[name="${name}"]`);
            if (!checkbox) {
                checkbox = document.createElement('input');
                checkbox.type = 'hidden'; // Changed to hidden
                checkbox.name = name;
                checkbox.id = name;
                checkbox.value = isChecked ? '1' : '0'; // Set value directly
                form.appendChild(checkbox);
            } else {
                checkbox.value = isChecked ? '1' : '0'; // Set value for existing element
            }
            console.log(`Set checkbox ${name} = ${isChecked}`);
        }
        
        // CRITICAL: Handle select fields properly
        function setSelectValue(name, value, options) {
            let select = form.querySelector(`select[name="${name}"]`);
            if (!select) {
                // Create a hidden input instead of a select
                let hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = name;
                hiddenInput.id = name;
                hiddenInput.value = value || '';
                form.appendChild(hiddenInput);
            } else {
                select.value = value || '';
            }
            console.log(`Set select ${name} = ${value}`);
        }
        
        // CRITICAL: Handle text fields properly
        function setTextValue(name, value) {
            let input = form.querySelector(`input[name="${name}"]`);
            if (!input) {
                input = document.createElement('input');
                input.type = 'hidden'; // Change to hidden
                input.name = name;
                input.id = name;
                form.appendChild(input);
            }
            input.value = value || '';
            console.log(`Set text ${name} = ${value}`);
        }
    
        // Land type (text field)
        const selectedTypes = Array.from(document.querySelectorAll('#question2 .option-card.selected'))
            .map(card => card.getAttribute('data-value'))
            .filter(value => value && value !== 'Nein')
            .join(';');
        setTextValue('00NMz0000040bRt', selectedTypes);
    
        // Total area (text field)
        setTextValue('00NMz0000040bgP', document.querySelector('#question3 .slider')?.value || '');
    
        // Contiguous area (checkbox)
        const isContiguous = document.querySelector('#question4 .option-card.selected')?.getAttribute('data-value') === 'ja';
        setCheckboxValue('00NMz0000040bjd', isContiguous);
    
        // Number of parcels (select)
        const parcels = document.querySelector('#question4a select')?.value;
        setSelectValue('00NMz0000040bmr', parcels, ['', '2', '3', '4', '5+']);
    
        // Land usage (text field)
        const usage = document.querySelector('#question5 .option-card.selected')?.getAttribute('data-value');
        setTextValue('00NMz000004YrKX', usage); // Note this is different than what you had
    
        // Early termination (checkbox)
        const earlyTermination = document.querySelector('#question5a .option-card.selected')?.getAttribute('data-value') === 'ja';
        setCheckboxValue('00NMz0000040bq5', earlyTermination);
    
        // Infrastructure within 500m (text field)
        const infraTypes = Array.from(document.querySelectorAll('#question6 .option-card.selected'))
            .map(card => {
                if(card.getAttribute('data-value') === 'Autobahn') return 'Autobahn (bis 500 m)';
                if(card.getAttribute('data-value') === 'Bahnstrecke') return 'Bahnstrecke (bis 500 m)';
                return '';
            })
            .filter(Boolean)
            .join(';');
        setTextValue('00NMz0000040bWj', infraTypes);
    
        // Infrastructure percentage (text field)
        setTextValue('00NMz0000040bYL', document.querySelector('#question6a .slider')?.value || '');
    
        // Power line (checkbox)
        const hasPowerLine = document.querySelector('#question7 .option-card.selected')?.getAttribute('data-value') === 'ja';
        setCheckboxValue('00NMz0000040bZx', hasPowerLine);
    
        // Power line distance (select)
        const powerLineDistance = hasPowerLine ? document.querySelector('#question7a select:first-child')?.value : '';
        setSelectValue('00NMz0000040bbZ', powerLineDistance, ['', 'bis 1km', '1-3km', '3-5km', '>5km']);
    
        // Power line voltage (select)
        const powerLineVoltage = hasPowerLine ? document.querySelector('#question7a select:last-child')?.value : '';
        setSelectValue('00NMz0000040ben', powerLineVoltage, ['', 'Nein', '20 kV', '60 kV', '110 kV', '220 kV', '380 kV']);
    
        // Substation (select)
        const substationValue = document.querySelector('#question8 .option-card.selected')?.getAttribute('data-value');
        let substationOption = '';
        if (substationValue === 'ja') substationOption = 'Ja';
        if (substationValue === 'nein') substationOption = 'Nein';
        if (substationValue === 'unbekannt') substationOption = 'Unbekannt';
        setSelectValue('00NMz0000044iTB', substationOption, ['', 'Ja', 'Nein', 'Unbekannt']);
    
        // Substation distance (select)
        const substationDistance = substationValue === 'ja' ? document.querySelector('#question8a select')?.value : '';
        setSelectValue('00NMz0000044ckM', substationDistance, ['', 'bis 1 km', '1-5 km', '>5 km']);
    
        // Substation name (text)
        const substationName = document.querySelector('#question8a input[type="text"]')?.value || '';
        setTextValue('00NMz0000044ijJ', substationName);
    
        // Special features (text)
        const specialFeatures = Array.from(document.querySelectorAll('#question9 .option-card.selected'))
            .map(card => card.getAttribute('data-value'))
            .filter(value => value && value !== 'Nein')
            .join(';');
        setTextValue('00NMz0000040btJ', specialFeatures);
    
        // Location information
        const allLocations = Array.from(document.querySelectorAll('.location-entry')).map(entry => ({
            bundesland: entry.querySelector('input[name="bundesland[]"]')?.value,
            landkreis: entry.querySelector('input[name="landkreis[]"]')?.value,
            gemeinde: entry.querySelector('input[name="gemeinde[]"]')?.value,
            gemarkung: entry.querySelector('input[name="gemarkung[]"]')?.value,
            flur: entry.querySelector('input[name="flur[]"]')?.value,
            flurstueck: entry.querySelector('input[name="flurstueck[]"]')?.value,
            flaeche: entry.querySelector('input[name="flaeche[]"]')?.value,
            amt: entry.querySelector('input[name="amt[]"]')?.value
        }));
    
        // Set location fields
        setTextValue('00NMz0000040bzl', allLocations.map(l => l.bundesland).filter(Boolean).join(';'));
        setTextValue('00NMz0000040c2z', allLocations.map(l => l.gemeinde).filter(Boolean).join(';'));
        setTextValue('00NMz0000040c4b', allLocations.map(l => l.gemarkung).filter(Boolean).join(';'));
        setTextValue('00NMz0000040c6D', allLocations.map(l => l.flur).filter(Boolean).join(';'));
        setTextValue('00NMz0000040c7p', allLocations.map(l => l.flurstueck).filter(Boolean).join(';'));
        setTextValue('00NMz0000040c9R', allLocations.map(l => l.flaeche).filter(Boolean).join(';'));
        setTextValue('00NMz0000040cB3', allLocations.map(l => l.amt).filter(Boolean).join(';'));
    
        // Contact information
        setTextValue('00NMz0000040cCf', document.querySelector('#anrede')?.value || '');
        setTextValue('00NMz0000040cFt', document.querySelector('#titel')?.value || '');
        setTextValue('00NMz0000040cHV', document.querySelector('#vorname')?.value || '');
        setTextValue('00NMz0000040bzm', document.querySelector('#nachname')?.value || '');
        setTextValue('00NMz0000040cJ7', document.querySelector('#firma')?.value || '');
        setTextValue('00NMz0000040cKj', document.querySelector('#strasse')?.value || '');
        setTextValue('00NMz0000040cML', document.querySelector('#plz')?.value || '');
        setTextValue('00NMz0000040cNx', document.querySelector('#ort')?.value || '');
        setTextValue('00NMz0000040b26', document.querySelector('#land')?.value || '');
        setTextValue('00NMz0000040cRB', document.querySelector('#telefon')?.value || '');
    
        // Email field (special case)
        const emailField = document.querySelector('#email_hidden') || document.createElement('input');
        emailField.type = 'hidden';
        emailField.name = 'email';
        emailField.value = document.querySelector('#question12 #email')?.value || '';
        form.appendChild(emailField);
    
        // Contact preference
        const contactPreferences = Array.from(document.querySelectorAll('#question13 .option-card.selected'))
            .map(card => {
                if(card.getAttribute('data-value') === 'phone') return 'Telefon';
                if(card.getAttribute('data-value') === 'email') return 'E-Mail';
                return '';
            })
            .filter(Boolean)
            .join(';');
        setTextValue('00NMz0000040cUP', contactPreferences);
    
        // Best time to call (select)
        const bestTime = document.querySelector('#question13a .option-card.selected')?.getAttribute('data-value');
        let bestTimeOption = '';
        if (bestTime === 'morning') bestTimeOption = 'Vormittags';
        if (bestTime === 'afternoon') bestTimeOption = 'Nachmittags';
        if (bestTime === 'allday') bestTimeOption = 'Ganztägig';
        setSelectValue('00NMz0000040cW1', bestTimeOption, ['', 'Vormittags', 'Nachmittags', 'Ganztägig']);
    
        // Add a debug field if needed
        if (false) { // Set to true for debugging
            const debugField = document.createElement('input');
            debugField.type = 'hidden';
            debugField.name = 'debug';
            debugField.value = '1';
            form.appendChild(debugField);
            
            const debugEmailField = document.createElement('input');
            debugEmailField.type = 'hidden';
            debugEmailField.name = 'debugEmail';
            debugEmailField.value = 'guido.zimmer@geongroup.de'; // Use appropriate debug email
            form.appendChild(debugEmailField);
        }
    
        console.log('All fields set, submitting form...');
        
        // Fix for "form.submit is not a function" error
        // This typically happens when there is an element named "submit" in the form
        
        // First, check if there's an element with name="submit"
        const submitElement = form.querySelector('[name="submit"]');
        if (submitElement) {
            console.log('Found element with name "submit", temporarily removing it');
            const parent = submitElement.parentNode;
            const nextSibling = submitElement.nextSibling;
            parent.removeChild(submitElement);
            
            // Now we can safely call form.submit()
            form.submit();
            
            // If needed, restore the element
            if (nextSibling) {
                parent.insertBefore(submitElement, nextSibling);
            } else {
                parent.appendChild(submitElement);
            }
        } else {
            // No conflict, can directly submit
            form.submit();
        }
    }

 
    // Event Listeners for navigation
    document.querySelector('#prevButton')?.addEventListener('click', () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion(currentQuestion);
        }
    });
 
    document.querySelector('#nextButton')?.addEventListener('click', () => {
        if (currentQuestion < totalQuestions) {
            currentQuestion++;
            showQuestion(currentQuestion);
        } else {
            submitForm();
        }
    });
 
    // Initialize first question
    showQuestion(0);
 
    // Add form submission handlers for the simple forms
    const simpleFormSubmitHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        
        // Basic validation
        const email = form.querySelector('input[type="email"]');
        const name = form.querySelector('input[type="text"]');
        
        if (!email.value || !name.value) {
            alert('Bitte füllen Sie alle erforderlichen Felder aus.');
            return;
        }
 
        // Submit the form
        form.submit();
    };
 
    // Add submit handlers to both simple forms
    document.querySelector('#investorForm form')?.addEventListener('submit', simpleFormSubmitHandler);
    document.querySelector('#communityForm form')?.addEventListener('submit', simpleFormSubmitHandler);
 
    // Handle window resize for sliders
    window.addEventListener('resize', () => {
        const currentContainer = document.querySelector(`#question${currentQuestion}`);
        if (currentContainer) {
            const slider = currentContainer.querySelector('.slider');
            const valueDisplay = currentContainer.querySelector('.slider-value');
            if (slider && valueDisplay) {
                updateSliderValue(slider, valueDisplay);
            }
 
            const visibleConditionals = currentContainer.querySelectorAll('.conditional-question.visible');
            visibleConditionals.forEach(conditional => {
                const conditionalSlider = conditional.querySelector('.slider');
                const conditionalValueDisplay = conditional.querySelector('.slider-value');
                if (conditionalSlider && conditionalValueDisplay) {
                    updateSliderValue(conditionalSlider, conditionalValueDisplay);
                }
            });
        }
    });
 });