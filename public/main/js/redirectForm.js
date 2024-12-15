export async function redirectToCode(event, inputId) {
    event.preventDefault(); // Prevent default form submission behavior
    const code = document.getElementById(inputId).value; // Get the value of the input field

    if (code.trim() !== "") {
        const newUrl = `geongroup.de/code/${encodeURIComponent(code)}`; // Construct the new URL

        try {
            // Check if the URL exists
            const response = await fetch(newUrl, { method: 'HEAD' });

            if (response.ok) {
                window.location.href = newUrl; // Redirect to the new URL if found
            } else {
                alert("The requested resource was not found."); // Handle non-200 responses
            }
        } catch (error) {
            console.error("Error checking the URL:", error);
            alert("An error occurred while checking the resource."); // Handle network or other errors
        }
    } else {
        alert("Please enter a valid code."); // Optional validation
    }
}
