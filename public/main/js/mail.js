document.addEventListener('DOMContentLoaded', function() {
    // Translations for the popup
    const translations = {
        EN: {
            popupPt1: "Message Sent Successfully!",
            popupPt2: "Thank you for reaching out. We'll get back to you soon.",
            popupPt3: "Close"
        },
        DE: {
            popupPt1: "Nachricht erfolgreich gesendet!",
            popupPt2: "Vielen Dank, dass Sie uns kontaktiert haben. Wir melden uns bald bei Ihnen.",
            popupPt3: "Schließen"
        }
    };

    function showPopup() {
        // Get current language (replace with your own implementation)
        const currentLanguage = window.LanguageSwitcher.getCurrentLanguage();

        // Get translations for the current language
        const { popupPt1, popupPt2, popupPt3 } = translations[currentLanguage];

        // Create popup HTML
        const popup = document.createElement('div');
        popup.innerHTML = `
            <style>
                .popup-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                .popup-content {
                    background: white;
                    border-radius: 10px;
                    padding: 40px;
                    text-align: center;
                    max-width: 400px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    transform: scale(0.7);
                    opacity: 0;
                    transition: all 0.3s ease;
                    position: relative;
                }
                .popup-content.show {
                    transform: scale(1);
                    opacity: 1;
                }
                .popup-icon {
                    font-size: 60px;
                    color: #4CAF50;
                    margin-bottom: 20px;
                }
                .popup-title {
                    font-size: 24px;
                    margin-bottom: 15px;
                    color: #333;
                }
                .popup-message {
                    color: #666;
                    margin-bottom: 25px;
                }
                .popup-close {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    background-color: #f0f0f0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .popup-close:hover {
                    background-color: #e0e0e0;
                    transform: rotate(90deg);
                }
                .popup-close-btn {
                    background-color: var(--geon-primary);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                }
                .popup-close-btn:hover {
                    background-color: #3483eb;
                }
            </style>
            <div class="popup-overlay">
                <div class="popup-content">
                    <div class="popup-close">&times;</div>
                    <div class="popup-icon">✔️</div>
                    <h2 class="popup-title">${popupPt1}</h2>
                    <p class="popup-message">${popupPt2}</p>
                    <button class="popup-close-btn">${popupPt3}</button>
                </div>
            </div>
        `;
        document.body.appendChild(popup);

        // Popup behavior (unchanged)
        const popupOverlay = popup.querySelector('.popup-overlay');
        const popupContent = popup.querySelector('.popup-content');
        
        setTimeout(() => popupContent.classList.add('show'), 10);
        
        const closeButtons = popup.querySelectorAll('.popup-close, .popup-close-btn');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                popupContent.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(popup);
                }, 300);
            });
        });

        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                popupContent.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(popup);
                }, 300);
            }
        });
    }

    // Form submission (unchanged)
    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const captchaResponse = grecaptcha.getResponse();

        if (!captchaResponse.length > 0) {
            throw new Error("Captcha not complete");
        }

        const formData = new FormData(form);

        fetch('send_email.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            showPopup();
            form.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    });
});
