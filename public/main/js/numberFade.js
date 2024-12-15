export function startNumberFade(elementId, values, interval = 2000) {
    let currentIndex = 0;
    let isFading = false;

    const videoElement = document.querySelector(".potential"); 
    const numberDisplay = document.querySelector(`.${elementId}`);


    if (!numberDisplay) {
        console.error(`Element with ID "${elementId}" not found.`);
        return
    }
    if (!videoElement) {
        console.error(`Element with class "potential" not found.`);
        return
    }




    // Ensure initial state
    numberDisplay.innerHTML = values[currentIndex]; // Use innerHTML for rendering HTML
    numberDisplay.style.opacity = "1";
    numberDisplay.style.transition = "opacity 1s ease-in-out";
    videoElement.style.opacity = "1"; // Start with video fully visible
    videoElement.style.transition = "opacity 1s ease-in-out";

    // Function to handle fade-out, text change, and fade-in
    function fadeNumber() {
        if (isFading) return; // Prevent overlapping fades
        isFading = true;

        // Fade out number display
        numberDisplay.style.opacity = "0";

        // Fade out video with the second-to-last slide
        if (currentIndex === values.length - 2) {
            videoElement.style.opacity = "0"; // Fade out the video
        }

        // Wait for fade-out to complete
        setTimeout(() => {
            // Update the text
            currentIndex = (currentIndex + 1) % values.length;
            numberDisplay.innerHTML = values[currentIndex]; // Use innerHTML to render tags

            // Fade video back in with the first slide
            if (currentIndex === 0) {
                videoElement.style.opacity = "1"; // Fade video back in
            }

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
