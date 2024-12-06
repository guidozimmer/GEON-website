document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form-wrapper form');
    const responseElement = document.createElement('div');
    responseElement.id = 'form-response';
    form.appendChild(responseElement);

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        fetch("https://dev.geongroup.de/php/sendEmail.php", {
            method: "POST",
            body: formData,
        })
        .then((response) => response.text())
        .then((data) => {
            responseElement.textContent = data;
            form.reset();
        })
        .catch((error) => {
            console.error("Error:", error);
            responseElement.textContent = "An error occurred. Please try again.";
        });
    });
});