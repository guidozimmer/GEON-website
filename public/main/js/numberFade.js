export function startNumberFade(elementId, values, interval = 2000) {
    let currentIndex = 0;
    let isFading = false;

    // Get the display element by ID
    const numberDisplay = document.getElementById(elementId);

    if (!numberDisplay) {
        console.error(`Element with ID "${elementId}" not found.`);
        return;
    }

    // Function to animate numbers
    const animateNumber = (targetId, endValue, suffix = "", isHTML = false) => {
        anime({
            targets: { value: 0 },
            value: endValue,
            duration: 2000,
            easing: 'easeOutQuad',
            round: 1, // Ensure numbers are integers
            update: (anim) => {
                const formattedNumber = anim.animatables[0].target.value
                    .toLocaleString('de-DE'); // German-style thousand separator
                const content = `
                    <span style="font-size: 2.3rem; font-weight: bold;">${formattedNumber}</span>
                    <span style="font-size: 1.5rem;"> ${suffix}</span>
                `;
                document.getElementById(targetId).innerHTML = isHTML ? content : formattedNumber;
            }
        });
    };

    // Function to dynamically set the content
    const updateContent = (index) => {
        const currentValue = values[index];
        if (/\d/.test(currentValue)) {
            const [number, text] = currentValue.split(/\s(.+)/); // Split number and text
            animateNumber(elementId, parseInt(number, 10), text || "", true);
        } else {
            numberDisplay.innerHTML = currentValue; // Handle non-numeric text
        }
    };

    // Function to handle fade-out, update, and fade-in
    function fadeNumber() {
        if (isFading) return; // Prevent overlapping fades
        isFading = true;

        // Fade out
        numberDisplay.style.opacity = "0";

        // Wait for fade-out to complete
        setTimeout(() => {
            // Update the content
            currentIndex = (currentIndex + 1) % values.length;
            updateContent(currentIndex);

            // Fade in
            const _ = numberDisplay.offsetHeight; // Trigger reflow
            numberDisplay.style.opacity = "1";

            // Wait for fade-in to complete and schedule the next transition
            const nextInterval = currentIndex === values.length - 1 ? interval * 3 : interval;

            setTimeout(() => {
                isFading = false;
                fadeNumber(); // Schedule the next fade
            }, nextInterval);
        }, 1000); // Match fade-out duration
    }

    // Animate the first value
    updateContent(currentIndex);

    // Start the first fade after the initial interval
    setTimeout(fadeNumber, interval);
}
