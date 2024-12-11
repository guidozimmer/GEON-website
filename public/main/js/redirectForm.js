export function redirectToCode(event, inputId) {
    event.preventDefault(); // Prevent default form submission behavior
    const code = document.getElementById(inputId).value.trim(); // Get the value of the input field

    if (code !== "") {
        const newUrl = `https://geongroup.de/code/${encodeURIComponent(code)}`; // Construct the new URL

        // Check if the page exists
        fetch(newUrl, { method: "HEAD" })
            .then(response => {
                if (response.ok) {
                    // If the page exists, redirect
                    window.location.href = newUrl;
                } else {
                    // If not found, show an alert
                    alert("Code not found. Please enter a valid code.");
                }
            })
            .catch(() => {
                // Handle network errors
                alert("An error occurred. Please try again later.");
            });
    } else {
        alert("Please enter a valid code."); // Validation for empty input
    }
}
