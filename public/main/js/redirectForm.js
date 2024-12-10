export function redirectToCode(event, inputId) {
    event.preventDefault(); // Prevent default form submission behavior
    const code = document.getElementById(inputId).value; // Get the value of the input field

    if (code.trim() !== "") {
        const newUrl = `https://geongroup.de/code/${encodeURIComponent(code)}`; // Construct the new URL
        window.location.href = newUrl; // Redirect to the new URL
    } else {
        alert("Please enter a valid code."); // Optional validation
    }
}
