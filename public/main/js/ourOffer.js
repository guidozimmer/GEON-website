document.addEventListener('DOMContentLoaded', () => {
    let currentQuestion = 0;
    const totalQuestions = 14;
    let locationCount = 1;
    
    // Get all squares and forms
    const landOwnerSquare = document.getElementById('landOwnerSquare');
    const investorSquare = document.getElementById('investorSquare');
    const communitySquare = document.getElementById('communitySquare');

    const landOwnerForm = document.getElementById('landOwnerForm');
    const investorForm = document.getElementById('investorForm');
    const communityForm = document.getElementById('communityForm');
    
    // Add Location Button Handler
    document.getElementById('addLocationButton')?.addEventListener('click', addLocationFields);

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
        } else {
            hideAllForms();
            investorForm.style.display = 'block';
            investorSquare.classList.add('active');
            
            const q0 = investorForm.querySelector('#investorQuestion0');
            const contactForm = investorForm.querySelector('#investorContactForm');
            if (q0 && contactForm) {
                q0.style.display = 'block';
                contactForm.style.display = 'none';
            }
        }
    });
    
    communitySquare.addEventListener('click', () => {
        if (communityForm.style.display === 'block') {
            hideAllForms();
        } else {
            hideAllForms();
            communityForm.style.display = 'block';
            communitySquare.classList.add('active');
            
            const q0 = communityForm.querySelector('#communityQuestion0');
            if (q0) {
                showQuestion(0);
            }
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
            if (!card.closest('.conditional-question')) {
                // Remove selected from all other cards in this container
                container.querySelectorAll('.option-card:not(.multi-select)').forEach(c => {
                    c.classList.remove('selected');
                });
                card.classList.add('selected');
                
                // Get the conditional question ID
                const conditionalId = card.getAttribute('data-shows');
                
                // Hide all conditional questions in this container
                container.querySelectorAll('.conditional-question').forEach(cq => {
                    cq.style.display = 'none';
                });
                
                // Show the conditional question if it exists and the card is selected
                if (conditionalId) {
                    const conditional = document.getElementById(conditionalId);
                    if (conditional) {
                        conditional.style.display = card.classList.contains('selected') ? 'block' : 'none';
                    }
                }
            } else {
                // Inside a conditional question
                const conditionalContainer = card.closest('.conditional-question');
                conditionalContainer.querySelectorAll('.option-card').forEach(c => {
                    c.classList.remove('selected');
                });
                card.classList.add('selected');
            }
        }
        
        updateNavigationButtons();
    }

    function showQuestion(questionNumber) {
        // Land Owner and Community Form show logic
        const activeForm = document.querySelector('.form-section:not([style*="display: none"])');
        if (activeForm.id === 'landOwnerForm') {
            document.querySelectorAll('.question-container').forEach(q => {
                q.classList.remove('active');
            });
            
            const currentQuestionEl = document.querySelector(`#question${questionNumber}`);
            if (currentQuestionEl) {
                currentQuestionEl.classList.add('active');
                initializeQuestion(questionNumber);
            }
        } else if (activeForm.id === 'communityForm') {
            // Hide all questions
            activeForm.querySelectorAll('.question-container').forEach(q => {
                q.classList.remove('active');
            });
            
            // Show current question
            const currentQuestionEl = activeForm.querySelector(`#communityQuestion${questionNumber}`);
            if (currentQuestionEl) {
                currentQuestionEl.classList.add('active');
                initializeCommunityQuestion(questionNumber);
            }
        }
        
        updateNavigationButtons();
    }
 
    function initializeQuestion(questionNumber) {
        const container = document.querySelector(`#question${questionNumber}`);
        if (!container) return;
 
        const optionCards = container.querySelectorAll('.option-card');
        optionCards.forEach(card => {
            card.addEventListener('click', () => handleOptionCardClick(card, optionCards));
        });
 
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
 
        if (questionNumber === 7 || questionNumber === totalQuestions) {
            const inputs = container.querySelectorAll('input');
            inputs.forEach(input => {
                input.addEventListener('input', updateNavigationButtons);
            });
        }

        initializeMonthYearSliders();
    }

    function initializeCommunityQuestion(questionNumber) {
        const container = document.querySelector(`#communityQuestion${questionNumber}`);
        if (!container) return;

        const optionCards = container.querySelectorAll('.option-card');
        optionCards.forEach(card => {
            card.addEventListener('click', () => handleOptionCardClick(card, optionCards));
        });

        // Handle conditional questions
        const conditionalTriggers = container.querySelectorAll('[data-shows]');
        conditionalTriggers.forEach(trigger => {
            const conditionalId = trigger.getAttribute('data-shows');
            const conditionalQuestion = document.getElementById(conditionalId);
            
            if (conditionalQuestion) {
                // Initially hide conditional questions
                conditionalQuestion.style.display = 'none';
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
    
    function updateNavigationButtons() {
        const activeForm = document.querySelector('.form-section:not([style*="display: none"])');
        const prevButton = activeForm.querySelector('#prevButton');
        const nextButton = activeForm.querySelector('#nextButton');
        
        if (prevButton) {
            prevButton.disabled = activeForm.id === 'landOwnerForm' ? 
                currentQuestion === 0 : 
                currentQuestion === 0;
        }
 
        if (nextButton) {
            const isLastQuestion = activeForm.id === 'landOwnerForm' ? 
                currentQuestion === totalQuestions : 
                currentQuestion === 5;
            
            nextButton.textContent = isLastQuestion ? 'Absenden' : 'Weiter';
            nextButton.disabled = !isQuestionAnswered(currentQuestion, activeForm);
        }
    }
 
    function isQuestionAnswered(questionNumber, activeForm) {
        const container = activeForm.querySelector(
            activeForm.id === 'landOwnerForm' ? 
            `#question${questionNumber}` : 
            `#communityQuestion${questionNumber}`
        );

        if (!container) return false;

        // Land Owner Form question answering logic
        if (activeForm.id === 'landOwnerForm') {
            switch(questionNumber) {
                case 1: // Land ownership
                case 2: // Land type
                case 3: // Infrastructure
                case 4: // Power substation
                case 5: // Power lines
                    return container.querySelector('.option-card.selected') !== null;
    
                case 6: // Total area
                    return container.querySelector('.slider')?.value !== '';
    
                case 7: // Location details
                    const locationEntries = container.querySelectorAll('.location-entry');
                    return Array.from(locationEntries).every(entry => {
                        const requiredInputs = entry.querySelectorAll('input[required]');
                        return Array.from(requiredInputs).every(input => input.value.trim() !== '');
                    });
    
                case 8: // Contact information
                case 9: // Additional contact info
                case 10: // Planning status
                case 11: // Location details
                case 12: // Contact form
                case 13: // Contact preferences
                case 14: // Data protection
                    const requiredInputs = container.querySelectorAll('input[required], select[required]');
                    return Array.from(requiredInputs).every(input => input.value.trim() !== '');
    
                default:
                    const selectedOption = container.querySelector('.option-card.selected');
                    const slider = container.querySelector('.slider');
                    
                    if (selectedOption) return true;
                    if (slider) return true;
                    
                    return false;
            }
        } 
        // Community Form question answering logic
        else if (activeForm.id === 'communityForm') {
            switch(questionNumber) {
                case 0: // Initial question
                case 3: // Flächen vorhanden
                case 4: // Projektarten
                case 5: // Interessensbereiche
                    return container.querySelector('.option-card.selected') !== null;
    
                case 1: // Gemeindeinformationen
                case 2: // Ansprechpartner
                    const requiredInputs = container.querySelectorAll('input[required]');
                    return Array.from(requiredInputs).every(input => input.value.trim() !== '');
    
                default:
                    return false;
            }
        }
    }
 
    function removeLocationEntry(button) {
        button.closest('.location-entry').remove();
        updateNavigationButtons();
    }
 
    function submitForm() {
        const activeForm = document.querySelector('.form-section:not([style*="display: none"])');
        
        if (activeForm.id === 'landOwnerForm') {
            // Existing land owner form submission logic
            // Handle ownership status (Question 1)
            const q1Value = document.querySelector('#question1 .option-card.selected')?.getAttribute('data-value');
            document.getElementById('00NMz0000040bQH').value = q1Value || '';
        
            // Handle land types (Question 2)
            const selectedTypes = Array.from(document.querySelectorAll('#question2 .option-card.selected'))
                .map(card => card.getAttribute('data-value'))
                .join(';');
            document.getElementById('00NMz0000040bRt').value = selectedTypes;
        
            // ... (rest of the existing submitForm logic for land owner form)
        
            // Submit the form
            document.getElementById('landForm').submit();
        } 
        else if (activeForm.id === 'communityForm') {
            const form = activeForm.querySelector('form');
            
            // Collect multi-select and radio button data
            const multiSelectQuestions = [3, 4, 5];
            multiSelectQuestions.forEach(qNum => {
                const container = activeForm.querySelector(`#communityQuestion${qNum}`);
                const selectedOptions = container.querySelectorAll('.option-card.selected');
                const values = Array.from(selectedOptions).map(opt => opt.getAttribute('data-value'));
                
                // Add these as hidden inputs
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = `communityQuestion${qNum}`;
                input.value = values.join(';');
                form.appendChild(input);
            });

            // Add text inputs for specific fields
            const textFields = [
                { selector: '#community-bundesland', name: 'bundesland' },
                { selector: '#community-gemeinde', name: 'gemeinde' },
                { selector: '#community-amt', name: 'amt' },
                { selector: '#community-strasse', name: 'strasse' },
                { selector: '#community-plz', name: 'plz' },
                { selector: '#community-ort', name: 'ort' },
                { selector: '#community-vorname', name: 'vorname' },
                { selector: '#community-nachname', name: 'nachname' },
                { selector: '#community-position', name: 'position' },
                { selector: '#community-telefon', name: 'telefon' },
                { selector: '#community-email', name: 'email' }
            ];

            textFields.forEach(field => {
                const input = document.querySelector(field.selector);
                if (input && input.value) {
                    const hiddenInput = document.createElement('input');
                    hiddenInput.type = 'hidden';
                    hiddenInput.name = field.name;
                    hiddenInput.value = input.value;
                    form.appendChild(hiddenInput);
                }
            });

            // Submit form
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
        const activeForm = document.querySelector('.form-section:not([style*="display: none"])');
        const isLastQuestion = activeForm.id === 'landOwnerForm' ? 
            currentQuestion === totalQuestions : 
            currentQuestion === 5;

        if (currentQuestion < (activeForm.id === 'landOwnerForm' ? totalQuestions : 5)) {
            if (isQuestionAnswered(currentQuestion, activeForm)) {
                currentQuestion++;
                showQuestion(currentQuestion);
            }
        } else {
            submitForm();
        }
    });
 
    // Initialize first question
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
        const activeForm = document.querySelector('.form-section:not([style*="display: none"])');
        if (activeForm) {
            const currentContainer = activeForm.querySelector(
                activeForm.id === 'landOwnerForm' ? 
                `#question${currentQuestion}` : 
                `#communityQuestion${currentQuestion}`
            );

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
        }
    });
 });