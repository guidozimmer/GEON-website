document.addEventListener('DOMContentLoaded', () => {
    let currentQuestion = 1;
    const totalQuestions = 8;
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

    // Function to hide all forms
    function hideAllForms() {
        landOwnerForm.style.display = 'none';
        investorForm.style.display = 'none';
        communityForm.style.display = 'none';
        
        // Remove active class from all squares
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
            showQuestion(1);
        }
    });

    investorSquare.addEventListener('click', () => {
        if (investorForm.style.display === 'block') {
            hideAllForms();
        } else {
            hideAllForms();
            investorForm.style.display = 'block';
            investorSquare.classList.add('active');
            const investorQuestion = investorForm.querySelector('.question-container');
            if (investorQuestion) {
                investorQuestion.classList.add('active');
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
            const communityQuestion = communityForm.querySelector('.question-container');
            if (communityQuestion) {
                communityQuestion.classList.add('active');
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
                    <input type="text" name="bundesland[]" required>
                </div>
                <div class="input-field">
                    <label for="landkreis${locationCount}">Landkreis</label>
                    <input type="text" name="landkreis[]" required>
                </div>
                <div class="input-field">
                    <label for="gemarkung${locationCount}">Gemarkung</label>
                    <input type="text" name="gemarkung[]" required>
                </div>
            </div>
            <div class="input-group">
                <div class="input-field">
                    <label for="flur${locationCount}">Flur</label>
                    <input type="text" name="flur[]" required>
                </div>
                <div class="input-field">
                    <label for="flurstueck${locationCount}">Flurstück</label>
                    <input type="text" name="flurstueck[]" required>
                </div>
                <div class="input-field">
                    <label for="flaeche${locationCount}">Fläche in ha</label>
                    <input type="number" name="flaeche[]" required>
                </div>
                <div class="input-field">
                    <label for="amt${locationCount}">Amt</label>
                    <input type="text" name="amt[]" required>
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
        currentQuestion = 1;
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
        
        showQuestion(1);
    }

    function updateSliderValue(slider, valueDisplay) {
        const value = slider.value;
        const percent = (value - slider.min) / (slider.max - slider.min);
        const sliderWidth = slider.offsetWidth;
        const thumbOffset = percent * sliderWidth;
        valueDisplay.textContent = slider.hasAttribute('data-year') ? 
            value : `${value}${slider.hasAttribute('data-percentage') ? '%' : ' ha'}`;
        valueDisplay.style.left = `${thumbOffset}px`;
    }

    function handleOptionCardClick(card, optionCards) {
        if (card.classList.contains('multi-select')) {
            card.classList.toggle('selected');
        } else {
            if (!card.closest('.conditional-question')) {
                optionCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                
                const conditionalId = card.getAttribute('data-shows');
                const questionContainer = card.closest('.question-container');
                
                if (conditionalId && card.getAttribute('data-value') === 'ja') {
                    showConditionalQuestion(conditionalId);
                } else {
                    const conditional = questionContainer.querySelector('.conditional-question');
                    if (conditional) {
                        hideConditionalQuestion(conditional.id);
                    }
                }
            } else {
                optionCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
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
            prevButton.disabled = currentQuestion === 1;
        }

        if (nextButton) {
            const isLastQuestion = currentQuestion === totalQuestions;
            nextButton.textContent = isLastQuestion ? 'Absenden' : 'Weiter';
            nextButton.disabled = !isQuestionAnswered(currentQuestion);
        }
    }

    function isQuestionAnswered(questionNumber) {
        const container = document.querySelector(`#question${questionNumber}`);
        if (!container) return false;
    
        if (questionNumber === 1) {
            const selectedOption = container.querySelector('.option-card.selected');
            return selectedOption && selectedOption.getAttribute('data-value') === 'ja';
        }
    
        if (questionNumber === 7) {
            const locationEntries = container.querySelectorAll('.location-entry');
            return Array.from(locationEntries).every(entry => {
                const requiredInputs = entry.querySelectorAll('input[required]');
                return Array.from(requiredInputs).every(input => input.value.trim() !== '');
            });
        }

        if (questionNumber === 8) {
            const requiredInputs = container.querySelectorAll('input[required]');
            return Array.from(requiredInputs).every(input => input.value.trim() !== '');
        }

        const selectedOption = container.querySelector('.option-card.selected');
        const slider = container.querySelector('.slider:not(.conditional-question .slider)');
        
        if (selectedOption) return true;
        if (slider) return true;
        
        return false;
    }

    function removeLocationEntry(button) {
        button.closest('.location-entry').remove();
        updateNavigationButtons();
    }

    function submitForm() {
        // Get all location entries
        const locationEntries = document.querySelectorAll('.location-entry');
        
        // Initialize arrays to store values for each field
        const bundeslandValues = [];
        const landkreisValues = [];
        const gemarkungValues = [];
        const flurValues = [];
        const flurstueckValues = [];
        const flaecheValues = [];
        const amtValues = [];
        
        // Collect values from each location entry
        locationEntries.forEach(entry => {
            bundeslandValues.push(entry.querySelector('input[name="bundesland[]"]')?.value || '');
            landkreisValues.push(entry.querySelector('input[name="landkreis[]"]')?.value || '');
            gemarkungValues.push(entry.querySelector('input[name="gemarkung[]"]')?.value || '');
            flurValues.push(entry.querySelector('input[name="flur[]"]')?.value || '');
            flurstueckValues.push(entry.querySelector('input[name="flurstueck[]"]')?.value || '');
            flaecheValues.push(entry.querySelector('input[name="flaeche[]"]')?.value || '');
            amtValues.push(entry.querySelector('input[name="amt[]"]')?.value || '');
        });
        
        // Map field names to Salesforce IDs
        const salesforceFields = {
            'bundesland': '00NMz000003o2Cz',
            'landkreis': '00NMz000003o2Eb',
            'gemarkung': '00NMz000003o2GD',
            'flur': '00NMz000003o2Hp',
            'flurstueck': '00NMz000003o2JR',
            'amt': '00NMz000003o2L3'
        };

        // Update location fields
        document.getElementById(salesforceFields.bundesland).value = bundeslandValues.join('; ');
        document.getElementById(salesforceFields.landkreis).value = landkreisValues.join('; ');
        document.getElementById(salesforceFields.gemarkung).value = gemarkungValues.join('; ');
        document.getElementById(salesforceFields.flur).value = flurValues.join('; ');
        document.getElementById(salesforceFields.flurstueck).value = flurstueckValues.join('; ');
        document.getElementById(salesforceFields.amt).value = amtValues.join('; ');

        // Get and join selected land types with proper formatting
        const selectedTypes = Array.from(document.querySelectorAll('#question2 .option-card.selected'))
            .map(card => card.getAttribute('data-value'))
            .join('; ');
        
        // Set the formatted string to the Salesforce field
        document.getElementById('00NMz000003nXif').value = selectedTypes.length ? `${selectedTypes}` : '';
        
        // Update other form fields
        const q3Answer = document.querySelector('#question3 .option-card.selected')?.getAttribute('data-value') === 'ja';
        document.getElementById('00NMz000003nXkH').value = q3Answer ? '1' : '0';
        document.getElementById('00NMz000003nXlt').value = q3Answer ? 
            (document.querySelector('#question3a .slider')?.value || '') : '';
            
        document.getElementById('00NMz000003nXnV').value = 
            document.querySelector('#question4 .slider')?.value || '';
            
        const q5Answer = document.querySelector('#question5 .option-card.selected')?.getAttribute('data-value') === 'ja';
        document.getElementById('00NMz000003nXp7').value = q5Answer ? '1' : '0';
        document.getElementById('00NMz000003nXad').value = q5Answer ? 
            (document.querySelector('#question5a select')?.value || '') : '';
            
        const q6Answer = document.querySelector('#question6 .option-card.selected')?.getAttribute('data-value') === 'ja';
        document.getElementById('00NMz000003nXsL').value = q6Answer ? '1' : '0';
        document.getElementById('00NMz000003nXh4').value = q6Answer ? 
            (document.querySelector('#question6a .slider')?.value || '') : '';

        // Update contact information
        document.getElementById('email').value = 
            document.querySelector('#question8 input[type="email"]').value;
            
        document.getElementById('name').value = 
            document.querySelector('#question8 input[type="text"]').value;
        
            // Submit the form
            document.getElementById('landForm').submit();
        }
    
        // Event Listeners for navigation
        document.querySelector('#prevButton')?.addEventListener('click', () => {
            if (currentQuestion > 1) {
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
        showQuestion(1);
    
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