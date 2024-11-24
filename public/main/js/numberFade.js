export function startNumberFade(numberId, textId, containerId, values, interval = 2000) {
    let currentIndex = 0; // Track the current index#
    console.log("test");

    const numberElement = document.getElementById(numberId);
    const textElement = document.getElementById(textId);
    const containerElement = document.getElementById(containerId);

    if (!numberElement || !textElement || !containerElement) {
        console.error(`One or more elements not found: numberId=${numberId}, textId=${textId}, containerId=${containerId}`);
        return;
    }

    // Set initial opacity
    numberElement.style.opacity = "0";
    textElement.style.opacity = "0";
    numberElement.style.transition = "opacity 1s ease-in-out"; // Only opacity transition
    textElement.style.transition = "opacity 1s ease-in-out"; // Only opacity transition

    // Function to animate numbers
    const animateNumber = (targetElement, endValue) => {
        anime({
            targets: { value: 0 }, // Start counting from 0
            value: endValue,
            duration: 2000, // Match the count-up duration
            easing: "easeOutQuad",
            round: 1, // Ensure numbers are integers
            update: (anim) => {
                const formattedNumber = anim.animatables[0].target.value.toLocaleString("de-DE");
                targetElement.innerHTML = formattedNumber; // Update the number during animation
            },
        });
    };

    // Function to handle fade-out, position switch, content switch, and fade-in
    const switchContent = () => {
        // Fade out both elements
        numberElement.style.opacity = "0";
        textElement.style.opacity = "0";

        // Wait for the fade-out to fully complete
        setTimeout(() => {
            // Move to the next slide
            currentIndex = (currentIndex + 1) % values.length;
            const [number, text, numberLeft, textRight] = values[currentIndex]; // Includes positions

            // Update positions
            numberElement.style.left = numberLeft || "0px"; // Default to 0px if not provided
            textElement.style.right = textRight || "0px"; // Default to 0px if not provided

            // Update the text
            textElement.innerHTML = text;

            // Set the number and start count-up animation
            if (number !== "" && number !== null) {
                numberElement.innerHTML = "0"; // Reset number to 0
                animateNumber(numberElement, number); // Start count-up animation
            } else {
                numberElement.innerHTML = ""; // Clear the number field for empty entries
            }

            // Fade in both elements
            numberElement.style.opacity = "1";
            textElement.style.opacity = "1";

            // Adjust the interval for the next slide
            const nextInterval = currentIndex === values.length - 1 ? interval * 2 : interval; // Double the interval for the last slide
            setTimeout(switchContent, nextInterval);
        }, 1000); // Matches the fade-out duration
    };

    // Function to initialize the first slide
    const initializeFirstSlide = () => {
        const [initialNumber, initialText, initialNumberLeft, initialTextRight] = values[currentIndex];

        // Set initial positions
        numberElement.style.left = initialNumberLeft || "0px"; // Default to 0px if not provided
        textElement.style.right = initialTextRight || "0px"; // Default to 0px if not provided

        // Set the initial text
        textElement.innerHTML = initialText;

        // Start the count-up animation for the first slide
        if (initialNumber !== "" && initialNumber !== null) {
            numberElement.innerHTML = "0"; // Start with 0 initially
            animateNumber(numberElement, initialNumber); // Start count-up animation
        } else {
            numberElement.innerHTML = ""; // Clear the number field for empty entries
        }

        // Fade in both elements
        setTimeout(() => {
            numberElement.style.opacity = "1";
            textElement.style.opacity = "1";
        }, 100); // Small delay to ensure the content is visible

        // Start the loop after the first slide
        setTimeout(switchContent, interval); // First slide lasts the normal interval
    };

    // Initialize the first slide
    initializeFirstSlide();
}
