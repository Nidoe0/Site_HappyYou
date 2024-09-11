const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragStart = false, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragStart = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
}

const  dragging = (e) => {
    if (!isDragStart) return; //if isDragStart is false return from here
    carousel.scrollLeft =  startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
}

const autoPlay = () => {
    if(window.innerWidth < 800) return; //return if window is smaller than 800
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}

autoPlay();

const infiniteScroll = () => {
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}
carousel.addEventListener("mousedown", dragStart );
carousel.addEventListener("mousemove", dragging );
document.addEventListener("mouseup", dragStop );
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);
