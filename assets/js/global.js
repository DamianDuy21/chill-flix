'use strict';

const addEventOnElements = function (elements, eventType, callBack) {
    for (const e of elements) {
        e.addEventListener(eventType, callBack)
    }
}
//Toggle search box in <576px screen
// const searchBox = document.querySelector("[search-box]");
// const searchTogglers = document.querySelectorAll("[search-toggler]")

// addEventOnElements(searchTogglers, "click", function () {
//     searchBox.classList.toggle("active")
// })

const handleToDetailPage = async () => {
    document.addEventListener("click", (event) => {
        const item = event.target.closest("[todetail]")
        // localStorage.setItem("movie-slug", "")
        if (item) {
            localStorage.setItem("movie-slug", item.getAttribute("movie-slug"))
        }

    })
}


export { addEventOnElements, handleToDetailPage }
