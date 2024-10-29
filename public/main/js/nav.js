export function setupDropdown() {
    const offerDropdown = document.getElementById('offerDropdown');
    const dropdownMenu = new bootstrap.Dropdown(offerDropdown);

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
}

// Make the function globally accessible
window.setupDropdown = setupDropdown;

// Run the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', setupDropdown);
