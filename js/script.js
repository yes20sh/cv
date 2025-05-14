const slider = document.getElementById("slider");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const container = document.getElementById("slider-container");

const projects = document.querySelectorAll('.project-container');
const totalProjects = projects.length;

let slideIndex = 0;

function getSlideWidth() {
  return projects.length ? projects[0].offsetWidth : 0;
}

const goToSlide = (index) => {
  const slideWidth = getSlideWidth();
  slider.style.transition = "transform 0.5s ease-in-out";
  slider.style.transform = `translateX(-${index * slideWidth}px)`;
};

const goToNextSlide = () => {
  slideIndex = (slideIndex + 1) % totalProjects;
  goToSlide(slideIndex);
};

const goToPrevSlide = () => {
  slideIndex = (slideIndex - 1 + totalProjects) % totalProjects;
  goToSlide(slideIndex);
};

nextButton.addEventListener("click", () => {
  goToNextSlide();
  resetAutoSlide();
});

prevButton.addEventListener("click", () => {
  goToPrevSlide();
  resetAutoSlide();
});

let autoSlide = setInterval(goToNextSlide, 2000);

const pauseAutoSlide = () => clearInterval(autoSlide);
const resumeAutoSlide = () => {
  pauseAutoSlide();
  autoSlide = setInterval(goToNextSlide, 2000);
};
const resetAutoSlide = () => {
  pauseAutoSlide();
  resumeAutoSlide();
};

// Pause/resume on hover and touch
slider.addEventListener("mouseenter", () => {
  pauseAutoSlide();
  container.classList.add("show-buttons");  // show buttons on hover
});
slider.addEventListener("mouseleave", () => {
  resumeAutoSlide();
  container.classList.remove("show-buttons"); // hide buttons when mouse leaves
});
slider.addEventListener("touchstart", () => {
  pauseAutoSlide();
  container.classList.add("show-buttons");  // show buttons on touch
});
slider.addEventListener("touchend", () => {
  resumeAutoSlide();
  // keep buttons visible for 2 seconds after touch ends, then hide
  setTimeout(() => container.classList.remove("show-buttons"), 2000);
});

// Also add these to the container to cover all touch areas
container.addEventListener("touchstart", () => {
  container.classList.add("show-buttons");
  clearTimeout(hideButtonsTimeout);
});
container.addEventListener("touchend", () => {
  hideButtonsTimeout = setTimeout(() => container.classList.remove("show-buttons"), 2000);
});

let hideButtonsTimeout;

// Update slide position on window resize
window.addEventListener('resize', () => {
  goToSlide(slideIndex);
});

// Initialize on load
window.addEventListener('load', () => {
  goToSlide(slideIndex);
});


// Mouse
function createStardust(x, y) {
    const stardust = document.createElement('div');
    stardust.classList.add('stardust');
    document.body.appendChild(stardust);

    stardust.style.left = `${x}px`;
    stardust.style.top = `${y}px`;
    stardust.style.backgroundColor = getRandomColor();

    // Automatically remove after animation ends
    setTimeout(() => {
        stardust.remove();
    }, 1500);
}

function getRandomColor() {
    const purpleShades = [
        '#800080', // Purple
        '#8A2BE2', // BlueViolet
        '#9370DB', // MediumPurple
        '#DA70D6', // Orchid
        '#D8BFD8', // Thistle
        '#BA55D3', // MediumOrchid
        '#EE82EE', // Violet
        '#9932CC', // DarkOrchid
        '#9400D3', // DarkViolet
        '#DDA0DD'  // Plum
    ];

    // 50% chance to use a purple shade
    if (Math.random() < 0.5) {
        return purpleShades[Math.floor(Math.random() * purpleShades.length)];
    } else {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    createStardust(e.pageX, e.pageY);
});

// Track touch movement (for mobile)
document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    createStardust(touch.pageX, touch.pageY);
}, { passive: true });
