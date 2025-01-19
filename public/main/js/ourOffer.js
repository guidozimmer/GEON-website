document.addEventListener('DOMContentLoaded', () => {
    let currentQuestion = 0;
    const totalQuestions = 14;
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
    
    
    function updateInvestorNavigationButtons() {
        const prevButton = document.querySelector('#investorForm #prevButton');
        const nextButton = document.querySelector('#investorForm #nextButton');
        
        if (prevButton) {
            prevButton.disabled = investorCurrentQuestion === 0;
        }
    
        if (nextButton) {
            const isLastQuestion = investorCurrentQuestion === INVESTOR_TOTAL_QUESTIONS;
            nextButton.textContent = isLastQuestion ? 'Absenden' : 'Weiter';
            nextButton.disabled = !isInvestorQuestionAnswered(investorCurrentQuestion);
        }
    }
    
    function submitInvestorForm() {
        // Get all form data
        const formData = new FormData();
        
        // Add all input values
        document.querySelectorAll('#investorForm input:not([type="checkbox"])').forEach(input => {
            if (input.value) {
                formData.append(input.name, input.value);
            }
        });
        
        // Add selected options
        document.querySelectorAll('#investorForm .option-card.selected').forEach(card => {
            const value = card.getAttribute('data-value');
            if (value) {
                formData.append('selected_options[]', value);
            }
        });
        
        // Submit the form
        document.querySelector('#investorForm form').submit();
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
    
    function updateCommunityNavigationButtons() {
        const prevButton = document.querySelector('#communityForm #prevButton');
        const nextButton = document.querySelector('#communityForm #nextButton');
        
        if (prevButton) {
            prevButton.disabled = communityCurrentQuestion === 0;
        }
    
        if (nextButton) {
            const isLastQuestion = communityCurrentQuestion === COMMUNITY_TOTAL_QUESTIONS;
            nextButton.textContent = isLastQuestion ? 'Absenden' : 'Weiter';
            nextButton.disabled = !isCommunityQuestionAnswered(communityCurrentQuestion);
        }
    }
    
    function submitCommunityForm() {
        // Get all form data
        const formData = new FormData();
        
        // Add all input values
        document.querySelectorAll('#communityForm input:not([type="checkbox"]):not([type="radio"])').forEach(input => {
            if (input.value) {
                formData.append(input.name, input.value);
            }
        });
        
        // Add selected options
        document.querySelectorAll('#communityForm .option-card.selected').forEach(card => {
            const value = card.getAttribute('data-value');
            if (value) {
                formData.append('selected_options[]', value);
            }
        });
        
        // Submit the form
        document.querySelector('#communityForm form').submit();
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
            <button type="button" class="remove-location">✕</button>
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
                    <input type="number" id="flaeche${locationCount}" name="flaeche[]" required>
                </div>
                <div class="input-field">
                    <label for="amt${locationCount}">Amt</label>
                    <input type="text" id="amt${locationCount}" name="amt[]" required>
                </div>
            </div>
        `;
        
        container.appendChild(newLocation);
        updateNavigationButtons();
        
        // Add event listeners to new inputs
        newLocation.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', updateNavigationButtons);
        });
        
        // Add event listener to remove button
        const removeButton = newLocation.querySelector('.remove-location');
        if (removeButton) {
            removeButton.addEventListener('click', function() {
                removeLocationEntry(this);
            });
        }
    }
 
    function hideConditionalQuestion(conditionalId) {
        const conditional = document.querySelector(`#${conditionalId}`);
        if (conditional) {
            conditional.classList.remove('visible');
        }
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
        if (slider.hasAttribute('data-month')) {
            const months = [
                'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
                'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
            ];
            valueDisplay.textContent = months[parseInt(value) - 1];
        } else {
            const suffix = slider.hasAttribute('data-year') ? '' : 
                          slider.hasAttribute('data-percentage') ? '%' : ' ha';
            valueDisplay.textContent = `${value}${suffix}`;
        }
    
        // Calculate position
        const percent = (value - slider.min) / (slider.max - slider.min);
        const sliderWidth = slider.offsetWidth;
        const thumbOffset = percent * sliderWidth;
        valueDisplay.style.left = `${thumbOffset}px`;
    }

    

    // In the handleOptionCardClick function
    function handleOptionCardClick(card, optionCards) {
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
            const container = card.closest('.question-container');
            
            // Remove selected from all other cards in this container
            container.querySelectorAll('.option-card').forEach(c => {
                c.classList.remove('selected');
            });
            
            // Add selected to the clicked card
            card.classList.add('selected');
            
            // Handle conditional questions
            const conditionalId = card.getAttribute('data-shows');
            
            // Hide all conditional questions in this container
            container.querySelectorAll('.conditional-question').forEach(cq => {
                cq.style.display = 'none';
            });
            
            // Show the conditional question if it exists and the card is selected
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
                                question0.style.display = 'none';
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
                // Ensure the conditional question is visible when "Verpachtet" is selected
                verpachtetCard.addEventListener('click', () => {
                    const conditionalQuestion = container.querySelector('#question5a');
                    if (conditionalQuestion) {
                        conditionalQuestion.style.display = 'block';
                    }
                });
            }
    
            // Add event listeners to early termination options
            const earlyTerminationCards = container.querySelectorAll('#question5a .option-card');
            earlyTerminationCards.forEach(card => {
                card.addEventListener('click', () => {
                    earlyTerminationCards.forEach(c => c.classList.remove('selected'));
                    card.classList.add('selected');
                    updateNavigationButtons();
                });
            });
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
            nextButton.textContent = isLastQuestion ? 'Absenden' : 'Weiter';
            
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









 
    function isQuestionAnswered(questionNumber) {
        const container = document.querySelector(`#question${questionNumber}`);
        if (!container) {
            console.log(`No container found for question ${questionNumber}`);
            return false;
        }
    
        console.log(`Checking question ${questionNumber}`);
    
        switch(questionNumber) {
            case 0: // First question (usually an introduction or general question)
                console.log('Question 0 always returns true');
                return true;
            
            case 1: // Land ownership
                const selectedCard = container.querySelector('.option-card.selected');
                console.log('Question 1 selected card:', selectedCard);
                
                if (!selectedCard) {
                    console.log('No card selected in question 1');
                    return false;
                }
                
                console.log('Selected card value:', selectedCard.getAttribute('data-value'));
                return true;
            
            case 2: // Land type
                const selectedTypes = container.querySelectorAll('.option-card.selected');
                console.log('Question 2 selected cards:', selectedTypes);
                return selectedTypes.length > 0;
            
            case 3: // Total area (slider)
                const slider = container.querySelector('.slider');
                console.log('Question 3 slider:', slider);
                console.log('Slider value:', slider ? slider.value : 'No slider found');
                return slider && slider.value !== '' && parseInt(slider.value) > 0;
            
            case 4: // Contiguous Area
                const contiguousCard = container.querySelector('.option-card.selected');
                console.log('Question 4 selected card:', contiguousCard);
                
                if (!contiguousCard) {
                    console.log('No card selected in question 4');
                    return false;
                }
                
                // If "Nein" is selected, check the additional dropdown
                if (contiguousCard.getAttribute('data-value') === 'nein') {
                    const conditionalSelect = container.querySelector('#question4a select');
                    console.log('Conditional select:', conditionalSelect);
                    console.log('Conditional select value:', conditionalSelect ? conditionalSelect.value : 'No select found');
                    return conditionalSelect && conditionalSelect.value !== '';
                }
                
                return true;
            
            case 5: // Current Land Use
                const landUseCard = container.querySelector('.option-card.selected');
                console.log('Question 5 selected card:', landUseCard);
                
                if (!landUseCard) {
                    console.log('No card selected in question 5');
                    return false;
                }
                
                // If "Verpachtet" is selected, check additional conditions
                if (landUseCard.getAttribute('data-value') === 'Verpachtet') {
                    const yearSlider = container.querySelector('.year-slider .slider');
                    const monthSlider = container.querySelector('.month-slider .slider');
                    const earlyTerminationCards = container.querySelectorAll('#question5a .option-card.selected');
                    
                    console.log('Year slider:', yearSlider);
                    console.log('Month slider:', monthSlider);
                    console.log('Early termination cards:', earlyTerminationCards);
                    
                    return yearSlider && monthSlider && 
                           yearSlider.value !== '' && 
                           monthSlider.value !== '' &&
                           earlyTerminationCards.length > 0;
                }
                
                return true;
            
            case 6: // Infrastructure Proximity
                const infraCards = container.querySelectorAll('.option-card.selected');
                console.log('Question 6 selected cards:', infraCards);
                
                if (infraCards.length === 0) {
                    console.log('No card selected in question 6');
                    return false;
                }
                
                // If infrastructure selected, check percentage slider
                const hasInfraSelected = Array.from(infraCards)
                    .some(card => card.hasAttribute('data-shows'));
                
                if (hasInfraSelected) {
                    const percentageSlider = container.querySelector('#question6a .slider');
                    console.log('Percentage slider:', percentageSlider);
                    console.log('Percentage slider value:', percentageSlider ? percentageSlider.value : 'No slider found');
                    return percentageSlider && percentageSlider.value !== '';
                }
                
                return true;
            
            case 7: // High Voltage Lines
                const highVoltageCard = container.querySelector('.option-card.selected');
                console.log('Question 7 selected card:', highVoltageCard);
                
                if (!highVoltageCard) {
                    console.log('No card selected in question 7');
                    return false;
                }
                
                // If "Ja" is selected, check additional selects
                if (highVoltageCard.getAttribute('data-value') === 'ja') {
                    const distanceSelect = container.querySelector('#question7a .select-wrapper select:first-child');
                    const voltageSelect = container.querySelector('#question7a .select-wrapper select:last-child');
                    
                    console.log('Distance select:', distanceSelect);
                    console.log('Voltage select:', voltageSelect);
                    
                    return distanceSelect && voltageSelect && 
                           distanceSelect.value !== '' && 
                           voltageSelect.value !== '';
                }
                
                return true;
            
            case 8: // Substation
                const substationCard = container.querySelector('.option-card.selected');
                console.log('Question 8 selected card:', substationCard);
                
                if (!substationCard) {
                    console.log('No card selected in question 8');
                    return false;
                }
                
                // If "Ja" is selected, check additional select
                if (substationCard.getAttribute('data-value') === 'ja') {
                    const distanceSelect = container.querySelector('#question8a .select-wrapper select');
                    console.log('Distance select:', distanceSelect);
                    console.log('Distance select value:', distanceSelect ? distanceSelect.value : 'No select found');
                    return distanceSelect && distanceSelect.value !== '';
                }
                
                return true;
            
            case 9: // Special Features
                const specialFeatureCards = container.querySelectorAll('.option-card.selected');
                console.log('Question 9 selected cards:', specialFeatureCards);
                return specialFeatureCards.length > 0;
            
            default:
                console.log(`No specific validation for question ${questionNumber}`);
                return true;
        }
    }


    function removeLocationEntry(button) {
        button.closest('.location-entry').remove();
        updateNavigationButtons();
    }




 
    function submitForm() {
        // Handle ownership status (Question 1)
        const q1Value = document.querySelector('#question1 .option-card.selected')?.getAttribute('data-value');
        document.getElementById('00NMz0000040bQH').value = q1Value || '';
    
        // Handle land types (Question 2)
        const selectedTypes = Array.from(document.querySelectorAll('#question2 .option-card.selected'))
            .map(card => card.getAttribute('data-value'))
            .join(';');
        document.getElementById('00NMz0000040bRt').value = selectedTypes;
    
        // Handle infrastructure proximity (Question 3)
        const selectedInfra = Array.from(document.querySelectorAll('#question3 .option-card.selected'))
            .map(card => card.getAttribute('data-value'))
            .join(';');
        document.getElementById('00NMz0000040bWj').value = selectedInfra;
        if (selectedInfra) {
            document.getElementById('00NMz0000040bYL').value = 
                document.querySelector('#infrastrukturSlider .slider')?.value || '';
        }
    
        // Handle power substation (Question 4)
        const q4Answer = document.querySelector('#question4 .option-card.selected')?.getAttribute('data-value') === '1';
        document.getElementById('00NMz0000040bZx').value = q4Answer ? '1' : '0';
        document.getElementById('00NMz0000040bbZ').value = q4Answer ? 
            document.querySelector('#trafoDistance select')?.value || '' : '';
    
        // Handle power lines (Question 5)
        const q5Answer = document.querySelector('#question5 .option-card.selected')?.getAttribute('data-value') === '1';
        document.getElementById('00NMz0000040bdB').value = q5Answer ? '1' : '0';
        document.getElementById('00NMz0000040ben').value = q5Answer ? 
            document.querySelector('#powerLineVoltage select')?.value || '' : '';
    
        // Handle total area (Question 6)
        const areaValue = document.querySelector('#question6 .slider')?.value;
        document.getElementById('00NMz0000040bgP').value = areaValue || '';
    
        // Handle contiguous area (Question 7)
        const q7Answer = document.querySelector('#question7 .option-card.selected')?.getAttribute('data-value') === '1';
        document.getElementById('00NMz0000040bjd').value = q7Answer ? '1' : '0';
        document.getElementById('00NMz0000040bmr').value = q7Answer ? 
            document.querySelector('#parcelCount select')?.value || '' : '';
    
        // Handle current usage (Question 8)
        const q8Value = document.querySelector('#question8 .option-card.selected')?.getAttribute('data-value');
        document.getElementById('00NMz0000040boT').value = q8Value || '';
        if (q8Value === 'Verpachtet') {
            document.getElementById('00NMz0000040aag').value = 
                document.querySelector('#leaseDetails input[type="date"]')?.value || '';
            document.getElementById('00NMz0000040bq5').value = 
                document.querySelector('#leaseDetails .option-card.selected')?.getAttribute('data-value') === '1' ? '1' : '0';
        }
    
        // Handle terrain and features (Question 9)
        document.getElementById('00NMz0000040brh').value = 
            document.querySelector('#question9 select')?.value || '';
        const selectedFeatures = Array.from(document.querySelectorAll('#question9 .option-card.selected'))
            .map(card => card.getAttribute('data-value'))
            .join(';');
        document.getElementById('00NMz0000040btJ').value = selectedFeatures;
    
        // Handle planning status (Question 10)
        document.getElementById('00NMz0000040buv').value = 
            document.querySelector('#question10 .option-card.selected')?.getAttribute('data-value') === '1' ? '1' : '0';
        document.getElementById('00NMz0000040bwX').value = 
            document.querySelector('#question10 select')?.value || '';
        document.getElementById('00NMz0000040by9').value = 
            document.querySelector('#question10 .option-card.selected:last-child')?.getAttribute('data-value') === '1' ? '1' : '0';
    
        // Submit the form
        document.getElementById('landForm').submit();
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