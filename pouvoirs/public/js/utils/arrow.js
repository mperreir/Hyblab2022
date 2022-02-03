const showArrow = function () {
    document.getElementById("arrowSwipe").addEventListener('click', () => wrapper_nextSlide(), { once: true });
    document.getElementById("arrowSwipe").style.visibility = "visible";
}

const hideArrow = function () {
    document.getElementById("arrowSwipe").style.visibility = "hidden";
}