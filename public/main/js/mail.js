document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop the form from submitting normally

        // Collect form data
        const formData = new FormData(form);

        // Send AJAX request
        fetch('send_email.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            // Show result to user (you can customize this)
            alert(result);
            form.reset(); // Optional: clear the form after successful submission
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    });
});