document.addEventListener('DOMContentLoaded', function () {
    function showPopup() {
        // Show the integrated popup
        const popup = document.getElementById('popup'); // Select the popup from HTML
        if (!popup) {
            console.error("Popup element not found in the HTML.");
            return;
        }

        // Set popup to visible
        popup.style.display = 'flex';

        const popupContent = popup.querySelector('.popup-content');
        const languageTrigger = document.getElementById('languageDropdownTrigger');

        // Dynamically handle language switching based on the language trigger's text
        if (languageTrigger) {
            const selectedLanguage = languageTrigger.textContent.trim();
            if (selectedLanguage === 'Deutsch') {
                console.log("Switching to Deutsch");
                document.getElementById('popupPt1').textContent = "Nachricht erfolgreich gesendet!";
                document.getElementById('popupPt2').textContent = "Vielen Dank, dass Sie uns kontaktiert haben. Wir melden uns bald bei Ihnen.";
                document.getElementById('popupPt3').textContent = "Schließen";
            } else {
                console.log("Switching to English");
                document.getElementById('popupPt1').textContent = "Message Sent Successfully!";
                document.getElementById('popupPt2').textContent = "Thank you for reaching out. We'll get back to you soon.";
                document.getElementById('popupPt3').textContent = "Close";
            }
        }

        // Add the 'show' class to animate
        setTimeout(() => {
            popupContent.classList.add('show');
        }, 10);

        // Close popup on overlay or button click
        const closeButtons = popup.querySelectorAll('.popup-close, .popup-close-btn');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                popupContent.classList.remove('show');
                setTimeout(() => {
                    popup.style.display = 'none';
                }, 300);
            });
        });

        // Close popup on overlay click
        const popupOverlay = popup.querySelector('.popup-overlay');
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                popupContent.classList.remove('show');
                setTimeout(() => {
                    popup.style.display = 'none';
                }, 300);
            }
        });
    }

    // Form submission handler
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const captchaResponse = grecaptcha.getResponse();

            if (!captchaResponse.length > 0) {
                throw new Error("Captcha not complete");
            }

            const formData = new FormData(form);

            fetch('send_email.php', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.text())
                .then(() => {
                    showPopup();
                    form.reset();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        });
    } else {
        console.error("Form element not found.");
    }
});
