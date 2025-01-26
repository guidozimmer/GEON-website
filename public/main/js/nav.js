export function setupDropdown() {
    const offerDropdown = document.getElementById('offerDropdown');
    const dropdownMenu = new bootstrap.Dropdown(offerDropdown);
    const contactNav = document.getElementById('contactNavId');

    // Hover to show dropdown
    offerDropdown.addEventListener('mouseenter', function () {
        dropdownMenu.show();
    });

    // Hide dropdown when mouse leaves the menu
    offerDropdown.addEventListener('mouseleave', function () {
        setTimeout(() => {
            if (!offerDropdown.matches(':hover') && !dropdownMenu._menu.matches(':hover')) {
                dropdownMenu.hide();
            }
        }, 200);
    });

    // Click to navigate to #ourOffer
    offerDropdown.addEventListener('click', function (event) {
        // Navigate to #ourOffer
        window.location.href = '#ourOffer';
    });

    // Handle contact nav link clicks
    if (contactNav) {
        contactNav.addEventListener('click', function(e) {
            const contactSection = document.querySelector('.contact_us_6');
            
            // If contact section is visible, just scroll to it
            if (contactSection && contactSection.style.display === 'flex') {
                return; // Let default scroll behavior work
            }

            // If contact section is hidden, prevent scroll and show cookie consent
            e.preventDefault();
            window.CookieConsent.show();
        });
    }
}

// Make the function globally accessible
window.setupDropdown = setupDropdown;

// Run the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', setupDropdown);