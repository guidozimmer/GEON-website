document.addEventListener('DOMContentLoaded', () => {
    let currentQuestion = 1;
    const totalQuestions = 8;
    let locationCount = 1;
    
    const mainSquare = document.querySelector('.main-square');
    const formSection = document.querySelector('.form-section');
    formSection.style.display = 'none';

    // Add Location Button Handler
    document.getElementById('addLocationButton').addEventListener('click', addLocationFields);

    mainSquare.addEventListener('click', () => {
        mainSquare.classList.toggle('active');
        formSection.style.display = mainSquare.classList.contains('active') ? 'block' : 'none';
        if (!mainSquare.classList.contains('active')) {
            resetForm();
        }
    });

    function addLocationFields() {
        locationCount++;
        const container = document.getElementById('locationFieldsContainer');
        const newLocation = document.createElement('div');
        newLocation.className = 'location-entry';
        
        newLocation.innerHTML = `
            <button type="button" class="remove-location" onclick="this.parentElement.remove();">✕</button>
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
        
        // Reset all form elements
        document.querySelectorAll('.option-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelectorAll('.conditional-question').forEach(q => {
            q.classList.remove('visible');
        });
        document.querySelectorAll('input').forEach(input => {
            input.value = '';
        });
        
        // Reset location fields to initial state
        const container = document.getElementById('locationFieldsContainer');
        const firstLocation = container.firstElementChild;
        container.innerHTML = '';
        container.appendChild(firstLocation);
        
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
        // For parent questions (not in conditional)
        if (!card.closest('.conditional-question')) {
            optionCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            
            // Handle conditional questions
            const conditionalId = card.getAttribute('data-shows');
            const questionContainer = card.closest('.question-container');
            
            if (conditionalId && card.getAttribute('data-value') === 'ja') {
                const conditional = document.querySelector(`#${conditionalId}`);
                if (conditional) {
                    conditional.classList.add('visible');
                }
            } else {
                const conditional = questionContainer.querySelector('.conditional-question');
                if (conditional) {
                    conditional.classList.remove('visible');
                    // Remove any selections in the conditional question
                    conditional.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
                }
            }
        } else {
            // For options within conditional questions
            optionCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
        }
        
        updateNavigationButtons();
    }

    function initializeQuestion(questionNumber) {
        const container = document.querySelector(`#question${questionNumber}`);
        if (!container) return;

        // Handle options
        const optionCards = container.querySelectorAll('.option-card');
        optionCards.forEach(card => {
            card.addEventListener('click', () => handleOptionCardClick(card, optionCards));
        });

        // Handle sliders
        const slider = container.querySelector('.slider');
        if (slider) {
            const valueDisplay = container.querySelector('.slider-value');
            slider.addEventListener('input', () => {
                updateSliderValue(slider, valueDisplay);
                updateNavigationButtons();
            });
            updateSliderValue(slider, valueDisplay);
        }

        // Handle text inputs
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
    
        // Special handling for Question 7 (location fields)
        if (questionNumber === 7) {
            const locationEntries = container.querySelectorAll('.location-entry');
            return Array.from(locationEntries).every(entry => {
                const requiredInputs = entry.querySelectorAll('input[required]');
                return Array.from(requiredInputs).every(input => input.value.trim() !== '');
            });
        }

        // For contact information (Question 8)
        if (questionNumber === 8) {
            const requiredInputs = container.querySelectorAll('input[required]');
            return Array.from(requiredInputs).every(input => input.value.trim() !== '');
        }

        // For other questions
        const selectedOption = container.querySelector('.option-card.selected');
        const slider = container.querySelector('.slider:not(.conditional-question .slider)');
        
        if (selectedOption) return true;
        if (slider) return true;
        
        return false;
    }


    function submitForm() {
        // Update the hidden Salesforce fields based on user selections
        const selectedTypes = Array.from(document.querySelectorAll('#question2 .option-card.selected')).map(card => card.getAttribute('data-value'));
        
        // Update land type selections in hidden select
        const landTypeSelect = document.getElementById('00NMz000003nXif');
        Array.from(landTypeSelect.options).forEach(option => {
            option.selected = selectedTypes.includes(option.value);
        });
        
        // Update other hidden fields
        document.getElementById('00NMz000003nXkH').value = 
            document.querySelector('#question3 .selected')?.getAttribute('data-value') === 'ja' ? '1' : '0';
        
        document.getElementById('00NMz000003nXlt').value = 
            document.querySelector('#question3a .slider').value;
            
        document.getElementById('00NMz000003nXnV').value = 
            document.querySelector('#question4 .slider').value;
            
        document.getElementById('00NMz000003nXp7').value = 
            document.querySelector('#question5 .selected')?.getAttribute('data-value') === 'ja' ? '1' : '0';
            
        document.getElementById('00NMz000003nXad').value = 
            document.querySelector('#question5a .selected')?.getAttribute('data-value') || '';
            
        document.getElementById('00NMz000003nXsL').value = 
            document.querySelector('#question6 .selected')?.getAttribute('data-value') === 'ja' ? '1' : '0';
            
        document.getElementById('00NMz000003nXh4').value = 
            document.querySelector('#question6a .slider').value;
            
        document.getElementById('email').value = 
            document.querySelector('#question8 input[type="email"]').value;
            
        document.getElementById('name').value = 
            document.querySelector('#question8 input[type="text"]').value;
    
        // Submit the form
        document.getElementById('landForm').submit();
    }
    
    // Update your nextButton click handler to use submitForm
    document.querySelector('#nextButton').addEventListener('click', () => {
        if (currentQuestion < totalSteps) {
            currentQuestion++;
            showQuestion(currentQuestion);
        } else {
            submitForm();
        }
    });
    
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