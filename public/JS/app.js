// Carousel
// Manual navigation
const slides = document.querySelector('.slides');
const firstSlide = document.querySelector('.slide.first');
const carouselButtons = document.querySelectorAll('.manual-btn');
const numberOfSlides = 4;

let newCarouselIndex = 2;
let newCarouselButton = '';
let newCarouselDataset = '';
let currentCarouselDataset = '';
let currentCarouselButton = '';
let currentCarouselIndex = '1';
let offset = 0;

carouselButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        newCarouselIndex = e.target.dataset.carouselIndex;
        newCarouselButton = e.target; 

        // remove the styles from the current checked button
        currentCarouselDataset = '[data-carousel-index="' + currentCarouselIndex + '"]';
        currentCarouselButton = document.querySelector(currentCarouselDataset);
        currentCarouselButton.classList.remove('checked');
        
        // add class of 'checked' to the clicked button
        newCarouselButton.classList.add('checked');
        currentCarouselIndex = newCarouselIndex.toString();

        // display the correct image based on the carousel index
        offset = (currentCarouselIndex - 1) * - 20;
        firstSlide.style.marginLeft = offset.toString() + '%';

        // reset the setInterval for the automatic navigation
        clearInterval(carouselTimer);
        carouselTimer = setInterval(scrollCarousel, carouselInterval);
    });
});

// Automatic navigation
const carouselInterval = 5000;
function scrollCarousel() {
    currentCarouselButton = document.querySelector('.manual-btn.checked');
    currentCarouselIndex = currentCarouselButton.dataset.carouselIndex;
    newCarouselIndex = parseInt(currentCarouselIndex) + 1;
    if(newCarouselIndex > numberOfSlides) {
        newCarouselIndex = 1;
    }
    newCarouselDataset = '[data-carousel-index="' + newCarouselIndex + '"]';
    newCarouselButton = document.querySelector(newCarouselDataset);
    
    // remove the styles from the current checked button
    currentCarouselButton.classList.remove('checked');

    // add class of 'checked' to the clicked button
    newCarouselButton.classList.add('checked');
    currentCarouselIndex = newCarouselIndex.toString();

    // display the correct image based on the carousel index
    offset = (currentCarouselIndex - 1) * - 20;
    firstSlide.style.marginLeft = offset.toString() + '%';
}

let carouselTimer = setInterval(scrollCarousel, carouselInterval);