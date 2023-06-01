// Get necessary elements
const sliderContainer = document.querySelector('.slider-container');
const sliderTrack = document.querySelector('.slider-track');
const sliderItems = document.querySelectorAll('.slider-item');
const prevButton = document.querySelector('.slider-prev');
const nextButton = document.querySelector('.slider-next');

// Calculate the width of each slider item
const itemWidth = sliderContainer.clientWidth / 4;

// Initialize variables for dragging functionality
let isDragging = false;
let startPosX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;

// Update the position of the slider track based on the current translate value
const setSliderPosition = () => {
  sliderTrack.style.transform = `translateX(${currentTranslate}px)`;
};

// Animate the slider track to the desired position
const animateSlider = () => {
  setSliderPosition();
  if (isDragging) {
    animationID = requestAnimationFrame(animateSlider);
  }
};

// Move to the previous slide
const slideToPrev = () => {
  if (currentIndex >= 4) {
    currentIndex -= 4;
  } else {
    currentIndex = sliderItems.length - 4 + currentIndex;
  }
  currentTranslate = -currentIndex * itemWidth;
  setSliderPosition();
};

  

// Move to the next slide
const slideToNext = () => {
  if (currentIndex < sliderItems.length - 4) {
    currentIndex += 4;
  } else {
    currentIndex = currentIndex + 4 - sliderItems.length;
  }
  currentTranslate = -currentIndex * itemWidth;
  setSliderPosition();
};


  

// Attach event listeners to the buttons
prevButton.addEventListener('click', slideToPrev);
nextButton.addEventListener('click', slideToNext);

// Handle mouse/touch events for dragging
sliderContainer.addEventListener('mousedown', (e) => {
  isDragging = true;
  startPosX = e.pageX - sliderTrack.offsetLeft;
  prevTranslate = currentTranslate;

  // Stop any ongoing animation
  cancelAnimationFrame(animationID);

  // Add the grabbing class to change the cursor
  sliderContainer.classList.add('grabbing');
});

sliderContainer.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();

  const currentPosX = e.pageX - sliderTrack.offsetLeft;
  const translateX = currentPosX - startPosX;
  currentTranslate = prevTranslate + translateX;

  // Limit the translate value within the slider bounds
  if (currentTranslate > 0) {
    currentTranslate = 0;
  } else if (currentTranslate < -(sliderItems.length - 4) * itemWidth) {
    currentTranslate = -(sliderItems.length - 4) * itemWidth;
  }

  setSliderPosition();
});

sliderContainer.addEventListener('mouseup', () => {
  isDragging = false;

  // Remove the grabbing class
  sliderContainer.classList.remove('grabbing');

  // Determine the current index based on the translate value
  currentIndex = Math.abs(Math.round(currentTranslate / itemWidth));

  // Animate the slider track to the nearest slide
  animationID = requestAnimationFrame(animateSlider);
});

sliderContainer.addEventListener('mouseleave', () => {
  isDragging = false;

  // Remove the grabbing class
  sliderContainer.classList.remove('grabbing');

  // Animate the slider track to the current slide
  animationID = requestAnimationFrame(animateSlider);
});
