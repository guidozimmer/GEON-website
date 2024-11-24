export function startNumberFade(numberId, textId, containerId, values, interval = 2000) {
    let currentIndex = 0; // Track the current index

    const numberElement = document.getElementById(numberId);
    const textElement = document.getElementById(textId);
    const containerElement = document.getElementById(containerId);

    if (!numberElement || !textElement || !containerElement) {
        console.error(`One or more elements not found: numberId=${numberId}, textId=${textId}, containerId=${containerId}`);
        return;
    }

    // Set initial opacity and transitions
    numberElement.style.opacity = "0";
    textElement.style.opacity = "0";
    numberElement.style.transition = "opacity 1s ease-in-out";
    textElement.style.transition = "opacity 1s ease-in-out";

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

    // Function to handle fade-out, content switch, and fade-in
    const switchContent = () => {
        // Fade out both elements
        numberElement.style.opacity = "0";
        textElement.style.opacity = "0";

        // Wait for the fade-out to fully complete
        setTimeout(() => {
            // Switch content only after fade-out completes
            currentIndex = (currentIndex + 1) % values.length;
            const [number, text, isFinal] = values[currentIndex]; // `isFinal` determines if this is the final slide

            // Update the text
            textElement.innerHTML = text;

            // Toggle class for the final slide
            if (isFinal) {
                containerElement.classList.add("final-slide");
            } else {
                containerElement.classList.remove("final-slide");
            }

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
        }, 1000); // 1s matches the fade-out duration
    };

    // Initialize the first slide
    const initializeFirstSlide = () => {
        const [initialNumber, initialText, isFinal] = values[currentIndex];

        // Set the initial text
        textElement.innerHTML = initialText;

        // Toggle class for the first slide
        if (isFinal) {
            containerElement.classList.add("final-slide");
        } else {
            containerElement.classList.remove("final-slide");
        }

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
    };

    // Start the loop
    const startLoop = () => {
        setInterval(switchContent, interval);
    };

    // Initialize the first slide, then start the loop
    initializeFirstSlide();
    setTimeout(startLoop, interval); // Start the loop after the first interval
}
