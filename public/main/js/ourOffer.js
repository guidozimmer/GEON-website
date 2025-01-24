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
                <button type="button" class="remove-location">
                    <img src="./img/x.svg" alt="Remove">
                </button>
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
        initializeLocationEntries();
        updateNavigationButtons();
        
        // Add event listeners to new inputs
        newLocation.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', updateNavigationButtons);
        });

        const removeButton = newLocation.querySelector('.remove-location');
        if (removeButton) {
            removeButton.addEventListener('click', () => removeLocationEntry(removeButton));
        }
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
    
        const sliderRect = slider.getBoundingClientRect();
        const percent = (value - slider.min) / (slider.max - slider.min);
        const thumbOffset = Math.round(percent * sliderRect.width);
        valueDisplay.style.left = `${thumbOffset}px`;
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
            
            const addButton = document.getElementById('addLocationButton');
            if (addButton) {
                addButton.onclick = addLocationFields;
            }
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

           // Add event listeners to all required fields in question 11
            document.querySelectorAll('#question11 input[required], #question11 select[required]').forEach(field => {
                field.addEventListener('input', updateNavigationButtons);
                field.addEventListener('change', updateNavigationButtons);
            });
    }


    
        const removeLocationEntry = (button) => {
            const locationEntry = button.closest('.location-entry');
            if (locationEntry) {
                locationEntry.remove();
                updateNavigationButtons();
            }
        };




 
    function submitForm() {
        const form = document.querySelector('#landForm');
        if (!form) return;
    
        // Create hidden fields
        const requiredFields = [
            '00NMz0000040bRt', '00NMz0000040bgP', '00NMz0000040bjd', '00NMz0000040bmr',
            '00NMz0000040boT', '00NMz0000040aag', '00NMz0000040bq5', '00NMz0000040bWj',
            '00NMz0000040bYL', '00NMz0000040bZx', '00NMz0000040bbZ', '00NMz0000040ben',
            '00NMz0000044iTB', '00NMz0000044ckM', '00NMz0000044ijJ', '00NMz0000040btJ',
            '00NMz0000040bzl', '00NMz0000040c1N', '00NMz0000040c2z', '00NMz0000040c4b',
            '00NMz0000040c6D', '00NMz0000040c7p', '00NMz0000040c9R', '00NMz0000040cB3',
            '00NMz0000040cCf', '00NMz0000040cFt', '00NMz0000040cHV', '00NMz0000040bzm',
            '00NMz0000040cJ7', '00NMz0000040cKj', '00NMz0000040cML', '00NMz0000040cNx',
            '00NMz0000040b26', '00NMz0000040cRB', '00NMz0000040cUP', '00NMz0000040cW1'
        ];
    
        // For the hidden fields creation
        requiredFields.forEach(id => {
            if (!form.querySelector(`[id="${id}"]`)) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.id = id;
                input.name = id;
                form.appendChild(input);
            }
        });

        // For the setValue function
        const setValue = (id, value) => {
            const element = form.querySelector(`[id="${id}"]`);
            if (element) element.value = value;
        };
    
        // Land type
        const selectedTypes = Array.from(document.querySelectorAll('#question2 .option-card.selected'))
            .map(card => card.getAttribute('data-value'));
        setValue('00NMz0000040bRt', selectedTypes.join(';'));
    
        // Total area
        setValue('00NMz0000040bgP', document.querySelector('#question3 .slider')?.value || '');
    
        // Contiguous area
        const isContiguous = document.querySelector('#question4 .option-card.selected')?.getAttribute('data-value') === 'ja';
        setValue('00NMz0000040bjd', isContiguous ? '1' : '0');
    
        // Number of parcels
        const parcels = document.querySelector('#question4a select')?.value;
        setValue('00NMz0000040bmr', parcels || '');
    
        // Land usage
        const usage = document.querySelector('#question5 .option-card.selected')?.getAttribute('data-value');
        setValue('00NMz0000040boT', usage || '');
    
        // Lease end date
        if (usage === 'Verpachtet') {
            const yearValue = document.querySelector('.year-slider .slider')?.value;
            setValue('00NMz0000040aag', yearValue || '');
        }
    
        // Early termination
        const earlyTermination = document.querySelector('#question5a .option-card.selected')?.getAttribute('data-value') === 'ja';
        setValue('00NMz0000040bq5', earlyTermination ? '1' : '0');
    
        // Infrastructure within 500m
        const selectedInfra = Array.from(document.querySelectorAll('#question6 .option-card.selected'))
            .map(card => card.getAttribute('data-value'));
        setValue('00NMz0000040bWj', selectedInfra.join(';'));
    
        // Infrastructure percentage
        setValue('00NMz0000040bYL', document.querySelector('#question6a .slider')?.value || '');
    
        // Power line
        const hasPowerLine = document.querySelector('#question7 .option-card.selected')?.getAttribute('data-value') === 'ja';
        setValue('00NMz0000040bZx', hasPowerLine ? '1' : '0');
        setValue('00NMz0000040bbZ', hasPowerLine ? document.querySelector('#question7a select:first-child')?.value : '');
        setValue('00NMz0000040ben', hasPowerLine ? document.querySelector('#question7a select:last-child')?.value : '');
    
        // Substation
        const hasSubstation = document.querySelector('#question8 .option-card.selected')?.getAttribute('data-value') === 'ja';
        setValue('00NMz0000044iTB', hasSubstation ? 'Ja' : 'Nein');
        setValue('00NMz0000044ckM', hasSubstation ? document.querySelector('#question8a select')?.value : '');
        setValue('00NMz0000044ijJ', document.querySelector('#question8a input[type="text"]')?.value || '');
    
        // Special features
        const selectedFeatures = Array.from(document.querySelectorAll('#question9 .option-card.selected'))
            .map(card => card.getAttribute('data-value'));
        setValue('00NMz0000040btJ', selectedFeatures.join(';'));
    
        // Location fields
        setValue('00NMz0000040bzl', document.querySelector('#bundesland')?.value || '');
        setValue('00NMz0000040c1N', document.querySelector('#landkreis')?.value || '');
        setValue('00NMz0000040c2z', document.querySelector('#gemeinde')?.value || '');
        setValue('00NMz0000040c4b', document.querySelector('#gemarkung')?.value || '');
        setValue('00NMz0000040c6D', document.querySelector('#flur')?.value || '');
        setValue('00NMz0000040c7p', document.querySelector('#flurstueck')?.value || '');
        setValue('00NMz0000040c9R', document.querySelector('#flaeche')?.value || '');
        setValue('00NMz0000040cB3', document.querySelector('#amt')?.value || '');
    
        // Contact information
        setValue('00NMz0000040cCf', document.querySelector('#anrede')?.value || '');
        setValue('00NMz0000040cFt', document.querySelector('#titel')?.value || '');
        setValue('00NMz0000040cHV', document.querySelector('#vorname')?.value || '');
        setValue('00NMz0000040bzm', document.querySelector('#nachname')?.value || '');
        setValue('00NMz0000040cJ7', document.querySelector('#firma')?.value || '');
        setValue('00NMz0000040cKj', document.querySelector('#strasse')?.value || '');
        setValue('00NMz0000040cML', document.querySelector('#plz')?.value || '');
        setValue('00NMz0000040cNx', document.querySelector('#ort')?.value || '');
        setValue('00NMz0000040b26', document.querySelector('#land')?.value || '');
        setValue('00NMz0000040cRB', document.querySelector('#telefon')?.value || '');
    
        // Email field (special case - different ID)
        const emailInput = document.createElement('input');
        emailInput.type = 'hidden';
        emailInput.name = 'email';
        emailInput.value = document.querySelector('#question12 #email')?.value || '';
        form.appendChild(emailInput);
    
        // Contact preference
        const contactMethod = document.querySelector('#question13 .option-card[data-value="phone"].selected') ? 'Telefon' : 
                             document.querySelector('#question13 .option-card[data-value="email"].selected') ? 'E-Mail' : '';
        setValue('00NMz0000040cUP', contactMethod);
    
        // Best time to call
        const bestTime = document.querySelector('#question13a .option-card.selected')?.getAttribute('data-value');
        const timeMap = {
            'morning': 'Vormittags',
            'afternoon': 'Nachmittags',
            'allday': 'Ganztägig'
        };
        setValue('00NMz0000040cW1', bestTime ? timeMap[bestTime] : '');
    
        // Submit form
        form.submit();
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