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
        optionCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
    
        // Special handling for Question 1
        if (card.closest('#question1')) {
            if (card.getAttribute('data-value') === 'nein') {
                alert('Vielen Dank für Ihr Interesse. Leider können wir nur mit Eigentümern zusammenarbeiten.');
                formSection.style.display = 'none';
                mainSquare.classList.remove('active');
                resetForm();
                return;
            }
        }
        
        // Handle conditional questions
        const conditionalId = card.getAttribute('data-shows');
        const questionContainer = card.closest('.question-container');
        
        // Only handle conditional visibility if this is not a click within a conditional question
        if (!card.closest('.conditional-question')) {
            // Hide any conditional questions in this container
            const conditional = questionContainer.querySelector('.conditional-question');
            if (conditional) {
                conditional.classList.remove('visible');
                // If this card should show the conditional and it's selected
                if (conditionalId && card.classList.contains('selected') && 
                    card.getAttribute('data-value') === 'ja') {
                    conditional.classList.add('visible');
                    
                    // Initialize slider if present
                    const slider = conditional.querySelector('.slider');
                    const valueDisplay = conditional.querySelector('.slider-value');
                    if (slider && valueDisplay) {
                        setTimeout(() => updateSliderValue(slider, valueDisplay), 0);
                    }
                }
            }
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
    
        // For location fields (Question 7)
        if (questionNumber === 7) {
            const locationEntries = container.querySelectorAll('.location-entry');
            // Check if all location entries are properly filled
            let allValid = true;
            locationEntries.forEach(entry => {
                const inputs = entry.querySelectorAll('input[required]');
                const isEntryValid = Array.from(inputs).every(input => input.value.trim() !== '');
                if (!isEntryValid) {
                    allValid = false;
                }
            });
            return allValid;
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

    function showPopup() {
        const popup = document.getElementById('popup');
        if (!popup) {
            console.error("Popup element not found in the HTML.");
            return;
        }

        popup.style.display = 'flex';
        const popupContent = popup.querySelector('.popup-content');
        
        setTimeout(() => {
            popupContent.classList.add('show');
        }, 10);

        const closeButtons = popup.querySelectorAll('.popup-close, .popup-close-btn');
        closeButtons.forEach(btn => {
            btn.onclick = () => {
                popupContent.classList.remove('show');
                setTimeout(() => {
                    popup.style.display = 'none';
                }, 300);
            };
        });

        const popupOverlay = popup.querySelector('.popup-overlay');
        popupOverlay.onclick = (e) => {
            if (e.target === popupOverlay) {
                popupContent.classList.remove('show');
                setTimeout(() => {
                    popup.style.display = 'none';
                }, 300);
            }
        };
    }

    function submitForm() {
        const locationEntries = document.querySelectorAll('.location-entry');
        const locations = Array.from(locationEntries).map(entry => {
            return {
                bundesland: entry.querySelector('[name="bundesland[]"]').value,
                landkreis: entry.querySelector('[name="landkreis[]"]').value,
                gemarkung: entry.querySelector('[name="gemarkung[]"]').value,
                flur: entry.querySelector('[name="flur[]"]').value,
                flurstueck: entry.querySelector('[name="flurstueck[]"]').value,
                flaeche: entry.querySelector('[name="flaeche[]"]').value,
                amt: entry.querySelector('[name="amt[]"]').value
            };
        });

        const formData = {
            isOwner: document.querySelector('#question1 .selected')?.getAttribute('data-value'),
            landType: document.querySelector('#question2 .selected')?.getAttribute('data-value'),
            nearHighway: document.querySelector('#question3 .selected')?.getAttribute('data-value'),
            highwayPercentage: document.querySelector('#question3a .slider')?.value,
            areaSize: document.querySelector('#question4 .slider')?.value,
            isContiguous: document.querySelector('#question5 .selected')?.getAttribute('data-value'),
            subAreas: document.querySelector('#question5a .selected')?.getAttribute('data-value'),
            isLeased: document.querySelector('#question6 .selected')?.getAttribute('data-value'),
            leaseEnd: document.querySelector('#question6a .slider')?.value,
            locations: locations,
            contact: {
                name: document.querySelector('#name').value,
                email: document.querySelector('#email').value,
                phone: document.querySelector('#phone').value
            }
        };

        console.log('Form Data:', formData);
        showPopup();
        formSection.style.display = 'none';
        mainSquare.classList.remove('active');
        resetForm();
    }

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