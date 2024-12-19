document.addEventListener('DOMContentLoaded', () => {
    let currentQuestion = 1;
    const totalQuestions = 6;
    
    // Form visibility state
    const mainSquare = document.querySelector('.main-square');
    const formSection = document.querySelector('.form-section');
    formSection.style.display = 'none';

    mainSquare.addEventListener('click', () => {
        mainSquare.classList.toggle('active');
        formSection.style.display = mainSquare.classList.contains('active') ? 'block' : 'none';
        if (!mainSquare.classList.contains('active')) {
            resetForm();
        }
    });

    function resetForm() {
        currentQuestion = 1;
        document.querySelectorAll('.option-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelectorAll('.conditional-question').forEach(q => {
            q.classList.remove('visible');
        });
        document.querySelectorAll('input[type="text"]').forEach(input => {
            input.value = '';
        });
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
        
        optionCards.forEach(c => {
            const conditionalId = c.getAttribute('data-shows');
            if (conditionalId) {
                const conditional = document.querySelector(`#${conditionalId}`);
                if (conditional) {
                    conditional.classList.remove('visible');
                }
            }
        });

        const conditionalId = card.getAttribute('data-shows');
        if (conditionalId && card.classList.contains('selected')) {
            const conditional = document.querySelector(`#${conditionalId}`);
            const shouldShow = card.getAttribute('data-value') === 'ja';
            if (conditional && shouldShow) {
                conditional.classList.add('visible');
                const slider = conditional.querySelector('.slider');
                const valueDisplay = conditional.querySelector('.slider-value');
                if (slider && valueDisplay) {
                    setTimeout(() => updateSliderValue(slider, valueDisplay), 0);
                }
            }
        }
        
        updateNextButton();
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
        
        updateNextButton();
    }

    function updateNextButton() {
        const nextButton = document.querySelector('#nextButton');
        const prevButton = document.querySelector('#prevButton');
        
        if (prevButton) {
            prevButton.disabled = currentQuestion === 1;
        }

        if (nextButton) {
            const isLastQuestion = currentQuestion === totalQuestions;
            nextButton.textContent = isLastQuestion ? 'Absenden' : 'Weiter';
            
            if (isLastQuestion) {
                // For the last question, enable the button when both fields are filled
                const bundesland = document.querySelector('#bundesland');
                const kreis = document.querySelector('#kreis');
                nextButton.disabled = !bundesland.value || !kreis.value;
            } else {
                // For other questions, check for selected option or slider
                const currentContainer = document.querySelector(`#question${currentQuestion}`);
                const hasSelection = currentContainer.querySelector('.option-card.selected');
                const hasSlider = currentContainer.querySelector('.slider');
                nextButton.disabled = !hasSelection && !hasSlider;
            }
        }
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
                updateNextButton();
            });
            updateSliderValue(slider, valueDisplay);
        }

        // Handle text inputs for last question
        if (questionNumber === totalQuestions) {
            const inputs = container.querySelectorAll('input[type="text"]');
            inputs.forEach(input => {
                input.addEventListener('input', updateNextButton);
            });
        }
    }

    function submitForm() {
        const formData = {
            landType: document.querySelector('#question1 .selected')?.getAttribute('data-value'),
            nearHighway: document.querySelector('#question2 .selected')?.getAttribute('data-value'),
            highwayPercentage: document.querySelector('#question2a .slider')?.value,
            areaSize: document.querySelector('#question3 .slider')?.value,
            isContiguous: document.querySelector('#question4 .selected')?.getAttribute('data-value'),
            subAreas: document.querySelector('#question4a .selected')?.getAttribute('data-value'),
            isLeased: document.querySelector('#question5 .selected')?.getAttribute('data-value'),
            leaseEnd: document.querySelector('#question5a .slider')?.value,
            state: document.querySelector('#bundesland')?.value,
            district: document.querySelector('#kreis')?.value
        };
    
        const data = new FormData();
        for (const [key, value] of Object.entries(formData)) {
            if (value) data.append(key, value);
        }
    
        fetch('sendOurOffer.php', {
            method: 'POST',
            body: data
        })
        .then(response => response.text())
        .then(() => {
            showPopup();
            formSection.style.display = 'none';
            mainSquare.classList.remove('active');
            resetForm();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
        });
    }
    
    function showPopup() {
        const popup = document.getElementById('popup');
        if (!popup) {
            console.error("Popup element not found in the HTML.");
            return;
        }
    
        // Set popup to visible
        popup.style.display = 'flex';
    
        const popupContent = popup.querySelector('.popup-content');
        const languageTrigger = document.getElementById('languageDropdownTrigger');
    
        // Handle language
        if (languageTrigger) {
            const selectedLanguage = languageTrigger.textContent.trim();
            if (selectedLanguage === 'Deutsch') {
                document.getElementById('popupPt1').textContent = "Nachricht erfolgreich gesendet!";
                document.getElementById('popupPt2').textContent = "Vielen Dank für Ihre Anfrage. Wir melden uns bald bei Ihnen.";
                document.getElementById('popupPt3').textContent = "Schließen";
            } else {
                document.getElementById('popupPt1').textContent = "Message Sent Successfully!";
                document.getElementById('popupPt2').textContent = "Thank you for your inquiry. We'll get back to you soon.";
                document.getElementById('popupPt3').textContent = "Close";
            }
        }
    
        // Add the 'show' class to animate
        setTimeout(() => {
            popupContent.classList.add('show');
        }, 10);
    
        // Close popup on button click
        const closeButtons = popup.querySelectorAll('.popup-close, .popup-close-btn');
        closeButtons.forEach(btn => {
            btn.onclick = () => {
                popupContent.classList.remove('show');
                setTimeout(() => {
                    popup.style.display = 'none';
                }, 300);
            };
        });
    
        // Close popup on overlay click
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