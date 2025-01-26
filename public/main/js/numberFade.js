export function startNumberFade(elementId, DEValues, ENValues, interval = 2000) {
    let currentIndex = 0;
    let isFading = false;

    const videoElement = document.querySelector(".potential");
    const numberDisplay = document.querySelector(`.${elementId}`);

    if (!numberDisplay || !videoElement) {
        console.error("Required elements not found");
        return;
    }

    function getCurrentValues() {
        return document.querySelector('#languageDropdownTrigger').textContent === 'Deutsch' ? DEValues : ENValues;
    }

    numberDisplay.innerHTML = getCurrentValues()[currentIndex];
    numberDisplay.style.opacity = "1";
    numberDisplay.style.transition = "opacity 1s ease-in-out";
    videoElement.style.opacity = "1";
    videoElement.style.transition = "opacity 1s ease-in-out";

    function fadeNumber() {
        if (isFading) return;
        isFading = true;

        const values = getCurrentValues();
        numberDisplay.style.opacity = "0";

        if (currentIndex === values.length - 2) {
            videoElement.style.opacity = "0";
        }

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % values.length;
            numberDisplay.innerHTML = values[currentIndex];

            if (currentIndex === 0) {
                videoElement.style.opacity = "1";
            }

            const _ = numberDisplay.offsetHeight;
            numberDisplay.style.opacity = "1";

            const nextInterval = currentIndex === values.length - 1 ? interval * 3 : interval;

            setTimeout(() => {
                isFading = false;
                fadeNumber();
            }, nextInterval);
        }, 1000);
    }

    setTimeout(fadeNumber, interval);
}