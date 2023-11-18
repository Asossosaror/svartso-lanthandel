// Carousel
// Manual navigation
const slider = document.querySelector('.slider');
if(slider) {

const slides = document.querySelector('.slides');
const firstSlide = document.querySelector('.slide.first');
const carouselButtons = document.querySelectorAll('.manual-btn');
const numberOfSlides = 7;

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
        offset = (currentCarouselIndex - 1) * (-12.5);
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
    offset = (currentCarouselIndex - 1) * (-12.5);
    firstSlide.style.marginLeft = offset.toString() + '%';
}

let carouselTimer = setInterval(scrollCarousel, carouselInterval);

}

// Form functionality
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('.contact-form');

    if(form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
    
            const formData = new FormData(form);
            console.log(formData);

            const formDataObj = {};
            for (const [key, value] of formData) {
                formDataObj[key] = value;
            }
            console.log(formDataObj);
            
            const formDataJSON = JSON.stringify(formDataObj);

            fetch('/send-email', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: formDataJSON
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('The message was sent successfully!');
                } else {
                    console.error(data.error);
                }
            })
            .catch(error => {
                console.error('There was an error: ', error);
            })

            form.reset();
        })
    }
})

// Scroll into view
function scrollIntoViewport(id) {
    let element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth", block: "start" })
}