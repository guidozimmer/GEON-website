export function startNumberFade(elementId, values, interval = 2000) {
    let currentIndex = 0;
    let isFadingOut = false;
    let timer = null;

    // Get the display element by ID
    const numberDisplay = document.getElementById(elementId);

    if (!numberDisplay) {
        console.error(`Element with ID "${elementId}" not found.`);
        return;
    }

    // Set the initial value
    numberDisplay.textContent = values[currentIndex];
    numberDisplay.style.opacity = "1";

    // Function to start fading out and in
    function fadeNumber() {
        // Fade out
        isFadingOut = true;
        numberDisplay.style.transition = "opacity 1s";
        numberDisplay.style.opacity = "0";

        // Wait for fade-out to complete
        timer = setTimeout(() => {
            isFadingOut = false;

            // Update the value
            currentIndex = (currentIndex + 1) % values.length;
            numberDisplay.textContent = values[currentIndex];

            // Fade in
            numberDisplay.style.opacity = "1";

            // Schedule next fade
            const nextInterval =
                currentIndex === values.length - 1 ? interval * 3 : interval;

            timer = setTimeout(fadeNumber, nextInterval);
        }, 1000); // Fade-out duration
    }

    // Start the loop
    const startLoop = () => {
        if (!isFadingOut) fadeNumber();
    };

    // Initialize loop
    startLoop();
}
