const squares = document.querySelectorAll('.square');
const nextButton = document.getElementById('nextButton');
const backButton = document.getElementById('backButton');
const squareStage = document.getElementById('squareStage');
const slideContainer = document.getElementById('slideContainer');
const slider = document.getElementById('slider');
const currentValueDisplay = document.getElementById('currentValue');
const slideNextButton = document.getElementById('slideNextButton');
let selectedSquare = null;

function updateSliderLabelPosition() {
    const sliderRect = slider.getBoundingClientRect();
    const thumbPosition = (slider.value - slider.min) / (slider.max - slider.min) * sliderRect.width;
    currentValueDisplay.style.left = (thumbPosition + 15) + 'px';
    currentValueDisplay.textContent = slider.value;
}

squares.forEach(square => {
    square.addEventListener('click', () => {
        if (selectedSquare) {
            selectedSquare.classList.remove('selected');
        }
        square.classList.add('selected');
        selectedSquare = square;
        nextButton.disabled = false;
    });
});

nextButton.addEventListener('click', () => {
    squareStage.style.display = 'none';
    slideContainer.style.display = 'flex';
    updateSliderLabelPosition();
});

backButton.addEventListener('click', () => {
    slideContainer.style.display = 'none';
    squareStage.style.display = 'block';
});

slider.addEventListener('input', () => {
    updateSliderLabelPosition();
    slideNextButton.disabled = false;
});

slideNextButton.addEventListener('click', () => {
    alert(`You selected Square ${selectedSquare.dataset.id} and chose value ${slider.value}`);
});

window.addEventListener('resize', () => {
    if (slideContainer.style.display === 'flex') {
        updateSliderLabelPosition();
    }
});