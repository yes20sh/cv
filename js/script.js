const slider = document.getElementById("slider");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
let slideIndex = 0;

const projects = document.querySelectorAll('.project-container');
const totalProjects = projects.length;

const slideWidth = projects[0].offsetWidth;

const goToNextSlide = () => {
    if (slideIndex < totalProjects - 1) {
        slideIndex++;
    } else {
        slideIndex = 0; // Cycle back to the first project
    }
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
};

const goToPrevSlide = () => {
    if (slideIndex > 0) {
        slideIndex--;
    } else {
        slideIndex = totalProjects - 1; // Cycle back to the last project
    }
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
};

nextButton.addEventListener("click", goToNextSlide);
prevButton.addEventListener("click", goToPrevSlide);


setInterval(goToNextSlide, 2000);  


// Mourse
function createStardust(x, y) {
    const stardust = document.createElement('div');
    stardust.classList.add('stardust');
    document.body.appendChild(stardust);
    stardust.style.left = `${x}px`;
    stardust.style.top = `${y}px`;
    stardust.style.backgroundColor = getRandomColor();
    setTimeout(() => {
        stardust.remove();
    }, 1500);
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

document.addEventListener('mousemove', (e) => {
    createStardust(e.pageX, e.pageY);
});
