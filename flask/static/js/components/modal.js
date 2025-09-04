const ModalType = {
    IMAGE: 'imageModal',
    BOX: 'boxModal'
};

let currentSlide = 0;
const currentLocale = "{{ get_locale() }}";
let slideData = [];

fetch("/static/json/project.json")
    .then(response => response.json())
    .then(data => {
        slideData = data;
        updateCarousel();
    })
    .catch(error => {
        console.error('Error fetching slide data:', error);
    });

const carouselIndicators = document.getElementById('carouselIndicators');
const carouselInner = document.getElementById('carouselInner');

function updateCarousel() {
    carouselIndicators.innerHTML = '';
    carouselInner.innerHTML = '';

    slideData.forEach((slide, index) => {
        // Create indicator
        const indicator = document.createElement('span');
        indicator.classList.add('indicator');
        indicator.dataset.slideTo = index;
        if (index === 0) indicator.classList.add('active');
        carouselIndicators.appendChild(indicator);

        // Create carousel item
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (index === 0) carouselItem.classList.add('active');

        const img = document.createElement('img');
        img.classList.add('d-block', 'w-100');
        img.src = slide.src;
        carouselItem.appendChild(img);

        carouselInner.appendChild(carouselItem);
    });

    // Call updateCarousel function to set the first slide
    const indicators = document.querySelectorAll('.indicator');
    const slides = document.querySelectorAll('.carousel-item');

    function setActiveSlide() {
        // Update the active class on slides
        slides.forEach((slide, index) => {
            slide.classList.toggle("active", index === currentSlide);
        });

        // Update the active class on indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle("active", index === currentSlide);
        });

        // Move carousel
        const offset = -currentSlide * 100;
        document.querySelector(".carousel-inner").style.transform = `translateX(${offset}%)`;

        // Update title and description with multilingual support
        const currentSlideTitle = slideData[currentSlide].titles;
        const currentSlideDescription = slideData[currentSlide].descriptions;

        const titleText = currentSlideTitle[currentLocale] || currentSlideTitle["en"];
        const descriptionText = currentSlideDescription[currentLocale] || currentSlideDescription["en"];

        document.getElementById("descriptionTitle").textContent = titleText;
        document.getElementById("descriptionText").textContent = descriptionText;

        // Display the modal container
        document.querySelector(".box-modal-container").style.display = "block";
    }

    // Set up click event for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
            currentSlide = index;
            setActiveSlide();
        });
    });

    // Initial update when the data is ready
    setActiveSlide();
}

function moveSlide(direction) {
    currentSlide = (currentSlide + direction + slideData.length) % slideData.length;
    updateCarousel();
}

// Function to open the modal and show the image
function openModal(imageSrc, title = '', description = '', type = ModalType.IMAGE) {
    var boxModalContainer = document.querySelector(".box-modal-container");
    var modalImage = document.getElementById("modalImage");
    var caption = document.getElementById("caption");
    var imageModal = document.getElementById("imageModal");
    imageModal.style.display = "block";

    if (type == ModalType.BOX) {
        boxModalContainer.style.display = "block";
        modalImage.style.display = "none";
        caption.style.display = "none";
    } else {
        boxModalContainer.style.display = "none";
        modalImage.style.display = "block";
        caption.style.display = "block";
        document.getElementById("modalImage").src = imageSrc;

        // Create a caption element
        const captionElement = document.getElementById("caption");

        // Set title if available
        captionElement.innerHTML = ""; // Clear previous content
        if (title && title.trim() !== "") {
            captionElement.innerHTML += "<h3>" + title + "</h3>";
        }

        // Set description if available
        if (description && description.trim() !== "") {
            captionElement.innerHTML += "<p>" + description + "</p>";
        }
    }
}

// Function to close the modal
function closeModal() {
    document.getElementById("imageModal").style.display = "none";
    document.querySelector(".box-modal-container").style.display = "none";
}