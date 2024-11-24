export function startNumberFade(elementId, values, interval = 2000) {
    let currentIndex = 0;
    let isFading = false;

    // Get the display element by ID
    const numberDisplay = document.getElementById(elementId);

    if (!numberDisplay) {
        console.error(`Element with ID "${elementId}" not found.`);
        return;
    }

    // Ensure initial state
    numberDisplay.innerHTML = values[currentIndex]; // Use innerHTML for rendering HTML
    numberDisplay.style.opacity = "1";
    numberDisplay.style.transition = "opacity 1s ease-in-out";

    // Function to handle fade-out, text change, and fade-in
    function fadeNumber() {
        if (isFading) return; // Prevent overlapping fades
        isFading = true;

        // Fade out
        numberDisplay.style.opacity = "0";

        // Wait for fade-out to complete
        setTimeout(() => {
            // Update the text
            currentIndex = (currentIndex + 1) % values.length;
            numberDisplay.innerHTML = values[currentIndex]; // Use innerHTML to render tags

            // Force reflow before fading back in
            const _ = numberDisplay.offsetHeight; // Trigger reflow
            numberDisplay.style.opacity = "1";

            // Wait for fade-in to complete and schedule next transition
            const nextInterval =
                currentIndex === values.length - 1 ? interval * 3 : interval;

            setTimeout(() => {
                isFading = false;
                fadeNumber(); // Schedule the next fade
            }, nextInterval);
        }, 1000); // Match fade-out duration
    }

    // Start the first fade
    setTimeout(fadeNumber, interval);
}
