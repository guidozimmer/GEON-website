document.addEventListener('DOMContentLoaded', function() {
    function showPopup() {
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
                    background-color: #3361f5;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                }
                .popup-close-btn:hover {
                    background-color: #45a049;
                }
            </style>
            <div class="popup-overlay">
                <div class="popup-content">
                    <div class="popup-close">&times;</div>
                    <div class="popup-icon">✔️</div>
                    <h2 class="popup-title">Message Sent Successfully!</h2>
                    <p class="popup-message">Thank you for reaching out. We'll get back to you soon.</p>
                    <button class="popup-close-btn">Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(popup);
        
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

    // Form submission
    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();

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